import { describe, it, expect, beforeEach } from "vitest";
import { StorageService } from "../services/storage.js";

describe("StorageService", () => {
  let storage: StorageService;

  beforeEach(() => {
    storage = new StorageService(":memory:");
  });

  it("should insert and retrieve a news item", () => {
    const item = {
      source: "nse_json_api",
      headline: "Reliance wins Rs 5000 crore order",
      url: "https://example.com/1",
      summary: "Reliance wins large order",
      raw_content: "Full content here",
      published_at: "2026-03-07T10:30:00Z",
      tickers: ["RELIANCE"],
      sentiment: "positive" as const,
      category: "order_win",
      impact: "high" as const,
      key_figures: ["Rs 5000 crore"],
      source_id: "nse-123",
      fingerprint: "abc123",
    };

    const id = storage.insert(item);
    expect(id).toBeGreaterThan(0);

    const retrieved = storage.getRecent(10);
    expect(retrieved).toHaveLength(1);
    expect(retrieved[0].headline).toBe("Reliance wins Rs 5000 crore order");
    expect(retrieved[0].tickers).toEqual(["RELIANCE"]);
  });

  it("should reject duplicate fingerprints", () => {
    const item = {
      source: "nse_json_api",
      headline: "Test headline",
      url: "https://example.com/1",
      summary: "Summary",
      raw_content: "",
      published_at: "2026-03-07T10:30:00Z",
      tickers: [],
      sentiment: "neutral" as const,
      category: "other",
      impact: "low" as const,
      key_figures: [],
      source_id: "nse-456",
      fingerprint: "dup123",
    };

    storage.insert(item);
    expect(() => storage.insert(item)).toThrow();
  });

  it("should filter by sentiment", () => {
    const base = {
      url: "",
      summary: "",
      raw_content: "",
      published_at: "2026-03-07T10:30:00Z",
      tickers: [],
      category: "other",
      impact: "low" as const,
      key_figures: [],
      source_id: "",
    };

    storage.insert({ ...base, source: "a", headline: "Good news", sentiment: "positive" as const, fingerprint: "f1" });
    storage.insert({ ...base, source: "b", headline: "Bad news", sentiment: "negative" as const, fingerprint: "f2" });

    const positive = storage.getRecent(10, { sentiment: "positive" });
    expect(positive).toHaveLength(1);
    expect(positive[0].headline).toBe("Good news");
  });
});
