/**
 * ScreenerFetcher - Scrapes Screener.in public stock screens for corporate updates
 *
 * Since Screener.in's /announcements/ and /actions/ pages require authentication,
 * this fetcher scrapes publicly available stock screens:
 *   - Latest quarterly results (companies reporting recent results)
 *   - Companies creating new highs
 *
 * Each row yields a news item with company name, key financials, and result date.
 * Polls every 5 minutes.
 *
 * Page structure (verified):
 *   <table class="data-table ...">
 *     <tr data-row-company-id="...">
 *       <td class="text">1.</td>
 *       <td class="text"><a href="/company/SYMBOL/">Company Name</a></td>
 *       <td>CMP</td><td>PE</td><td>MCap</td><td>Div</td><td>NetProfit</td>
 *       <td>ProfitGrowth</td><td>Sales</td><td>SalesGrowth</td><td>ROCE</td>
 *       <td>PAT</td><td>ResultDate</td>
 *     </tr>
 */

import * as cheerio from "cheerio";

export interface RawNewsItem {
  source: string;
  headline: string;
  url: string;
  published_at: string;
  raw_content: string;
  source_id: string;
}

const SCREENER_SCREENS = [
  {
    url: "https://www.screener.in/screens/2437615/all-latest-qtr-results-date-wise/",
    label: "Latest Quarterly Results",
  },
  {
    url: "https://www.screener.in/screens/214283/companies-creating-new-high/",
    label: "Companies Creating New High",
  },
];

const POLL_INTERVAL_MS = 5 * 60_000;

export class ScreenerFetcher {
  private interval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private onNewItem: (item: RawNewsItem) => Promise<void>,
  ) {}

  start(): void {
    console.log("[ScreenerFetcher] Starting polling (every 5 min)");
    setTimeout(() => this.poll(), 14_000);
    this.interval = setInterval(() => this.poll(), POLL_INTERVAL_MS);
  }

  stop(): void {
    console.log("[ScreenerFetcher] Stopping polling");
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private async poll(): Promise<void> {
    for (const screen of SCREENER_SCREENS) {
      try {
        await this.fetchScreen(screen.url, screen.label);
      } catch (error: any) {
        console.error(
          `[ScreenerFetcher] Error fetching ${screen.label}:`,
          error.message,
        );
      }
    }
  }

  private async fetchScreen(url: string, label: string): Promise<void> {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
    });

    if (!response.ok) {
      console.error(
        `[ScreenerFetcher] Fetch failed (${response.status}) for ${label}`,
      );
      return;
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    let count = 0;

    // Extract column headers from the first thead row
    const headers: string[] = [];
    $("table.data-table th").each((_, el) => {
      const tooltip = $(el).attr("data-tooltip");
      const text = $(el).text().trim();
      headers.push(tooltip || text);
    });

    // Process each data row
    const rows = $("table.data-table tr[data-row-company-id]");

    for (let i = 0; i < rows.length; i++) {
      const row = rows.eq(i);
      const companyLink = row.find("a[href*='/company/']").first();
      const companyName = companyLink.text().trim();
      const companyHref = companyLink.attr("href") || "";

      if (!companyName) continue;

      // Extract all numeric cells
      const cells = row.find("td");
      const values: string[] = [];
      cells.each((_, td) => {
        values.push($(td).text().trim());
      });

      // Build a meaningful headline and raw content depending on the screen type
      let headline: string;
      let rawContent: string;

      if (label.includes("Results")) {
        // For quarterly results screen:
        // Columns: S.No, Name, CMP, PE, MCap, Div, NetProfit, ProfitGrowth%, Sales, SalesGrowth%, ROCE, PAT, ResultDate
        const profitGrowth = values[7] || "";
        const salesGrowth = values[9] || "";
        const netProfit = values[6] || "";
        const sales = values[8] || "";

        headline = `${companyName} reports quarterly results`;
        if (profitGrowth) {
          const growthSign = profitGrowth.startsWith("-") ? "" : "+";
          headline += ` (Profit ${growthSign}${profitGrowth}%)`;
        }

        rawContent = [
          `Company: ${companyName}`,
          netProfit ? `Net Profit: ${netProfit} Cr` : "",
          profitGrowth ? `Profit Growth YoY: ${profitGrowth}%` : "",
          sales ? `Sales: ${sales} Cr` : "",
          salesGrowth ? `Sales Growth YoY: ${salesGrowth}%` : "",
          values[10] ? `ROCE: ${values[10]}%` : "",
          `Screen: ${label}`,
        ]
          .filter(Boolean)
          .join(" | ");
      } else {
        // For other screens (e.g., new highs)
        headline = `${companyName}: ${label}`;
        rawContent = values.slice(2).join(", "); // skip S.No and Name columns
      }

      const companyUrl = companyHref.startsWith("http")
        ? companyHref
        : `https://www.screener.in${companyHref}`;

      const companyId = row.attr("data-row-company-id") || "";
      const sourceId = `screener-${companyId}-${label.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().slice(0, 10)}`;

      try {
        await this.onNewItem({
          source: "screener",
          headline,
          url: companyUrl,
          published_at: new Date().toISOString(),
          raw_content: rawContent,
          source_id: sourceId,
        });
        count++;
      } catch (error: any) {
        console.error(
          `[ScreenerFetcher] Error processing ${companyName}:`,
          error.message,
        );
      }
    }

    console.log(`[ScreenerFetcher] Processed ${count} items from "${label}"`);
  }
}
