import Database from "better-sqlite3";

export interface NewsItem {
  source: string;
  headline: string;
  url: string;
  summary: string;
  raw_content: string;
  published_at: string;
  tickers: string[];
  sentiment: "positive" | "negative" | "neutral";
  category: string;
  impact: "high" | "medium" | "low";
  key_figures: string[];
  source_id: string;
  fingerprint: string;
}

export interface StoredNewsItem extends NewsItem {
  id: number;
  ingested_at: string;
}

export interface NewsFilters {
  sentiment?: string;
  category?: string;
  impact?: string;
  source?: string;
  ticker?: string;
  search?: string;
}

export class StorageService {
  private db: Database.Database;

  constructor(dbPath: string = "paisamachine.db") {
    this.db = new Database(dbPath);
    this.db.pragma("journal_mode = WAL");
    this.init();
  }

  private init() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS news_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        source TEXT NOT NULL,
        headline TEXT NOT NULL,
        url TEXT,
        summary TEXT,
        raw_content TEXT,
        published_at DATETIME,
        ingested_at DATETIME DEFAULT (datetime('now')),
        tickers JSON,
        sentiment TEXT,
        category TEXT,
        impact TEXT,
        key_figures JSON,
        source_id TEXT,
        fingerprint TEXT UNIQUE
      );
      CREATE INDEX IF NOT EXISTS idx_published ON news_items(published_at);
      CREATE INDEX IF NOT EXISTS idx_sentiment ON news_items(sentiment);
      CREATE INDEX IF NOT EXISTS idx_category ON news_items(category);
      CREATE INDEX IF NOT EXISTS idx_ingested ON news_items(ingested_at);
    `);
  }

  insert(item: NewsItem): number {
    const stmt = this.db.prepare(`
      INSERT INTO news_items (source, headline, url, summary, raw_content, published_at, tickers, sentiment, category, impact, key_figures, source_id, fingerprint)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      item.source,
      item.headline,
      item.url,
      item.summary,
      item.raw_content,
      item.published_at,
      JSON.stringify(item.tickers),
      item.sentiment,
      item.category,
      item.impact,
      JSON.stringify(item.key_figures),
      item.source_id,
      item.fingerprint
    );
    return Number(result.lastInsertRowid);
  }

  getRecent(limit: number = 50, filters: NewsFilters = {}): StoredNewsItem[] {
    let query = "SELECT * FROM news_items WHERE 1=1";
    const params: any[] = [];

    if (filters.sentiment) {
      query += " AND sentiment = ?";
      params.push(filters.sentiment);
    }
    if (filters.category) {
      query += " AND category = ?";
      params.push(filters.category);
    }
    if (filters.impact) {
      query += " AND impact = ?";
      params.push(filters.impact);
    }
    if (filters.source) {
      query += " AND source = ?";
      params.push(filters.source);
    }
    if (filters.ticker) {
      query += " AND tickers LIKE ?";
      params.push(`%"${filters.ticker}"%`);
    }
    if (filters.search) {
      query += " AND headline LIKE ?";
      params.push(`%${filters.search}%`);
    }

    query += " ORDER BY ingested_at DESC LIMIT ?";
    params.push(limit);

    const rows = this.db.prepare(query).all(...params) as any[];
    return rows.map((row) => ({
      ...row,
      tickers: JSON.parse(row.tickers),
      key_figures: JSON.parse(row.key_figures),
    }));
  }

  close() {
    this.db.close();
  }
}
