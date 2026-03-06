import { describe, it, expect, beforeEach } from "vitest";
import { DedupService } from "../services/dedup.js";

describe("DedupService (in-memory fallback)", () => {
  let dedup: DedupService;

  beforeEach(() => {
    dedup = new DedupService(); // no Redis URL = in-memory mode
  });

  it("should mark item as new on first check", async () => {
    const isNew = await dedup.isNew("nse_json_api", "source-id-1", "https://example.com/1");
    expect(isNew).toBe(true);
  });

  it("should detect duplicate by source + source_id", async () => {
    await dedup.isNew("nse_json_api", "source-id-1", "https://example.com/1");
    const isNew = await dedup.isNew("nse_json_api", "source-id-1", "https://example.com/1");
    expect(isNew).toBe(false);
  });

  it("should detect duplicate by URL across sources", async () => {
    await dedup.isNew("nse_rss", "rss-1", "https://example.com/same-article");
    const isNew = await dedup.isNew("nse_json_api", "api-1", "https://example.com/same-article");
    expect(isNew).toBe(false);
  });

  it("should allow same source_id from different sources", async () => {
    await dedup.isNew("nse_json_api", "id-1", "https://nse.com/1");
    const isNew = await dedup.isNew("bse_json_api", "id-1", "https://bse.com/1");
    expect(isNew).toBe(true);
  });
});
