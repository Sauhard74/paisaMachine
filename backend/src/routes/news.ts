import { Router, Request, Response } from "express";
import { StorageService } from "../services/storage.js";

const VALID_SENTIMENTS = ["positive", "negative", "neutral"];
const VALID_IMPACTS = ["high", "medium", "low"];
const MAX_LIMIT = 500;
const MAX_SEARCH_LENGTH = 100;

export function createNewsRouter(storage: StorageService): Router {
  const router = Router();

  router.get("/", (req: Request, res: Response) => {
    const { sentiment, category, impact, source, ticker, search, limit, before } = req.query;

    // Validate filter values
    if (sentiment && !VALID_SENTIMENTS.includes(sentiment as string)) {
      res.status(400).json({ error: "Invalid sentiment" });
      return;
    }
    if (impact && !VALID_IMPACTS.includes(impact as string)) {
      res.status(400).json({ error: "Invalid impact" });
      return;
    }
    if (search && (search as string).length > MAX_SEARCH_LENGTH) {
      res.status(400).json({ error: "Search query too long" });
      return;
    }
    if (ticker && !/^[A-Z0-9&.\-]{1,20}$/i.test(ticker as string)) {
      res.status(400).json({ error: "Invalid ticker format" });
      return;
    }

    // Clamp limit
    const clampedLimit = Math.min(Math.max(Number(limit) || 50, 1), MAX_LIMIT);

    const items = storage.getRecent(clampedLimit, {
      sentiment: sentiment as string,
      category: category as string,
      impact: impact as string,
      source: source as string,
      ticker: ticker as string,
      search: search as string,
      beforeId: before ? Number(before) : undefined,
    });

    res.json(items);
  });

  return router;
}
