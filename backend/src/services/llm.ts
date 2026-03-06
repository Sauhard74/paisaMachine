import Anthropic from "@anthropic-ai/sdk";

export interface LLMResult {
  tickers: string[];
  sentiment: "positive" | "negative" | "neutral";
  category: string;
  impact: "high" | "medium" | "low";
  summary: string;
  key_figures: string[];
}

const VALID_SENTIMENTS = ["positive", "negative", "neutral"];
const VALID_IMPACTS = ["high", "medium", "low"];
const VALID_CATEGORIES = [
  "corporate_filing", "earnings", "order_win", "regulatory",
  "broker_report", "offer_announcement", "management_change",
  "sector_news", "other",
];

export function buildPrompt(headline: string, content: string): string {
  return `Analyze this Indian stock market news item. Return ONLY valid JSON with these fields:
- tickers: array of NSE/BSE stock symbols mentioned (e.g. ["RELIANCE", "TCS"]). Use official NSE symbols.
- sentiment: "positive" | "negative" | "neutral"
- category: one of: "corporate_filing", "earnings", "order_win", "regulatory", "broker_report", "offer_announcement", "management_change", "sector_news", "other"
- impact: "high" | "medium" | "low"
- summary: one-line summary (max 120 chars)
- key_figures: array of key numbers/amounts from the text (e.g. ["Rs 5,000 crore", "15%", "2,000 units"])

Headline: ${headline}
Content: ${content || "No additional content"}`;
}

export function parseLLMResponse(raw: string): LLMResult {
  const fallback: LLMResult = {
    tickers: [],
    sentiment: "neutral",
    category: "other",
    impact: "low",
    summary: "",
    key_figures: [],
  };

  try {
    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = raw;
    const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const parsed = JSON.parse(jsonStr);

    return {
      tickers: Array.isArray(parsed.tickers) ? parsed.tickers : [],
      sentiment: VALID_SENTIMENTS.includes(parsed.sentiment) ? parsed.sentiment : "neutral",
      category: VALID_CATEGORIES.includes(parsed.category) ? parsed.category : "other",
      impact: VALID_IMPACTS.includes(parsed.impact) ? parsed.impact : "low",
      summary: typeof parsed.summary === "string" ? parsed.summary.slice(0, 150) : "",
      key_figures: Array.isArray(parsed.key_figures) ? parsed.key_figures : [],
    };
  } catch {
    return fallback;
  }
}

export class LLMService {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async process(headline: string, content: string): Promise<LLMResult> {
    const prompt = buildPrompt(headline, content);

    const message = await this.client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    return parseLLMResponse(text);
  }
}
