import { Router, Request, Response } from "express";
import { StorageService } from "../services/storage.js";

export function createStatsRouter(storage: StorageService): Router {
  const router = Router();
  router.get("/", (_req: Request, res: Response) => {
    const stats = storage.getStats();
    res.json(stats);
  });
  return router;
}
