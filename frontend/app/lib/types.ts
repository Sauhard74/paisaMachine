export interface NewsItemData {
  id: number;
  source: string;
  headline: string;
  url: string;
  summary: string;
  raw_content: string;
  published_at: string;
  ingested_at: string;
  tickers: string[];
  sentiment: "positive" | "negative" | "neutral";
  category: string;
  impact: "high" | "medium" | "low";
  key_figures: string[];
}

export interface IndexData {
  name: string;
  last: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
}

export interface QuoteData {
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
}

export interface MarketStatusData {
  market: string;
  status: string;
  tradeDate: string;
  index: string;
  last: number;
  variation: number;
  percentChange: number;
}

export interface StatsData {
  sentiment_counts: Record<string, number>;
  category_counts: Record<string, number>;
  velocity: { minute: string; count: number }[];
  total_items: number;
}

export type PanelType =
  | "ticker_alerts"
  | "market_pulse"
  | "global_geo"
  | "govt_regulatory"
  | "recent_filings";
