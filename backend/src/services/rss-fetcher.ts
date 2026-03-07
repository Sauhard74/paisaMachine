/**
 * RSSFetcher - Polls financial news RSS feeds
 *
 * Moneycontrol blocks RSS access, so we use alternative sources:
 * Economic Times, LiveMint, Business Standard, and Google News (India markets)
 */

import Parser from "rss-parser";

export class RSSFetcher {
  private parser: Parser;
  private interval: ReturnType<typeof setInterval> | null = null;

  private feeds = [
    // Economic Times - Markets
    { url: "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms", source: "economic_times" },
    // Economic Times - Stocks News
    { url: "https://economictimes.indiatimes.com/markets/stocks/rssfeeds/2146842.cms", source: "economic_times" },
    // LiveMint - Markets
    { url: "https://www.livemint.com/rss/markets", source: "livemint" },
    // Moneycontrol - Markets
    { url: "https://www.moneycontrol.com/rss/marketreports.xml", source: "moneycontrol" },
    // Bloomberg - Markets
    { url: "https://feeds.bloomberg.com/markets/news.rss", source: "bloomberg" },
  ];

  constructor(
    private onNewItem: (item: {
      source: string;
      headline: string;
      url: string;
      published_at: string;
      raw_content: string;
      source_id: string;
    }) => Promise<void>
  ) {
    this.parser = new Parser({
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      timeout: 10_000,
    });
  }

  start(): void {
    console.log("[RSSFetcher] Starting RSS polling (every 60s)");
    setTimeout(() => this.pollAll(), 6_000);
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
          `[RSSFetcher] ${feed.source}: ${parsed.items.length} items`
        );

        for (const item of parsed.items) {
          const headline = item.title?.replace(/<!\[CDATA\[|\]\]>/g, "").trim() || "";
          if (!headline) continue;

          await this.onNewItem({
            source: feed.source,
            headline,
            url: item.link || "",
            published_at:
              item.isoDate || item.pubDate || new Date().toISOString(),
            raw_content:
              item.contentSnippet || item.content?.replace(/<[^>]+>/g, "").trim() || "",
            source_id:
              item.guid || item.link || `${feed.source}-${headline.substring(0, 60)}`,
          });
        }
      } catch (error: any) {
        console.error(
          `[RSSFetcher] Error polling ${feed.source}:`,
          error.message
        );
      }
    }
  }
}
