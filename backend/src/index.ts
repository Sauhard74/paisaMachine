import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createHash } from "crypto";
import { StorageService } from "./services/storage.js";
import { DedupService } from "./services/dedup.js";
import { LLMService } from "./services/llm.js";
import { BroadcastService } from "./services/broadcast.js";
import { ExchangeFetcher } from "./services/exchange-fetcher.js";
import { RSSFetcher } from "./services/rss-fetcher.js";
import { TwitterFetcher } from "./services/twitter-fetcher.js";
import { PulseFetcher } from "./services/pulse-fetcher.js";
import { TradingViewFetcher } from "./services/tradingview-fetcher.js";
import { ScreenerFetcher } from "./services/screener-fetcher.js";
import { createIngestRouter } from "./routes/ingest.js";
import { createNewsRouter } from "./routes/news.js";
import { createSSERouter } from "./routes/sse.js";
import { createStatsRouter } from "./routes/stats.js";
import { createMarketRouter } from "./routes/market.js";
import { proxyPool } from "./services/proxy-pool.js";

const PORT = Number(process.env.PORT) || 3001;
const MAX_CONCURRENT_LLM = 10;

// Initialize services
const storage = new StorageService("paisamachine.db");
const dedup = new DedupService(process.env.REDIS_URL);
const llm = new LLMService(process.env.ANTHROPIC_API_KEY!);
const broadcast = new BroadcastService();

// Create Express app
const app = express();

// Security: Helmet for security headers
app.use(helmet({ contentSecurityPolicy: false })); // CSP handled by frontend

// Security: CORS whitelist
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:3002").split(",");
app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));

// Security: Request size limits
app.use(express.json({ limit: "1mb" }));

// Security: Rate limiting
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500, message: { error: "Too many requests" } }));
app.use("/api/ingest", rateLimit({ windowMs: 60 * 1000, max: 20, message: { error: "Too many ingest requests" } }));

// Routes
app.use("/api/ingest", createIngestRouter(dedup, llm, storage, broadcast));
app.use("/api/news", createNewsRouter(storage));
app.use("/api/stream", createSSERouter(broadcast));
app.use("/api/stats", createStatsRouter(storage));
app.use("/api/market", createMarketRouter());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    clients: broadcast.clientCount,
    queue: queue.length,
    processing: activeCount,
  });
});

// --- Concurrent processing queue ---
interface QueueItem {
  source: string;
  headline: string;
  url: string;
  published_at: string;
  raw_content: string;
  source_id: string;
}

const queue: QueueItem[] = [];
let activeCount = 0;

async function processOne(raw: QueueItem) {
  const { source, headline, url, published_at, raw_content, source_id } = raw;

  try {
    const isNew = await dedup.isNew(source, source_id || headline, url || "");
    if (!isNew) return;

    const llmResult = await llm.process(headline, raw_content || "");

    // Drop irrelevant items: no stock tickers AND category "other" means not market-related
    if (llmResult.tickers.length === 0 && llmResult.category === "other") {
      console.log(`[SKIP] Not market-relevant: ${headline.substring(0, 80)}`);
      return;
    }

    const fingerprint = createHash("sha256")
      .update(`${source}:${source_id || headline}`)
      .digest("hex");

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
    broadcast.send({ id, ...item, ingested_at: new Date().toISOString() });
    console.log(`[${source}] ${headline.substring(0, 80)}`);
  } catch (error: any) {
    if (error.message?.includes("UNIQUE constraint")) return; // duplicate fingerprint
    console.error(`[ProcessError] [${source}] ${error.message}`);
  }
}

function drainQueue() {
  while (activeCount < MAX_CONCURRENT_LLM && queue.length > 0) {
    const item = queue.shift()!;
    activeCount++;
    processOne(item).finally(() => {
      activeCount--;
      drainQueue();
    });
  }
}

async function processItem(raw: QueueItem) {
  queue.push(raw);
  drainQueue();
}

// --- Start proxy pool, then all fetchers ---
proxyPool.start().catch((err) => console.error("[ProxyPool] Start failed:", err));

const fetcher = new ExchangeFetcher(processItem);
fetcher.start();

const rssFetcher = new RSSFetcher(processItem);
rssFetcher.start();

const twitterFetcher = new TwitterFetcher(processItem, process.env.TWITTER_BEARER_TOKEN || "");
twitterFetcher.start();

const pulseFetcher = new PulseFetcher(processItem);
pulseFetcher.start();

const tvFetcher = new TradingViewFetcher(processItem);
tvFetcher.start();

const screenerFetcher = new ScreenerFetcher(processItem);
screenerFetcher.start();

app.listen(PORT, () => {
  console.log(`PaisaMachine backend running on port ${PORT} (${MAX_CONCURRENT_LLM} concurrent LLM workers)`);
});

// Graceful shutdown with timeout
process.on("SIGINT", async () => {
  console.log("\nShutting down...");
  const forceExit = setTimeout(() => { console.error("Forced shutdown"); process.exit(1); }, 10000);
  proxyPool.stop();
  fetcher.stop();
  rssFetcher.stop();
  twitterFetcher.stop();
  pulseFetcher.stop();
  tvFetcher.stop();
  screenerFetcher.stop();
  storage.close();
  await dedup.close();
  clearTimeout(forceExit);
  process.exit(0);
});
