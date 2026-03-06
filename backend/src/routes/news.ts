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
