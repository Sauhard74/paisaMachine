/**
 * ExchangeFetcher - Direct NSE/BSE JSON API fetcher service
 *
 * Manages browser-like cookie sessions for NSE and BSE,
 * polls their APIs every 30 seconds, normalizes results,
 * and feeds them through the onNewItem callback.
 * Uses proxy rotation when direct NSE access is blocked.
 */

import { proxyPool } from "./proxy-pool.js";

export interface RawNewsItem {
  source: "nse_json_api" | "bse_json_api";
  headline: string;
  url: string;
  published_at: string;
  raw_content: string;
  source_id: string;
}

interface CookieSession {
  cookies: string;
  lastRefresh: number;
}

const POLL_INTERVAL_MS = 30_000; // 30 seconds
const COOKIE_REFRESH_MS = 10 * 60_000; // 10 minutes

const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export class ExchangeFetcher {
  private nseSession: CookieSession = { cookies: "", lastRefresh: 0 };
  private bseSession: CookieSession = { cookies: "", lastRefresh: 0 };
  private nseInterval: ReturnType<typeof setInterval> | null = null;
  private bseInterval: ReturnType<typeof setInterval> | null = null;
  private nseDirectBlocked = false;
  private bseDirectBlocked = false;

  constructor(private onNewItem: (item: RawNewsItem) => Promise<void>) {}

  start(): void {
    console.log("[ExchangeFetcher] Starting NSE and BSE polling (every 30s)");

    // Initial fetch after a short delay to let the server start
    setTimeout(() => this.pollNSE(), 2_000);
    setTimeout(() => this.pollBSE(), 4_000);

    this.nseInterval = setInterval(() => this.pollNSE(), POLL_INTERVAL_MS);
    this.bseInterval = setInterval(() => this.pollBSE(), POLL_INTERVAL_MS);
  }

  stop(): void {
    console.log("[ExchangeFetcher] Stopping polling");
    if (this.nseInterval) {
      clearInterval(this.nseInterval);
      this.nseInterval = null;
    }
    if (this.bseInterval) {
      clearInterval(this.bseInterval);
      this.bseInterval = null;
    }
  }

  // --------------- Cookie Management ---------------

  private parseCookies(response: Response): string {
    const setCookieHeaders = response.headers.getSetCookie?.() ?? [];
    if (setCookieHeaders.length === 0) return "";

    const cookies = setCookieHeaders.map((header) => {
      // Extract just the cookie name=value part (before the first ;)
      return header.split(";")[0].trim();
    });

    return cookies.join("; ");
  }

  private mergeCookies(existing: string, incoming: string): string {
    if (!incoming) return existing;
    if (!existing) return incoming;

    const cookieMap = new Map<string, string>();

    // Parse existing cookies
    for (const c of existing.split("; ")) {
      const eqIdx = c.indexOf("=");
      if (eqIdx > 0) {
        cookieMap.set(c.substring(0, eqIdx), c);
      }
    }

    // Merge incoming cookies (overwrite duplicates)
    for (const c of incoming.split("; ")) {
      const eqIdx = c.indexOf("=");
      if (eqIdx > 0) {
        cookieMap.set(c.substring(0, eqIdx), c);
      }
    }

    return Array.from(cookieMap.values()).join("; ");
  }

  private async refreshNSECookies(): Promise<void> {
    try {
      console.log("[ExchangeFetcher] Refreshing NSE cookies...");
      const response = await fetch("https://www.nseindia.com", {
        headers: {
          "User-Agent": BROWSER_USER_AGENT,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
        },
        redirect: "follow",
      });

      const newCookies = this.parseCookies(response);
      this.nseSession.cookies = this.mergeCookies(
        this.nseSession.cookies,
        newCookies
      );
      this.nseSession.lastRefresh = Date.now();

      // Consume the response body to free resources
      await response.text();

      console.log(
        `[ExchangeFetcher] NSE cookies refreshed (status=${response.status}, cookies=${this.nseSession.cookies ? "present" : "empty"})`
      );
    } catch (error: any) {
      console.error(
        "[ExchangeFetcher] NSE cookie refresh failed:",
        error.message
      );
    }
  }

  private async refreshBSECookies(): Promise<void> {
    // Try direct first
    try {
      console.log("[ExchangeFetcher] Refreshing BSE cookies...");
      const response = await fetch("https://www.bseindia.com", {
        headers: {
          "User-Agent": BROWSER_USER_AGENT,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
        redirect: "follow",
      });

      if (response.ok || response.status === 302) {
        const newCookies = this.parseCookies(response);
        this.bseSession.cookies = this.mergeCookies(
          this.bseSession.cookies,
          newCookies
        );
        this.bseSession.lastRefresh = Date.now();
        await response.text();
        this.bseDirectBlocked = false;
        console.log(
          `[ExchangeFetcher] BSE cookies refreshed (status=${response.status}, cookies=${this.bseSession.cookies ? "present" : "empty"})`
        );
        return;
      }
      await response.text();
    } catch (error: any) {
      console.error(
        "[ExchangeFetcher] BSE direct cookie refresh failed:",
        error.message
      );
    }

    // Direct failed — try through proxy
    this.bseDirectBlocked = true;
    if (proxyPool.size > 0) {
      try {
        const resp = await proxyPool.proxyFetch("https://www.bseindia.com", { timeoutMs: 6000 });
        if (resp.ok || resp.status === 302) {
          this.bseSession.lastRefresh = Date.now();
          console.log("[ExchangeFetcher] BSE cookie refresh succeeded via proxy");
        }
      } catch { /* proxy also failed */ }
    }
  }

  private needsCookieRefresh(session: CookieSession): boolean {
    return !session.cookies || Date.now() - session.lastRefresh > COOKIE_REFRESH_MS;
  }

  // --------------- NSE Polling ---------------

  private async pollNSE(): Promise<void> {
    try {
      const url =
        "https://www.nseindia.com/api/corporate-announcements?index=equities";

      // If direct is blocked and we have proxies, go straight to proxy
      if (this.nseDirectBlocked && proxyPool.size > 0) {
        try {
          const proxyResp = await proxyPool.proxyFetch(url, {
            headers: {
              Accept: "application/json",
              Referer: "https://www.nseindia.com/companies-listing/corporate-filings-announcements",
            },
            timeoutMs: 10000,
          });
          if (proxyResp.ok) {
            const data = await proxyResp.json();
            const items: any[] = Array.isArray(data) ? data : data?.data ?? [];
            console.log(`[ExchangeFetcher] NSE via proxy: fetched ${items.length} announcements`);
            for (const item of items) {
              try {
                const normalized = this.normalizeNSEItem(item);
                if (normalized) await this.onNewItem(normalized);
              } catch (error: any) {
                console.error("[ExchangeFetcher] Error processing NSE item:", error.message);
              }
            }
            return;
          }
        } catch { /* proxy failed, try direct below */ }
      }

      if (this.needsCookieRefresh(this.nseSession)) {
        await this.refreshNSECookies();
      }

      const response = await fetch(url, {
        headers: {
          "User-Agent": BROWSER_USER_AGENT,
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          Referer:
            "https://www.nseindia.com/companies-listing/corporate-filings-announcements",
          Cookie: this.nseSession.cookies,
        },
      });

      // If auth fails, try proxy rotation
      if (response.status === 401 || response.status === 403) {
        console.warn(
          `[ExchangeFetcher] NSE returned ${response.status}, trying proxy...`
        );
        await response.text(); // consume body
        this.nseDirectBlocked = true;

        // Try via proxy pool
        if (proxyPool.size > 0) {
          try {
            const proxyResp = await proxyPool.proxyFetch(url, {
              headers: {
                Accept: "application/json",
                "Accept-Language": "en-US,en;q=0.5",
                Referer: "https://www.nseindia.com/companies-listing/corporate-filings-announcements",
              },
              timeoutMs: 10000,
            });
            if (proxyResp.ok) {
              const data = await proxyResp.json();
              const items: any[] = Array.isArray(data) ? data : data?.data ?? [];
              console.log(`[ExchangeFetcher] NSE via proxy: fetched ${items.length} announcements`);
              for (const item of items) {
                try {
                  const normalized = this.normalizeNSEItem(item);
                  if (normalized) await this.onNewItem(normalized);
                } catch (error: any) {
                  console.error("[ExchangeFetcher] Error processing NSE item:", error.message);
                }
              }
              return;
            }
          } catch (err: any) {
            console.error(`[ExchangeFetcher] NSE proxy fetch failed: ${err.message}`);
          }
        }

        // Last resort: refresh cookies and retry direct
        await this.refreshNSECookies();
        const retryResponse = await fetch(url, {
          headers: {
            "User-Agent": BROWSER_USER_AGENT,
            Accept: "application/json",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br",
            Referer:
              "https://www.nseindia.com/companies-listing/corporate-filings-announcements",
            Cookie: this.nseSession.cookies,
          },
        });

        if (!retryResponse.ok) {
          const body = await retryResponse.text();
          console.error(
            `[ExchangeFetcher] NSE retry failed (status=${retryResponse.status}): ${body.substring(0, 200)}`
          );
          return;
        }

        this.nseDirectBlocked = false;
        await this.processNSEResponse(retryResponse);
        return;
      }

      if (!response.ok) {
        const body = await response.text();
        console.error(
          `[ExchangeFetcher] NSE fetch failed (status=${response.status}): ${body.substring(0, 200)}`
        );
        return;
      }

      this.nseDirectBlocked = false;
      await this.processNSEResponse(response);
    } catch (error: any) {
      console.error("[ExchangeFetcher] NSE poll error:", error.message);
    }
  }

  private async processNSEResponse(response: Response): Promise<void> {
    const data = await response.json();

    // Update cookies from response if any
    const newCookies = this.parseCookies(response);
    if (newCookies) {
      this.nseSession.cookies = this.mergeCookies(
        this.nseSession.cookies,
        newCookies
      );
    }

    // NSE returns an array of announcements or an object with a data property
    const items: any[] = Array.isArray(data) ? data : data?.data ?? [];

    console.log(`[ExchangeFetcher] NSE: fetched ${items.length} announcements`);

    for (const item of items) {
      try {
        const normalized = this.normalizeNSEItem(item);
        if (normalized) {
          await this.onNewItem(normalized);
        }
      } catch (error: any) {
        console.error(
          "[ExchangeFetcher] Error processing NSE item:",
          error.message
        );
      }
    }
  }

  private normalizeNSEItem(item: any): RawNewsItem | null {
    // NSE corporate announcements typically have fields like:
    // symbol, company, subject/desc, an_dt (announcement date), attchmntFile/attchmntText
    const headline =
      item.desc || item.subject || item.smIndustry || "";
    if (!headline) return null;

    const symbol = item.symbol || item.sym || "";
    const company = item.company || item.companyName || "";
    const dateStr = item.an_dt || item.date || item.dt || "";
    const attachmentText = item.attchmntText || "";
    const attachmentFile = item.attchmntFile || "";

    const sourceId =
      item.seq_id ||
      item.seqId ||
      `nse_${symbol}_${dateStr}_${headline.substring(0, 50)}`;

    const rawContent = [
      company ? `Company: ${company}` : "",
      symbol ? `Symbol: ${symbol}` : "",
      headline,
      attachmentText,
    ]
      .filter(Boolean)
      .join("\n");

    const cleanedAttachment = attachmentFile ? attachmentFile.trim() : "";
    const url = cleanedAttachment
      ? (cleanedAttachment.startsWith("http") ? cleanedAttachment : `https://www.nseindia.com/${cleanedAttachment.replace(/^\/+/, "")}`)
      : `https://www.nseindia.com/companies-listing/corporate-filings-announcements`;

    return {
      source: "nse_json_api",
      headline: `${symbol ? `[${symbol}] ` : ""}${headline}`,
      url,
      published_at: this.parseDate(dateStr),
      raw_content: rawContent,
      source_id: String(sourceId),
    };
  }

  // --------------- BSE Polling ---------------

  private getTodayBSEFormat(): string {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}${mm}${dd}`;
  }

  private async pollBSE(): Promise<void> {
    try {
      const today = this.getTodayBSEFormat();
      const url = `https://api.bseindia.com/BseIndiaAPI/api/AnnGetData/w?strCat=-1&strPrevDate=${today}&strScrip=&strSearch=P&strToDate=${today}&strType=C`;

      // If direct is blocked and we have proxies, go straight to proxy
      if (this.bseDirectBlocked && proxyPool.size > 0) {
        try {
          const proxyResp = await proxyPool.proxyFetch(url, {
            headers: {
              Accept: "application/json",
              Referer: "https://www.bseindia.com/",
              Origin: "https://www.bseindia.com",
            },
            timeoutMs: 10000,
          });
          if (proxyResp.ok) {
            const data = await proxyResp.json();
            const items: any[] = Array.isArray(data) ? data : data?.Table ?? data?.data ?? [];
            console.log(`[ExchangeFetcher] BSE via proxy: fetched ${items.length} announcements`);
            for (const item of items) {
              try {
                const normalized = this.normalizeBSEItem(item);
                if (normalized) await this.onNewItem(normalized);
              } catch (error: any) {
                console.error("[ExchangeFetcher] Error processing BSE item:", error.message);
              }
            }
            return;
          }
        } catch { /* proxy failed, try direct below */ }
      }

      if (this.needsCookieRefresh(this.bseSession)) {
        await this.refreshBSECookies();
      }

      const response = await fetch(url, {
        headers: {
          "User-Agent": BROWSER_USER_AGENT,
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.5",
          Referer: "https://www.bseindia.com/",
          Origin: "https://www.bseindia.com",
        },
      });

      // If auth fails, try proxy rotation
      if (response.status === 401 || response.status === 403) {
        console.warn(
          `[ExchangeFetcher] BSE returned ${response.status}, trying proxy...`
        );
        await response.text();
        this.bseDirectBlocked = true;

        if (proxyPool.size > 0) {
          try {
            const proxyResp = await proxyPool.proxyFetch(url, {
              headers: {
                Accept: "application/json",
                Referer: "https://www.bseindia.com/",
                Origin: "https://www.bseindia.com",
              },
              timeoutMs: 10000,
            });
            if (proxyResp.ok) {
              const data = await proxyResp.json();
              const items: any[] = Array.isArray(data) ? data : data?.Table ?? data?.data ?? [];
              console.log(`[ExchangeFetcher] BSE via proxy: fetched ${items.length} announcements`);
              for (const item of items) {
                try {
                  const normalized = this.normalizeBSEItem(item);
                  if (normalized) await this.onNewItem(normalized);
                } catch (error: any) {
                  console.error("[ExchangeFetcher] Error processing BSE item:", error.message);
                }
              }
              return;
            }
          } catch (err: any) {
            console.error(`[ExchangeFetcher] BSE proxy fetch failed: ${err.message}`);
          }
        }

        // Last resort: refresh cookies and retry direct
        await this.refreshBSECookies();
        const retryResponse = await fetch(url, {
          headers: {
            "User-Agent": BROWSER_USER_AGENT,
            Accept: "application/json",
            "Accept-Language": "en-US,en;q=0.5",
            Referer: "https://www.bseindia.com/",
            Origin: "https://www.bseindia.com",
          },
        });

        if (!retryResponse.ok) {
          const body = await retryResponse.text();
          console.error(
            `[ExchangeFetcher] BSE retry failed (status=${retryResponse.status}): ${body.substring(0, 200)}`
          );
          return;
        }

        this.bseDirectBlocked = false;
        await this.processBSEResponse(retryResponse);
        return;
      }

      if (!response.ok) {
        const body = await response.text();
        console.error(
          `[ExchangeFetcher] BSE fetch failed (status=${response.status}): ${body.substring(0, 200)}`
        );
        return;
      }

      this.bseDirectBlocked = false;
      await this.processBSEResponse(response);
    } catch (error: any) {
      console.error("[ExchangeFetcher] BSE poll error:", error.message);
    }
  }

  private async processBSEResponse(response: Response): Promise<void> {
    const data = await response.json();

    // Update cookies from response if any
    const newCookies = this.parseCookies(response);
    if (newCookies) {
      this.bseSession.cookies = this.mergeCookies(
        this.bseSession.cookies,
        newCookies
      );
    }

    // BSE returns a Table array or similar structure
    const items: any[] = Array.isArray(data)
      ? data
      : data?.Table ?? data?.data ?? [];

    console.log(`[ExchangeFetcher] BSE: fetched ${items.length} announcements`);

    for (const item of items) {
      try {
        const normalized = this.normalizeBSEItem(item);
        if (normalized) {
          await this.onNewItem(normalized);
        }
      } catch (error: any) {
        console.error(
          "[ExchangeFetcher] Error processing BSE item:",
          error.message
        );
      }
    }
  }

  private normalizeBSEItem(item: any): RawNewsItem | null {
    // BSE announcements typically have fields like:
    // NEWSID, HEADLINE, SCRIP_CD, SLONGNAME, NEWS_DT, NEWSSUB, ATTACHMENT, CATEGORYNAME
    const headline =
      item.NEWSSUB || item.HEADLINE || item.NEWS_subject || "";
    if (!headline) return null;

    const scripCode = item.SCRIP_CD || item.scrip_cd || "";
    const companyName =
      item.SLONGNAME || item.COMPANY_NAME || item.companyname || "";
    const newsId = item.NEWSID || item.NEWS_ID || item.newsid || "";
    const dateStr = item.NEWS_DT || item.DT_TM || item.news_dt || "";
    const attachment = item.ATTACHMENT || item.attachment || "";
    const categoryName = item.CATEGORYNAME || item.categoryname || "";

    const sourceId = newsId
      ? `bse_${newsId}`
      : `bse_${scripCode}_${dateStr}_${headline.substring(0, 50)}`;

    const rawContent = [
      companyName ? `Company: ${companyName}` : "",
      scripCode ? `Scrip Code: ${scripCode}` : "",
      categoryName ? `Category: ${categoryName}` : "",
      headline,
    ]
      .filter(Boolean)
      .join("\n");

    const url = attachment
      ? `https://www.bseindia.com/xml-data/corpfiling/AttachLive/${attachment}`
      : `https://www.bseindia.com/corporates/ann.html`;

    return {
      source: "bse_json_api",
      headline: `${scripCode ? `[${scripCode}] ` : ""}${headline}`,
      url,
      published_at: this.parseDate(dateStr),
      raw_content: rawContent,
      source_id: sourceId,
    };
  }

  // --------------- Utilities ---------------

  private parseDate(dateStr: string): string {
    if (!dateStr) return new Date().toISOString();

    try {
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString();
      }
    } catch {
      // Fall through to default
    }

    // Try DD-MM-YYYY or DD/MM/YYYY formats common in Indian exchanges
    const match = dateStr.match(
      /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?/
    );
    if (match) {
      const [, day, month, year, hour, minute, second] = match;
      const d = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour || 0),
        Number(minute || 0),
        Number(second || 0)
      );
      if (!isNaN(d.getTime())) {
        return d.toISOString();
      }
    }

    return new Date().toISOString();
  }
}
