"use client";

import { useState, Fragment } from "react";
import { NewsItemData } from "../lib/types";
import { isSafeUrl } from "../lib/api";

interface RecentFilingsProps {
  items: NewsItemData[];
}

const SENTIMENT_DOT: Record<string, string> = {
  positive: "bg-[#10b981]",
  negative: "bg-[#ef4444]",
  neutral: "bg-[#6b7280]",
};

const IMPACT_STYLE: Record<string, string> = {
  high: "text-[#f59e0b] bg-[#f59e0b]/10",
  medium: "text-[#6b7280] bg-[#6b7280]/10",
  low: "text-[#374151] bg-[#374151]/10",
};

function formatIST(dateStr: string): string {
  const dt = new Date(
    dateStr.endsWith("Z") || dateStr.includes("+") ? dateStr : dateStr + "Z"
  );
  const istOffset = 5.5 * 60 * 60 * 1000;
  const ist = new Date(dt.getTime() + istOffset);
  return ist.toISOString().slice(11, 16);
}

export function RecentFilings({ items }: RecentFilingsProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const filings = items.slice(0, 30);

  return (
    <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1b2b1b]">
        <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider font-bold">
          Recent Filings
        </h3>
        <span className="text-[10px] text-[#374151] font-bold">{items.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-[9px] text-[#374151] uppercase border-b border-[#1b2b1b] sticky top-0 bg-[#0d1117]">
              <th className="text-left px-3 py-1.5 w-14">Time</th>
              <th className="text-left px-3 py-1.5 w-24">Symbol</th>
              <th className="text-left px-3 py-1.5">Headline</th>
              <th className="text-center px-3 py-1.5 w-16">Impact</th>
              <th className="text-center px-3 py-1.5 w-10">Sent.</th>
            </tr>
          </thead>
          <tbody>
            {filings.map((item) => (
              <Fragment key={item.id}>
                <tr
                  className="border-b border-[#1b2b1b]/30 hover:bg-[#1b2b1b]/20 transition-colors cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === item.id ? null : item.id)
                  }
                >
                  <td className="px-3 py-1.5 font-bold text-[#e5e7eb] tabular-nums">
                    {formatIST(item.published_at)}
                  </td>
                  <td className="px-3 py-1.5 text-[#eab308] font-bold">
                    {item.tickers[0] || "--"}
                  </td>
                  <td className="px-3 py-1.5 text-[#e5e7eb] truncate max-w-0">
                    {item.summary || item.headline}
                  </td>
                  <td className="px-3 py-1.5 text-center">
                    <span
                      className={`text-[8px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        IMPACT_STYLE[item.impact] || IMPACT_STYLE.low
                      }`}
                    >
                      {item.impact}
                    </span>
                  </td>
                  <td className="px-3 py-1.5 text-center">
                    <span
                      className={`w-2 h-2 rounded-full inline-block ${
                        SENTIMENT_DOT[item.sentiment] || SENTIMENT_DOT.neutral
                      }`}
                    />
                  </td>
                </tr>
                {expandedId === item.id && (
                  <tr key={`${item.id}-detail`}>
                    <td colSpan={5} className="px-3 py-2 bg-[#0a1a0a]">
                      <div className="text-[10px] space-y-1.5">
                        <div className="text-[#e5e7eb]">{item.headline}</div>
                        {item.raw_content && (
                          <div className="text-[#6b7280] max-h-24 overflow-y-auto whitespace-pre-wrap">
                            {item.raw_content}
                          </div>
                        )}
                        {isSafeUrl(item.url) && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#10b981] hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Open source &rarr;
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
        {filings.length === 0 && (
          <div className="flex items-center justify-center h-16 text-[10px] text-[#374151]">
            No filings yet
          </div>
        )}
      </div>
    </div>
  );
}
