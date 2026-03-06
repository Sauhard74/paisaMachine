import { Response } from "express";

export class BroadcastService {
  private clients: Map<string, Response> = new Map();
  private counter = 0;

  get clientCount(): number {
    return this.clients.size;
  }

  addClient(res: Response): string {
    const id = `client-${++this.counter}`;
    this.clients.set(id, res);

    res.on("close", () => {
      this.clients.delete(id);
    });

    return id;
  }

  removeClient(id: string) {
    this.clients.delete(id);
  }

  send(data: any) {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    for (const [id, res] of this.clients) {
      try {
        res.write(payload);
      } catch {
        this.clients.delete(id);
      }
    }
  }
}
