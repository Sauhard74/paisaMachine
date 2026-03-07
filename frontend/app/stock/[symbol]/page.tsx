"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  fetchFastQuote,
  fetchFundamentals,
  fetchNewsByTicker,
  fetchChartData,
  searchStocks,
  createSSEConnection,
  createChartStream,
  FastQuoteData,
  FundamentalsData,
  StockSearchResult,
  CandleData,
  isValidSymbol,
  isSafeUrl,
} from "../../lib/api";
import type { NewsItemData } from "../../lib/types";
import { Highlight } from "../../components/Highlight";

// ─── Helpers ───
function formatINR(n: number | undefined | null): string {
  if (n == null || isNaN(n)) return "--";
  return n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

function formatIST(dateStr: string): { time: string; date: string } {
  const dt = new Date(
    dateStr.endsWith("Z") || dateStr.includes("+") ? dateStr : dateStr + "Z"
  );
  const istOffset = 5.5 * 60 * 60 * 1000;
  const ist = new Date(dt.getTime() + istOffset);
  return {
    time: ist.toISOString().slice(11, 16),
    date: ist.toISOString().slice(5, 10).replace("-", "/"),
  };
}

function formatVolume(n: number | undefined | null): string {
  if (n == null || isNaN(n)) return "--";
  if (n >= 1e7) return (n / 1e7).toFixed(2) + " Cr";
  if (n >= 1e5) return (n / 1e5).toFixed(2) + " L";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + " K";
  return n.toString();
}

// ─── Interval/Range config ───
const INTERVAL_OPTIONS = [
  { label: "1m", interval: "1m", range: "1d" },
  { label: "5m", interval: "5m", range: "5d" },
  { label: "15m", interval: "15m", range: "5d" },
  { label: "1h", interval: "1h", range: "1mo" },
  { label: "1D", interval: "1d", range: "6mo" },
  { label: "1W", interval: "1wk", range: "1y" },
];

// ─── Candlestick Chart ───
function StockChart({ symbol }: { symbol: string }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const volumeRef = useRef<any>(null);
  const [activeInterval, setActiveInterval] = useState(2); // default 15m

  const loadChart = useCallback(async (idx: number) => {
    const opt = INTERVAL_OPTIONS[idx];
    try {
      const candles = await fetchChartData(symbol, opt.interval, opt.range);
      if (!candles || !Array.isArray(candles) || candles.length === 0) return;

      // Lazy-load lightweight-charts
      const { createChart, CandlestickSeries, HistogramSeries } = await import("lightweight-charts");

      if (!chartContainerRef.current) return;

      // Create chart only once
      if (!chartRef.current) {
        const chart = createChart(chartContainerRef.current, {
          layout: {
            background: { color: "#0d1117" },
            textColor: "#6b7280",
            fontSize: 11,
          },
          grid: {
            vertLines: { color: "#1b2b1b40" },
            horzLines: { color: "#1b2b1b40" },
          },
          crosshair: {
            vertLine: { color: "#10b981", width: 1, style: 2 },
            horzLine: { color: "#10b981", width: 1, style: 2 },
          },
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
            borderColor: "#1b2b1b",
          },
          rightPriceScale: {
            borderColor: "#1b2b1b",
          },
        });

        const candleSeries = chart.addSeries(CandlestickSeries, {
          upColor: "#10b981",
          downColor: "#ef4444",
          borderUpColor: "#10b981",
          borderDownColor: "#ef4444",
          wickUpColor: "#10b981",
          wickDownColor: "#ef4444",
        });

        const volumeSeries = chart.addSeries(HistogramSeries, {
          priceFormat: { type: "volume" },
          priceScaleId: "volume",
        });

        chart.priceScale("volume").applyOptions({
          scaleMargins: { top: 0.8, bottom: 0 },
        });

        chartRef.current = chart;
        seriesRef.current = candleSeries;
        volumeRef.current = volumeSeries;

        // Auto-resize
        const ro = new ResizeObserver(() => {
          if (chartContainerRef.current) {
            chart.applyOptions({
              width: chartContainerRef.current.clientWidth,
              height: chartContainerRef.current.clientHeight,
            });
          }
        });
        ro.observe(chartContainerRef.current);
      }

      // Set data
      const formatted = candles.map((c: CandleData) => ({
        time: c.time as any,
        open: c.open,
        high: c.high,
        low: c.low,
        close: c.close,
      }));

      const volumeData = candles.map((c: CandleData) => ({
        time: c.time as any,
        value: c.volume,
        color: c.close >= c.open ? "#10b98140" : "#ef444440",
      }));

      seriesRef.current.setData(formatted);
      volumeRef.current.setData(volumeData);
      chartRef.current.timeScale().fitContent();
    } catch (err) {
      console.error("Chart load error:", err);
    }
  }, [symbol]);

  useEffect(() => {
    loadChart(activeInterval);

    // For intraday: use SSE stream for live candle updates
    const opt = INTERVAL_OPTIONS[activeInterval];
    const isIntraday = ["1m", "5m", "15m"].includes(opt.interval);
    if (isIntraday) {
      const es = createChartStream(symbol, opt.interval, (newCandles) => {
        if (!seriesRef.current || !volumeRef.current) return;
        for (const c of newCandles) {
          seriesRef.current.update({
            time: c.time as any,
            open: c.open,
            high: c.high,
            low: c.low,
            close: c.close,
          });
          volumeRef.current.update({
            time: c.time as any,
            value: c.volume,
            color: c.close >= c.open ? "#10b98140" : "#ef444440",
          });
        }
      }, () => {});
      return () => es.close();
    }
  }, [activeInterval, loadChart, symbol]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        seriesRef.current = null;
        volumeRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-1 px-3 py-1.5 border-b border-[#1b2b1b]">
        {INTERVAL_OPTIONS.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => {
              setActiveInterval(i);
              // Reset chart for new data
              if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
                seriesRef.current = null;
                volumeRef.current = null;
              }
              loadChart(i);
            }}
            className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
              activeInterval === i
                ? "bg-[#10b981]/20 text-[#10b981]"
                : "text-[#374151] hover:text-[#6b7280]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div ref={chartContainerRef} className="flex-1" />
    </div>
  );
}

// ─── Order Book ───
function OrderBook({
  bid,
  ask,
  totalBuy,
  totalSell,
}: {
  bid: { price: number; quantity: number }[];
  ask: { price: number; quantity: number }[];
  totalBuy: number;
  totalSell: number;
}) {
  const maxQty = Math.max(
    ...bid.map((b) => b.quantity),
    ...ask.map((a) => a.quantity),
    1
  );

  return (
    <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3">
      <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider font-bold mb-2">
        Order Book (Top 5)
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {/* Bid side */}
        <div>
          <div className="flex justify-between text-[9px] text-[#374151] uppercase mb-1 px-1">
            <span>Qty</span>
            <span>Bid</span>
          </div>
          {bid.map((b, i) => (
            <div key={i} className="relative flex justify-between text-[11px] py-0.5 px-1">
              <div
                className="absolute inset-0 bg-[#10b981]/10 rounded-sm"
                style={{ width: `${(b.quantity / maxQty) * 100}%` }}
              />
              <span className="relative text-[#e5e7eb] tabular-nums">
                {formatVolume(b.quantity)}
              </span>
              <span className="relative text-[#10b981] font-bold tabular-nums">
                {formatINR(b.price)}
              </span>
            </div>
          ))}
          <div className="text-[10px] text-[#10b981] font-bold mt-1 px-1">
            Total Buy: {formatVolume(totalBuy)}
          </div>
        </div>
        {/* Ask side */}
        <div>
          <div className="flex justify-between text-[9px] text-[#374151] uppercase mb-1 px-1">
            <span>Ask</span>
            <span>Qty</span>
          </div>
          {ask.map((a, i) => (
            <div key={i} className="relative flex justify-between text-[11px] py-0.5 px-1">
              <div
                className="absolute inset-0 right-0 bg-[#ef4444]/10 rounded-sm ml-auto"
                style={{ width: `${(a.quantity / maxQty) * 100}%` }}
              />
              <span className="relative text-[#ef4444] font-bold tabular-nums">
                {formatINR(a.price)}
              </span>
              <span className="relative text-[#e5e7eb] tabular-nums">
                {formatVolume(a.quantity)}
              </span>
            </div>
          ))}
          <div className="text-[10px] text-[#ef4444] font-bold mt-1 px-1 text-right">
            Total Sell: {formatVolume(totalSell)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Key Stats Grid ───
function KeyStats({ quote, fundamentals }: { quote: FastQuoteData; fundamentals: FundamentalsData | null }) {
  const f = fundamentals;
  const stats = [
    { label: "Open", value: formatINR(quote.open) },
    { label: "Prev Close", value: formatINR(quote.previousClose) },
    { label: "Day High", value: formatINR(quote.high) },
    { label: "Day Low", value: formatINR(quote.low) },
    { label: "52W High", value: formatINR(quote.weekHigh52) },
    { label: "52W Low", value: formatINR(quote.weekLow52) },
    { label: "Volume", value: formatVolume(quote.volume) },
    { label: "Market Cap", value: f?.marketCap ? `₹${formatVolume(f.marketCap)}` : "..." },
    { label: "P/E (TTM)", value: f?.pe ? f.pe.toFixed(2) : "..." },
    { label: "P/E (Fwd)", value: f?.forwardPe ? f.forwardPe.toFixed(2) : "..." },
    { label: "P/B Ratio", value: f?.pb ? f.pb.toFixed(2) : "..." },
    { label: "EPS", value: f?.eps ? `₹${f.eps.toFixed(2)}` : "..." },
    { label: "Book Value", value: f?.bookValue ? `₹${f.bookValue.toFixed(2)}` : "..." },
    { label: "Div Yield", value: f?.dividendYield ? `${f.dividendYield}%` : "..." },
    { label: "Beta", value: f?.beta ? f.beta.toFixed(2) : "..." },
    { label: "ROE", value: f?.roe ? `${f.roe}%` : "..." },
    { label: "D/E Ratio", value: f?.debtToEquity ? f.debtToEquity.toFixed(2) : "..." },
  ];

  return (
    <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3">
      <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider font-bold mb-2">
        Key Statistics
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {stats.map((s) => (
          <div key={s.label} className="flex justify-between text-[11px]">
            <span className="text-[#374151]">{s.label}</span>
            <span className="text-[#e5e7eb] font-bold tabular-nums">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── News Item Row ───
function StockNewsRow({ item }: { item: NewsItemData }) {
  const [expanded, setExpanded] = useState(false);
  const published = formatIST(item.published_at);

  const sentBg =
    item.sentiment === "positive"
      ? "bg-[#10b981]"
      : item.sentiment === "negative"
        ? "bg-[#ef4444]"
        : "bg-[#6b7280]";
  const sentColor =
    item.sentiment === "positive"
      ? "text-[#10b981]"
      : item.sentiment === "negative"
        ? "text-[#ef4444]"
        : "text-[#6b7280]";

  return (
    <div
      className={`px-3 py-2.5 border-b border-[#1b2b1b]/50 cursor-pointer hover:bg-[#1b2b1b]/30 transition-colors ${
        item.impact === "high" ? "border-l-2 border-l-[#f59e0b]" : ""
      } ${expanded ? "bg-[#0a1a0a]" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[11px] font-bold text-[#e5e7eb] tabular-nums">
          {published.time}
        </span>
        <span className="text-[9px] text-[#374151]">{published.date}</span>
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${sentBg}`} />
        {item.impact === "high" && (
          <span className="text-[8px] text-[#f59e0b] font-bold uppercase bg-[#f59e0b]/10 px-1.5 py-0.5 rounded shrink-0">
            HIGH
          </span>
        )}
        <span className={`text-[9px] font-bold ml-auto ${sentColor}`}>
          {item.sentiment}
        </span>
      </div>
      <div className="text-[11px] text-[#e5e7eb] leading-snug">
        <Highlight text={item.summary || item.headline} keyFigures={item.key_figures} />
      </div>
      {expanded && (
        <div className="mt-3 bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3 space-y-2">
          <div className="text-[11px] text-[#e5e7eb]">{item.headline}</div>
          {item.key_figures.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.key_figures.map((f, i) => (
                <span key={i} className="text-[10px] text-[#f59e0b] font-bold bg-[#f59e0b]/10 px-1.5 py-0.5 rounded">
                  {f}
                </span>
              ))}
            </div>
          )}
          {item.raw_content && (
            <div className="text-[10px] text-[#6b7280] max-h-40 overflow-y-auto whitespace-pre-wrap">
              {item.raw_content}
            </div>
          )}
          {isSafeUrl(item.url) && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[10px] text-[#10b981] hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Open source &rarr;
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Search bar ───
function StockSearch({ onSelect }: { onSelect: (symbol: string) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const [show, setShow] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    if (query.length < 2) {
      setResults([]);
      setShow(false);
      return;
    }
    timeout.current = setTimeout(async () => {
      try {
        const r = await searchStocks(query);
        setResults(r);
        setShow(true);
      } catch {
        setResults([]);
      }
    }, 300);
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setShow(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center gap-2 bg-[#0d1117] border border-[#1b2b1b] rounded-lg px-3 py-2">
        <svg className="w-4 h-4 text-[#374151] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (results.length > 0) {
                onSelect(results[0].symbol);
              } else if (query.trim().length >= 1) {
                onSelect(query.trim().toUpperCase());
              }
              setQuery("");
              setShow(false);
            }
          }}
          onFocus={() => results.length > 0 && setShow(true)}
          placeholder="Search any stock... (e.g. Reliance, TCS, Infosys)"
          className="flex-1 bg-transparent text-sm text-[#e5e7eb] placeholder-[#374151] outline-none"
        />
        <button
          onClick={() => {
            if (results.length > 0) {
              onSelect(results[0].symbol);
            } else if (query.trim().length >= 1) {
              onSelect(query.trim().toUpperCase());
            }
            setQuery("");
            setShow(false);
          }}
          className="text-[#374151] hover:text-[#10b981] transition-colors shrink-0"
          title="Search"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      {show && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-[#0d1117] border border-[#1b2b1b] rounded-b-lg max-h-64 overflow-y-auto shadow-xl">
          {results.map((r) => (
            <button
              key={r.symbol}
              onClick={() => {
                onSelect(r.symbol);
                setQuery("");
                setShow(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-[#1b2b1b]/50 transition-colors flex items-center justify-between"
            >
              <span className="text-sm text-[#eab308] font-bold">{r.symbol}</span>
              <span className="text-xs text-[#6b7280] truncate ml-2">{r.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════ MAIN PAGE ═══════════════════════
export default function StockDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawSymbol = (params.symbol as string).toUpperCase();
  const symbol = isValidSymbol(rawSymbol) ? rawSymbol : "";

  const [quote, setQuote] = useState<FastQuoteData | null>(null);
  const [fundamentals, setFundamentals] = useState<FundamentalsData | null>(null);
  const [news, setNews] = useState<NewsItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sentimentFilter, setSentimentFilter] = useState<"all" | "positive" | "negative">("all");
  const [error, setError] = useState<string | null>(symbol ? null : "Invalid stock symbol");

  // Load fast quote + news instantly, fundamentals lazy
  useEffect(() => {
    setLoading(true);
    setError(null);
    setQuote(null);
    setFundamentals(null);
    setNews([]);

    // Fast quote (~200ms)
    fetchFastQuote(symbol)
      .then((q) => {
        if (q?.symbol) setQuote(q);
        else setError(`Could not load data for ${symbol}.`);
      })
      .catch(() => setError(`Could not load data for ${symbol}.`))
      .finally(() => setLoading(false));

    // News (instant from DB)
    fetchNewsByTicker(symbol)
      .then((n) => { if (Array.isArray(n)) setNews(n); })
      .catch(() => {});

    // Fundamentals (slower, loads in background)
    fetchFundamentals(symbol)
      .then((f) => setFundamentals(f))
      .catch(() => {});
  }, [symbol]);

  // Auto-refresh fast quote every 10s
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const q = await fetchFastQuote(symbol);
        if (q?.symbol) setQuote(q);
      } catch { /* skip */ }
    }, 10_000);
    return () => clearInterval(interval);
  }, [symbol]);

  // Live news via SSE
  useEffect(() => {
    const es = createSSEConnection(
      (item) => {
        if (item.tickers.some((t) => t.toUpperCase() === symbol)) {
          setNews((prev) => [item, ...prev]);
        }
      },
      () => {},
      () => {}
    );
    return () => es.close();
  }, [symbol]);

  const isPositive = (quote?.changePercent ?? 0) >= 0;
  const changeColor = isPositive ? "text-[#10b981]" : "text-[#ef4444]";
  const arrow = isPositive ? "\u25B2" : "\u25BC";

  const filteredNews =
    sentimentFilter === "all"
      ? news
      : news.filter((n) => n.sentiment === sentimentFilter);

  return (
    <div className="min-h-screen bg-[#080c08] flex flex-col">
      {/* ─── Top Bar ─── */}
      <div className="border-b border-[#1b2b1b] px-4 py-2 flex items-center gap-4">
        <button
          onClick={() => router.push("/")}
          className="text-[#6b7280] hover:text-[#e5e7eb] transition-colors text-sm"
        >
          &larr; Dashboard
        </button>
        <div className="flex-1 max-w-md">
          <StockSearch onSelect={(s) => { const u = s.toUpperCase(); if (isValidSymbol(u)) router.push(`/stock/${u}`); }} />
        </div>
      </div>

      {loading && !quote ? (
        <div className="flex-1 flex items-center justify-center text-[#374151]">
          <div className="text-center">
            <div className="text-sm">Loading {symbol}...</div>
            <div className="text-[10px] mt-1">Fetching data from NSE</div>
          </div>
        </div>
      ) : error && !quote ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm text-[#ef4444]">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-xs text-[#10b981] border border-[#1b2b1b] px-3 py-1.5 rounded hover:border-[#10b981] transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ─── Stock Header ─── */}
          <div className="px-4 py-3 border-b border-[#1b2b1b]">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-xl font-bold text-[#eab308]">{symbol}</h1>
              <span className="text-sm text-[#6b7280]">
                {quote?.companyName}
              </span>
              {fundamentals?.industry && (
                <span className="text-[10px] text-[#374151] bg-[#1b2b1b] px-2 py-0.5 rounded">
                  {fundamentals.industry}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-2xl font-bold text-[#e5e7eb] tabular-nums">
                ₹{formatINR(quote?.ltp)}
              </span>
              <span className={`text-lg font-bold ${changeColor} tabular-nums`}>
                {arrow} {Math.abs(quote?.change ?? 0).toFixed(2)} ({Math.abs(quote?.changePercent ?? 0).toFixed(2)}%)
              </span>
            </div>
          </div>

          {/* ─── Main Content ─── */}
          <div className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left: Chart + News (2 cols on lg) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Candlestick Chart */}
              <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] overflow-hidden" style={{ height: "480px" }}>
                <StockChart symbol={symbol} />
              </div>

              {/* News Feed */}
              <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] flex flex-col" style={{ maxHeight: "500px" }}>
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#1b2b1b]">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider font-bold">
                      News for {symbol}
                    </h3>
                    <div className="flex gap-0.5">
                      {(["all", "positive", "negative"] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setSentimentFilter(f)}
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded transition-colors ${
                            sentimentFilter === f
                              ? f === "positive"
                                ? "bg-[#10b981]/20 text-[#10b981]"
                                : f === "negative"
                                  ? "bg-[#ef4444]/20 text-[#ef4444]"
                                  : "bg-[#1b2b1b] text-[#e5e7eb]"
                              : "text-[#374151] hover:text-[#6b7280]"
                          }`}
                        >
                          {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-[#374151] font-bold">{filteredNews.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {filteredNews.length === 0 ? (
                    <div className="flex items-center justify-center h-20 text-[10px] text-[#374151]">
                      No news for {symbol}
                    </div>
                  ) : (
                    filteredNews.map((item) => (
                      <StockNewsRow key={item.id} item={item} />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="flex flex-col gap-4">
              {/* Key Stats */}
              {quote && <KeyStats quote={quote} fundamentals={fundamentals} />}

              {/* Bid/Ask & Pressure */}
              {fundamentals && (fundamentals.bid || fundamentals.ask) && (fundamentals.bid! > 0 || fundamentals.ask! > 0) && (
                <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3">
                  <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider font-bold mb-2">
                    Bid / Ask
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#10b981] font-bold">Bid: ₹{formatINR(fundamentals.bid)}</span>
                      <span className="text-[#ef4444] font-bold">Ask: ₹{formatINR(fundamentals.ask)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#374151]">
                      <span>Size: {formatVolume(fundamentals.bidSize)}</span>
                      <span>Size: {formatVolume(fundamentals.askSize)}</span>
                    </div>
                    {fundamentals.bidSize && fundamentals.askSize && fundamentals.bidSize > 0 && fundamentals.askSize > 0 && (
                      <div className="mt-1">
                        <div className="text-[9px] text-[#374151] uppercase mb-1">Buy vs Sell Pressure</div>
                        <div className="flex h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#10b981]"
                            style={{ width: `${(fundamentals.bidSize / (fundamentals.bidSize + fundamentals.askSize)) * 100}%` }}
                          />
                          <div className="bg-[#ef4444] flex-1" />
                        </div>
                        <div className="flex justify-between text-[9px] mt-0.5">
                          <span className="text-[#10b981]">
                            {((fundamentals.bidSize / (fundamentals.bidSize + fundamentals.askSize)) * 100).toFixed(1)}% Buy
                          </span>
                          <span className="text-[#ef4444]">
                            {((fundamentals.askSize / (fundamentals.bidSize + fundamentals.askSize)) * 100).toFixed(1)}% Sell
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Trade Summary */}
              {quote && (
                <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3">
                  <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider font-bold mb-2">
                    Trade Summary
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#374151]">Volume</span>
                      <span className="text-[#e5e7eb] font-bold tabular-nums">
                        {formatVolume(quote.volume)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#374151]">Day Range</span>
                      <span className="text-[#e5e7eb] font-bold tabular-nums">
                        {formatINR(quote.low)} - {formatINR(quote.high)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#374151]">52W Range</span>
                      <span className="text-[#e5e7eb] font-bold tabular-nums">
                        {formatINR(quote.weekLow52)} - {formatINR(quote.weekHigh52)}
                      </span>
                    </div>
                    {/* 52W range bar */}
                    {quote.weekHigh52 > 0 && quote.weekLow52 > 0 && (
                      <div className="mt-1">
                        <div className="relative h-1.5 bg-[#1b2b1b] rounded-full">
                          <div
                            className="absolute top-0 h-full w-1 bg-[#10b981] rounded-full"
                            style={{
                              left: `${Math.min(100, Math.max(0, ((quote.ltp - quote.weekLow52) / (quote.weekHigh52 - quote.weekLow52)) * 100))}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
