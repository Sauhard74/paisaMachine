# PaisaMachine Trader Dashboard — Design Document

## Goal

Transform the current single-feed news terminal into a multi-panel trading dashboard with charts, live market data, sound alerts, and smart news categorization — a platform that helps traders keep up with the Indian stock market as fast as possible.

## Architecture

The frontend becomes a card-based dashboard grid (inspired by Bloomberg/BlockTrade terminals) with a dark theme and green accents. News items are routed into specialized panels based on LLM-assigned categories and ticker presence. New backend endpoints proxy NSE APIs for live stock/index data and serve aggregated stats for charts. No changes to the existing ingestion pipeline or data model.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, recharts, react-resizable-panels, Web Audio API
- **Backend additions:** 4 new Express endpoints (stats, indices, quote, market-status)
- **External APIs:** NSE India (indices, quotes, market status), Yahoo Finance (sparkline charts)
- **Storage:** localStorage for watchlist persistence

---

## Layout

```
+------------------------------------------------------------------------+
| Header: Logo | Dashboard Watchlist Alerts | Market:Open | NIFTY SENSEX |
|              |                            | BANKNIFTY   | Search | Mute |
+------------------------------------------------------------------------+
| HIGH IMPACT STRIP (auto-scroll, sound alerts)                          |
+------------------------------------------------------------------------+
|                          |                                              |
| Sentiment    | News      |  TICKER ALERTS (40% width)                   |
| Donut Chart  | Velocity  |  - Watchlist pinned tickers at top           |
| (recharts)   | Sparkline |  - All stock-specific news below             |
|              |           |  - Color-coded sentiment bars                |
+--------------+-----------+                                              |
| WATCHLIST               |                                              |
| Pinned tickers w/ LTP,  |                                              |
| change%, mini sparkline  |                                              |
| [+ Add ticker]          |                                              |
+--------------------------+----------------------------------------------+
| MARKET PULSE (33%)       | GLOBAL & GEO (33%)  | GOVT & REG (33%)      |
| Sector/macro news        | War, crude, forex    | SEBI, RBI, tax        |
+--------------------------+---------------------+-----------------------+
| RECENT FILINGS TABLE (full width)                                      |
| Symbol | Category | Headline | Impact | Sentiment | Time               |
+------------------------------------------------------------------------+
| Footer: Sources | Live indicator                                       |
+------------------------------------------------------------------------+
```

### Panel Sizing (defaults, resizable)
- Ticker Alerts: ~40% width, full middle height
- Charts row: ~60% width, split between sentiment donut + velocity sparkline
- Watchlist: below charts, ~60% width
- Bottom panels (Market Pulse, Global, Govt): equal thirds, ~200px height
- Recent Filings: full width table at bottom

---

## Panel Routing Logic

Each incoming news item is routed to exactly one panel based on priority:

| Panel | Rule |
|-------|------|
| High Impact Strip | `impact === "high" && sentiment !== "neutral"` |
| Ticker Alerts | Has tickers AND category in (earnings, order_win, corporate_filing, management_change, offer_announcement, broker_report) |
| Watchlist | Has tickers matching user's pinned list (subset shown separately at top of Ticker Alerts) |
| Govt & Regulatory | `category === "regulatory"` |
| Global & Geo | No Indian tickers + category is other/sector_news (bloomberg, war, global macro keywords) |
| Market Pulse | Everything else (sector_news with tickers, general market) |
| Recent Filings | All corporate_filing items (duplicated into table view) |

### Global/Geo Detection Keywords
Items without tickers containing: war, iran, china, fed, oil, crude, dollar, euro, tariff, global, us market, wall street, nasdaq, dow jones, s&p 500, opec, brent, wti, forex, yen, yuan

---

## New Backend Endpoints

### GET /api/stats
Returns aggregated stats for dashboard charts. Computed from SQLite.
```json
{
  "sentiment_counts": { "positive": 142, "negative": 98, "neutral": 166 },
  "category_counts": { "earnings": 45, "regulatory": 30, "order_win": 22, ... },
  "velocity": [
    { "minute": "2026-03-07T09:15:00Z", "count": 12 },
    { "minute": "2026-03-07T09:16:00Z", "count": 8 }
  ],
  "total_items": 406
}
```
- Velocity: last 120 minutes, bucketed by minute
- Frontend polls every 30 seconds

### GET /api/indices
Proxies `https://www.nseindia.com/api/allIndices` with NSE cookie session.
Returns NIFTY 50, SENSEX, BANK NIFTY values + change + % change.
Cached for 30 seconds.

### GET /api/quote/:symbol
Proxies `https://www.nseindia.com/api/quote-equity?symbol=:symbol` with NSE cookies.
Returns LTP, change, change%, open, high, low, close, volume.
Cached for 30 seconds.

### GET /api/market-status
Proxies `https://www.nseindia.com/api/marketStatus` with NSE cookies.
Returns market open/closed/pre-open status.
Cached for 60 seconds.

---

## Component Tree

```
Dashboard (page.tsx)
  Header
    Logo + "PaisaMachine"
    NavTabs (Dashboard / Watchlist / Alerts)
    MarketStatus (open/closed badge)
    IndexTickers (NIFTY, SENSEX, BANKNIFTY live prices)
    GlobalSearch
    SoundToggle (mute/unmute)
    ConnectionStatus
  HighImpactStrip (horizontal auto-scroll, sound trigger)
  DashboardGrid (CSS Grid + react-resizable-panels)
    SentimentDonut (recharts PieChart)
    NewsVelocity (recharts AreaChart sparkline)
    TickerAlerts (scrollable feed, largest panel)
    WatchlistPanel (pinned tickers + mini price cards + their news)
    GovtRegulatory (scrollable feed)
    MarketPulse (scrollable feed)
    GlobalGeo (scrollable feed)
    RecentFilings (table view, full-width bottom)
  Footer (source attribution, live indicator)
```

---

## Charts (recharts)

1. **Sentiment Donut** — PieChart showing positive/negative/neutral ratio from /api/stats
2. **News Velocity** — AreaChart sparkline showing items/minute over last 2 hours from /api/stats
3. **Category Bar** — BarChart showing distribution across categories from /api/stats
4. **Watchlist Mini Sparklines** — tiny line charts per ticker (Yahoo Finance 5-day OHLC data)

---

## Sound Alerts

- **Trigger:** SSE item where `impact === "high" && sentiment !== "neutral"`
- **Implementation:** Web Audio API, short ping/chime sound
- **Positive high-impact:** ascending tone
- **Negative high-impact:** descending tone
- **Mute toggle** in header, persisted in localStorage

---

## Watchlist

- Stored in localStorage as `string[]` of NSE ticker symbols
- Input field in Watchlist panel to add/remove tickers
- Each ticker shows: symbol, LTP, change%, sentiment indicator, news count
- Mini sparkline chart per ticker (Yahoo Finance data)
- News items matching watchlist tickers are highlighted/pinned at top of Ticker Alerts panel

---

## Visual Design

### Color Palette
- Background: `#080c08` (dark with subtle green tint)
- Card background: `#0d1117` with border `#1b2b1b`
- Green accent: `#10b981` (positive, active states, borders)
- Red: `#ef4444` (negative sentiment)
- Orange: `#f59e0b` (key figures, high impact badge)
- Yellow: `#eab308` (ticker symbols)
- Text primary: `#e5e7eb`
- Text secondary: `#6b7280`

### Card Style
- Rounded corners (rounded-lg)
- Subtle border (border-gray-800/green-900)
- Slight background fill (bg-gray-900/50)
- High-impact cards get subtle glow effect (shadow-lg shadow-green-500/10 or shadow-red-500/10)

---

## Data Flow

1. **Initial load:** Frontend fetches `/api/news?limit=1000` + `/api/stats` + `/api/indices` + `/api/market-status`
2. **Live updates:** SSE from `/api/stream` — new items routed to correct panel client-side
3. **Polling:** `/api/stats` every 30s, `/api/indices` every 30s, `/api/market-status` every 60s
4. **Watchlist quotes:** `/api/quote/:symbol` for each watchlist ticker every 30s during market hours
5. **Sparklines:** Yahoo Finance chart API for 5-day data, fetched once on mount + every 5 min

---

## What Stays The Same
- All backend ingestion (fetchers, LLM processing, dedup, storage)
- SQLite schema
- SSE broadcast
- `/api/news` and `/api/stream` endpoints
- `NewsItemData` interface
