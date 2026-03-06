import { describe, it, expect } from "vitest";
import { buildPrompt, parseLLMResponse, type LLMResult } from "../services/llm.js";

describe("LLM Service", () => {
  it("should build a valid prompt from headline and content", () => {
    const prompt = buildPrompt("Reliance wins Rs 5000 crore order", "Full content here");
    expect(prompt).toContain("Reliance wins Rs 5000 crore order");
    expect(prompt).toContain("Full content here");
    expect(prompt).toContain("tickers");
    expect(prompt).toContain("sentiment");
  });

  it("should parse valid LLM JSON response", () => {
    const raw = JSON.stringify({
      tickers: ["RELIANCE"],
      sentiment: "positive",
      category: "order_win",
      impact: "high",
      summary: "Reliance wins large order worth Rs 5000 crore",
      key_figures: ["Rs 5000 crore"],
    });

    const result = parseLLMResponse(raw);
    expect(result.tickers).toEqual(["RELIANCE"]);
    expect(result.sentiment).toBe("positive");
    expect(result.category).toBe("order_win");
    expect(result.impact).toBe("high");
    expect(result.key_figures).toEqual(["Rs 5000 crore"]);
  });

  it("should handle malformed JSON gracefully", () => {
    const result = parseLLMResponse("not valid json {{{");
    expect(result.tickers).toEqual([]);
    expect(result.sentiment).toBe("neutral");
    expect(result.category).toBe("other");
    expect(result.impact).toBe("low");
  });
});
