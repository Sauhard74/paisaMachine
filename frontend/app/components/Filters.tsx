"use client";

export interface FilterState {
  source: string;
  ticker: string;
  category: string;
  sentiment: string;
  impact: string;
  search: string;
}

interface FiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const SOURCES = [
  { value: "", label: "All Sources" },
  { value: "nse_json_api", label: "NSE API" },
  { value: "bse_json_api", label: "BSE API" },
  { value: "zerodha_pulse", label: "Zerodha" },
  { value: "economic_times", label: "Eco Times" },
  { value: "livemint", label: "LiveMint" },
  { value: "ndtv_profit", label: "NDTV" },
  { value: "tradingview", label: "TradingView" },
  { value: "screener", label: "Screener" },
  { value: "twitter_redbox", label: "Redbox" },
  { value: "twitter_nse", label: "NSE Twitter" },
  { value: "twitter_bse", label: "BSE Twitter" },
  { value: "twitter_capmkt", label: "Capital Mkt" },
];

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "corporate_filing", label: "Filing" },
  { value: "earnings", label: "Earnings" },
  { value: "order_win", label: "Order Win" },
  { value: "regulatory", label: "Regulatory" },
  { value: "broker_report", label: "Broker Report" },
  { value: "offer_announcement", label: "Offer" },
  { value: "management_change", label: "Mgmt Change" },
  { value: "sector_news", label: "Sector" },
  { value: "other", label: "Other" },
];

const SENTIMENTS = [
  { value: "", label: "All Sentiment" },
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "neutral", label: "Neutral" },
];

const IMPACTS = [
  { value: "", label: "All Impact" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

function Select({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-900 text-gray-300 border border-gray-700 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:border-blue-500"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Filters({ filters, onChange }: FiltersProps) {
  const update = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-2 bg-gray-950 border-b border-gray-800">
      <Select options={SOURCES} value={filters.source} onChange={(v) => update("source", v)} />
      <Select options={CATEGORIES} value={filters.category} onChange={(v) => update("category", v)} />
      <Select options={SENTIMENTS} value={filters.sentiment} onChange={(v) => update("sentiment", v)} />
      <Select options={IMPACTS} value={filters.impact} onChange={(v) => update("impact", v)} />
      <input
        type="text"
        placeholder="Ticker..."
        value={filters.ticker}
        onChange={(e) => update("ticker", e.target.value.toUpperCase())}
        className="bg-gray-900 text-gray-300 border border-gray-700 rounded px-2 py-1 text-xs font-mono w-24 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        className="bg-gray-900 text-gray-300 border border-gray-700 rounded px-2 py-1 text-xs font-mono w-40 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}
