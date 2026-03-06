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
