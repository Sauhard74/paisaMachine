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
