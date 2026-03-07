"use client";

import { useState } from "react";
import Link from "next/link";
import { NewsItemData } from "../lib/types";
import { isSafeUrl } from "../lib/api";
import { Highlight } from "./Highlight";

interface NewsPanelCardProps {
  title: string;
  items: NewsItemData[];
  maxHeight?: string;
  emptyMessage?: string;
  showTickers?: boolean;
  enableSentimentFilter?: boolean;
}

const SENTIMENT_CONFIG = {
  positive: { color: "text-[#10b981]", bg: "bg-[#10b981]", arrow: "\u25B2", label: "Positive" },
  negative: { color: "text-[#ef4444]", bg: "bg-[#ef4444]", arrow: "\u25BC", label: "Negative" },
  neutral: { color: "text-[#6b7280]", bg: "bg-[#6b7280]", arrow: "\u25CF", label: "Neutral" },
};

const SOURCE_LABELS: Record<string, string> = {
  nse_json_api: "NSE",
  bse_json_api: "BSE",
  zerodha_pulse: "Zerodha",
  economic_times: "ET",
  livemint: "Mint",
  ndtv_profit: "NDTV",
  bloomberg: "Bloomberg",
  tradingview: "TradingView",
  screener: "Screener",
};

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

function NewsRow({
  item,
  showTickers = true,
}: {
  item: NewsItemData;
  showTickers?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const sent = SENTIMENT_CONFIG[item.sentiment];
  const isHigh = item.impact === "high";
  const published = formatIST(item.published_at);
  const ingested = formatIST(item.ingested_at);
  const sourceLabel = SOURCE_LABELS[item.source] || item.source;

  return (
    <div
      className={`px-3 py-2.5 border-b border-[#1b2b1b]/50 cursor-pointer hover:bg-[#1b2b1b]/30 transition-colors ${
        isHigh ? "border-l-2 border-l-[#f59e0b]" : ""
      } ${expanded ? "bg-[#0a1a0a]" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[11px] font-bold text-[#e5e7eb] tabular-nums">
          {published.time}
        </span>
        <span className="text-[9px] text-[#374151]">{published.date}</span>
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${sent.bg}`} />
        {showTickers && item.tickers.length > 0 && (
          <span className="text-[10px] shrink-0 flex gap-1">
            {item.tickers.slice(0, 3).map((t) => (
              <Link
                key={t}
                href={`/stock/${t}`}
                onClick={(e) => e.stopPropagation()}
                className="text-[#eab308] font-bold hover:text-[#facc15] hover:underline"
              >
                {t}
              </Link>
            ))}
          </span>
        )}
        <span className="text-[9px] text-[#374151] ml-auto">{sourceLabel}</span>
        {isHigh && (
          <span className="text-[8px] text-[#f59e0b] font-bold uppercase bg-[#f59e0b]/10 px-1.5 py-0.5 rounded shrink-0">
            HIGH
          </span>
        )}
      </div>

      <div className="text-[11px] text-[#e5e7eb] leading-snug">
        <Highlight
          text={item.summary || item.headline}
          keyFigures={item.key_figures}
        />
      </div>

      {expanded && (
        <div className="mt-3 bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3 space-y-2.5">
          <div>
            <span className="text-[9px] text-[#374151] uppercase block mb-0.5">
              Full Headline
            </span>
            <span className="text-[11px] text-[#e5e7eb]">{item.headline}</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px]">
            <div>
              <span className="text-[#374151]">Source: </span>
              <span className="text-[#6b7280]">{sourceLabel}</span>
            </div>
            <div>
              <span className="text-[#374151]">Category: </span>
              <span className="text-[#6b7280]">{item.category}</span>
            </div>
            <div>
              <span className="text-[#374151]">Sentiment: </span>
              <span className={sent.color}>{sent.arrow} {sent.label}</span>
            </div>
            <div>
              <span className="text-[#374151]">Impact: </span>
              <span className={isHigh ? "text-[#f59e0b] font-bold" : "text-[#6b7280]"}>
                {item.impact.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-[#374151]">Published: </span>
              <span className="text-[#e5e7eb] font-bold">{published.date} {published.time} IST</span>
            </div>
            <div>
              <span className="text-[#374151]">Ingested: </span>
              <span className="text-[#6b7280]">{ingested.date} {ingested.time} IST</span>
            </div>
          </div>

          {item.tickers.length > 0 && (
            <div>
              <span className="text-[9px] text-[#374151] uppercase block mb-0.5">Tickers</span>
              <div className="flex flex-wrap gap-1">
                {item.tickers.map((t) => (
                  <Link
                    key={t}
                    href={`/stock/${t}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] text-[#eab308] font-bold bg-[#eab308]/10 px-1.5 py-0.5 rounded hover:bg-[#eab308]/20"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {item.key_figures.length > 0 && (
            <div>
              <span className="text-[9px] text-[#374151] uppercase block mb-0.5">Key Figures</span>
              <div className="flex flex-wrap gap-1">
                {item.key_figures.map((f, i) => (
                  <span key={i} className="text-[10px] text-[#f59e0b] font-bold bg-[#f59e0b]/10 px-1.5 py-0.5 rounded">{f}</span>
                ))}
              </div>
            </div>
          )}

          {item.raw_content && (
            <div>
              <span className="text-[9px] text-[#374151] uppercase block mb-0.5">Full Content</span>
              <div className="text-[10px] text-[#6b7280] max-h-40 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {item.raw_content}
              </div>
            </div>
          )}

          {isSafeUrl(item.url) && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[10px] text-[#10b981] hover:text-[#34d399] hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Open original source &rarr;
            </a>
          )}
        </div>
      )}
    </div>
  );
}

type SentimentFilter = "all" | "positive" | "negative";

const FILTER_BUTTONS: { value: SentimentFilter; label: string; activeClass: string }[] = [
  { value: "all", label: "All", activeClass: "bg-[#1b2b1b] text-[#e5e7eb]" },
  { value: "positive", label: "Positive", activeClass: "bg-[#10b981]/20 text-[#10b981]" },
  { value: "negative", label: "Negative", activeClass: "bg-[#ef4444]/20 text-[#ef4444]" },
];

export function NewsPanelCard({
  title,
  items,
  maxHeight = "100%",
  emptyMessage = "No items",
  showTickers = true,
  enableSentimentFilter = false,
}: NewsPanelCardProps) {
  const [filter, setFilter] = useState<SentimentFilter>("all");

  const filtered = enableSentimentFilter && filter !== "all"
    ? items.filter((item) => item.sentiment === filter)
    : items;

  return (
    <div
      className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] flex flex-col h-full"
      style={{ maxHeight }}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1b2b1b]">
        <div className="flex items-center gap-2">
          <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider font-bold">
            {title}
          </h3>
          {enableSentimentFilter && (
            <div className="flex gap-0.5">
              {FILTER_BUTTONS.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setFilter(btn.value)}
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded transition-colors ${
                    filter === btn.value
                      ? btn.activeClass
                      : "text-[#374151] hover:text-[#6b7280]"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <span className="text-[10px] text-[#374151] font-bold">{filtered.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-20 text-[10px] text-[#374151]">
            {emptyMessage}
          </div>
        ) : (
          filtered.map((item) => (
            <NewsRow key={item.id} item={item} showTickers={showTickers} />
          ))
        )}
      </div>
    </div>
  );
}
