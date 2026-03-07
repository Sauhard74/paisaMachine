import { Router, Request, Response } from "express";
import { proxyPool } from "../services/proxy-pool.js";

// Security: Input validation helpers
const VALID_SYMBOL = /^[A-Z0-9&^.\-]{1,20}$/;
const VALID_INTERVALS = ["1m", "2m", "5m", "15m", "30m", "60m", "1h", "1d", "5d", "1wk", "1mo"];
const VALID_RANGES = ["1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "max"];

function validateSymbol(symbol: string): boolean {
  return VALID_SYMBOL.test(symbol);
}

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// --------------- In-memory cache ---------------
interface CacheEntry {
  data: any;
  ts: number;
}

class SimpleCache {
  private store = new Map<string, CacheEntry>();

  get(key: string, maxAge: number): any | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() - entry.ts > maxAge) {
      this.store.delete(key);
      return null;
    }
    return entry.data;
  }

  set(key: string, data: any): void {
    this.store.set(key, { data, ts: Date.now() });
  }
}

// --------------- Fetch helpers ---------------
async function fetchWithTimeout(url: string, headers: Record<string, string>, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { headers, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchYahoo(url: string): Promise<any> {
  const resp = await fetchWithTimeout(url, { "User-Agent": USER_AGENT });
  if (!resp.ok) throw new Error(`Yahoo responded ${resp.status}`);
  return resp.json();
}

// --------------- Yahoo crumb auth (for v10 API) ---------------
let yahooCrumb = "";
let yahooCookies = "";
let crumbRefreshedAt = 0;
const CRUMB_MAX_AGE = 30 * 60 * 1000; // 30 minutes

async function refreshYahooCrumb(): Promise<void> {
  try {
    // Step 1: Hit fc.yahoo.com with redirect follow to get A3 cookie
    const controller1 = new AbortController();
    const timer1 = setTimeout(() => controller1.abort(), 8000);
    const consentResp = await fetch("https://fc.yahoo.com", {
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
      signal: controller1.signal,
    });
    clearTimeout(timer1);

    const cookies = (consentResp.headers.getSetCookie?.() ?? [])
      .map((c) => c.split(";")[0])
      .join("; ");

    if (!cookies) {
      console.error("[Yahoo] No cookies from fc.yahoo.com");
      return;
    }
    yahooCookies = cookies;

    // Step 2: Get crumb
    const crumbResp = await fetchWithTimeout(
      "https://query2.finance.yahoo.com/v1/test/getcrumb",
      { "User-Agent": USER_AGENT, Cookie: yahooCookies },
      5000
    );
    if (crumbResp.ok) {
      const text = await crumbResp.text();
      if (text && !text.includes("error") && !text.includes("{")) {
        yahooCrumb = text.trim();
        crumbRefreshedAt = Date.now();
        console.log(`[Yahoo] Crumb refreshed: ${yahooCrumb.substring(0, 8)}...`);
      } else {
        console.error(`[Yahoo] Invalid crumb response: ${text.substring(0, 100)}`);
      }
    } else {
      console.error(`[Yahoo] Crumb request failed: ${crumbResp.status}`);
    }
  } catch (err: any) {
    console.error(`[Yahoo] Crumb refresh failed: ${err.message}`);
  }
}

async function ensureYahooCrumb(): Promise<void> {
  if (!yahooCrumb || Date.now() - crumbRefreshedAt > CRUMB_MAX_AGE) {
    await refreshYahooCrumb();
  }
}

async function fetchYahooV10(symbol: string, modules: string[]): Promise<any> {
  await ensureYahooCrumb();
  if (!yahooCrumb) return null;

  const url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(symbol)}?modules=${modules.join(",")}&crumb=${encodeURIComponent(yahooCrumb)}`;
  try {
    const resp = await fetchWithTimeout(url, {
      "User-Agent": USER_AGENT,
      Cookie: yahooCookies,
    }, 8000);
    if (!resp.ok) {
      if (resp.status === 401) {
        // Crumb expired, refresh and retry
        await refreshYahooCrumb();
        if (!yahooCrumb) return null;
        const retry = await fetchWithTimeout(
          `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(symbol)}?modules=${modules.join(",")}&crumb=${encodeURIComponent(yahooCrumb)}`,
          { "User-Agent": USER_AGENT, Cookie: yahooCookies },
          8000
        );
        if (!retry.ok) return null;
        return retry.json();
      }
      return null;
    }
    return resp.json();
  } catch {
    return null;
  }
}

// Convert NSE symbol to Yahoo symbol (e.g., RELIANCE -> RELIANCE.NS)
function toYahooSymbol(nseSymbol: string): string {
  // Handle index symbols
  const indexMap: Record<string, string> = {
    "NIFTY 50": "^NSEI",
    "NIFTY BANK": "^NSEBANK",
    "NIFTY NEXT 50": "^NSMIDCP",
    "NIFTY IT": "^CNXIT",
    "NIFTY FINANCIAL SERVICES": "NIFTY_FIN_SERVICE.NS",
  };
  return indexMap[nseSymbol] || `${nseSymbol}.NS`;
}

// --------------- NSE (with proxy rotation fallback) ---------------
const NSE_BASE = "https://www.nseindia.com";
let nseCookies = "";
let cookieRefreshedAt = 0;
let nseDirectBlocked = false;

async function refreshNSECookies(): Promise<void> {
  // Try direct first
  try {
    const resp = await fetchWithTimeout(NSE_BASE, { "User-Agent": USER_AGENT }, 5000);
    if (resp.ok || resp.status === 302) {
      const setCookie = resp.headers.getSetCookie?.() ?? [];
      nseCookies = setCookie.map((c) => c.split(";")[0]).join("; ");
      cookieRefreshedAt = Date.now();
      nseDirectBlocked = false;
      return;
    }
  } catch { /* direct failed */ }

  // Direct blocked — try through proxy
  nseDirectBlocked = true;
  if (proxyPool.size === 0) return;

  try {
    const resp = await proxyPool.proxyFetch(NSE_BASE, { timeoutMs: 6000 });
    if (resp.ok || resp.status === 302) {
      // Proxy cookies won't carry over perfectly, but we got through
      cookieRefreshedAt = Date.now();
      console.log("[NSE] Cookie refresh succeeded via proxy");
    }
  } catch { /* proxy also failed */ }
}

async function tryFetchNSE(url: string): Promise<any | null> {
  // Try direct first (if not blocked)
  if (!nseDirectBlocked) {
    try {
      if (!nseCookies || Date.now() - cookieRefreshedAt > 10 * 60 * 1000) {
        await refreshNSECookies();
      }
      const resp = await fetchWithTimeout(url, {
        "User-Agent": USER_AGENT,
        Accept: "application/json",
        Cookie: nseCookies,
        Referer: NSE_BASE,
      }, 8000);
      if (resp.ok) return resp.json();
      if (resp.status === 403 || resp.status === 401) {
        nseDirectBlocked = true;
      } else {
        return null;
      }
    } catch { /* direct failed */ }
  }

  // Try through proxy pool
  if (proxyPool.size === 0) return null;

  try {
    const resp = await proxyPool.proxyFetch(url, {
      headers: {
        Accept: "application/json",
        Referer: NSE_BASE,
      },
      timeoutMs: 8000,
    });
    if (resp.ok) {
      console.log(`[NSE] Fetched via proxy: ${url.substring(0, 60)}`);
      return resp.json();
    }
    return null;
  } catch {
    return null;
  }
}

// --------------- Pre-warm crumb on import ---------------
refreshYahooCrumb().catch(() => {});

// --------------- Router factory ---------------
const MAX_SSE_CLIENTS = 50;
let activeSSEClients = 0;

export function createMarketRouter(): Router {
  const router = Router();
  const cache = new SimpleCache();

  // GET /indices — try NSE first, fallback to Yahoo
  router.get("/indices", async (_req: Request, res: Response) => {
    try {
      const CACHE_KEY = "indices";
      const cached = cache.get(CACHE_KEY, 30_000);
      if (cached) return res.json(cached);

      const indexNames = ["NIFTY 50", "NIFTY BANK", "NIFTY NEXT 50", "NIFTY IT", "NIFTY FINANCIAL SERVICES"];

      // Try NSE first
      const nseData = await tryFetchNSE(`${NSE_BASE}/api/allIndices`);
      if (nseData?.data) {
        const filtered = nseData.data
          .filter((idx: any) => indexNames.includes(idx.index))
          .map((idx: any) => ({
            name: idx.index,
            last: idx.last,
            change: idx.variation,
            changePercent: idx.percentChange,
            open: idx.open,
            high: idx.high,
            low: idx.low,
            previousClose: idx.previousClose,
          }));
        if (filtered.length > 0) {
          cache.set(CACHE_KEY, filtered);
          return res.json(filtered);
        }
      }

      // Fallback: Yahoo Finance
      const yahooSymbols = indexNames.map(toYahooSymbol);
      const results = [];
      for (const [i, ys] of yahooSymbols.entries()) {
        try {
          const data = await fetchYahoo(
            `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ys)}?interval=1d&range=1d`
          );
          const meta = data?.chart?.result?.[0]?.meta;
          if (meta) {
            const prev = meta.chartPreviousClose ?? meta.previousClose ?? 0;
            const last = meta.regularMarketPrice ?? 0;
            results.push({
              name: indexNames[i],
              last,
              change: +(last - prev).toFixed(2),
              changePercent: prev ? +((last - prev) / prev * 100).toFixed(2) : 0,
              open: meta.regularMarketOpen ?? 0,
              high: meta.regularMarketDayHigh ?? 0,
              low: meta.regularMarketDayLow ?? 0,
              previousClose: prev,
            });
          }
        } catch { /* skip */ }
      }
      cache.set(CACHE_KEY, results);
      res.json(results);
    } catch (err: any) {
      console.error(`[Market/indices] ${err.message}`);
      res.status(502).json({ error: "Service temporarily unavailable" });
    }
  });

  // GET /quote/:symbol — Yahoo Finance primary
  router.get("/quote/:symbol", async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      if (!validateSymbol(symbol)) { res.status(400).json({ error: "Invalid symbol" }); return; }
      const CACHE_KEY = `quote:${symbol}`;
      const cached = cache.get(CACHE_KEY, 30_000);
      if (cached) return res.json(cached);

      const ys = toYahooSymbol(symbol);
      const data = await fetchYahoo(
        `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ys)}?interval=1d&range=5d`
      );
      const meta = data?.chart?.result?.[0]?.meta;
      if (!meta) throw new Error("No data from Yahoo");

      const prev = meta.chartPreviousClose ?? meta.previousClose ?? 0;
      const last = meta.regularMarketPrice ?? 0;

      const result = {
        symbol,
        companyName: meta.longName ?? meta.shortName ?? "",
        ltp: last,
        change: +(last - prev).toFixed(2),
        changePercent: prev ? +((last - prev) / prev * 100).toFixed(2) : 0,
        open: meta.regularMarketOpen ?? 0,
        high: meta.regularMarketDayHigh ?? 0,
        low: meta.regularMarketDayLow ?? 0,
        previousClose: prev,
        volume: meta.regularMarketVolume ?? 0,
      };

      cache.set(CACHE_KEY, result);
      res.json(result);
    } catch (err: any) {
      console.error(`[Market/quote] ${err.message}`);
      res.status(502).json({ error: "Service temporarily unavailable" });
    }
  });

  // GET /quote-fast/:symbol — fast quote from v8 only (no crumb, ~200ms)
  router.get("/quote-fast/:symbol", async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      if (!validateSymbol(symbol)) { res.status(400).json({ error: "Invalid symbol" }); return; }
      const CACHE_KEY = `quote-fast:${symbol}`;
      const cached = cache.get(CACHE_KEY, 10_000);
      if (cached) return res.json(cached);

      const ys = toYahooSymbol(symbol);
      const data = await fetchYahoo(
        `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ys)}?interval=1d&range=5d`
      );
      const chartResult = data?.chart?.result?.[0];
      const meta = chartResult?.meta;
      if (!meta) throw new Error("No data");

      const prev = meta.chartPreviousClose ?? meta.previousClose ?? 0;
      const last = meta.regularMarketPrice ?? 0;
      const opens = chartResult?.indicators?.quote?.[0]?.open ?? [];
      const todayOpen = opens.length > 0 ? opens[opens.length - 1] : 0;

      const result = {
        symbol,
        companyName: meta.longName ?? meta.shortName ?? "",
        ltp: last,
        change: +(last - prev).toFixed(2),
        changePercent: prev ? +((last - prev) / prev * 100).toFixed(2) : 0,
        open: todayOpen,
        high: meta.regularMarketDayHigh ?? 0,
        low: meta.regularMarketDayLow ?? 0,
        previousClose: prev,
        volume: meta.regularMarketVolume ?? 0,
        weekHigh52: meta.fiftyTwoWeekHigh ?? 0,
        weekLow52: meta.fiftyTwoWeekLow ?? 0,
      };

      cache.set(CACHE_KEY, result);
      res.json(result);
    } catch (err: any) {
      console.error(`[Market/quote-fast] ${err.message}`);
      res.status(502).json({ error: "Service temporarily unavailable" });
    }
  });

  // GET /fundamentals/:symbol — v10 data (PE, EPS, etc)
  router.get("/fundamentals/:symbol", async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      if (!validateSymbol(symbol)) { res.status(400).json({ error: "Invalid symbol" }); return; }
      const CACHE_KEY = `fundamentals:${symbol}`;
      const cached = cache.get(CACHE_KEY, 60_000);
      if (cached) return res.json(cached);

      const ys = toYahooSymbol(symbol);
      const v10Data = await fetchYahooV10(ys, ["price", "summaryDetail", "defaultKeyStatistics"]);
      const v10Result = v10Data?.quoteSummary?.result?.[0];
      if (!v10Result) return res.json({});

      const price = v10Result.price ?? {};
      const detail = v10Result.summaryDetail ?? {};
      const keyStats = v10Result.defaultKeyStatistics ?? {};

      const result = {
        industry: price.industry ?? "",
        marketCap: price.marketCap?.raw ?? 0,
        pe: detail.trailingPE?.raw ?? keyStats.trailingPE?.raw ?? 0,
        forwardPe: detail.forwardPE?.raw ?? keyStats.forwardPE?.raw ?? 0,
        pb: detail.priceToBook?.raw ?? keyStats.priceToBook?.raw ?? 0,
        eps: keyStats.trailingEps?.raw ?? 0,
        bookValue: keyStats.bookValue?.raw ?? 0,
        dividendYield: detail.dividendYield?.raw ? +(detail.dividendYield.raw * 100).toFixed(2) : 0,
        beta: detail.beta?.raw ?? keyStats.beta?.raw ?? 0,
        roe: keyStats.returnOnEquity?.raw ? +(keyStats.returnOnEquity.raw * 100).toFixed(2) : 0,
        debtToEquity: keyStats.debtToEquity?.raw ?? 0,
        // Bid/Ask from Yahoo
        bid: price.bid?.raw ?? 0,
        ask: price.ask?.raw ?? 0,
        bidSize: price.bidSize?.raw ?? 0,
        askSize: price.askSize?.raw ?? 0,
        avgVolume: detail.averageVolume?.raw ?? 0,
        avgVolume10d: detail.averageDailyVolume10Day?.raw ?? 0,
      };

      cache.set(CACHE_KEY, result);
      res.json(result);
    } catch (err: any) {
      console.error(`[Market/fundamentals] ${err.message}`);
      res.json({});
    }
  });

  // GET /chart-stream/:symbol — SSE for live chart updates
  router.get("/chart-stream/:symbol", (req: Request, res: Response) => {
    const symbol = req.params.symbol.toUpperCase();
    if (!validateSymbol(symbol)) { res.status(400).json({ error: "Invalid symbol" }); return; }
    const interval = (req.query.interval as string) || "1m";
    if (!VALID_INTERVALS.includes(interval)) { res.status(400).json({ error: "Invalid interval" }); return; }
    if (activeSSEClients >= MAX_SSE_CLIENTS) { res.status(429).json({ error: "Too many connections" }); return; }
    activeSSEClients++;
    const ys = toYahooSymbol(symbol);

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("data: {\"type\":\"connected\"}\n\n");

    let lastTimestamp = 0;

    const poll = async () => {
      try {
        const data = await fetchYahoo(
          `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ys)}?interval=${interval}&range=1d`
        );
        const result = data?.chart?.result?.[0];
        if (!result) return;

        const timestamps = result.timestamp ?? [];
        const quote = result.indicators?.quote?.[0] ?? {};
        const meta = result.meta ?? {};

        // Send only new candles
        const newCandles = [];
        for (let i = 0; i < timestamps.length; i++) {
          if (timestamps[i] > lastTimestamp && quote.open?.[i] && quote.close?.[i]) {
            newCandles.push({
              time: timestamps[i],
              open: quote.open[i],
              high: quote.high[i],
              low: quote.low[i],
              close: quote.close[i],
              volume: quote.volume?.[i] ?? 0,
            });
          }
        }

        if (newCandles.length > 0) {
          lastTimestamp = timestamps[timestamps.length - 1];
          res.write(`data: ${JSON.stringify({ type: "candles", data: newCandles, ltp: meta.regularMarketPrice })}\n\n`);
        }
      } catch { /* skip */ }
    };

    // Poll immediately then every 5 seconds
    poll();
    const timer = setInterval(poll, 5000);

    req.on("close", () => {
      clearInterval(timer);
      activeSSEClients--;
    });
  });

  // GET /quote-full/:symbol — Yahoo Finance + NSE fallback for extra data
  router.get("/quote-full/:symbol", async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      if (!validateSymbol(symbol)) { res.status(400).json({ error: "Invalid symbol" }); return; }
      const CACHE_KEY = `quote-full:${symbol}`;
      const cached = cache.get(CACHE_KEY, 15_000);
      if (cached) return res.json(cached);

      const ys = toYahooSymbol(symbol);

      // Fetch v8 chart + v10 summary in parallel
      const [chartResp, v10Data] = await Promise.all([
        fetchYahoo(
          `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ys)}?interval=1d&range=1y`
        ),
        fetchYahooV10(ys, ["price", "summaryDetail", "defaultKeyStatistics"]),
      ]);

      const chartData = chartResp?.chart?.result?.[0];
      if (!chartData?.meta) throw new Error("No data from Yahoo");

      const meta = chartData.meta;
      const v10Result = v10Data?.quoteSummary?.result?.[0];
      const price = v10Result?.price ?? {};
      const detail = v10Result?.summaryDetail ?? {};
      const keyStats = v10Result?.defaultKeyStatistics ?? {};

      const prev = meta.chartPreviousClose ?? meta.previousClose ?? 0;
      const last = meta.regularMarketPrice ?? 0;

      const result = {
        symbol,
        companyName: price.longName ?? meta.longName ?? meta.shortName ?? "",
        industry: price.industry ?? "",
        isin: "",
        ltp: last,
        change: +(last - prev).toFixed(2),
        changePercent: prev ? +((last - prev) / prev * 100).toFixed(2) : 0,
        open: 0,
        high: meta.regularMarketDayHigh ?? 0,
        low: meta.regularMarketDayLow ?? 0,
        previousClose: prev,
        close: last,
        vwap: 0,
        volume: meta.regularMarketVolume ?? 0,
        deliveryQuantity: 0,
        deliveryPercent: 0,
        weekHigh52: meta.fiftyTwoWeekHigh ?? detail.fiftyTwoWeekHigh?.raw ?? 0,
        weekLow52: meta.fiftyTwoWeekLow ?? detail.fiftyTwoWeekLow?.raw ?? 0,
        upperBand: 0,
        lowerBand: 0,
        faceValue: 0,
        totalBuyQuantity: 0,
        totalSellQuantity: 0,
        totalTradedVolume: meta.regularMarketVolume ?? 0,
        totalTradedValue: 0,
        bid: [] as { price: number; quantity: number }[],
        ask: [] as { price: number; quantity: number }[],
        // v10 enriched data
        marketCap: price.marketCap?.raw ?? 0,
        pe: detail.trailingPE?.raw ?? keyStats.trailingPE?.raw ?? 0,
        forwardPe: detail.forwardPE?.raw ?? keyStats.forwardPE?.raw ?? 0,
        pb: detail.priceToBook?.raw ?? keyStats.priceToBook?.raw ?? 0,
        dividendYield: detail.dividendYield?.raw ? +(detail.dividendYield.raw * 100).toFixed(2) : 0,
        beta: detail.beta?.raw ?? keyStats.beta?.raw ?? 0,
        eps: keyStats.trailingEps?.raw ?? 0,
        bookValue: keyStats.bookValue?.raw ?? 0,
        roe: keyStats.returnOnEquity?.raw ? +(keyStats.returnOnEquity.raw * 100).toFixed(2) : 0,
        debtToEquity: keyStats.debtToEquity?.raw ?? 0,
        promoterHolding: keyStats.heldPercentInsiders?.raw ? +(keyStats.heldPercentInsiders.raw * 100).toFixed(2) : 0,
      };

      // Fix open from today's OHLC data
      const opens = chartData.indicators?.quote?.[0]?.open ?? [];
      if (opens.length > 0) {
        result.open = opens[opens.length - 1] ?? result.open;
      }

      // Try NSE for order book data (best effort)
      const nseData = await tryFetchNSE(
        `${NSE_BASE}/api/quote-equity?symbol=${encodeURIComponent(symbol)}`
      );
      if (nseData) {
        const priceInfo = nseData.priceInfo ?? {};
        const secInfo = nseData.securityInfo ?? {};
        const secWise = nseData.securityWiseDP ?? {};
        const tradeInfo = nseData.marketDeptOrderBook ?? {};

        result.vwap = priceInfo.vwap || result.vwap;
        result.upperBand = priceInfo.upperBand || result.upperBand;
        result.lowerBand = priceInfo.lowerBand || result.lowerBand;
        result.faceValue = secInfo.faceValue || result.faceValue;
        result.deliveryQuantity = secWise.deliveryQuantity || 0;
        result.deliveryPercent = secWise.deliveryToTradedQuantity || 0;

        const td = tradeInfo.tradeInfo ?? {};
        result.totalBuyQuantity = td.totalBuyQuantity || 0;
        result.totalSellQuantity = td.totalSellQuantity || 0;

        result.bid = (tradeInfo.bid ?? []).map((b: any) => ({ price: b.price, quantity: b.quantity }));
        result.ask = (tradeInfo.ask ?? []).map((a: any) => ({ price: a.price, quantity: a.quantity }));
      }

      cache.set(CACHE_KEY, result);
      res.json(result);
    } catch (err: any) {
      console.error(`[Market/quote-full] ${err.message}`);
      res.status(502).json({ error: "Service temporarily unavailable" });
    }
  });

  // GET /chart/:symbol — OHLC data for lightweight-charts
  router.get("/chart/:symbol", async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      if (!validateSymbol(symbol)) { res.status(400).json({ error: "Invalid symbol" }); return; }
      const interval = (req.query.interval as string) || "15m";
      const range = (req.query.range as string) || "1d";
      if (!VALID_INTERVALS.includes(interval)) { res.status(400).json({ error: "Invalid interval" }); return; }
      if (!VALID_RANGES.includes(range)) { res.status(400).json({ error: "Invalid range" }); return; }

      const CACHE_KEY = `chart:${symbol}:${interval}:${range}`;
      const cacheAge = interval === "1m" ? 30_000 : interval === "5m" ? 60_000 : 120_000;
      const cached = cache.get(CACHE_KEY, cacheAge);
      if (cached) return res.json(cached);

      const ys = toYahooSymbol(symbol);
      const data = await fetchYahoo(
        `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ys)}?interval=${interval}&range=${range}`
      );

      const result = data?.chart?.result?.[0];
      if (!result) throw new Error("No chart data");

      const timestamps = result.timestamp ?? [];
      const quote = result.indicators?.quote?.[0] ?? {};

      const candles = timestamps.map((ts: number, i: number) => ({
        time: ts,
        open: quote.open?.[i] ?? 0,
        high: quote.high?.[i] ?? 0,
        low: quote.low?.[i] ?? 0,
        close: quote.close?.[i] ?? 0,
        volume: quote.volume?.[i] ?? 0,
      })).filter((c: any) => c.open && c.high && c.low && c.close);

      cache.set(CACHE_KEY, candles);
      res.json(candles);
    } catch (err: any) {
      console.error(`[Market/chart] ${err.message}`);
      res.status(502).json({ error: "Service temporarily unavailable" });
    }
  });

  // GET /status — try NSE, fallback to simple response
  router.get("/status", async (_req: Request, res: Response) => {
    try {
      const CACHE_KEY = "status";
      const cached = cache.get(CACHE_KEY, 60_000);
      if (cached) return res.json(cached);

      const nseData = await tryFetchNSE(`${NSE_BASE}/api/marketStatus`);
      if (nseData?.marketState) {
        const result = nseData.marketState.map((m: any) => ({
          market: m.market,
          status: m.marketStatus,
          tradeDate: m.tradeDate,
          index: m.index,
          last: m.last,
          variation: m.variation,
          percentChange: m.percentChange,
        }));
        cache.set(CACHE_KEY, result);
        return res.json(result);
      }

      // Fallback: infer from time
      const now = new Date();
      const istHour = (now.getUTCHours() + 5) % 24 + (now.getUTCMinutes() + 30 >= 60 ? 1 : 0);
      const istMin = (now.getUTCMinutes() + 30) % 60;
      const dayOfWeek = now.getUTCDay();
      const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
      const isMarketHours = istHour >= 9 && (istHour < 15 || (istHour === 15 && istMin <= 30));
      const isOpen = isWeekday && isMarketHours;

      const result = [{
        market: "Capital Market",
        status: isOpen ? "Open" : "Closed",
        tradeDate: now.toISOString().slice(0, 10),
        index: "NIFTY 50",
        last: 0,
        variation: 0,
        percentChange: 0,
      }];
      cache.set(CACHE_KEY, result);
      res.json(result);
    } catch (err: any) {
      console.error(`[Market/status] ${err.message}`);
      res.status(502).json({ error: "Service temporarily unavailable" });
    }
  });

  // GET /search?q=reliance — stock symbol autocomplete (Yahoo + NSE fallback)
  router.get("/search", async (req: Request, res: Response) => {
    try {
      const q = (req.query.q as string || "").trim();
      if (q.length < 2 || q.length > 50) return res.json([]);
      if (!/^[a-zA-Z0-9\s\-&.()]+$/.test(q)) return res.json([]);

      const cacheKey = `search_${q.toLowerCase()}`;
      const cached = cache.get(cacheKey, 60_000);
      if (cached) return res.json(cached);

      // Try Yahoo autocomplete first (more reliable)
      try {
        const data = await fetchYahoo(
          `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=15&newsCount=0&listsCount=0&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query`
        );
        const quotes = (data?.quotes ?? [])
          .filter((q: any) => q.exchange === "NSI" || q.exchange === "NSE" || q.exchange === "BSE" || (q.symbol?.endsWith(".NS") || q.symbol?.endsWith(".BO")))
          .map((q: any) => ({
            symbol: q.symbol?.replace(".NS", "").replace(".BO", "") ?? "",
            name: q.longname ?? q.shortname ?? "",
            type: "equity",
          }))
          .filter((q: any) => q.symbol);

        // Deduplicate by symbol
        const seen = new Set<string>();
        const unique = quotes.filter((q: any) => {
          if (seen.has(q.symbol)) return false;
          seen.add(q.symbol);
          return true;
        });

        if (unique.length > 0) {
          cache.set(cacheKey, unique);
          return res.json(unique);
        }
      } catch { /* fall through */ }

      // Fallback: NSE autocomplete
      const nseData = await tryFetchNSE(
        `https://www.nseindia.com/api/search/autocomplete?q=${encodeURIComponent(q)}`
      );
      if (nseData?.symbols) {
        const symbols = nseData.symbols
          .filter((s: any) => s.result_sub_type === "equity")
          .map((s: any) => ({
            symbol: s.symbol,
            name: s.symbol_info,
            type: "equity",
          }));
        cache.set(cacheKey, symbols);
        return res.json(symbols);
      }

      res.json([]);
    } catch (error: any) {
      console.error("[MarketProxy] search error:", error.message);
      res.status(500).json({ error: "Search failed" });
    }
  });

  return router;
}
