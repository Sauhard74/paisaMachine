/**
 * TradingViewFetcher - Polls TradingView news headlines API for Indian market news
 *
 * Uses the TradingView news-headlines endpoint for NSE:NIFTY symbol news.
 * Polls every 2 minutes. Falls back gracefully if the endpoint is unavailable.
 *
 * Response shape (verified):
 *   { sections: [...], items: [{ id, title, provider, sourceLogoId, published, source, urgency, link?, storyPath, relatedSymbols, permission? }] }
 */

const TV_NEWS_URLS = [
  "https://news-headlines.tradingview.com/v2/view/headlines/symbol?client=overview&lang=en&section=&streaming=&symbol=NSE%3ANIFTY",
  "https://news-headlines.tradingview.com/v2/view/headlines/symbol?client=overview&lang=en&section=&streaming=&symbol=BSE%3ASENSEX",
];

const POLL_INTERVAL_MS = 2 * 60_000;

interface TVNewsItem {
  id: string;
  title: string;
  provider: string;
  sourceLogoId?: string;
  published: number; // unix seconds
  source: string;
  urgency?: number;
  link?: string;
  permission?: string;
  storyPath?: string;
  shortDescription?: string;
  relatedSymbols?: Array<{ symbol: string; logoid?: string }>;
  astDescription?: { title?: string; description?: string };
}

interface TVResponse {
  sections?: unknown[];
  items?: TVNewsItem[];
  stories?: TVNewsItem[];
}

export interface RawNewsItem {
  source: string;
  headline: string;
  url: string;
  published_at: string;
  raw_content: string;
  source_id: string;
}

export class TradingViewFetcher {
  private interval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private onNewItem: (item: RawNewsItem) => Promise<void>,
  ) {}

  start(): void {
    console.log("[TradingViewFetcher] Starting polling (every 2 min)");
    setTimeout(() => this.poll(), 12_000);
    this.interval = setInterval(() => this.poll(), POLL_INTERVAL_MS);
  }

  stop(): void {
    console.log("[TradingViewFetcher] Stopping polling");
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private async poll(): Promise<void> {
    for (const url of TV_NEWS_URLS) {
      try {
        await this.fetchUrl(url);
      } catch (error: any) {
        console.error(`[TradingViewFetcher] Error fetching ${url}:`, error.message);
      }
    }
  }

  private async fetchUrl(url: string): Promise<void> {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
        Origin: "https://www.tradingview.com",
        Referer: "https://www.tradingview.com/",
      },
    });

    if (!response.ok) {
      console.error(`[TradingViewFetcher] Fetch failed (${response.status}) for ${url}`);
      return;
    }

    const data = (await response.json()) as TVResponse;
    const items = data.items || data.stories || [];

    console.log(`[TradingViewFetcher] Fetched ${items.length} items from ${url}`);

    for (const item of items) {
      const headline = item.title || item.astDescription?.title || "";
      if (!headline) continue;

      // Build the URL: prefer direct link, fall back to storyPath on tradingview.com
      let itemUrl = "";
      if (item.link) {
        itemUrl = item.link;
      } else if (item.storyPath) {
        itemUrl = `https://www.tradingview.com${item.storyPath}`;
      }

      // Extract related ticker symbols for context
      const relatedTickers = (item.relatedSymbols || [])
        .map((s) => s.symbol)
        .join(", ");

      const rawContent = [
        item.shortDescription || item.astDescription?.description || headline,
        relatedTickers ? `Related: ${relatedTickers}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      await this.onNewItem({
        source: "tradingview",
        headline,
        url: itemUrl,
        published_at: item.published
          ? new Date(item.published * 1000).toISOString()
          : new Date().toISOString(),
        raw_content: rawContent,
        source_id: `tv-${item.id || item.storyPath || headline.substring(0, 50)}`,
      });
    }
  }
}
