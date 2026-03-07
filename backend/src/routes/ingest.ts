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

      // Validate input sizes
      if (typeof headline !== "string" || headline.length > 1000) {
        res.status(400).json({ error: "Invalid headline" });
        return;
      }
      if (raw_content && (typeof raw_content !== "string" || raw_content.length > 50000)) {
        res.status(413).json({ error: "Content too large" });
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
