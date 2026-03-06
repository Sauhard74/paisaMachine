/**
 * RSSFetcher - Polls Moneycontrol RSS feeds for financial news
 *
 * Fetches from multiple Moneycontrol RSS feeds every 60 seconds,
 * normalizes items, and feeds them through the onNewItem callback.
 */

import Parser from "rss-parser";

export interface RSSRawNewsItem {
  source: string;
  headline: string;
  url: string;
  published_at: string;
  raw_content: string;
  source_id: string;
}

export class RSSFetcher {
  private parser: Parser;
  private interval: ReturnType<typeof setInterval> | null = null;

  private feeds = [
    { url: "https://www.moneycontrol.com/rss/MCtopnews.xml", source: "moneycontrol" },
    { url: "https://www.moneycontrol.com/rss/marketreports.xml", source: "moneycontrol" },
    { url: "https://www.moneycontrol.com/rss/results.xml", source: "moneycontrol" },
    { url: "https://www.moneycontrol.com/rss/stocksnews.xml", source: "moneycontrol" },
  ];

  constructor(private onNewItem: (item: RSSRawNewsItem) => Promise<void>) {
    this.parser = new Parser({
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
  }

  start(): void {
    console.log("[RSSFetcher] Starting RSS polling (every 60s)");
    setTimeout(() => this.pollAll(), 6_000); // delay to let server start
    this.interval = setInterval(() => this.pollAll(), 60_000);
  }

  stop(): void {
    console.log("[RSSFetcher] Stopping RSS polling");
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private async pollAll(): Promise<void> {
    for (const feed of this.feeds) {
      try {
        const parsed = await this.parser.parseURL(feed.url);
        console.log(
          `[RSSFetcher] ${feed.source}: ${parsed.items.length} items from ${feed.url}`
        );

        for (const item of parsed.items) {
          const normalized: RSSRawNewsItem = {
            source: feed.source,
            headline: item.title || "",
            url: item.link || "",
            published_at:
              item.isoDate || item.pubDate || new Date().toISOString(),
            raw_content: item.contentSnippet || item.content || "",
            source_id:
              item.guid || item.link || `${feed.source}-${item.title}`,
          };

          if (normalized.headline) {
            await this.onNewItem(normalized);
          }
        }
      } catch (error: any) {
        console.error(
          `[RSSFetcher] Error polling ${feed.url}:`,
          error.message
        );
      }
    }
  }
}
