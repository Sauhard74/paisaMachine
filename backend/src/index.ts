import "dotenv/config";
import express from "express";
import cors from "cors";
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

// --- Exchange Fetcher: process items through dedup -> LLM -> store -> broadcast ---
async function processItem(raw: {
  source: string;
  headline: string;
  url: string;
  published_at: string;
  raw_content: string;
  source_id: string;
}) {
  const { source, headline, url, published_at, raw_content, source_id } = raw;

  const isNew = await dedup.isNew(source, source_id || headline, url || "");
  if (!isNew) return;

  const llmResult = await llm.process(headline, raw_content || "");
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
  console.log(`Processed: [${source}] ${headline}`);
}

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
  console.log(`PaisaMachine backend running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  fetcher.stop();
  rssFetcher.stop();
  twitterFetcher.stop();
  pulseFetcher.stop();
  tvFetcher.stop();
  screenerFetcher.stop();
  storage.close();
  await dedup.close();
  process.exit(0);
});
