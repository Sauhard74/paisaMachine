import { Router, Request, Response } from "express";
import { StorageService } from "../services/storage.js";

export function createStatsRouter(storage: StorageService): Router {
  const router = Router();
  router.get("/", async (_req: Request, res: Response) => {
    const stats = await storage.getStats();
    res.json(stats);
  });
  return router;
}
