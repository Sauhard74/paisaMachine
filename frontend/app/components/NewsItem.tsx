"use client";

import { useState } from "react";
import { Highlight } from "./Highlight";

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

const SOURCE_LABELS: Record<string, string> = {
  nse_rss: "NSE RSS",
  bse_rss: "BSE RSS",
  nse_json_api: "NSE API",
  bse_json_api: "BSE API",
  zerodha_pulse: "Zerodha",
  moneycontrol: "MCntrl",
  twitter_redbox: "Redbox",
  twitter_nse: "NSE Tw",
  twitter_bse: "BSE Tw",
  twitter_capmkt: "CapMkt",
};

const SENTIMENT_CONFIG = {
  positive: { arrow: "\u25B2", color: "text-green-400" },
  negative: { arrow: "\u25BC", color: "text-red-400" },
  neutral: { arrow: "\u25CF", color: "text-gray-400" },
};

export function NewsItem({ item }: { item: NewsItemData }) {
  const [expanded, setExpanded] = useState(false);
  const sent = SENTIMENT_CONFIG[item.sentiment];
  const time = new Date(item.ingested_at).toLocaleTimeString("en-IN", {
    hour12: false,
  });
  const sourceLabel = SOURCE_LABELS[item.source] || item.source;
  const isHighImpact = item.impact === "high";

  return (
    <div
      className={`border-b border-gray-800 px-4 py-2 cursor-pointer hover:bg-gray-900 transition-colors ${
        isHighImpact ? "border-l-2 border-l-yellow-500" : ""
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center gap-3 text-xs">
        <span className="text-gray-500 font-mono w-16">{time}</span>
        <span className="text-blue-400 font-mono w-16">{sourceLabel}</span>
        <span className="text-yellow-300 font-mono font-bold">
          {item.tickers.join(", ") || "\u2014"}
        </span>
        <span className={`${sent.color} font-mono`}>
          {sent.arrow} {item.sentiment}
        </span>
        <span className="text-gray-500 font-mono">{item.category}</span>
        {isHighImpact && (
          <span className="text-yellow-500 font-bold text-[10px] uppercase">
            HIGH
          </span>
        )}
      </div>

      <div className="mt-1 text-sm text-gray-200">
        <Highlight
          text={item.summary || item.headline}
          keyFigures={item.key_figures}
        />
      </div>

      {expanded && (
        <div className="mt-2 pl-4 border-l border-gray-700 text-xs space-y-1">
          <div className="text-gray-400">
            <span className="text-gray-500">Full: </span>
            {item.headline}
          </div>
          {item.raw_content && (
            <div className="text-gray-500 max-h-32 overflow-y-auto">
              {item.raw_content}
            </div>
          )}
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
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
