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
