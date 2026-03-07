# Trader Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the single-feed news terminal into a multi-panel trading dashboard with charts, live market data, sound alerts, and smart news categorization.

**Architecture:** Frontend becomes a card-based dashboard grid using CSS Grid + react-resizable-panels. News items are routed into specialized panels (Ticker Alerts, Market Pulse, Global/Geo, Govt/Regulatory) based on LLM-assigned categories. Four new backend endpoints proxy NSE APIs for live market data and serve aggregated stats for charts. No changes to existing ingestion pipeline.

**Tech Stack:** Next.js 14, Tailwind CSS 4, recharts, react-resizable-panels, Web Audio API, Express, better-sqlite3

---

## Task 1: Install Frontend Dependencies

**Files:**
- Modify: `frontend/package.json`

**Step 1: Install recharts and react-resizable-panels**

```bash
cd /Users/sauhardgupta/internship/paisaMachine/frontend
npm install recharts react-resizable-panels
```

**Step 2: Verify installation**

```bash
cd /Users/sauhardgupta/internship/paisaMachine/frontend
node -e "require('recharts'); console.log('recharts OK')"
node -e "require('react-resizable-panels'); console.log('panels OK')"
```
Expected: Both print OK

**Step 3: Commit**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
git add frontend/package.json frontend/package-lock.json
git commit -m "chore: add recharts and react-resizable-panels dependencies"
```

---

## Task 2: Backend — Stats Endpoint

**Files:**
- Modify: `backend/src/services/storage.ts` (add getStats method)
- Create: `backend/src/routes/stats.ts`
- Modify: `backend/src/index.ts` (register route)

**Step 1: Add getStats method to StorageService**

Add this method to `backend/src/services/storage.ts` after the `getRecent` method (after line 134):

```typescript
getStats(): {
  sentiment_counts: Record<string, number>;
  category_counts: Record<string, number>;
  velocity: { minute: string; count: number }[];
  total_items: number;
} {
  const sentimentRows = this.db
    .prepare("SELECT sentiment, COUNT(*) as count FROM news_items GROUP BY sentiment")
    .all() as { sentiment: string; count: number }[];

  const categoryRows = this.db
    .prepare("SELECT category, COUNT(*) as count FROM news_items GROUP BY category")
    .all() as { category: string; count: number }[];

  const velocityRows = this.db
    .prepare(`
      SELECT strftime('%Y-%m-%dT%H:%M:00Z', ingested_at) as minute, COUNT(*) as count
      FROM news_items
      WHERE ingested_at >= datetime('now', '-120 minutes')
      GROUP BY minute
      ORDER BY minute ASC
    `)
    .all() as { minute: string; count: number }[];

  const totalRow = this.db
    .prepare("SELECT COUNT(*) as count FROM news_items")
    .get() as { count: number };

  const sentiment_counts: Record<string, number> = {};
  for (const row of sentimentRows) {
    sentiment_counts[row.sentiment] = row.count;
  }

  const category_counts: Record<string, number> = {};
  for (const row of categoryRows) {
    category_counts[row.category] = row.count;
  }

  return {
    sentiment_counts,
    category_counts,
    velocity: velocityRows,
    total_items: totalRow.count,
  };
}
```

**Step 2: Create stats route**

Create `backend/src/routes/stats.ts`:

```typescript
import { Router, Request, Response } from "express";
import { StorageService } from "../services/storage.js";

export function createStatsRouter(storage: StorageService): Router {
  const router = Router();

  router.get("/", (_req: Request, res: Response) => {
    const stats = storage.getStats();
    res.json(stats);
  });

  return router;
}
```

**Step 3: Register route in index.ts**

Add import at top of `backend/src/index.ts` (after line 16):

```typescript
import { createStatsRouter } from "./routes/stats.js";
```

Add route registration (after line 36):

```typescript
app.use("/api/stats", createStatsRouter(storage));
```

**Step 4: Test it**

```bash
curl -s http://localhost:3001/api/stats | python3 -m json.tool
```
Expected: JSON with sentiment_counts, category_counts, velocity array, total_items

**Step 5: Commit**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
git add backend/src/services/storage.ts backend/src/routes/stats.ts backend/src/index.ts
git commit -m "feat: add /api/stats endpoint for dashboard charts"
```

---

## Task 3: Backend — Market Data Proxy Endpoints

**Files:**
- Create: `backend/src/routes/market.ts`
- Modify: `backend/src/index.ts` (register routes)

**Step 1: Create market data proxy routes**

Create `backend/src/routes/market.ts`:

```typescript
import { Router, Request, Response } from "express";

const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Simple in-memory cache
interface CacheEntry {
  data: any;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

function getCached(key: string, maxAgeMs: number): any | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < maxAgeMs) {
    return entry.data;
  }
  return null;
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// NSE cookie management (reused pattern from exchange-fetcher)
let nseCookies = "";
let lastCookieRefresh = 0;

async function ensureNSECookies(): Promise<string> {
  if (nseCookies && Date.now() - lastCookieRefresh < 10 * 60_000) {
    return nseCookies;
  }

  try {
    const response = await fetch("https://www.nseindia.com", {
      headers: {
        "User-Agent": BROWSER_USER_AGENT,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
      },
      redirect: "follow",
    });

    const setCookieHeaders = response.headers.getSetCookie?.() ?? [];
    nseCookies = setCookieHeaders.map((h) => h.split(";")[0].trim()).join("; ");
    lastCookieRefresh = Date.now();
    await response.text(); // consume body
  } catch (error: any) {
    console.error("[MarketProxy] NSE cookie refresh failed:", error.message);
  }

  return nseCookies;
}

async function fetchNSE(url: string): Promise<any> {
  const cookies = await ensureNSECookies();

  const response = await fetch(url, {
    headers: {
      "User-Agent": BROWSER_USER_AGENT,
      Accept: "application/json",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br",
      Referer: "https://www.nseindia.com/",
      Cookie: cookies,
    },
  });

  if (response.status === 401 || response.status === 403) {
    // Reset cookies and retry once
    await response.text();
    nseCookies = "";
    lastCookieRefresh = 0;
    const freshCookies = await ensureNSECookies();

    const retryResponse = await fetch(url, {
      headers: {
        "User-Agent": BROWSER_USER_AGENT,
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        Referer: "https://www.nseindia.com/",
        Cookie: freshCookies,
      },
    });

    return retryResponse.json();
  }

  return response.json();
}

export function createMarketRouter(): Router {
  const router = Router();

  // GET /api/market/indices — NIFTY 50, SENSEX, BANK NIFTY
  router.get("/indices", async (_req: Request, res: Response) => {
    try {
      const cached = getCached("indices", 30_000);
      if (cached) return res.json(cached);

      const data = await fetchNSE("https://www.nseindia.com/api/allIndices");
      const allIndices: any[] = data?.data ?? [];

      const targets = ["NIFTY 50", "NIFTY BANK", "NIFTY NEXT 50", "NIFTY IT", "NIFTY FINANCIAL SERVICES"];
      const filtered = allIndices
        .filter((idx: any) => targets.includes(idx.index))
        .map((idx: any) => ({
          name: idx.index,
          last: idx.last,
          change: idx.variation,
          changePercent: idx.percentChange,
          open: idx.open,
          high: idx.high,
          low: idx.low,
          previousClose: idx.previousClose,
        }));

      setCache("indices", filtered);
      res.json(filtered);
    } catch (error: any) {
      console.error("[MarketProxy] indices error:", error.message);
      res.status(500).json({ error: "Failed to fetch indices" });
    }
  });

  // GET /api/market/quote/:symbol — equity quote for a specific stock
  router.get("/quote/:symbol", async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      const cacheKey = `quote_${symbol}`;
      const cached = getCached(cacheKey, 30_000);
      if (cached) return res.json(cached);

      const data = await fetchNSE(
        `https://www.nseindia.com/api/quote-equity?symbol=${encodeURIComponent(symbol)}`
      );

      const priceInfo = data?.priceInfo ?? {};
      const result = {
        symbol: data?.info?.symbol ?? symbol,
        companyName: data?.info?.companyName ?? "",
        ltp: priceInfo.lastPrice ?? 0,
        change: priceInfo.change ?? 0,
        changePercent: priceInfo.pChange ?? 0,
        open: priceInfo.open ?? 0,
        high: priceInfo.intraDayHighLow?.max ?? 0,
        low: priceInfo.intraDayHighLow?.min ?? 0,
        previousClose: priceInfo.previousClose ?? 0,
        volume: data?.securityWiseDP?.quantityTraded ?? 0,
      };

      setCache(cacheKey, result);
      res.json(result);
    } catch (error: any) {
      console.error("[MarketProxy] quote error:", error.message);
      res.status(500).json({ error: "Failed to fetch quote" });
    }
  });

  // GET /api/market/status — market open/closed
  router.get("/status", async (_req: Request, res: Response) => {
    try {
      const cached = getCached("market_status", 60_000);
      if (cached) return res.json(cached);

      const data = await fetchNSE("https://www.nseindia.com/api/marketStatus");
      const statuses: any[] = data?.marketState ?? [];

      const result = statuses.map((s: any) => ({
        market: s.market,
        status: s.marketStatus,
        tradeDate: s.tradeDate,
        index: s.index,
        last: s.last,
        variation: s.variation,
        percentChange: s.percentChange,
      }));

      setCache("market_status", result);
      res.json(result);
    } catch (error: any) {
      console.error("[MarketProxy] status error:", error.message);
      res.status(500).json({ error: "Failed to fetch market status" });
    }
  });

  return router;
}
```

**Step 2: Register route in index.ts**

Add import at top of `backend/src/index.ts` (near other route imports):

```typescript
import { createMarketRouter } from "./routes/market.js";
```

Add route registration (near other app.use lines):

```typescript
app.use("/api/market", createMarketRouter());
```

**Step 3: Test all three endpoints**

```bash
curl -s http://localhost:3001/api/market/status | python3 -m json.tool
curl -s http://localhost:3001/api/market/indices | python3 -m json.tool
curl -s http://localhost:3001/api/market/quote/RELIANCE | python3 -m json.tool
```

**Step 4: Commit**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
git add backend/src/routes/market.ts backend/src/index.ts
git commit -m "feat: add market data proxy endpoints (indices, quote, status)"
```

---

## Task 4: Frontend — Global CSS & Theme Setup

**Files:**
- Modify: `frontend/app/globals.css`
- Modify: `frontend/app/layout.tsx`

**Step 1: Update globals.css with dashboard theme**

Replace entire contents of `frontend/app/globals.css`:

```css
@import "tailwindcss";

@theme inline {
  --color-background: #080c08;
  --color-foreground: #e5e7eb;
  --color-card: #0d1117;
  --color-card-border: #1b2b1b;
  --color-accent: #10b981;
  --color-accent-dim: #065f46;
  --color-negative: #ef4444;
  --color-negative-dim: #7f1d1d;
  --color-warning: #f59e0b;
  --color-ticker: #eab308;
  --color-text-secondary: #6b7280;
  --color-text-muted: #374151;
  --font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-mono);
}

/* Custom scrollbar for dark theme */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #0d1117;
}

::-webkit-scrollbar-thumb {
  background: #1b2b1b;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #10b981;
}

/* Glow effects for high-impact cards */
.glow-green {
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.15), 0 0 3px rgba(16, 185, 129, 0.1);
}

.glow-red {
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.15), 0 0 3px rgba(239, 68, 68, 0.1);
}

/* High impact strip animation */
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-scroll-left {
  animation: scroll-left 30s linear infinite;
}

/* Pulse animation for new items */
@keyframes pulse-border {
  0%, 100% { border-color: #1b2b1b; }
  50% { border-color: #10b981; }
}

.animate-pulse-border {
  animation: pulse-border 2s ease-in-out 3;
}
```

**Step 2: Update layout.tsx with mono font**

Replace entire contents of `frontend/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PaisaMachine - Trader Dashboard",
  description: "Ultra-low latency stock news aggregation & trading dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080c08] text-[#e5e7eb] antialiased font-mono">
        {children}
      </body>
    </html>
  );
}
```

**Step 3: Verify frontend compiles**

```bash
cd /Users/sauhardgupta/internship/paisaMachine/frontend && npm run build 2>&1 | tail -5
```
Expected: Build succeeds

**Step 4: Commit**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
git add frontend/app/globals.css frontend/app/layout.tsx
git commit -m "feat: update theme to dark green trading dashboard style"
```

---

## Task 5: Frontend — Shared Types & Panel Routing Utility

**Files:**
- Create: `frontend/app/lib/types.ts`
- Create: `frontend/app/lib/route-news.ts`
- Create: `frontend/app/lib/sounds.ts`
- Create: `frontend/app/lib/api.ts`

**Step 1: Create shared types**

Create `frontend/app/lib/types.ts`:

```typescript
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
```

**Step 2: Create panel routing utility**

Create `frontend/app/lib/route-news.ts`:

```typescript
import { NewsItemData, PanelType } from "./types";

const GEO_KEYWORDS = [
  "war", "iran", "china", "fed", "oil", "crude", "dollar", "euro",
  "tariff", "global", "us market", "wall street", "nasdaq", "dow jones",
  "s&p 500", "opec", "brent", "wti", "forex", "yen", "yuan", "trump",
  "russia", "ukraine", "gaza", "israel", "sanctions", "geopolitical",
];

const STOCK_CATEGORIES = [
  "earnings", "order_win", "corporate_filing", "management_change",
  "offer_announcement", "broker_report",
];

export function isHighImpactAlert(item: NewsItemData): boolean {
  return item.impact === "high" && item.sentiment !== "neutral";
}

export function routeToPanel(item: NewsItemData): PanelType {
  // Govt & Regulatory
  if (item.category === "regulatory") {
    return "govt_regulatory";
  }

  // Stock-specific with tickers
  if (item.tickers.length > 0 && STOCK_CATEGORIES.includes(item.category)) {
    return "ticker_alerts";
  }

  // Global & Geopolitical — no tickers + geo keywords
  if (item.tickers.length === 0) {
    const text = `${item.headline} ${item.summary}`.toLowerCase();
    if (GEO_KEYWORDS.some((kw) => text.includes(kw))) {
      return "global_geo";
    }
  }

  // Default: market pulse
  return "market_pulse";
}

export function isFilingItem(item: NewsItemData): boolean {
  return item.category === "corporate_filing";
}

export function matchesWatchlist(item: NewsItemData, watchlist: string[]): boolean {
  if (watchlist.length === 0) return false;
  return item.tickers.some((t) =>
    watchlist.some((w) => t.toUpperCase() === w.toUpperCase())
  );
}

export interface RoutedNews {
  highImpact: NewsItemData[];
  tickerAlerts: NewsItemData[];
  watchlistItems: NewsItemData[];
  marketPulse: NewsItemData[];
  globalGeo: NewsItemData[];
  govtRegulatory: NewsItemData[];
  recentFilings: NewsItemData[];
}

export function routeAllNews(
  items: NewsItemData[],
  watchlist: string[]
): RoutedNews {
  const result: RoutedNews = {
    highImpact: [],
    tickerAlerts: [],
    watchlistItems: [],
    marketPulse: [],
    globalGeo: [],
    govtRegulatory: [],
    recentFilings: [],
  };

  for (const item of items) {
    if (isHighImpactAlert(item)) {
      result.highImpact.push(item);
    }

    if (isFilingItem(item)) {
      result.recentFilings.push(item);
    }

    if (matchesWatchlist(item, watchlist)) {
      result.watchlistItems.push(item);
    }

    const panel = routeToPanel(item);
    switch (panel) {
      case "ticker_alerts":
        result.tickerAlerts.push(item);
        break;
      case "market_pulse":
        result.marketPulse.push(item);
        break;
      case "global_geo":
        result.globalGeo.push(item);
        break;
      case "govt_regulatory":
        result.govtRegulatory.push(item);
        break;
    }
  }

  return result;
}
```

**Step 3: Create sound utility**

Create `frontend/app/lib/sounds.ts`:

```typescript
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export function playAlertSound(type: "positive" | "negative"): void {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (type === "positive") {
      // Ascending two-tone chime
      oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
      oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.15); // E5
    } else {
      // Descending two-tone alert
      oscillator.frequency.setValueAtTime(659, ctx.currentTime); // E5
      oscillator.frequency.setValueAtTime(440, ctx.currentTime + 0.15); // A4
    }

    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  } catch {
    // Audio not available — fail silently
  }
}
```

**Step 4: Create API helper**

Create `frontend/app/lib/api.ts`:

```typescript
import { NewsItemData, IndexData, QuoteData, MarketStatusData, StatsData } from "./types";

const BACKEND_URL = "http://localhost:3001";

export async function fetchNews(limit = 1000, beforeId?: number): Promise<NewsItemData[]> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (beforeId) params.set("before", String(beforeId));
  const res = await fetch(`${BACKEND_URL}/api/news?${params}`);
  return res.json();
}

export async function fetchStats(): Promise<StatsData> {
  const res = await fetch(`${BACKEND_URL}/api/stats`);
  return res.json();
}

export async function fetchIndices(): Promise<IndexData[]> {
  const res = await fetch(`${BACKEND_URL}/api/market/indices`);
  return res.json();
}

export async function fetchQuote(symbol: string): Promise<QuoteData> {
  const res = await fetch(`${BACKEND_URL}/api/market/quote/${encodeURIComponent(symbol)}`);
  return res.json();
}

export async function fetchMarketStatus(): Promise<MarketStatusData[]> {
  const res = await fetch(`${BACKEND_URL}/api/market/status`);
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
      // ignore parse errors
    }
  };

  es.onerror = () => onError();

  return es;
}
```

**Step 5: Commit**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
git add frontend/app/lib/
git commit -m "feat: add shared types, panel routing, sound alerts, and API helpers"
```

---

## Task 6: Frontend — Header Component

**Files:**
- Create: `frontend/app/components/Header.tsx`

**Step 1: Create Header component**

Create `frontend/app/components/Header.tsx`:

```typescript
"use client";

import { IndexData, MarketStatusData } from "../lib/types";

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
      {/* Left: Logo + Market Status */}
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

      {/* Center: Index Tickers */}
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

      {/* Right: Controls */}
      <div className="flex items-center gap-3">
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
```

**Step 2: Commit**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
git add frontend/app/components/Header.tsx
git commit -m "feat: add dashboard Header with index tickers and market status"
```

---

## Task 7: Frontend — HighImpactStrip Component

**Files:**
- Create: `frontend/app/components/HighImpactStrip.tsx`

**Step 1: Create HighImpactStrip component**

Create `frontend/app/components/HighImpactStrip.tsx`:

```typescript
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

  // Duplicate items for seamless scroll loop
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
```

**Step 2: Commit**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
git add frontend/app/components/HighImpactStrip.tsx
git commit -m "feat: add HighImpactStrip with auto-scrolling alerts"
```

---

## Task 8: Frontend — Chart Components (Sentiment Donut + News Velocity)

**Files:**
- Create: `frontend/app/components/SentimentDonut.tsx`
- Create: `frontend/app/components/NewsVelocity.tsx`

**Step 1: Create SentimentDonut**

Create `frontend/app/components/SentimentDonut.tsx`:

```typescript
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { StatsData } from "../lib/types";

interface SentimentDonutProps {
  stats: StatsData | null;
}

const COLORS: Record<string, string> = {
  positive: "#10b981",
  negative: "#ef4444",
  neutral: "#6b7280",
};

export function SentimentDonut({ stats }: SentimentDonutProps) {
  if (!stats) {
    return (
      <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-4 flex items-center justify-center h-full">
        <span className="text-[10px] text-[#374151]">Loading...</span>
      </div>
    );
  }

  const data = Object.entries(stats.sentiment_counts).map(([name, value]) => ({
    name,
    value,
  }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3 h-full">
      <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider mb-1">
        Sentiment
      </h3>
      <div className="flex items-center gap-2 h-[calc(100%-24px)]">
        <div className="w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="85%"
                dataKey="value"
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[entry.name] || "#6b7280"}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0d1117",
                  border: "1px solid #1b2b1b",
                  borderRadius: "8px",
                  fontSize: "11px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 flex flex-col gap-1">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: COLORS[d.name] }}
                />
                <span className="text-[10px] text-[#6b7280] capitalize">
                  {d.name}
                </span>
              </div>
              <span className="text-xs font-semibold text-[#e5e7eb]">
                {total > 0 ? Math.round((d.value / total) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Create NewsVelocity**

Create `frontend/app/components/NewsVelocity.tsx`:

```typescript
"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { StatsData } from "../lib/types";

interface NewsVelocityProps {
  stats: StatsData | null;
}

export function NewsVelocity({ stats }: NewsVelocityProps) {
  if (!stats || stats.velocity.length === 0) {
    return (
      <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-4 flex items-center justify-center h-full">
        <span className="text-[10px] text-[#374151]">No data yet</span>
      </div>
    );
  }

  const data = stats.velocity.map((v) => ({
    time: v.minute.slice(11, 16), // HH:MM
    count: v.count,
  }));

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3 h-full">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider">
          News Velocity
        </h3>
        <span className="text-xs font-semibold text-[#10b981]">
          {stats.total_items.toLocaleString()} total
        </span>
      </div>
      <div className="h-[calc(100%-24px)]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 9, fill: "#374151" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <Tooltip
              contentStyle={{
                background: "#0d1117",
                border: "1px solid #1b2b1b",
                borderRadius: "8px",
                fontSize: "11px",
              }}
              labelStyle={{ color: "#6b7280" }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#velocityGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
```

**Step 3: Commit**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
git add frontend/app/components/SentimentDonut.tsx frontend/app/components/NewsVelocity.tsx
git commit -m "feat: add SentimentDonut and NewsVelocity chart components"
```

---

## Task 9: Frontend — News Feed Panel Component (reusable)

**Files:**
- Create: `frontend/app/components/NewsPanelCard.tsx`
- Modify: `frontend/app/components/Highlight.tsx` (keep as-is, already works)

**Step 1: Create NewsPanelCard — a reusable scrollable news feed panel**

Create `frontend/app/components/NewsPanelCard.tsx`:

```typescript
"use client";

import { useState } from "react";
import { NewsItemData } from "../lib/types";
import { Highlight } from "./Highlight";

interface NewsPanelCardProps {
  title: string;
  items: NewsItemData[];
  maxHeight?: string;
  emptyMessage?: string;
  showTickers?: boolean;
}

const SENTIMENT_CONFIG = {
  positive: { color: "text-[#10b981]", bg: "bg-[#10b981]", arrow: "\u25B2" },
  negative: { color: "text-[#ef4444]", bg: "bg-[#ef4444]", arrow: "\u25BC" },
  neutral: { color: "text-[#6b7280]", bg: "bg-[#6b7280]", arrow: "\u25CF" },
};

function formatIST(dateStr: string): string {
  const dt = new Date(
    dateStr.endsWith("Z") || dateStr.includes("+") ? dateStr : dateStr + "Z"
  );
  const istOffset = 5.5 * 60 * 60 * 1000;
  const ist = new Date(dt.getTime() + istOffset);
  return ist.toISOString().slice(11, 16); // HH:MM
}

function NewsRow({ item, showTickers = true }: { item: NewsItemData; showTickers?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const sent = SENTIMENT_CONFIG[item.sentiment];
  const isHigh = item.impact === "high";

  return (
    <div
      className={`px-3 py-2 border-b border-[#1b2b1b]/50 cursor-pointer hover:bg-[#1b2b1b]/20 transition-colors ${
        isHigh ? "border-l-2 border-l-[#f59e0b]" : ""
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-[#374151] w-12 shrink-0">
          {formatIST(item.ingested_at)}
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${sent.bg}`}
        />
        {showTickers && item.tickers.length > 0 && (
          <span className="text-[10px] text-[#eab308] font-bold shrink-0">
            {item.tickers.slice(0, 2).join(", ")}
          </span>
        )}
        {isHigh && (
          <span className="text-[8px] text-[#f59e0b] font-bold uppercase bg-[#f59e0b]/10 px-1 rounded shrink-0">
            HIGH
          </span>
        )}
      </div>
      <div className="mt-0.5 text-[11px] text-[#e5e7eb] leading-snug">
        <Highlight
          text={item.summary || item.headline}
          keyFigures={item.key_figures}
        />
      </div>

      {expanded && (
        <div className="mt-2 pl-3 border-l border-[#1b2b1b] text-[10px] space-y-1">
          <div className="text-[#6b7280]">{item.headline}</div>
          {item.url && (
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
}

export function NewsPanelCard({
  title,
  items,
  maxHeight = "100%",
  emptyMessage = "No items",
  showTickers = true,
}: NewsPanelCardProps) {
  return (
    <div
      className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] flex flex-col h-full"
      style={{ maxHeight }}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1b2b1b]">
        <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider">
          {title}
        </h3>
        <span className="text-[10px] text-[#374151]">{items.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-20 text-[10px] text-[#374151]">
            {emptyMessage}
          </div>
        ) : (
          items.map((item) => (
            <NewsRow key={item.id} item={item} showTickers={showTickers} />
          ))
        )}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
git add frontend/app/components/NewsPanelCard.tsx
git commit -m "feat: add reusable NewsPanelCard for dashboard feed panels"
```

---

## Task 10: Frontend — Watchlist Panel Component

**Files:**
- Create: `frontend/app/components/WatchlistPanel.tsx`

**Step 1: Create WatchlistPanel**

Create `frontend/app/components/WatchlistPanel.tsx`:

```typescript
"use client";

import { useState, useEffect, useCallback } from "react";
import { NewsItemData, QuoteData } from "../lib/types";
import { fetchQuote } from "../lib/api";
import { Highlight } from "./Highlight";

interface WatchlistPanelProps {
  watchlist: string[];
  onUpdateWatchlist: (tickers: string[]) => void;
  watchlistItems: NewsItemData[];
}

function TickerCard({ symbol, quote }: { symbol: string; quote: QuoteData | null }) {
  const change = quote?.changePercent ?? 0;
  const isPositive = change >= 0;
  const color = isPositive ? "text-[#10b981]" : "text-[#ef4444]";
  const arrow = isPositive ? "\u25B2" : "\u25BC";

  return (
    <div className="bg-[#080c08] rounded border border-[#1b2b1b] p-2 flex items-center justify-between">
      <div>
        <span className="text-xs font-bold text-[#eab308]">{symbol}</span>
        {quote?.companyName && (
          <span className="text-[9px] text-[#374151] ml-1.5 hidden xl:inline">
            {quote.companyName.substring(0, 15)}
          </span>
        )}
      </div>
      <div className="text-right">
        <div className="text-xs font-semibold text-[#e5e7eb]">
          {quote ? `\u20B9${quote.ltp.toLocaleString("en-IN")}` : "--"}
        </div>
        <div className={`text-[10px] ${color}`}>
          {arrow} {Math.abs(change).toFixed(2)}%
        </div>
      </div>
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

  const refreshQuotes = useCallback(async () => {
    for (const symbol of watchlist) {
      try {
        const q = await fetchQuote(symbol);
        setQuotes((prev) => ({ ...prev, [symbol]: q }));
      } catch {
        // skip failed quotes
      }
    }
  }, [watchlist]);

  useEffect(() => {
    if (watchlist.length === 0) return;
    refreshQuotes();
    const interval = setInterval(refreshQuotes, 30_000);
    return () => clearInterval(interval);
  }, [watchlist, refreshQuotes]);

  const addTicker = () => {
    const ticker = input.trim().toUpperCase();
    if (ticker && !watchlist.includes(ticker)) {
      onUpdateWatchlist([...watchlist, ticker]);
    }
    setInput("");
  };

  const removeTicker = (ticker: string) => {
    onUpdateWatchlist(watchlist.filter((t) => t !== ticker));
  };

  return (
    <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1b2b1b]">
        <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider">
          Watchlist
        </h3>
        <span className="text-[10px] text-[#374151]">{watchlist.length}</span>
      </div>

      {/* Add ticker input */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-[#1b2b1b]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && addTicker()}
          placeholder="Add ticker..."
          className="flex-1 bg-transparent text-[11px] text-[#e5e7eb] placeholder-[#374151] outline-none"
        />
        <button
          onClick={addTicker}
          className="text-[10px] text-[#10b981] hover:text-[#34d399] px-1"
        >
          + ADD
        </button>
      </div>

      {/* Ticker cards */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {watchlist.length === 0 ? (
          <div className="flex items-center justify-center h-16 text-[10px] text-[#374151]">
            Add tickers to watchlist
          </div>
        ) : (
          <>
            {watchlist.map((symbol) => (
              <div key={symbol} className="relative group">
                <TickerCard symbol={symbol} quote={quotes[symbol] ?? null} />
                <button
                  onClick={() => removeTicker(symbol)}
                  className="absolute top-1 right-1 text-[10px] text-[#ef4444] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  x
                </button>
              </div>
            ))}

            {/* Watchlist news items */}
            {watchlistItems.length > 0 && (
              <div className="mt-2 pt-2 border-t border-[#1b2b1b]">
                <div className="text-[9px] text-[#374151] uppercase mb-1">
                  Related News
                </div>
                {watchlistItems.slice(0, 10).map((item) => (
                  <div
                    key={item.id}
                    className="py-1 text-[10px] text-[#6b7280] border-b border-[#1b2b1b]/30"
                  >
                    <span className="text-[#eab308] font-bold mr-1">
                      {item.tickers[0]}
                    </span>
                    <Highlight
                      text={(item.summary || item.headline).substring(0, 60)}
                      keyFigures={item.key_figures}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
git add frontend/app/components/WatchlistPanel.tsx
git commit -m "feat: add WatchlistPanel with live quotes and related news"
```

---

## Task 11: Frontend — Recent Filings Table Component

**Files:**
- Create: `frontend/app/components/RecentFilings.tsx`

**Step 1: Create RecentFilings**

Create `frontend/app/components/RecentFilings.tsx`:

```typescript
"use client";

import { NewsItemData } from "../lib/types";

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
  const filings = items.slice(0, 20);

  return (
    <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#1b2b1b]">
        <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider">
          Recent Filings
        </h3>
        <span className="text-[10px] text-[#374151]">{items.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-[9px] text-[#374151] uppercase border-b border-[#1b2b1b]">
              <th className="text-left px-3 py-1.5 w-12">Time</th>
              <th className="text-left px-3 py-1.5 w-20">Symbol</th>
              <th className="text-left px-3 py-1.5">Headline</th>
              <th className="text-center px-3 py-1.5 w-16">Impact</th>
              <th className="text-center px-3 py-1.5 w-10">Sent.</th>
            </tr>
          </thead>
          <tbody>
            {filings.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[#1b2b1b]/30 hover:bg-[#1b2b1b]/20 transition-colors"
              >
                <td className="px-3 py-1.5 text-[#374151]">
                  {formatIST(item.ingested_at)}
                </td>
                <td className="px-3 py-1.5 text-[#eab308] font-bold">
                  {item.tickers[0] || "--"}
                </td>
                <td className="px-3 py-1.5 text-[#e5e7eb] truncate max-w-0">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#10b981] transition-colors"
                    >
                      {item.summary || item.headline}
                    </a>
                  ) : (
                    item.summary || item.headline
                  )}
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
```

**Step 2: Commit**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
git add frontend/app/components/RecentFilings.tsx
git commit -m "feat: add RecentFilings table component"
```

---

## Task 12: Frontend — Main Dashboard Page (wire everything together)

**Files:**
- Modify: `frontend/app/page.tsx` (replace entirely)

**Step 1: Replace page.tsx with full dashboard**

Replace entire contents of `frontend/app/page.tsx`:

```typescript
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Header } from "./components/Header";
import { HighImpactStrip } from "./components/HighImpactStrip";
import { SentimentDonut } from "./components/SentimentDonut";
import { NewsVelocity } from "./components/NewsVelocity";
import { NewsPanelCard } from "./components/NewsPanelCard";
import { WatchlistPanel } from "./components/WatchlistPanel";
import { RecentFilings } from "./components/RecentFilings";
import { routeAllNews } from "./lib/route-news";
import { isHighImpactAlert } from "./lib/route-news";
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
    return JSON.parse(localStorage.getItem("pm_watchlist") || "[]");
  } catch {
    return [];
  }
}

function saveWatchlist(tickers: string[]) {
  localStorage.setItem("pm_watchlist", JSON.stringify(tickers));
}

export default function Dashboard() {
  // Core state
  const [items, setItems] = useState<NewsItemData[]>([]);
  const [connected, setConnected] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [marketStatus, setMarketStatus] = useState<MarketStatusData[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const soundEnabledRef = useRef(true);

  // Load watchlist from localStorage
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

  // Initial data load
  useEffect(() => {
    fetchNews(1000).then(setItems).catch(console.error);
    fetchStats().then(setStats).catch(console.error);
    fetchIndices().then(setIndices).catch(console.error);
    fetchMarketStatus().then(setMarketStatus).catch(console.error);
  }, []);

  // Polling for stats, indices, market status
  useEffect(() => {
    const statsInterval = setInterval(() => {
      fetchStats().then(setStats).catch(console.error);
    }, 30_000);

    const indicesInterval = setInterval(() => {
      fetchIndices().then(setIndices).catch(console.error);
    }, 30_000);

    const statusInterval = setInterval(() => {
      fetchMarketStatus().then(setMarketStatus).catch(console.error);
    }, 60_000);

    return () => {
      clearInterval(statsInterval);
      clearInterval(indicesInterval);
      clearInterval(statusInterval);
    };
  }, []);

  // SSE connection
  useEffect(() => {
    const es = createSSEConnection(
      (newItem) => {
        setItems((prev) => [newItem, ...prev]);

        // Sound alert for high impact
        if (soundEnabledRef.current && isHighImpactAlert(newItem)) {
          playAlertSound(newItem.sentiment === "positive" ? "positive" : "negative");
        }
      },
      () => setConnected(true),
      () => setConnected(false)
    );

    return () => es.close();
  }, []);

  // Route news into panels
  const routed = routeAllNews(items, watchlist);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header
        indices={indices}
        marketStatus={marketStatus}
        connected={connected}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        totalItems={items.length}
      />
      <HighImpactStrip items={routed.highImpact} />

      {/* Main dashboard grid */}
      <div className="flex-1 overflow-hidden p-2 gap-2 flex flex-col">
        {/* Top row: Charts + Ticker Alerts + Watchlist */}
        <PanelGroup direction="horizontal" className="flex-1 min-h-0">
          {/* Left: Charts + Watchlist stacked */}
          <Panel defaultSize={30} minSize={20}>
            <div className="flex flex-col gap-2 h-full">
              <div className="flex gap-2 h-40">
                <div className="w-1/2">
                  <SentimentDonut stats={stats} />
                </div>
                <div className="w-1/2">
                  <NewsVelocity stats={stats} />
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <WatchlistPanel
                  watchlist={watchlist}
                  onUpdateWatchlist={updateWatchlist}
                  watchlistItems={routed.watchlistItems}
                />
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-[#1b2b1b]/50 hover:bg-[#10b981]/50 transition-colors rounded mx-0.5" />

          {/* Center: Ticker Alerts (largest) */}
          <Panel defaultSize={40} minSize={25}>
            <NewsPanelCard
              title="Ticker Alerts"
              items={routed.tickerAlerts}
              emptyMessage="No stock-specific news yet"
            />
          </Panel>

          <PanelResizeHandle className="w-1 bg-[#1b2b1b]/50 hover:bg-[#10b981]/50 transition-colors rounded mx-0.5" />

          {/* Right: Govt + Global stacked */}
          <Panel defaultSize={30} minSize={20}>
            <div className="flex flex-col gap-2 h-full">
              <div className="flex-1 min-h-0">
                <NewsPanelCard
                  title="Govt & Regulatory"
                  items={routed.govtRegulatory}
                  emptyMessage="No regulatory news"
                  showTickers={false}
                />
              </div>
              <div className="flex-1 min-h-0">
                <NewsPanelCard
                  title="Global & Geopolitical"
                  items={routed.globalGeo}
                  emptyMessage="No global news"
                  showTickers={false}
                />
              </div>
            </div>
          </Panel>
        </PanelGroup>

        {/* Bottom row: Market Pulse + Recent Filings */}
        <PanelGroup direction="horizontal" className="h-52 shrink-0">
          <Panel defaultSize={40} minSize={25}>
            <NewsPanelCard
              title="Market Pulse"
              items={routed.marketPulse}
              emptyMessage="No market news"
            />
          </Panel>

          <PanelResizeHandle className="w-1 bg-[#1b2b1b]/50 hover:bg-[#10b981]/50 transition-colors rounded mx-0.5" />

          <Panel defaultSize={60} minSize={30}>
            <RecentFilings items={routed.recentFilings} />
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
```

**Step 2: Verify the frontend compiles and renders**

```bash
cd /Users/sauhardgupta/internship/paisaMachine/frontend && npm run dev
```
Open http://localhost:3000 in browser — should see the full dashboard layout.

**Step 3: Commit**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
git add frontend/app/page.tsx
git commit -m "feat: wire up full trader dashboard with all panels, charts, and SSE"
```

---

## Task 13: Cleanup — Remove Old Components

**Files:**
- Delete: `frontend/app/components/NewsFeed.tsx`
- Delete: `frontend/app/components/NewsItem.tsx`
- Delete: `frontend/app/components/Filters.tsx`
- Keep: `frontend/app/components/Highlight.tsx` (still used)

**Step 1: Remove old components**

```bash
rm /Users/sauhardgupta/internship/paisaMachine/frontend/app/components/NewsFeed.tsx
rm /Users/sauhardgupta/internship/paisaMachine/frontend/app/components/NewsItem.tsx
rm /Users/sauhardgupta/internship/paisaMachine/frontend/app/components/Filters.tsx
```

**Step 2: Verify frontend still builds**

```bash
cd /Users/sauhardgupta/internship/paisaMachine/frontend && npm run build 2>&1 | tail -5
```

**Step 3: Commit**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
git add -A
git commit -m "chore: remove old single-feed components replaced by dashboard"
```

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Install dependencies | frontend/package.json |
| 2 | Stats endpoint | backend: storage.ts, routes/stats.ts, index.ts |
| 3 | Market proxy endpoints | backend: routes/market.ts, index.ts |
| 4 | CSS theme | frontend: globals.css, layout.tsx |
| 5 | Types + routing + sounds + API | frontend: lib/*.ts (4 files) |
| 6 | Header component | frontend: components/Header.tsx |
| 7 | HighImpactStrip | frontend: components/HighImpactStrip.tsx |
| 8 | Charts (donut + velocity) | frontend: components/SentimentDonut.tsx, NewsVelocity.tsx |
| 9 | NewsPanelCard (reusable) | frontend: components/NewsPanelCard.tsx |
| 10 | WatchlistPanel | frontend: components/WatchlistPanel.tsx |
| 11 | RecentFilings table | frontend: components/RecentFilings.tsx |
| 12 | Dashboard page (wire all) | frontend: page.tsx |
| 13 | Cleanup old components | delete 3 old files |
