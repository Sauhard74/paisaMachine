"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { NewsItemData, QuoteData } from "../lib/types";
import { fetchQuote, searchStocks, StockSearchResult, isSafeUrl } from "../lib/api";
import { Highlight } from "./Highlight";

interface WatchlistPanelProps {
  watchlist: string[];
  onUpdateWatchlist: (tickers: string[]) => void;
  watchlistItems: NewsItemData[];
}

function formatIST(dateStr: string): string {
  const dt = new Date(
    dateStr.endsWith("Z") || dateStr.includes("+") ? dateStr : dateStr + "Z"
  );
  const istOffset = 5.5 * 60 * 60 * 1000;
  const ist = new Date(dt.getTime() + istOffset);
  return ist.toISOString().slice(11, 16);
}

function TickerCard({
  symbol,
  quote,
  onRemove,
}: {
  symbol: string;
  quote: QuoteData | null;
  onRemove: () => void;
}) {
  const change = quote?.changePercent ?? 0;
  const isPositive = change >= 0;
  const color = isPositive ? "text-[#10b981]" : "text-[#ef4444]";
  const arrow = isPositive ? "\u25B2" : "\u25BC";

  return (
    <div className="bg-[#080c08] rounded border border-[#1b2b1b] p-2.5 flex items-center justify-between group">
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <Link href={`/stock/${symbol}`} onClick={(e) => e.stopPropagation()} className="text-xs font-bold text-[#eab308] hover:text-[#facc15] hover:underline">{symbol}</Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="text-[10px] text-[#ef4444] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            &times;
          </button>
        </div>
        {quote?.companyName && (
          <span className="text-[9px] text-[#374151] block truncate">
            {quote.companyName}
          </span>
        )}
      </div>
      <div className="text-right shrink-0">
        <div className="text-xs font-semibold text-[#e5e7eb]">
          {quote ? `\u20B9${quote.ltp.toLocaleString("en-IN")}` : "--"}
        </div>
        <div className={`text-[10px] font-bold ${color}`}>
          {arrow} {Math.abs(change).toFixed(2)}%
        </div>
      </div>
    </div>
  );
}

function SearchDropdown({
  results,
  onSelect,
  visible,
}: {
  results: StockSearchResult[];
  onSelect: (symbol: string) => void;
  visible: boolean;
}) {
  if (!visible || results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-50 bg-[#0d1117] border border-[#1b2b1b] rounded-b-lg max-h-48 overflow-y-auto shadow-lg">
      {results.map((r) => (
        <button
          key={r.symbol}
          onClick={() => onSelect(r.symbol)}
          className="w-full text-left px-3 py-1.5 hover:bg-[#1b2b1b]/50 transition-colors flex items-center justify-between"
        >
          <span className="text-[11px] text-[#eab308] font-bold">{r.symbol}</span>
          <span className="text-[10px] text-[#6b7280] truncate ml-2">{r.name}</span>
        </button>
      ))}
    </div>
  );
}

export function WatchlistPanel({
  watchlist,
  onUpdateWatchlist,
  watchlistItems,
}: WatchlistPanelProps) {
  const [input, setInput] = useState("");
  const [quotes, setQuotes] = useState<Record<string, QuoteData>>({});
  const [searchResults, setSearchResults] = useState<StockSearchResult[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [expandedNewsId, setExpandedNewsId] = useState<number | null>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const refreshQuotes = useCallback(async () => {
    for (const symbol of watchlist) {
      try {
        const q = await fetchQuote(symbol);
        setQuotes((prev) => ({ ...prev, [symbol]: q }));
      } catch {
        // skip
      }
    }
  }, [watchlist]);

  useEffect(() => {
    if (watchlist.length === 0) return;
    refreshQuotes();
    const interval = setInterval(refreshQuotes, 30_000);
    return () => clearInterval(interval);
  }, [watchlist, refreshQuotes]);

  // Debounced search
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (input.length < 2) {
      setSearchResults([]);
      setShowSearch(false);
      return;
    }
    searchTimeout.current = setTimeout(async () => {
      try {
        const results = await searchStocks(input);
        setSearchResults(results);
        setShowSearch(true);
      } catch {
        setSearchResults([]);
      }
    }, 300);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [input]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const addTicker = (symbol: string) => {
    const ticker = symbol.trim().toUpperCase();
    if (ticker && !watchlist.includes(ticker)) {
      onUpdateWatchlist([...watchlist, ticker]);
    }
    setInput("");
    setShowSearch(false);
    setSearchResults([]);
  };

  const removeTicker = (ticker: string) => {
    onUpdateWatchlist(watchlist.filter((t) => t !== ticker));
  };

  return (
    <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1b2b1b]">
        <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider font-bold">
          Watchlist
        </h3>
        <span className="text-[10px] text-[#374151] font-bold">{watchlist.length}</span>
      </div>

      {/* Search input with autocomplete */}
      <div ref={containerRef} className="relative border-b border-[#1b2b1b]">
        <div className="flex items-center gap-1 px-2 py-1.5">
          <svg className="w-3 h-3 text-[#374151] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchResults.length > 0) {
                addTicker(searchResults[0].symbol);
              } else if (e.key === "Enter" && input.length >= 2) {
                addTicker(input);
              }
            }}
            onFocus={() => searchResults.length > 0 && setShowSearch(true)}
            placeholder="Search stocks... (e.g. Reliance, TCS)"
            className="flex-1 bg-transparent text-[11px] text-[#e5e7eb] placeholder-[#374151] outline-none"
          />
        </div>
        <SearchDropdown
          results={searchResults}
          onSelect={addTicker}
          visible={showSearch}
        />
      </div>

      {/* Ticker cards + news */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {watchlist.length === 0 ? (
          <div className="flex items-center justify-center h-16 text-[10px] text-[#374151]">
            Search and add stocks to your watchlist
          </div>
        ) : (
          <>
            {watchlist.map((symbol) => (
              <TickerCard
                key={symbol}
                symbol={symbol}
                quote={quotes[symbol] ?? null}
                onRemove={() => removeTicker(symbol)}
              />
            ))}

            {watchlistItems.length > 0 && (
              <div className="mt-2 pt-2 border-t border-[#1b2b1b]">
                <div className="text-[9px] text-[#374151] uppercase font-bold mb-1">
                  Related News
                </div>
                {watchlistItems.slice(0, 15).map((item) => {
                  const pub = formatIST(item.published_at);
                  const isExpanded = expandedNewsId === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`py-1.5 text-[10px] border-b border-[#1b2b1b]/30 cursor-pointer hover:bg-[#1b2b1b]/20 transition-colors ${isExpanded ? "bg-[#0a1a0a]" : ""}`}
                      onClick={() => setExpandedNewsId(isExpanded ? null : item.id)}
                    >
                      <div className="text-[#6b7280]">
                        <span className="text-[10px] font-bold text-[#e5e7eb] mr-1.5">
                          {pub}
                        </span>
                        <Link href={`/stock/${item.tickers[0]}`} onClick={(e) => e.stopPropagation()} className="text-[#eab308] font-bold mr-1 hover:text-[#facc15] hover:underline">
                          {item.tickers[0]}
                        </Link>
                        <Highlight
                          text={item.summary || item.headline}
                          keyFigures={item.key_figures}
                        />
                      </div>
                      {isExpanded && (
                        <div className="mt-2 pl-1 space-y-1.5 text-[10px]">
                          <div className="text-[#e5e7eb]">{item.headline}</div>
                          <div className="flex flex-wrap gap-1">
                            {item.tickers.map((t) => (
                              <span key={t} className="text-[9px] text-[#eab308] font-bold bg-[#eab308]/10 px-1 py-0.5 rounded">{t}</span>
                            ))}
                            <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${item.sentiment === "positive" ? "text-[#10b981] bg-[#10b981]/10" : item.sentiment === "negative" ? "text-[#ef4444] bg-[#ef4444]/10" : "text-[#6b7280] bg-[#6b7280]/10"}`}>
                              {item.sentiment}
                            </span>
                            <span className={`text-[9px] font-bold px-1 py-0.5 rounded ${item.impact === "high" ? "text-[#f59e0b] bg-[#f59e0b]/10" : "text-[#374151] bg-[#374151]/10"}`}>
                              {item.impact}
                            </span>
                          </div>
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
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
