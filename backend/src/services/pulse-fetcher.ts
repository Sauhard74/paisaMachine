/**
 * PulseFetcher - Scrapes Zerodha Pulse for financial news
 *
 * Fetches from https://pulse.zerodha.com/ every 2 minutes,
 * parses the HTML with cheerio, and feeds items through the onNewItem callback.
 */

import * as cheerio from "cheerio";

const PULSE_URL = "https://pulse.zerodha.com/";
const POLL_INTERVAL_MS = 2 * 60_000; // 2 minutes

const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export interface PulseRawNewsItem {
  source: string;
  headline: string;
  url: string;
  published_at: string;
  raw_content: string;
  source_id: string;
}

export class PulseFetcher {
  private interval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private onNewItem: (item: PulseRawNewsItem) => Promise<void>
  ) {}

  start(): void {
    console.log("[PulseFetcher] Starting Zerodha Pulse polling (every 2 min)");
    setTimeout(() => this.poll(), 10_000);
    this.interval = setInterval(() => this.poll(), POLL_INTERVAL_MS);
  }

  stop(): void {
    console.log("[PulseFetcher] Stopping Zerodha Pulse polling");
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private async poll(): Promise<void> {
    try {
      const response = await fetch(PULSE_URL, {
        headers: {
          "User-Agent": BROWSER_USER_AGENT,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
      });

      if (!response.ok) {
        console.error(`[PulseFetcher] Fetch failed (${response.status})`);
        return;
      }

      const html = await response.text();
      const $ = cheerio.load(html);
      let count = 0;

      // Zerodha Pulse structure:
      //   ul#news > li.box.item
      //     h2.title > a[href]        — headline + link
      //     div.desc                   — description/summary
      //     span.date[title]           — timestamp (title attr has full date)
      //     span.feed                  — source name
      const items = $("ul#news > li.box.item");

      for (let i = 0; i < items.length; i++) {
        const el = items.eq(i);
        const titleEl = el.children("h2.title").find("a").first();
        const headline = titleEl.text().trim();
        const url = titleEl.attr("href") || "";
        const dataId = titleEl.attr("data-id") || "";

        if (!headline || headline.length < 10) continue;

        const dateEl = el.children("span.date").first();
        // The title attribute contains the full date like "11:35 PM, 06 Mar 2026"
        const dateTitle = dateEl.attr("title") || "";
        const dateText = dateEl.text().trim();

        const desc = el.children("div.desc").first().text().trim();

        const sourceId = dataId
          ? `pulse-${dataId}`
          : `pulse-${Buffer.from(url || headline)
              .toString("base64")
              .substring(0, 40)}`;

        try {
          await this.onNewItem({
            source: "zerodha_pulse",
            headline,
            url: url.startsWith("http") ? url : `https://pulse.zerodha.com${url}`,
            published_at: this.parseTime(dateTitle, dateText),
            raw_content: desc || headline,
            source_id: sourceId,
          });
          count++;
        } catch (error: any) {
          console.error(
            "[PulseFetcher] Error processing item:",
            error.message
          );
        }
      }

      console.log(`[PulseFetcher] Processed ${count} items`);
    } catch (error: any) {
      console.error("[PulseFetcher] Poll error:", error.message);
    }
  }

  /**
   * Parse time from Zerodha Pulse date formats.
   * The title attribute contains dates like "11:35 PM, 06 Mar 2026".
   * The text content contains relative times like "3.5 hours ago".
   */
  private parseTime(dateTitle: string, dateText: string): string {
    // Try the title attribute first (e.g. "11:35 PM, 06 Mar 2026")
    if (dateTitle) {
      try {
        const d = new Date(dateTitle);
        if (!isNaN(d.getTime())) return d.toISOString();
      } catch {}
    }

    // Try parsing relative time from text (e.g. "3.5 hours ago", "20 minutes ago")
    if (dateText) {
      const match = dateText.match(
        /(\d+(?:\.\d+)?)\s*(second|minute|hour|day|week|month)s?\s*ago/i
      );
      if (match) {
        const value = parseFloat(match[1]);
        const unit = match[2].toLowerCase();
        const now = Date.now();
        const msMap: Record<string, number> = {
          second: 1000,
          minute: 60_000,
          hour: 3_600_000,
          day: 86_400_000,
          week: 604_800_000,
          month: 2_592_000_000,
        };
        if (msMap[unit]) {
          return new Date(now - value * msMap[unit]).toISOString();
        }
      }
    }

    return new Date().toISOString();
  }
}
