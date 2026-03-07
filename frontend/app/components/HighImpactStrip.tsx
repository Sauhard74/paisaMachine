"use client";

import { NewsItemData } from "../lib/types";

interface HighImpactStripProps {
  items: NewsItemData[];
}

export function HighImpactStrip({ items }: HighImpactStripProps) {
  if (items.length === 0) {
    return (
      <div className="h-8 bg-[#0d1117] border-b border-[#1b2b1b] flex items-center px-4">
        <span className="text-[10px] text-[#374151]">
          No high-impact alerts
        </span>
      </div>
    );
  }

  const doubled = [...items, ...items];

  return (
    <div className="h-8 bg-[#0d1117] border-b border-[#1b2b1b] overflow-hidden relative">
      <div className="flex items-center h-full animate-scroll-left whitespace-nowrap">
        {doubled.map((item, i) => {
          const isNeg = item.sentiment === "negative";
          const bgColor = isNeg ? "bg-[#7f1d1d]/30" : "bg-[#065f46]/30";
          const textColor = isNeg ? "text-[#ef4444]" : "text-[#10b981]";
          const arrow = isNeg ? "\u25BC" : "\u25B2";

          return (
            <span
              key={`${item.id}-${i}`}
              className={`inline-flex items-center gap-2 px-4 h-full text-xs ${bgColor}`}
            >
              <span className={`font-bold ${textColor}`}>{arrow}</span>
              <span className="text-[#eab308] font-bold">
                {item.tickers.join(", ") || "MARKET"}
              </span>
              <span className="text-[#e5e7eb]">
                {item.summary || item.headline.substring(0, 80)}
              </span>
              {item.key_figures.length > 0 && (
                <span className="text-[#f59e0b] font-bold">
                  {item.key_figures[0]}
                </span>
              )}
              <span className="text-[#374151] mx-2">|</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
