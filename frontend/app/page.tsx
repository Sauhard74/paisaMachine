"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Panel, Group, Separator } from "react-resizable-panels";
import { Header } from "./components/Header";
import { HighImpactStrip } from "./components/HighImpactStrip";
import { SentimentDonut } from "./components/SentimentDonut";
import { NewsVelocity } from "./components/NewsVelocity";
import { NewsPanelCard } from "./components/NewsPanelCard";
import { WatchlistPanel } from "./components/WatchlistPanel";
import { RecentFilings } from "./components/RecentFilings";
import { routeAllNews, isHighImpactAlert } from "./lib/route-news";
import { playAlertSound } from "./lib/sounds";
import {
  fetchNews,
  fetchStats,
  fetchIndices,
  fetchMarketStatus,
  createSSEConnection,
} from "./lib/api";
import type {
  NewsItemData,
  IndexData,
  MarketStatusData,
  StatsData,
} from "./lib/types";

function loadWatchlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem("pm_watchlist") || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((t): t is string => typeof t === "string" && /^[A-Z0-9&.\-]{1,20}$/.test(t));
  } catch {
    return [];
  }
}

function saveWatchlist(tickers: string[]) {
  localStorage.setItem("pm_watchlist", JSON.stringify(tickers));
}

/* thin green drag handle */
function ResizeH() {
  return (
    <Separator className="w-[5px] shrink-0 bg-[#1b2b1b]/40 hover:bg-[#10b981]/60 active:bg-[#10b981] transition-colors cursor-col-resize rounded mx-px" />
  );
}
function ResizeV() {
  return (
    <Separator className="h-[5px] shrink-0 bg-[#1b2b1b]/40 hover:bg-[#10b981]/60 active:bg-[#10b981] transition-colors cursor-row-resize rounded my-px" />
  );
}

export default function Dashboard() {
  const [items, setItems] = useState<NewsItemData[]>([]);
  const [connected, setConnected] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [marketStatus, setMarketStatus] = useState<MarketStatusData[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const soundEnabledRef = useRef(true);

  useEffect(() => {
    setWatchlist(loadWatchlist());
    const stored = localStorage.getItem("pm_sound");
    if (stored === "false") {
      setSoundEnabled(false);
      soundEnabledRef.current = false;
    }
  }, []);

  const updateWatchlist = useCallback((tickers: string[]) => {
    setWatchlist(tickers);
    saveWatchlist(tickers);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEnabledRef.current = next;
      localStorage.setItem("pm_sound", String(next));
      return next;
    });
  }, []);

  useEffect(() => {
    fetchNews(1000).then(setItems).catch(console.error);
    fetchStats().then(setStats).catch(console.error);
    fetchIndices().then(setIndices).catch(console.error);
    fetchMarketStatus().then(setMarketStatus).catch(console.error);
  }, []);

  useEffect(() => {
    const si = setInterval(() => fetchStats().then(setStats).catch(console.error), 30_000);
    const ii = setInterval(() => fetchIndices().then(setIndices).catch(console.error), 30_000);
    const mi = setInterval(() => fetchMarketStatus().then(setMarketStatus).catch(console.error), 60_000);
    return () => { clearInterval(si); clearInterval(ii); clearInterval(mi); };
  }, []);

  useEffect(() => {
    const es = createSSEConnection(
      (newItem) => {
        setItems((prev) => [newItem, ...prev]);
        if (soundEnabledRef.current && isHighImpactAlert(newItem)) {
          playAlertSound(newItem.sentiment === "positive" ? "positive" : "negative");
        }
      },
      () => setConnected(true),
      () => setConnected(false)
    );
    return () => es.close();
  }, []);

  const routed = routeAllNews(items, watchlist);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#080c08]">
      <Header
        indices={indices}
        marketStatus={marketStatus}
        connected={connected}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        totalItems={items.length}
      />
      <HighImpactStrip items={routed.highImpact} />

      {/* ── Outer: top section vs bottom section (vertical split) ── */}
      <div className="flex-1 min-h-0 p-1.5">
        <Group orientation="vertical" style={{ height: "100%" }}>
          {/* ═══ TOP 70 % ═══ */}
          <Panel defaultSize={70} minSize={35}>
            <Group orientation="horizontal" style={{ height: "100%" }}>
              {/* ── Left column: charts + watchlist ── */}
              <Panel defaultSize={25} minSize={15}>
                <Group orientation="vertical" style={{ height: "100%" }}>
                  {/* Charts row */}
                  <Panel defaultSize={35} minSize={20}>
                    <div className="flex gap-1.5 h-full">
                      <div className="w-1/2 min-w-0">
                        <SentimentDonut stats={stats} />
                      </div>
                      <div className="w-1/2 min-w-0">
                        <NewsVelocity stats={stats} />
                      </div>
                    </div>
                  </Panel>
                  <ResizeV />
                  {/* Watchlist */}
                  <Panel defaultSize={65} minSize={30}>
                    <WatchlistPanel
                      watchlist={watchlist}
                      onUpdateWatchlist={updateWatchlist}
                      watchlistItems={routed.watchlistItems}
                    />
                  </Panel>
                </Group>
              </Panel>

              <ResizeH />

              {/* ── Center: Ticker Alerts (biggest) ── */}
              <Panel defaultSize={45} minSize={25}>
                <NewsPanelCard
                  title="Ticker Alerts"
                  items={routed.tickerAlerts}
                  emptyMessage="No stock-specific news yet"
                  enableSentimentFilter
                />
              </Panel>

              <ResizeH />

              {/* ── Right column: Govt + Global stacked ── */}
              <Panel defaultSize={30} minSize={15}>
                <Group orientation="vertical" style={{ height: "100%" }}>
                  <Panel defaultSize={50} minSize={25}>
                    <NewsPanelCard
                      title="Govt & Regulatory"
                      items={routed.govtRegulatory}
                      emptyMessage="No regulatory news"
                      showTickers={false}
                    />
                  </Panel>
                  <ResizeV />
                  <Panel defaultSize={50} minSize={25}>
                    <NewsPanelCard
                      title="Global & Geopolitical"
                      items={routed.globalGeo}
                      emptyMessage="No global news"
                      showTickers={false}
                    />
                  </Panel>
                </Group>
              </Panel>
            </Group>
          </Panel>

          <ResizeV />

          {/* ═══ BOTTOM 30 % ═══ */}
          <Panel defaultSize={30} minSize={15}>
            <Group orientation="horizontal" style={{ height: "100%" }}>
              <Panel defaultSize={55} minSize={25}>
                <NewsPanelCard
                  title="Market Pulse"
                  items={routed.marketPulse}
                  emptyMessage="No market news"
                />
              </Panel>
              <ResizeH />
              <Panel defaultSize={45} minSize={20}>
                <RecentFilings items={routed.recentFilings} />
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>
    </div>
  );
}
