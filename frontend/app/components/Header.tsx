"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IndexData, MarketStatusData } from "../lib/types";
import { searchStocks, StockSearchResult, isValidSymbol } from "../lib/api";

interface HeaderProps {
  indices: IndexData[];
  marketStatus: MarketStatusData[];
  connected: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  totalItems: number;
}

function PriceChange({ value, percent }: { value: number; percent: number }) {
  const isPositive = value >= 0;
  const color = isPositive ? "text-[#10b981]" : "text-[#ef4444]";
  const arrow = isPositive ? "\u25B2" : "\u25BC";
  return (
    <span className={`${color} text-xs`}>
      {arrow} {Math.abs(value).toFixed(2)} ({Math.abs(percent).toFixed(2)}%)
    </span>
  );
}

function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const [show, setShow] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    if (query.length < 2) { setResults([]); setShow(false); return; }
    timeout.current = setTimeout(async () => {
      try {
        const r = await searchStocks(query);
        setResults(r);
        setShow(true);
      } catch { setResults([]); }
    }, 300);
    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setShow(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const go = (symbol: string) => {
    const s = symbol.toUpperCase();
    if (!isValidSymbol(s)) return;
    router.push(`/stock/${s}`);
    setQuery("");
    setShow(false);
    setResults([]);
  };

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center gap-1.5 bg-[#080c08] border border-[#1b2b1b] rounded px-2 py-1">
        <svg className="w-3 h-3 text-[#374151] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (results.length > 0) go(results[0].symbol);
              else if (query.trim().length >= 1) go(query.trim());
            }
          }}
          onFocus={() => results.length > 0 && setShow(true)}
          placeholder="Search stocks..."
          className="bg-transparent text-[11px] text-[#e5e7eb] placeholder-[#374151] outline-none w-32 focus:w-48 transition-all"
        />
        <button
          onClick={() => {
            if (results.length > 0) go(results[0].symbol);
            else if (query.trim().length >= 1) go(query.trim());
          }}
          className="text-[#374151] hover:text-[#10b981] transition-colors"
          title="Search"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      {show && results.length > 0 && (
        <div className="absolute top-full right-0 z-50 bg-[#0d1117] border border-[#1b2b1b] rounded-b-lg w-64 max-h-64 overflow-y-auto shadow-xl mt-0.5">
          {results.map((r) => (
            <button
              key={r.symbol}
              onClick={() => go(r.symbol)}
              className="w-full text-left px-3 py-1.5 hover:bg-[#1b2b1b]/50 transition-colors flex items-center justify-between"
            >
              <span className="text-[11px] text-[#eab308] font-bold">{r.symbol}</span>
              <span className="text-[10px] text-[#6b7280] truncate ml-2">{r.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header({
  indices,
  marketStatus,
  connected,
  soundEnabled,
  onToggleSound,
  totalItems,
}: HeaderProps) {
  const capitalMarket = marketStatus.find(
    (s) => s.market === "Capital Market" || s.market === "CM"
  );
  const isMarketOpen = capitalMarket?.status?.toLowerCase().includes("open") ?? false;

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-b border-[#1b2b1b]">
      <div className="flex items-center gap-4">
        <h1 className="text-base font-bold text-[#10b981] tracking-wider">
          PAISAMACHINE
        </h1>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isMarketOpen ? "bg-[#10b981] animate-pulse" : "bg-[#ef4444]"
            }`}
          />
          <span className="text-[10px] text-[#6b7280] uppercase">
            {isMarketOpen ? "Market Open" : "Market Closed"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {indices.map((idx) => (
          <div key={idx.name} className="flex items-center gap-2">
            <span className="text-[10px] text-[#6b7280]">{idx.name}</span>
            <span className="text-xs font-semibold text-[#e5e7eb]">
              {idx.last?.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </span>
            <PriceChange value={idx.change} percent={idx.changePercent} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <HeaderSearch />
        <span className="text-[10px] text-[#6b7280]">
          {totalItems.toLocaleString()} items
        </span>
        <button
          onClick={onToggleSound}
          className="text-xs px-2 py-1 rounded border border-[#1b2b1b] hover:border-[#10b981] transition-colors"
          title={soundEnabled ? "Mute alerts" : "Enable alerts"}
        >
          {soundEnabled ? "\uD83D\uDD0A" : "\uD83D\uDD07"}
        </button>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              connected ? "bg-[#10b981]" : "bg-[#ef4444]"
            }`}
          />
          <span
            className={`text-[10px] ${
              connected ? "text-[#10b981]" : "text-[#ef4444]"
            }`}
          >
            {connected ? "LIVE" : "OFFLINE"}
          </span>
        </div>
      </div>
    </header>
  );
}
