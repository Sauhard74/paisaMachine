# SQLite to Supabase Migration

## Problem
Render has ephemeral disk storage. Every redeploy wipes the SQLite database, losing all ingested news items.

## Solution
Replace SQLite (`better-sqlite3`) with Supabase (PostgreSQL) via `@supabase/supabase-js`.

## Schema

```sql
CREATE TABLE news_items (
  id BIGSERIAL PRIMARY KEY,
  source TEXT NOT NULL,
  headline TEXT NOT NULL,
  url TEXT,
  summary TEXT,
  raw_content TEXT,
  published_at TIMESTAMPTZ,
  ingested_at TIMESTAMPTZ DEFAULT NOW(),
  tickers JSONB DEFAULT '[]',
  sentiment TEXT,
  category TEXT,
  impact TEXT,
  key_figures JSONB DEFAULT '[]',
  source_id TEXT,
  fingerprint TEXT UNIQUE
);

CREATE INDEX idx_published ON news_items(published_at);
CREATE INDEX idx_sentiment ON news_items(sentiment);
CREATE INDEX idx_category ON news_items(category);
CREATE INDEX idx_ingested ON news_items(ingested_at);
```

## Code Changes

### Files modified
- `backend/src/services/storage.ts` — replace `better-sqlite3` with `@supabase/supabase-js`
- `backend/package.json` — swap dependency
- `backend/.env` / `.env.example` — add `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`
- Render env vars — add the same

### Files unchanged
- All route files, index.ts, dedup service, fetchers, frontend — zero changes

### Method mapping
- `insert()` → `supabase.from('news_items').insert(...).select('id').single()`
- `getRecent()` → `supabase.from('news_items').select('*')` with chained filters
- `getStats()` → 3 separate Supabase queries (sentiment counts, category counts, velocity)
- `close()` → no-op

## Environment Variables
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_KEY` — service role key (server-side only)
