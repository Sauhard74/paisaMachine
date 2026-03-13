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

-- RPC functions for stats
CREATE OR REPLACE FUNCTION get_sentiment_counts()
RETURNS TABLE(sentiment TEXT, count BIGINT) AS $$
  SELECT sentiment, COUNT(*) FROM news_items GROUP BY sentiment;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION get_category_counts()
RETURNS TABLE(category TEXT, count BIGINT) AS $$
  SELECT category, COUNT(*) FROM news_items GROUP BY category;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION get_velocity()
RETURNS TABLE(minute TEXT, count BIGINT) AS $$
  SELECT to_char(date_trunc('minute', ingested_at), 'YYYY-MM-DD"T"HH24:MI:00"Z"') as minute,
         COUNT(*) as count
  FROM news_items
  WHERE ingested_at >= NOW() - INTERVAL '120 minutes'
  GROUP BY minute
  ORDER BY minute ASC;
$$ LANGUAGE sql;
