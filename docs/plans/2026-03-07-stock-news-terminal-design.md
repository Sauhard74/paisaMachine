# PaisaMachine — Ultra-Low Latency Stock News Terminal

## Design Document

Date: 2026-03-07

---

## 1. Overview

Real-time stock news aggregation system for Indian markets. Ingests news from 10 sources, processes with LLM for ticker mapping/sentiment/categorization, and displays in a fast terminal-style UI.

Goal: Surface actionable market news before it's widely distributed and priced into derivatives.

## 2. Architecture

Three local components:

```
n8n (Docker) → Node.js Backend → Next.js Frontend
  ingestion      processing         display
                 storage
```

- **n8n** (port 5678): Polls sources, pushes raw items to backend via HTTP POST
- **Backend** (port 3001): Dedup, LLM processing, storage, SSE broadcast
- **Frontend** (port 3000): Real-time terminal UI connected via SSE
- **Redis** (port 6379): Dedup cache, 24h TTL
- **SQLite**: Historical storage

## 3. Ingestion Sources

| # | Source | Method | Poll Interval |
|---|--------|--------|---------------|
| 1 | NSE RSS | RSS Trigger | 1 min |
| 2 | BSE RSS | RSS Trigger | 1 min |
| 3 | NSE JSON API | HTTP Request | 30 sec |
| 4 | BSE JSON API | HTTP Request | 30 sec |
| 5 | Zerodha Pulse | HTTP Request + HTML Extract | 2 min |
| 6 | Moneycontrol | RSS Trigger (multiple feeds) | 1 min |
| 7 | Twitter — Redbox India | Twitter node | 1-2 min |
| 8 | Twitter — NSE India | Twitter node | 1-2 min |
| 9 | Twitter — BSE India | Twitter node | 1-2 min |
| 10 | Twitter — Capital Market | Twitter node | 1-2 min |

Each workflow normalizes output to:

```json
{
  "source": "nse_json_api",
  "headline": "...",
  "url": "https://...",
  "published_at": "2026-03-07T10:30:00Z",
  "raw_content": "...",
  "source_id": "unique-id"
}
```

All workflows POST to `http://localhost:3001/api/ingest`.

NSE/BSE JSON APIs require proper headers (User-Agent, Referer, cookies).

Twitter Basic tier: 10,000 reads/month. 4 accounts batched to stay within limits.

## 4. Processing Pipeline

```
Incoming item → Dedup → LLM Processing → Store → Broadcast
```

### 4.1 Dedup (Redis)

Exact-match only. No fuzzy/semantic dedup — evolving stories must pass through.

- Primary: `hash(source + source_id)`
- Fallback: `hash(url)`
- TTL: 24 hours

"Company in talks for deal" (Day 1) and "Company signs deal" (Day 2) are NOT duplicates.

### 4.2 LLM Processing (Claude Haiku 4.5)

Single API call per item returns structured JSON:

```json
{
  "tickers": ["RELIANCE", "TCS"],
  "sentiment": "positive",
  "category": "order_win",
  "impact": "high",
  "summary": "Tata Motors bags 2,000 EV bus order worth Rs 3,400 crore",
  "key_figures": ["2,000 EV bus", "Rs 3,400 crore"]
}
```

Categories: corporate_filing, earnings, order_win, regulatory, broker_report, offer_announcement, management_change, sector_news, other.

Sentiment: positive, negative, neutral.

Impact: high, medium, low.

key_figures: extracted for orange/bold highlighting in UI.

### 4.3 Ticker Reference Data

- Full NSE + BSE listed company lists loaded at startup
- Source: NSE equity list CSV, BSE equivalent
- Auto-refreshed daily
- Used to validate LLM ticker output

### 4.4 Storage (SQLite)

```sql
CREATE TABLE news_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,
  headline TEXT NOT NULL,
  url TEXT,
  summary TEXT,
  raw_content TEXT,
  published_at DATETIME,
  ingested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  tickers JSON,
  sentiment TEXT,
  category TEXT,
  impact TEXT,
  key_figures JSON,
  source_id TEXT,
  fingerprint TEXT UNIQUE
);

CREATE INDEX idx_tickers ON news_items(tickers);
CREATE INDEX idx_published ON news_items(published_at);
CREATE INDEX idx_sentiment ON news_items(sentiment);
```

### 4.5 Broadcast (SSE)

After storing, push processed item to all connected frontend clients via Server-Sent Events at `GET /api/stream`.

Error handling:
- Haiku API failure: queue for retry (max 3 attempts)
- Redis down: fall back to in-memory Set
- All errors logged with source context

## 5. Frontend Terminal

Dark terminal-style UI. Next.js + Tailwind CSS. Monospace font.

### Color System

- **Green** — positive sentiment (arrows, badges)
- **Red** — negative sentiment
- **Grey** — neutral
- **Orange + bold** — facts and figures (amounts, percentages, quantities)
- **White** — regular headline text

### Layout

- Newest items on top
- Each item: 2 lines (metadata + headline)
- Click to expand: full content, URL, all tickers
- Live filters: source, ticker, category, sentiment, impact, search
- Connection status indicator (top-right)
- Optional sound ping for high-impact items

### API Endpoints

- `GET /api/stream` — SSE real-time feed
- `GET /api/news` — historical items with filter params
- `POST /api/ingest` — webhook for n8n

## 6. Project Structure

```
paisaMachine/
├── docker-compose.yml
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   │   ├── ingest.ts
│   │   │   ├── news.ts
│   │   │   └── sse.ts
│   │   ├── services/
│   │   │   ├── dedup.ts
│   │   │   ├── llm.ts
│   │   │   ├── storage.ts
│   │   │   └── broadcast.ts
│   │   ├── data/
│   │   │   ├── nse-symbols.json
│   │   │   └── bse-symbols.json
│   │   └── utils/
│   │       └── ticker-refresh.ts
│   └── tsconfig.json
├── frontend/
│   ├── package.json
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── NewsFeed.tsx
│   │       ├── NewsItem.tsx
│   │       ├── Filters.tsx
│   │       └── Highlight.tsx
│   └── tailwind.config.ts
├── n8n/
│   └── workflows/
│       ├── nse-rss.json
│       ├── bse-rss.json
│       ├── nse-json-api.json
│       ├── bse-json-api.json
│       ├── zerodha-pulse.json
│       ├── moneycontrol.json
│       └── twitter-feeds.json
└── docs/
    └── plans/
```

## 7. Runtime Dependencies

- Docker (n8n + Redis via docker-compose)
- Node.js 20+
- Anthropic API key (Haiku)
- Twitter API Basic key

## 8. Startup

1. `docker-compose up -d` — n8n + Redis
2. `cd backend && npm run dev` — backend on :3001
3. `cd frontend && npm run dev` — frontend on :3000
4. Import workflow JSONs into n8n

## 9. Deferred (Future Phases)

- TradingView news feed integration
- Screener.in updates integration
- Telegram/mobile push alerts
- Sound alerts for high-impact news
- Custom stock watchlists
- NLP summarization of filings
- AI-based impact scoring
- Order book correlation with news
- Historical event database
