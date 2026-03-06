# PaisaMachine Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an ultra-low latency stock news aggregation terminal that ingests from 10 Indian market sources, processes with Claude Haiku, and displays in a real-time terminal UI.

**Architecture:** n8n (Docker) handles source polling/ingestion, posts raw items to a Node.js/Express backend. Backend deduplicates via Redis, processes with Haiku (ticker extraction, sentiment, categorization), stores in SQLite, and broadcasts via SSE. Next.js frontend renders a dark terminal-style feed.

**Tech Stack:** Node.js 20+, TypeScript, Express, SQLite (better-sqlite3), Redis (ioredis), Anthropic SDK, Next.js 14, Tailwind CSS, Docker (n8n + Redis), SSE.

**Design doc:** `docs/plans/2026-03-07-stock-news-terminal-design.md`

---

## Task 1: Project Scaffolding & Docker Setup

**Files:**
- Create: `docker-compose.yml`
- Create: `backend/package.json`
- Create: `backend/tsconfig.json`
- Create: `backend/.env.example`
- Create: `.gitignore`

**Step 1: Create .gitignore**

```gitignore
node_modules/
dist/
.env
*.db
.next/
```

**Step 2: Create docker-compose.yml**

```yaml
version: "3.8"
services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - N8N_BASIC_AUTH_ACTIVE=false
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  n8n_data:
  redis_data:
```

**Step 3: Initialize backend project**

```bash
cd backend
npm init -y
npm install express cors better-sqlite3 ioredis @anthropic-ai/sdk dotenv
npm install -D typescript @types/express @types/cors @types/better-sqlite3 @types/node tsx
```

**Step 4: Create backend/tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "declaration": true
  },
  "include": ["src"]
}
```

**Step 5: Create backend/.env.example**

```
ANTHROPIC_API_KEY=your-key-here
REDIS_URL=redis://localhost:6379
PORT=3001
```

**Step 6: Add scripts to backend/package.json**

Add to scripts:
```json
{
  "dev": "tsx watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

**Step 7: Start Docker services**

```bash
docker-compose up -d
```

Verify: `docker-compose ps` shows n8n and redis running.

**Step 8: Commit**

```bash
git init
git add .gitignore docker-compose.yml backend/package.json backend/tsconfig.json backend/.env.example
git commit -m "chore: project scaffolding with docker-compose, backend init"
```

---

## Task 2: SQLite Storage Service

**Files:**
- Create: `backend/src/services/storage.ts`
- Create: `backend/src/tests/storage.test.ts`

**Step 1: Install test deps**

```bash
cd backend
npm install -D vitest
```

Add to package.json scripts: `"test": "vitest run"`

**Step 2: Write the failing test**

Create `backend/src/tests/storage.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { StorageService } from "../services/storage.js";

describe("StorageService", () => {
  let storage: StorageService;

  beforeEach(() => {
    storage = new StorageService(":memory:");
  });

  it("should insert and retrieve a news item", () => {
    const item = {
      source: "nse_json_api",
      headline: "Reliance wins Rs 5000 crore order",
      url: "https://example.com/1",
      summary: "Reliance wins large order",
      raw_content: "Full content here",
      published_at: "2026-03-07T10:30:00Z",
      tickers: ["RELIANCE"],
      sentiment: "positive" as const,
      category: "order_win",
      impact: "high" as const,
      key_figures: ["Rs 5000 crore"],
      source_id: "nse-123",
      fingerprint: "abc123",
    };

    const id = storage.insert(item);
    expect(id).toBeGreaterThan(0);

    const retrieved = storage.getRecent(10);
    expect(retrieved).toHaveLength(1);
    expect(retrieved[0].headline).toBe("Reliance wins Rs 5000 crore order");
    expect(retrieved[0].tickers).toEqual(["RELIANCE"]);
  });

  it("should reject duplicate fingerprints", () => {
    const item = {
      source: "nse_json_api",
      headline: "Test headline",
      url: "https://example.com/1",
      summary: "Summary",
      raw_content: "",
      published_at: "2026-03-07T10:30:00Z",
      tickers: [],
      sentiment: "neutral" as const,
      category: "other",
      impact: "low" as const,
      key_figures: [],
      source_id: "nse-456",
      fingerprint: "dup123",
    };

    storage.insert(item);
    expect(() => storage.insert(item)).toThrow();
  });

  it("should filter by sentiment", () => {
    const base = {
      url: "",
      summary: "",
      raw_content: "",
      published_at: "2026-03-07T10:30:00Z",
      tickers: [],
      category: "other",
      impact: "low" as const,
      key_figures: [],
      source_id: "",
    };

    storage.insert({ ...base, source: "a", headline: "Good news", sentiment: "positive" as const, fingerprint: "f1" });
    storage.insert({ ...base, source: "b", headline: "Bad news", sentiment: "negative" as const, fingerprint: "f2" });

    const positive = storage.getRecent(10, { sentiment: "positive" });
    expect(positive).toHaveLength(1);
    expect(positive[0].headline).toBe("Good news");
  });
});
```

**Step 3: Run test to verify it fails**

```bash
cd backend && npx vitest run src/tests/storage.test.ts
```

Expected: FAIL — module not found.

**Step 4: Implement StorageService**

Create `backend/src/services/storage.ts`:

```typescript
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
```

**Step 5: Run tests**

```bash
cd backend && npx vitest run src/tests/storage.test.ts
```

Expected: All 3 tests PASS.

**Step 6: Commit**

```bash
git add backend/src/services/storage.ts backend/src/tests/storage.test.ts backend/package.json
git commit -m "feat: add SQLite storage service with tests"
```

---

## Task 3: Redis Dedup Service

**Files:**
- Create: `backend/src/services/dedup.ts`
- Create: `backend/src/tests/dedup.test.ts`

**Step 1: Write the failing test**

Create `backend/src/tests/dedup.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { DedupService } from "../services/dedup.js";

describe("DedupService (in-memory fallback)", () => {
  let dedup: DedupService;

  beforeEach(() => {
    dedup = new DedupService(); // no Redis URL = in-memory mode
  });

  it("should mark item as new on first check", async () => {
    const isNew = await dedup.isNew("nse_json_api", "source-id-1", "https://example.com/1");
    expect(isNew).toBe(true);
  });

  it("should detect duplicate by source + source_id", async () => {
    await dedup.isNew("nse_json_api", "source-id-1", "https://example.com/1");
    const isNew = await dedup.isNew("nse_json_api", "source-id-1", "https://example.com/1");
    expect(isNew).toBe(false);
  });

  it("should detect duplicate by URL across sources", async () => {
    await dedup.isNew("nse_rss", "rss-1", "https://example.com/same-article");
    const isNew = await dedup.isNew("nse_json_api", "api-1", "https://example.com/same-article");
    expect(isNew).toBe(false);
  });

  it("should allow same source_id from different sources", async () => {
    await dedup.isNew("nse_json_api", "id-1", "https://nse.com/1");
    const isNew = await dedup.isNew("bse_json_api", "id-1", "https://bse.com/1");
    expect(isNew).toBe(true);
  });
});
```

**Step 2: Run test to verify it fails**

```bash
cd backend && npx vitest run src/tests/dedup.test.ts
```

Expected: FAIL.

**Step 3: Implement DedupService**

Create `backend/src/services/dedup.ts`:

```typescript
import { createHash } from "crypto";
import Redis from "ioredis";

const TTL_SECONDS = 24 * 60 * 60; // 24 hours

export class DedupService {
  private redis: Redis | null = null;
  private memoryCache: Set<string> = new Set();
  private useMemory: boolean;

  constructor(redisUrl?: string) {
    if (redisUrl) {
      this.redis = new Redis(redisUrl);
      this.redis.on("error", () => {
        console.warn("Redis connection failed, falling back to in-memory dedup");
        this.useMemory = true;
      });
      this.useMemory = false;
    } else {
      this.useMemory = true;
    }
  }

  private hash(input: string): string {
    return createHash("sha256").update(input).digest("hex");
  }

  async isNew(source: string, sourceId: string, url: string): Promise<boolean> {
    const primaryKey = this.hash(`${source}:${sourceId}`);
    const urlKey = url ? this.hash(url) : null;

    if (this.useMemory || !this.redis) {
      if (this.memoryCache.has(primaryKey)) return false;
      if (urlKey && this.memoryCache.has(urlKey)) return false;
      this.memoryCache.add(primaryKey);
      if (urlKey) this.memoryCache.add(urlKey);
      return true;
    }

    // Check Redis
    const primaryExists = await this.redis.exists(`dedup:${primaryKey}`);
    if (primaryExists) return false;

    if (urlKey) {
      const urlExists = await this.redis.exists(`dedup:${urlKey}`);
      if (urlExists) return false;
    }

    // Mark as seen
    await this.redis.setex(`dedup:${primaryKey}`, TTL_SECONDS, "1");
    if (urlKey) {
      await this.redis.setex(`dedup:${urlKey}`, TTL_SECONDS, "1");
    }

    return true;
  }

  async close() {
    if (this.redis) await this.redis.quit();
  }
}
```

**Step 4: Run tests**

```bash
cd backend && npx vitest run src/tests/dedup.test.ts
```

Expected: All 4 tests PASS.

**Step 5: Commit**

```bash
git add backend/src/services/dedup.ts backend/src/tests/dedup.test.ts
git commit -m "feat: add Redis dedup service with in-memory fallback"
```

---

## Task 4: LLM Processing Service

**Files:**
- Create: `backend/src/services/llm.ts`
- Create: `backend/src/tests/llm.test.ts`

**Step 1: Write the failing test**

Create `backend/src/tests/llm.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { buildPrompt, parseLLMResponse, type LLMResult } from "../services/llm.js";

describe("LLM Service", () => {
  it("should build a valid prompt from headline and content", () => {
    const prompt = buildPrompt("Reliance wins Rs 5000 crore order", "Full content here");
    expect(prompt).toContain("Reliance wins Rs 5000 crore order");
    expect(prompt).toContain("Full content here");
    expect(prompt).toContain("tickers");
    expect(prompt).toContain("sentiment");
  });

  it("should parse valid LLM JSON response", () => {
    const raw = JSON.stringify({
      tickers: ["RELIANCE"],
      sentiment: "positive",
      category: "order_win",
      impact: "high",
      summary: "Reliance wins large order worth Rs 5000 crore",
      key_figures: ["Rs 5000 crore"],
    });

    const result = parseLLMResponse(raw);
    expect(result.tickers).toEqual(["RELIANCE"]);
    expect(result.sentiment).toBe("positive");
    expect(result.category).toBe("order_win");
    expect(result.impact).toBe("high");
    expect(result.key_figures).toEqual(["Rs 5000 crore"]);
  });

  it("should handle malformed JSON gracefully", () => {
    const result = parseLLMResponse("not valid json {{{");
    expect(result.tickers).toEqual([]);
    expect(result.sentiment).toBe("neutral");
    expect(result.category).toBe("other");
    expect(result.impact).toBe("low");
  });
});
```

**Step 2: Run test to verify it fails**

```bash
cd backend && npx vitest run src/tests/llm.test.ts
```

Expected: FAIL.

**Step 3: Implement LLM service**

Create `backend/src/services/llm.ts`:

```typescript
import Anthropic from "@anthropic-ai/sdk";

export interface LLMResult {
  tickers: string[];
  sentiment: "positive" | "negative" | "neutral";
  category: string;
  impact: "high" | "medium" | "low";
  summary: string;
  key_figures: string[];
}

const VALID_SENTIMENTS = ["positive", "negative", "neutral"];
const VALID_IMPACTS = ["high", "medium", "low"];
const VALID_CATEGORIES = [
  "corporate_filing", "earnings", "order_win", "regulatory",
  "broker_report", "offer_announcement", "management_change",
  "sector_news", "other",
];

export function buildPrompt(headline: string, content: string): string {
  return `Analyze this Indian stock market news item. Return ONLY valid JSON with these fields:
- tickers: array of NSE/BSE stock symbols mentioned (e.g. ["RELIANCE", "TCS"]). Use official NSE symbols.
- sentiment: "positive" | "negative" | "neutral"
- category: one of: "corporate_filing", "earnings", "order_win", "regulatory", "broker_report", "offer_announcement", "management_change", "sector_news", "other"
- impact: "high" | "medium" | "low"
- summary: one-line summary (max 120 chars)
- key_figures: array of key numbers/amounts from the text (e.g. ["Rs 5,000 crore", "15%", "2,000 units"])

Headline: ${headline}
Content: ${content || "No additional content"}`;
}

export function parseLLMResponse(raw: string): LLMResult {
  const fallback: LLMResult = {
    tickers: [],
    sentiment: "neutral",
    category: "other",
    impact: "low",
    summary: "",
    key_figures: [],
  };

  try {
    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = raw;
    const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const parsed = JSON.parse(jsonStr);

    return {
      tickers: Array.isArray(parsed.tickers) ? parsed.tickers : [],
      sentiment: VALID_SENTIMENTS.includes(parsed.sentiment) ? parsed.sentiment : "neutral",
      category: VALID_CATEGORIES.includes(parsed.category) ? parsed.category : "other",
      impact: VALID_IMPACTS.includes(parsed.impact) ? parsed.impact : "low",
      summary: typeof parsed.summary === "string" ? parsed.summary.slice(0, 150) : "",
      key_figures: Array.isArray(parsed.key_figures) ? parsed.key_figures : [],
    };
  } catch {
    return fallback;
  }
}

export class LLMService {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async process(headline: string, content: string): Promise<LLMResult> {
    const prompt = buildPrompt(headline, content);

    const message = await this.client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    return parseLLMResponse(text);
  }
}
```

**Step 4: Run tests**

```bash
cd backend && npx vitest run src/tests/llm.test.ts
```

Expected: All 3 tests PASS.

**Step 5: Commit**

```bash
git add backend/src/services/llm.ts backend/src/tests/llm.test.ts
git commit -m "feat: add LLM processing service with Haiku integration"
```

---

## Task 5: SSE Broadcast Service

**Files:**
- Create: `backend/src/services/broadcast.ts`
- Create: `backend/src/tests/broadcast.test.ts`

**Step 1: Write the failing test**

Create `backend/src/tests/broadcast.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { BroadcastService } from "../services/broadcast.js";

describe("BroadcastService", () => {
  it("should add and remove clients", () => {
    const broadcast = new BroadcastService();
    const mockRes = {
      write: () => true,
      on: () => {},
    } as any;

    const clientId = broadcast.addClient(mockRes);
    expect(broadcast.clientCount).toBe(1);

    broadcast.removeClient(clientId);
    expect(broadcast.clientCount).toBe(0);
  });

  it("should broadcast to all connected clients", () => {
    const broadcast = new BroadcastService();
    const messages: string[] = [];
    const mockRes = {
      write: (data: string) => { messages.push(data); return true; },
      on: () => {},
    } as any;

    broadcast.addClient(mockRes);
    broadcast.send({ id: 1, headline: "Test news" });

    expect(messages.length).toBe(1);
    expect(messages[0]).toContain("Test news");
  });
});
```

**Step 2: Run test to verify it fails**

```bash
cd backend && npx vitest run src/tests/broadcast.test.ts
```

**Step 3: Implement BroadcastService**

Create `backend/src/services/broadcast.ts`:

```typescript
import { Response } from "express";

export class BroadcastService {
  private clients: Map<string, Response> = new Map();
  private counter = 0;

  get clientCount(): number {
    return this.clients.size;
  }

  addClient(res: Response): string {
    const id = `client-${++this.counter}`;
    this.clients.set(id, res);

    res.on("close", () => {
      this.clients.delete(id);
    });

    return id;
  }

  removeClient(id: string) {
    this.clients.delete(id);
  }

  send(data: any) {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    for (const [id, res] of this.clients) {
      try {
        res.write(payload);
      } catch {
        this.clients.delete(id);
      }
    }
  }
}
```

**Step 4: Run tests**

```bash
cd backend && npx vitest run src/tests/broadcast.test.ts
```

Expected: All 2 tests PASS.

**Step 5: Commit**

```bash
git add backend/src/services/broadcast.ts backend/src/tests/broadcast.test.ts
git commit -m "feat: add SSE broadcast service"
```

---

## Task 6: Express Server & Routes

**Files:**
- Create: `backend/src/index.ts`
- Create: `backend/src/routes/ingest.ts`
- Create: `backend/src/routes/news.ts`
- Create: `backend/src/routes/sse.ts`

**Step 1: Create the ingest route**

Create `backend/src/routes/ingest.ts`:

```typescript
import { Router, Request, Response } from "express";
import { DedupService } from "../services/dedup.js";
import { LLMService } from "../services/llm.js";
import { StorageService } from "../services/storage.js";
import { BroadcastService } from "../services/broadcast.js";
import { createHash } from "crypto";

export function createIngestRouter(
  dedup: DedupService,
  llm: LLMService,
  storage: StorageService,
  broadcast: BroadcastService
): Router {
  const router = Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const { source, headline, url, published_at, raw_content, source_id } = req.body;

      if (!source || !headline) {
        res.status(400).json({ error: "source and headline are required" });
        return;
      }

      // Dedup check
      const isNew = await dedup.isNew(source, source_id || headline, url || "");
      if (!isNew) {
        res.status(200).json({ status: "duplicate", skipped: true });
        return;
      }

      // LLM processing
      const llmResult = await llm.process(headline, raw_content || "");

      // Build fingerprint
      const fingerprint = createHash("sha256")
        .update(`${source}:${source_id || headline}`)
        .digest("hex");

      // Store
      const item = {
        source,
        headline,
        url: url || "",
        summary: llmResult.summary,
        raw_content: raw_content || "",
        published_at: published_at || new Date().toISOString(),
        tickers: llmResult.tickers,
        sentiment: llmResult.sentiment,
        category: llmResult.category,
        impact: llmResult.impact,
        key_figures: llmResult.key_figures,
        source_id: source_id || "",
        fingerprint,
      };

      const id = storage.insert(item);

      // Broadcast via SSE
      broadcast.send({ id, ...item, ingested_at: new Date().toISOString() });

      res.status(201).json({ status: "processed", id });
    } catch (error: any) {
      console.error("Ingest error:", error.message);
      res.status(500).json({ error: "Processing failed" });
    }
  });

  return router;
}
```

**Step 2: Create the news route**

Create `backend/src/routes/news.ts`:

```typescript
import { Router, Request, Response } from "express";
import { StorageService } from "../services/storage.js";

export function createNewsRouter(storage: StorageService): Router {
  const router = Router();

  router.get("/", (req: Request, res: Response) => {
    const { sentiment, category, impact, source, ticker, search, limit } = req.query;

    const items = storage.getRecent(
      Number(limit) || 50,
      {
        sentiment: sentiment as string,
        category: category as string,
        impact: impact as string,
        source: source as string,
        ticker: ticker as string,
        search: search as string,
      }
    );

    res.json(items);
  });

  return router;
}
```

**Step 3: Create the SSE route**

Create `backend/src/routes/sse.ts`:

```typescript
import { Router, Request, Response } from "express";
import { BroadcastService } from "../services/broadcast.js";

export function createSSERouter(broadcast: BroadcastService): Router {
  const router = Router();

  router.get("/", (req: Request, res: Response) => {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });

    // Send initial connection event
    res.write("data: {\"type\":\"connected\"}\n\n");

    broadcast.addClient(res);
  });

  return router;
}
```

**Step 4: Create the main server**

Create `backend/src/index.ts`:

```typescript
import "dotenv/config";
import express from "express";
import cors from "cors";
import { StorageService } from "./services/storage.js";
import { DedupService } from "./services/dedup.js";
import { LLMService } from "./services/llm.js";
import { BroadcastService } from "./services/broadcast.js";
import { createIngestRouter } from "./routes/ingest.js";
import { createNewsRouter } from "./routes/news.js";
import { createSSERouter } from "./routes/sse.js";

const PORT = Number(process.env.PORT) || 3001;

// Initialize services
const storage = new StorageService("paisamachine.db");
const dedup = new DedupService(process.env.REDIS_URL);
const llm = new LLMService(process.env.ANTHROPIC_API_KEY!);
const broadcast = new BroadcastService();

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/ingest", createIngestRouter(dedup, llm, storage, broadcast));
app.use("/api/news", createNewsRouter(storage));
app.use("/api/stream", createSSERouter(broadcast));

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", clients: broadcast.clientCount });
});

app.listen(PORT, () => {
  console.log(`PaisaMachine backend running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  storage.close();
  await dedup.close();
  process.exit(0);
});
```

**Step 5: Test the server manually**

```bash
cd backend && npm run dev
```

In another terminal:
```bash
curl http://localhost:3001/api/health
```

Expected: `{"status":"ok","clients":0}`

**Step 6: Commit**

```bash
git add backend/src/index.ts backend/src/routes/
git commit -m "feat: add Express server with ingest, news, and SSE routes"
```

---

## Task 7: Ticker Reference Data

**Files:**
- Create: `backend/src/utils/ticker-refresh.ts`

**Step 1: Implement ticker refresh utility**

Create `backend/src/utils/ticker-refresh.ts`:

```typescript
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";

const NSE_EQUITY_URL = "https://nsearchives.nseindia.com/content/equities/EQUITY_L.csv";
const DATA_DIR = join(dirname(new URL(import.meta.url).pathname), "..", "data");

interface TickerInfo {
  symbol: string;
  name: string;
  series: string;
}

async function fetchWithHeaders(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      Referer: "https://www.nseindia.com/",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

function parseNSECSV(csv: string): TickerInfo[] {
  const lines = csv.trim().split("\n");
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    return {
      symbol: cols[0]?.trim().replace(/"/g, "") || "",
      name: cols[1]?.trim().replace(/"/g, "") || "",
      series: cols[2]?.trim().replace(/"/g, "") || "",
    };
  }).filter((t) => t.symbol && t.series === "EQ");
}

export async function refreshTickers(): Promise<void> {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }

  try {
    console.log("Fetching NSE equity list...");
    const nseCsv = await fetchWithHeaders(NSE_EQUITY_URL);
    const nseTickers = parseNSECSV(nseCsv);
    writeFileSync(
      join(DATA_DIR, "nse-symbols.json"),
      JSON.stringify(nseTickers, null, 2)
    );
    console.log(`Saved ${nseTickers.length} NSE symbols`);
  } catch (error: any) {
    console.error("Failed to refresh NSE tickers:", error.message);
  }

  // BSE placeholder — add BSE endpoint when identified
  if (!existsSync(join(DATA_DIR, "bse-symbols.json"))) {
    writeFileSync(join(DATA_DIR, "bse-symbols.json"), "[]");
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  refreshTickers();
}
```

**Step 2: Test it**

```bash
cd backend && npx tsx src/utils/ticker-refresh.ts
```

Expected: Downloads NSE equity list, saves to `backend/src/data/nse-symbols.json`.

**Step 3: Commit**

```bash
git add backend/src/utils/ticker-refresh.ts
git commit -m "feat: add ticker reference data refresh utility"
```

---

## Task 8: Frontend Setup & Terminal UI

**Files:**
- Create: `frontend/` (Next.js project)
- Create: `frontend/app/page.tsx`
- Create: `frontend/app/layout.tsx`
- Create: `frontend/app/components/NewsFeed.tsx`
- Create: `frontend/app/components/NewsItem.tsx`
- Create: `frontend/app/components/Filters.tsx`
- Create: `frontend/app/components/Highlight.tsx`

**Step 1: Scaffold Next.js project**

```bash
cd /Users/sauhardgupta/internship/paisaMachine
npx create-next-app@latest frontend --typescript --tailwind --app --no-eslint --no-src-dir --import-alias "@/*"
```

Accept defaults.

**Step 2: Create the Highlight component**

Create `frontend/app/components/Highlight.tsx`:

```tsx
"use client";

interface HighlightProps {
  text: string;
  keyFigures: string[];
}

export function Highlight({ text, keyFigures }: HighlightProps) {
  if (!keyFigures || keyFigures.length === 0) {
    return <span>{text}</span>;
  }

  const escaped = keyFigures.map((f) =>
    f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => {
        const isHighlight = keyFigures.some(
          (f) => f.toLowerCase() === part.toLowerCase()
        );
        return isHighlight ? (
          <span key={i} className="text-orange-400 font-bold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </span>
  );
}
```

**Step 3: Create the NewsItem component**

Create `frontend/app/components/NewsItem.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Highlight } from "./Highlight";

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

const SOURCE_LABELS: Record<string, string> = {
  nse_rss: "NSE RSS",
  bse_rss: "BSE RSS",
  nse_json_api: "NSE API",
  bse_json_api: "BSE API",
  zerodha_pulse: "Zerodha",
  moneycontrol: "MCntrl",
  twitter_redbox: "Redbox",
  twitter_nse: "NSE Tw",
  twitter_bse: "BSE Tw",
  twitter_capmkt: "CapMkt",
};

const SENTIMENT_CONFIG = {
  positive: { arrow: "\u25B2", color: "text-green-400" },
  negative: { arrow: "\u25BC", color: "text-red-400" },
  neutral: { arrow: "\u25CF", color: "text-gray-400" },
};

export function NewsItem({ item }: { item: NewsItemData }) {
  const [expanded, setExpanded] = useState(false);
  const sent = SENTIMENT_CONFIG[item.sentiment];
  const time = new Date(item.ingested_at).toLocaleTimeString("en-IN", {
    hour12: false,
  });
  const sourceLabel = SOURCE_LABELS[item.source] || item.source;
  const isHighImpact = item.impact === "high";

  return (
    <div
      className={`border-b border-gray-800 px-4 py-2 cursor-pointer hover:bg-gray-900 transition-colors ${
        isHighImpact ? "border-l-2 border-l-yellow-500" : ""
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Line 1: Metadata */}
      <div className="flex items-center gap-3 text-xs">
        <span className="text-gray-500 font-mono w-16">{time}</span>
        <span className="text-blue-400 font-mono w-16">{sourceLabel}</span>
        <span className="text-yellow-300 font-mono font-bold">
          {item.tickers.join(", ") || "\u2014"}
        </span>
        <span className={`${sent.color} font-mono`}>
          {sent.arrow} {item.sentiment}
        </span>
        <span className="text-gray-500 font-mono">{item.category}</span>
        {isHighImpact && (
          <span className="text-yellow-500 font-bold text-[10px] uppercase">
            HIGH
          </span>
        )}
      </div>

      {/* Line 2: Headline */}
      <div className="mt-1 text-sm text-gray-200">
        <Highlight
          text={item.summary || item.headline}
          keyFigures={item.key_figures}
        />
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="mt-2 pl-4 border-l border-gray-700 text-xs space-y-1">
          <div className="text-gray-400">
            <span className="text-gray-500">Full: </span>
            {item.headline}
          </div>
          {item.raw_content && (
            <div className="text-gray-500 max-h-32 overflow-y-auto">
              {item.raw_content}
            </div>
          )}
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
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
```

**Step 4: Create the Filters component**

Create `frontend/app/components/Filters.tsx`:

```tsx
"use client";

export interface FilterState {
  source: string;
  ticker: string;
  category: string;
  sentiment: string;
  impact: string;
  search: string;
}

interface FiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const SOURCES = [
  { value: "", label: "All Sources" },
  { value: "nse_json_api", label: "NSE API" },
  { value: "bse_json_api", label: "BSE API" },
  { value: "nse_rss", label: "NSE RSS" },
  { value: "bse_rss", label: "BSE RSS" },
  { value: "zerodha_pulse", label: "Zerodha" },
  { value: "moneycontrol", label: "Moneycontrol" },
  { value: "twitter_redbox", label: "Redbox" },
  { value: "twitter_nse", label: "NSE Twitter" },
  { value: "twitter_bse", label: "BSE Twitter" },
  { value: "twitter_capmkt", label: "Capital Mkt" },
];

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "corporate_filing", label: "Filing" },
  { value: "earnings", label: "Earnings" },
  { value: "order_win", label: "Order Win" },
  { value: "regulatory", label: "Regulatory" },
  { value: "broker_report", label: "Broker Report" },
  { value: "offer_announcement", label: "Offer" },
  { value: "management_change", label: "Mgmt Change" },
  { value: "sector_news", label: "Sector" },
  { value: "other", label: "Other" },
];

const SENTIMENTS = [
  { value: "", label: "All Sentiment" },
  { value: "positive", label: "Positive" },
  { value: "negative", label: "Negative" },
  { value: "neutral", label: "Neutral" },
];

const IMPACTS = [
  { value: "", label: "All Impact" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

function Select({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-900 text-gray-300 border border-gray-700 rounded px-2 py-1 text-xs font-mono focus:outline-none focus:border-blue-500"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Filters({ filters, onChange }: FiltersProps) {
  const update = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-2 bg-gray-950 border-b border-gray-800">
      <Select options={SOURCES} value={filters.source} onChange={(v) => update("source", v)} />
      <Select options={CATEGORIES} value={filters.category} onChange={(v) => update("category", v)} />
      <Select options={SENTIMENTS} value={filters.sentiment} onChange={(v) => update("sentiment", v)} />
      <Select options={IMPACTS} value={filters.impact} onChange={(v) => update("impact", v)} />
      <input
        type="text"
        placeholder="Ticker..."
        value={filters.ticker}
        onChange={(e) => update("ticker", e.target.value.toUpperCase())}
        className="bg-gray-900 text-gray-300 border border-gray-700 rounded px-2 py-1 text-xs font-mono w-24 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        className="bg-gray-900 text-gray-300 border border-gray-700 rounded px-2 py-1 text-xs font-mono w-40 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}
```

**Step 5: Create the NewsFeed component**

Create `frontend/app/components/NewsFeed.tsx`:

```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { NewsItem, type NewsItemData } from "./NewsItem";
import { Filters, type FilterState } from "./Filters";

const BACKEND_URL = "http://localhost:3001";

export function NewsFeed() {
  const [items, setItems] = useState<NewsItemData[]>([]);
  const [connected, setConnected] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    source: "",
    ticker: "",
    category: "",
    sentiment: "",
    impact: "",
    search: "",
  });
  const eventSourceRef = useRef<EventSource | null>(null);

  // Load initial items
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/news?limit=100`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(console.error);
  }, []);

  // SSE connection
  useEffect(() => {
    const es = new EventSource(`${BACKEND_URL}/api/stream`);
    eventSourceRef.current = es;

    es.onopen = () => setConnected(true);

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "connected") return;
        setItems((prev) => [data, ...prev].slice(0, 500));
      } catch {
        // ignore parse errors
      }
    };

    es.onerror = () => {
      setConnected(false);
    };

    return () => {
      es.close();
    };
  }, []);

  // Client-side filtering
  const filteredItems = items.filter((item) => {
    if (filters.source && item.source !== filters.source) return false;
    if (filters.sentiment && item.sentiment !== filters.sentiment) return false;
    if (filters.category && item.category !== filters.category) return false;
    if (filters.impact && item.impact !== filters.impact) return false;
    if (filters.ticker && !item.tickers.some((t) => t.includes(filters.ticker))) return false;
    if (filters.search && !item.headline.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-screen bg-black text-gray-200 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-950 border-b border-gray-800">
        <h1 className="text-sm font-bold text-gray-100">
          PaisaMachine &mdash; Stock News Terminal
        </h1>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">{filteredItems.length} items</span>
          <span
            className={`w-2 h-2 rounded-full ${
              connected ? "bg-green-400" : "bg-red-400"
            }`}
          />
          <span className={connected ? "text-green-400" : "text-red-400"}>
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      {/* Filters */}
      <Filters filters={filters} onChange={setFilters} />

      {/* Feed */}
      <div className="flex-1 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-600 text-sm">
            {items.length === 0
              ? "Waiting for news..."
              : "No items match filters"}
          </div>
        ) : (
          filteredItems.map((item) => (
            <NewsItem key={item.id} item={item} />
          ))
        )}
      </div>

      {/* Status bar */}
      <div className="px-4 py-1 bg-gray-950 border-t border-gray-800 text-[10px] text-gray-600 flex justify-between">
        <span>Sources: NSE/BSE API, RSS, Zerodha, Moneycontrol, Twitter</span>
        <span>
          {connected ? "░░░░░░░ live ░░░░░░░" : "reconnecting..."}
        </span>
      </div>
    </div>
  );
}
```

**Step 6: Update the main page**

Overwrite `frontend/app/page.tsx`:

```tsx
import { NewsFeed } from "./components/NewsFeed";

export default function Home() {
  return <NewsFeed />;
}
```

**Step 7: Update layout**

Overwrite `frontend/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PaisaMachine \u2014 Stock News Terminal",
  description: "Ultra-low latency stock news aggregation terminal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black antialiased">{children}</body>
    </html>
  );
}
```

**Step 8: Test the frontend**

```bash
cd frontend && npm run dev
```

Open http://localhost:3000 — should show dark terminal with "Waiting for news..." message.

**Step 9: Commit**

```bash
git add frontend/app/
git commit -m "feat: add terminal-style frontend with SSE, filters, and color coding"
```

---

## Task 9: n8n Workflow - NSE JSON API

**Files:**
- Create: `n8n/workflows/nse-json-api.json`

This workflow must be created in the n8n UI (http://localhost:5678). Instructions:

1. **Schedule Trigger** - every 30 seconds
2. **HTTP Request** node (cookie fetch):
   - URL: `https://www.nseindia.com`
   - Method: GET
   - Purpose: Get session cookies
3. **HTTP Request** node (data fetch):
   - URL: `https://www.nseindia.com/api/corporate-announcements?index=equities`
   - Method: GET
   - Headers: `User-Agent: Mozilla/5.0...`, `Accept: application/json`, `Referer: https://www.nseindia.com/companies-listing/corporate-filings-announcements`
   - Pass cookies from previous request
4. **Function** node - normalize each announcement:
   ```javascript
   return items.map(item => {
     const d = item.json;
     return {
       json: {
         source: "nse_json_api",
         headline: d.desc || d.subject,
         url: d.attchmntFile ? `https://www.nseindia.com${d.attchmntFile}` : "",
         published_at: d.an_dt || new Date().toISOString(),
         raw_content: `${d.symbol} - ${d.desc} - ${d.attchmntText || ""}`,
         source_id: `nse-${d.seq_id || d.an_dt}-${d.symbol}`
       }
     };
   });
   ```
5. **HTTP Request** node - POST each item to `http://host.docker.internal:3001/api/ingest`

Save workflow instructions to `n8n/workflows/nse-json-api.json`.

**Commit:**

```bash
mkdir -p n8n/workflows
git add n8n/workflows/
git commit -m "docs: add n8n workflow setup instructions for NSE JSON API"
```

---

## Task 10: n8n Workflow - BSE JSON API

Same pattern as Task 9 but for BSE:

1. **Schedule Trigger** - every 30 seconds
2. **HTTP Request** - `https://api.bseindia.com/BseIndiaAPI/api/AnnGetData/w?strCat=-1&strPrevDate=<today>&strScrip=&strSearch=P&strToDate=<today>&strType=C`
3. **Function** node - normalize BSE announcements
4. **HTTP Request** - POST to `http://host.docker.internal:3001/api/ingest`

**Commit:**

```bash
git commit -m "docs: add n8n workflow setup instructions for BSE JSON API"
```

---

## Task 11: n8n Workflows - RSS Feeds (NSE, BSE, Moneycontrol)

Create 3 workflows in n8n UI:

**NSE RSS:**
1. RSS Trigger - NSE corporate announcements feed - every 1 min
2. Function - normalize with `source: "nse_rss"`
3. HTTP Request - POST to ingest

**BSE RSS:**
1. RSS Trigger - BSE announcements RSS - every 1 min
2. Function - normalize with `source: "bse_rss"`
3. HTTP Request - POST to ingest

**Moneycontrol:**
1. RSS Trigger - multiple feeds (top news, market reports, results)
2. Function - normalize with `source: "moneycontrol"`
3. HTTP Request - POST to ingest

**Commit:**

```bash
git commit -m "docs: add n8n workflow setup instructions for RSS feeds"
```

---

## Task 12: n8n Workflow - Zerodha Pulse

1. Schedule Trigger - every 2 minutes
2. HTTP Request - GET `https://pulse.zerodha.com/`
3. HTML Extract node - extract news items (headline, link, timestamp)
4. Function - normalize with `source: "zerodha_pulse"`
5. HTTP Request - POST to `http://host.docker.internal:3001/api/ingest`

**Commit:**

```bash
git commit -m "docs: add n8n workflow setup instructions for Zerodha Pulse"
```

---

## Task 13: n8n Workflow - Twitter Feeds

Single workflow polling all 4 accounts to conserve API quota:

1. Schedule Trigger - every 2 minutes
2. Twitter node - search recent tweets from target accounts
3. Function - normalize each tweet, set source based on author:
   ```javascript
   const sourceMap = {
     "REDBOXINDIA": "twitter_redbox",
     "NSEIndia": "twitter_nse",
     "BSEIndia": "twitter_bse",
   };
   return items.map(item => ({
     json: {
       source: sourceMap[item.json.author] || "twitter_unknown",
       headline: item.json.text,
       url: `https://twitter.com/${item.json.author}/status/${item.json.id}`,
       published_at: item.json.created_at,
       raw_content: item.json.text,
       source_id: `tw-${item.json.id}`
     }
   }));
   ```
4. HTTP Request - POST to `http://host.docker.internal:3001/api/ingest`

**Commit:**

```bash
git commit -m "docs: add n8n workflow setup instructions for Twitter feeds"
```

---

## Task 14: End-to-End Integration Test

**Step 1: Start all services**

Terminal 1: `docker-compose up -d`
Terminal 2: `cd backend && npm run dev`
Terminal 3: `cd frontend && npm run dev`

**Step 2: Send a test item via curl**

```bash
curl -X POST http://localhost:3001/api/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "source": "nse_json_api",
    "headline": "Reliance Industries wins Rs 5,000 crore petrochemical order from Saudi Aramco",
    "url": "https://nseindia.com/test",
    "published_at": "2026-03-07T10:30:00Z",
    "raw_content": "Reliance Industries Ltd has secured a Rs 5,000 crore order for petrochemical supplies from Saudi Aramco. The contract spans 3 years.",
    "source_id": "nse-test-001"
  }'
```

Expected: Returns `{"status":"processed","id":1}`

**Step 3: Verify frontend**

Open http://localhost:3000 - should show the news item with:
- Green positive sentiment
- RELIANCE ticker in yellow
- "Rs 5,000 crore" and "3 years" in orange bold
- Source showing "NSE API"

**Step 4: Verify dedup**

Send the same curl again. Expected: `{"status":"duplicate","skipped":true}`

**Step 5: Send a second different item**

```bash
curl -X POST http://localhost:3001/api/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "source": "twitter_redbox",
    "headline": "SEBI imposes Rs 25 lakh fine on Adani Enterprises for disclosure lapses",
    "url": "https://twitter.com/REDBOXINDIA/status/123",
    "published_at": "2026-03-07T10:31:00Z",
    "raw_content": "",
    "source_id": "tw-test-002"
  }'
```

Verify it appears in the frontend with red negative sentiment.

**Step 6: Test filters**

Use the filter dropdowns to filter by sentiment, source, etc. Verify items filter correctly.

**Step 7: Commit**

```bash
git add -A
git commit -m "chore: complete end-to-end integration, all services working"
```

---

## Execution Order Summary

| Task | Component | Dependencies |
|------|-----------|--------------|
| 1 | Project scaffolding + Docker | None |
| 2 | SQLite storage service | Task 1 |
| 3 | Redis dedup service | Task 1 |
| 4 | LLM processing service | Task 1 |
| 5 | SSE broadcast service | Task 1 |
| 6 | Express server + routes | Tasks 2-5 |
| 7 | Ticker reference data | Task 1 |
| 8 | Frontend terminal UI | Task 6 |
| 9 | n8n: NSE JSON API workflow | Task 6 |
| 10 | n8n: BSE JSON API workflow | Task 6 |
| 11 | n8n: RSS feeds workflows | Task 6 |
| 12 | n8n: Zerodha Pulse workflow | Task 6 |
| 13 | n8n: Twitter feeds workflow | Task 6 |
| 14 | End-to-end integration test | All above |

Tasks 2-5 can run in parallel. Tasks 9-13 can run in parallel.
