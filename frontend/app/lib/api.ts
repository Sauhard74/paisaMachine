import { NewsItemData, IndexData, QuoteData, MarketStatusData, StatsData } from "./types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

/** Validate stock symbol format */
export function isValidSymbol(s: string): boolean {
  return /^[A-Z0-9&^.\-]{1,20}$/.test(s);
}

/** Validate external URL is safe (http/https only) */
export function isSafeUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

async function safeFetch(url: string): Promise<Response> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res;
}

export async function fetchNews(limit = 1000, beforeId?: number): Promise<NewsItemData[]> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (beforeId) params.set("before", String(beforeId));
  const res = await safeFetch(`${BACKEND_URL}/api/news?${params}`);
  return res.json();
}

export async function fetchStats(): Promise<StatsData> {
  const res = await safeFetch(`${BACKEND_URL}/api/stats`);
  return res.json();
}

export async function fetchIndices(): Promise<IndexData[]> {
  const res = await safeFetch(`${BACKEND_URL}/api/market/indices`);
  return res.json();
}

export async function fetchQuote(symbol: string): Promise<QuoteData> {
  const res = await safeFetch(`${BACKEND_URL}/api/market/quote/${encodeURIComponent(symbol)}`);
  return res.json();
}

export interface FullQuoteData {
  symbol: string;
  companyName: string;
  industry: string;
  isin: string;
  ltp: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  close: number;
  vwap: number;
  volume: number;
  deliveryQuantity: number;
  deliveryPercent: number;
  weekHigh52: number;
  weekLow52: number;
  upperBand: number;
  lowerBand: number;
  faceValue: number;
  totalBuyQuantity: number;
  totalSellQuantity: number;
  totalTradedVolume: number;
  totalTradedValue: number;
  bid: { price: number; quantity: number }[];
  ask: { price: number; quantity: number }[];
  marketCap?: number;
  pe?: number;
  forwardPe?: number;
  pb?: number;
  dividendYield?: number;
  beta?: number;
  eps?: number;
  bookValue?: number;
  roe?: number;
  debtToEquity?: number;
  promoterHolding?: number;
}

export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export async function fetchChartData(symbol: string, interval = "15m", range = "1d"): Promise<CandleData[]> {
  const res = await safeFetch(`${BACKEND_URL}/api/market/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`);
  return res.json();
}

export async function fetchFullQuote(symbol: string): Promise<FullQuoteData> {
  const res = await safeFetch(`${BACKEND_URL}/api/market/quote-full/${encodeURIComponent(symbol)}`);
  return res.json();
}

export interface FastQuoteData {
  symbol: string;
  companyName: string;
  ltp: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  volume: number;
  weekHigh52: number;
  weekLow52: number;
}

export interface FundamentalsData {
  industry?: string;
  marketCap?: number;
  pe?: number;
  forwardPe?: number;
  pb?: number;
  eps?: number;
  bookValue?: number;
  dividendYield?: number;
  beta?: number;
  roe?: number;
  debtToEquity?: number;
  bid?: number;
  ask?: number;
  bidSize?: number;
  askSize?: number;
  avgVolume?: number;
  avgVolume10d?: number;
}

export async function fetchFastQuote(symbol: string): Promise<FastQuoteData> {
  const res = await safeFetch(`${BACKEND_URL}/api/market/quote-fast/${encodeURIComponent(symbol)}`);
  return res.json();
}

export async function fetchFundamentals(symbol: string): Promise<FundamentalsData> {
  const res = await safeFetch(`${BACKEND_URL}/api/market/fundamentals/${encodeURIComponent(symbol)}`);
  return res.json();
}

export function createChartStream(
  symbol: string,
  interval: string,
  onCandles: (candles: CandleData[], ltp: number) => void,
  onConnect: () => void,
): EventSource {
  const es = new EventSource(`${BACKEND_URL}/api/market/chart-stream/${encodeURIComponent(symbol)}?interval=${interval}`);
  es.onopen = () => onConnect();
  es.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "connected") return;
      if (data.type === "candles") {
        onCandles(data.data, data.ltp);
      }
    } catch { /* ignore */ }
  };
  return es;
}

export async function fetchNewsByTicker(ticker: string, limit = 200): Promise<NewsItemData[]> {
  const params = new URLSearchParams({ limit: String(limit), ticker });
  const res = await safeFetch(`${BACKEND_URL}/api/news?${params}`);
  return res.json();
}

export async function fetchMarketStatus(): Promise<MarketStatusData[]> {
  const res = await safeFetch(`${BACKEND_URL}/api/market/status`);
  return res.json();
}

export interface StockSearchResult {
  symbol: string;
  name: string;
  type: string;
}

export async function searchStocks(query: string): Promise<StockSearchResult[]> {
  if (query.length < 2 || query.length > 50) return [];
  const res = await safeFetch(`${BACKEND_URL}/api/market/search?q=${encodeURIComponent(query)}`);
  return res.json();
}

export function createSSEConnection(
  onMessage: (item: NewsItemData) => void,
  onConnect: () => void,
  onError: () => void
): EventSource {
  const es = new EventSource(`${BACKEND_URL}/api/stream`);

  es.onopen = () => onConnect();

  es.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "connected") return;
      onMessage(data);
    } catch {
      // ignore
    }
  };

  es.onerror = () => onError();

  return es;
}
