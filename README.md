# PaisaMachine

Real-time Indian stock market news aggregation terminal with AI-powered classification. Pulls from 10+ sources, processes through Claude Haiku for sentiment/ticker/category tagging, and displays in a multi-panel trading dashboard with live updates.

![Dashboard](https://img.shields.io/badge/status-active-10b981) ![Stack](https://img.shields.io/badge/stack-Next.js%20%2B%20Express%20%2B%20SQLite-blue)

## What it does

- Aggregates news from **NSE, BSE, Zerodha Pulse, Economic Times, Mint, NDTV, Moneycontrol, Bloomberg, TradingView, Screener**
- Every item passes through **Claude Haiku** for: summary, ticker extraction, sentiment (positive/negative/neutral), category, impact level, key figures
- Routes news into specialized panels: Ticker Alerts, Market Pulse, Global & Geo, Govt & Regulatory, Recent Filings
- **Live SSE streaming** — new items appear instantly without polling
- **Sound alerts** for high-impact news (Web Audio API)
- **Watchlist** with live NSE quotes and related news filtering
- **Stock detail pages** with candlestick charts (Yahoo Finance), order book, fundamentals
- **Resizable panels** — drag to customize layout

## Architecture

```
┌─────────────────────────────────────────────────┐
│  Frontend (Next.js 16, Tailwind, recharts)       │
│  Resizable panel dashboard + SSE client          │
└──────────────────────┬──────────────────────────┘
                       │ REST + SSE
┌──────────────────────▼──────────────────────────┐
│  Backend (Express 5, TypeScript)                 │
│  ┌──────────┐ ┌─────────┐ ┌──────────────────┐  │
│  │ Fetchers │→│ Dedup   │→│ LLM Queue (10x)  │  │
│  │ (8 srcs) │ │ (Redis) │ │ (Claude Haiku)   │  │
│  └──────────┘ └─────────┘ └────────┬─────────┘  │
│                                    ▼             │
│  ┌──────────┐ ┌─────────┐ ┌──────────────────┐  │
│  │ SSE      │←│ Storage │←│ Insert + Broadcast│  │
│  │ Broadcast│ │ (SQLite)│ └──────────────────┘  │
│  └──────────┘ └─────────┘                        │
│  ┌──────────────────────────────────────────┐    │
│  │ Market Routes (NSE proxy, Yahoo Finance) │    │
│  └──────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
```

## Quick Start

### Prerequisites

- Node.js 20+
- Docker (for Redis)
- [Anthropic API key](https://console.anthropic.com/)

### 1. Clone and install

```bash
git clone https://github.com/Sauhard74/paisaMachine.git
cd paisaMachine

cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:
```
ANTHROPIC_API_KEY=sk-ant-...    # Required
REDIS_URL=redis://localhost:6379 # Optional (falls back to in-memory)
TWITTER_BEARER_TOKEN=            # Optional
```

### 3. Start Redis

```bash
docker compose up -d
```

### 4. Run

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Open **http://localhost:3000**

## Data Sources

| Source | Type | Frequency | Data |
|--------|------|-----------|------|
| NSE India | JSON API | 30s | Corporate announcements, filings |
| BSE India | JSON API | 30s | Corporate announcements |
| Economic Times | RSS | 60s | Market news, analysis |
| Livemint | RSS | 60s | Business news |
| Moneycontrol | RSS | 60s | Stock market news |
| Bloomberg | RSS | 60s | Global markets, macro |
| Zerodha Pulse | Scraper | 2min | Curated market news |
| TradingView | API | 2min | NIFTY/SENSEX headlines |
| Screener.in | Scraper | 5min | Quarterly results, new highs |
| Twitter/X | API | 5min | Market accounts (requires credits) |

## Dashboard Panels

| Panel | Content |
|-------|---------|
| **High Impact Strip** | Auto-scrolling ticker of high-impact non-neutral news |
| **Sentiment Donut** | Real-time positive/negative/neutral ratio |
| **News Velocity** | Items per minute sparkline (last 2 hours) |
| **Ticker Alerts** | Stock-specific news (earnings, orders, filings, broker reports) |
| **Watchlist** | Pinned stocks with live quotes + related news |
| **Govt & Regulatory** | SEBI, RBI, tax, policy news |
| **Global & Geopolitical** | War, crude, forex, tariffs, global macro |
| **Market Pulse** | General sector and market news |
| **Recent Filings** | Corporate filing table view |

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/news` | Paginated news with filters (sentiment, category, impact, ticker, search) |
| `GET /api/stream` | SSE stream of new items |
| `GET /api/stats` | Sentiment counts, category distribution, velocity |
| `GET /api/market/indices` | Live NIFTY, SENSEX, BANKNIFTY prices |
| `GET /api/market/quote/:symbol` | Stock quote from NSE |
| `GET /api/market/quote-fast/:symbol` | Fast quote via Yahoo Finance |
| `GET /api/market/chart/:symbol` | OHLCV candlestick data |
| `GET /api/market/fundamentals/:symbol` | PE, market cap, promoter holding |
| `GET /api/market/search?q=` | Stock symbol search |
| `GET /api/market/status` | Market open/closed status |
| `POST /api/ingest` | Manual news ingestion endpoint |

## Tech Stack

**Frontend:** Next.js 16 (App Router), Tailwind CSS 4, recharts, react-resizable-panels, lightweight-charts, Web Audio API

**Backend:** Express 5, TypeScript, better-sqlite3, ioredis, Claude Haiku (Anthropic SDK)

**Infra:** Docker (Redis), SQLite (WAL mode), SSE for real-time updates

## Security

- Helmet security headers
- CORS whitelist
- Rate limiting (500 req/15min global, 20 req/min for ingest)
- Input validation on all query parameters
- SQL injection prevention (parameterized queries + LIKE escaping)
- URL validation before rendering external links
- Request size limits (1MB)

## Project Structure

```
paisaMachine/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Express app, LLM queue, fetcher orchestration
│   │   ├── routes/               # news, stream, stats, market, ingest
│   │   ├── services/
│   │   │   ├── storage.ts        # SQLite with WAL, queries, stats
│   │   │   ├── dedup.ts          # Redis dedup with in-memory fallback
│   │   │   ├── llm.ts            # Claude Haiku processing pipeline
│   │   │   ├── broadcast.ts      # SSE broadcast to connected clients
│   │   │   ├── proxy-pool.ts     # Rotating proxy pool for blocked APIs
│   │   │   ├── exchange-fetcher.ts  # NSE/BSE with cookie management
│   │   │   ├── rss-fetcher.ts    # ET, Mint, MC, Bloomberg RSS
│   │   │   ├── pulse-fetcher.ts  # Zerodha Pulse scraper
│   │   │   ├── tradingview-fetcher.ts
│   │   │   ├── screener-fetcher.ts
│   │   │   └── twitter-fetcher.ts
│   │   └── tests/
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── page.tsx              # Dashboard with resizable panels
│   │   ├── stock/[symbol]/       # Stock detail page
│   │   ├── components/           # Header, panels, charts, watchlist
│   │   └── lib/                  # API client, types, news routing, sounds
│   └── package.json
├── docker-compose.yml            # Redis
└── docs/plans/                   # Design docs
```
