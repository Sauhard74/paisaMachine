import { createHash } from "crypto";
import { Redis } from "ioredis";

const TTL_SECONDS = 24 * 60 * 60; // 24 hours

export class DedupService {
  private redis: Redis | null = null;
  private memoryCache: Set<string> = new Set();
  private useMemory: boolean;

  constructor(redisUrl?: string) {
    if (redisUrl) {
      this.redis = new Redis(redisUrl, { retryStrategy: (times: number) => Math.min(times * 500, 5000) });
      this.redis.on("error", () => {
        if (!this.useMemory) {
          console.warn("Redis connection failed, falling back to in-memory dedup");
          this.useMemory = true;
        }
      });
      this.redis.on("connect", () => {
        if (this.useMemory) {
          console.log("Redis reconnected, switching back from in-memory dedup");
          this.useMemory = false;
        }
      });
      this.useMemory = false;
    } else {
      this.useMemory = true;
    }
  }

  private hash(input: string): string {
    return createHash("sha256").update(input).digest("hex");
  }

  async isNew(source: string, sourceId: string, url: string): Promise<boolean> {
    const primaryKey = this.hash(`${source}:${sourceId}`);
    const urlKey = url ? this.hash(url) : null;

    if (this.useMemory || !this.redis) {
      if (this.memoryCache.has(primaryKey)) return false;
      if (urlKey && this.memoryCache.has(urlKey)) return false;
      this.memoryCache.add(primaryKey);
      if (urlKey) this.memoryCache.add(urlKey);
      return true;
    }

    // Check Redis
    const primaryExists = await this.redis.exists(`dedup:${primaryKey}`);
    if (primaryExists) return false;

    if (urlKey) {
      const urlExists = await this.redis.exists(`dedup:${urlKey}`);
      if (urlExists) return false;
    }

    // Mark as seen
    await this.redis.setex(`dedup:${primaryKey}`, TTL_SECONDS, "1");
    if (urlKey) {
      await this.redis.setex(`dedup:${urlKey}`, TTL_SECONDS, "1");
    }

    return true;
  }

  async close() {
    if (this.redis) await this.redis.quit();
  }
}
