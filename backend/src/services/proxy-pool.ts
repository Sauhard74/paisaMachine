/**
 * ProxyPool - Rotates through proxy servers for NSE requests
 *
 * Fetches free proxy lists, validates them against NSE,
 * and provides a proxied fetch function that rotates IPs.
 */

import { ProxyAgent, fetch as undiciFetch } from "undici";

export interface ProxyEntry {
  host: string;
  port: number;
  failures: number;
  lastUsed: number;
}

const MAX_FAILURES = 3;
const PROXY_REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes
const PROXY_TEST_TIMEOUT = 6000;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const PROXY_SOURCES = [
  "https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=5000&country=IN&ssl=yes&anonymity=elite,anonymous",
  "https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=5000&country=all&ssl=yes&anonymity=elite",
  "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
  "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt",
];

export class ProxyPool {
  private proxies: ProxyEntry[] = [];
  private currentIndex = 0;
  private refreshTimer: ReturnType<typeof setInterval> | null = null;
  private refreshing = false;

  async start(): Promise<void> {
    console.log("[ProxyPool] Starting proxy pool...");
    await this.refresh();
    this.refreshTimer = setInterval(() => this.refresh(), PROXY_REFRESH_INTERVAL);
  }

  stop(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  get size(): number {
    return this.proxies.filter((p) => p.failures < MAX_FAILURES).length;
  }

  /**
   * Fetch a URL through a rotating proxy. Falls back to direct fetch if no proxies available.
   */
  async proxyFetch(
    url: string,
    options: {
      headers?: Record<string, string>;
      timeoutMs?: number;
      redirect?: "follow" | "manual";
    } = {}
  ): Promise<{ ok: boolean; status: number; text: () => Promise<string>; json: () => Promise<any>; headers: any }> {
    const alive = this.proxies.filter((p) => p.failures < MAX_FAILURES);

    if (alive.length === 0) {
      // No proxies — fall back to direct fetch
      return this.directFetch(url, options);
    }

    // Pick next proxy (round-robin)
    this.currentIndex = (this.currentIndex + 1) % alive.length;
    const proxy = alive[this.currentIndex];
    proxy.lastUsed = Date.now();

    const proxyUrl = `http://${proxy.host}:${proxy.port}`;

    try {
      const dispatcher = new ProxyAgent(proxyUrl);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), options.timeoutMs || 8000);

      const resp = await undiciFetch(url, {
        dispatcher,
        headers: {
          "User-Agent": USER_AGENT,
          ...options.headers,
        },
        signal: controller.signal,
        redirect: options.redirect || "follow",
      });
      clearTimeout(timer);

      if (resp.status === 403 || resp.status === 407 || resp.status === 502 || resp.status === 503) {
        proxy.failures++;
        // Try another proxy
        return this.proxyFetch(url, options);
      }

      // Success — reset failures
      proxy.failures = 0;

      return {
        ok: resp.ok,
        status: resp.status,
        text: () => resp.text(),
        json: () => resp.json(),
        headers: resp.headers,
      };
    } catch (err: any) {
      proxy.failures++;
      console.log(`[ProxyPool] Proxy ${proxy.host}:${proxy.port} failed: ${err.message?.substring(0, 60)}`);

      // Try next proxy if we still have some
      const remaining = this.proxies.filter((p) => p.failures < MAX_FAILURES);
      if (remaining.length > 0) {
        return this.proxyFetch(url, options);
      }

      // All proxies exhausted — direct fetch as last resort
      return this.directFetch(url, options);
    }
  }

  private async directFetch(
    url: string,
    options: { headers?: Record<string, string>; timeoutMs?: number; redirect?: "follow" | "manual" }
  ) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), options.timeoutMs || 8000);
    try {
      const resp = await fetch(url, {
        headers: { "User-Agent": USER_AGENT, ...options.headers },
        signal: controller.signal,
        redirect: options.redirect || "follow",
      });
      clearTimeout(timer);
      return {
        ok: resp.ok,
        status: resp.status,
        text: () => resp.text(),
        json: () => resp.json(),
        headers: resp.headers,
      };
    } finally {
      clearTimeout(timer);
    }
  }

  private async refresh(): Promise<void> {
    if (this.refreshing) return;
    this.refreshing = true;

    try {
      const rawProxies: string[] = [];

      const results = await Promise.allSettled(
        PROXY_SOURCES.map(async (sourceUrl) => {
          try {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 8000);
            const resp = await fetch(sourceUrl, { signal: controller.signal });
            clearTimeout(timer);
            if (!resp.ok) return [];
            const text = await resp.text();
            return text
              .split("\n")
              .map((l) => l.trim())
              .filter((l) => /^\d+\.\d+\.\d+\.\d+:\d+$/.test(l));
          } catch {
            return [];
          }
        })
      );

      for (const r of results) {
        if (r.status === "fulfilled") rawProxies.push(...r.value);
      }

      // Deduplicate
      const unique = [...new Set(rawProxies)];

      if (unique.length === 0) {
        console.log("[ProxyPool] No proxies fetched from sources, keeping existing pool");
        this.refreshing = false;
        return;
      }

      console.log(`[ProxyPool] Fetched ${unique.length} proxy candidates, validating...`);

      // Validate a batch against NSE (test first 80, keep up to 20 working ones)
      const validated = await this.validateBatch(unique.slice(0, 80));

      if (validated.length > 0) {
        this.proxies = validated;
        this.currentIndex = 0;
        console.log(`[ProxyPool] Pool ready: ${validated.length} working proxies`);
      } else {
        console.log(`[ProxyPool] No proxies passed NSE validation`);
        // Keep existing proxies if any
      }
    } catch (err: any) {
      console.error(`[ProxyPool] Refresh error: ${err.message}`);
    } finally {
      this.refreshing = false;
    }
  }

  private async validateBatch(candidates: string[]): Promise<ProxyEntry[]> {
    const validated: ProxyEntry[] = [];
    const batchSize = 20; // Test 20 at a time

    for (let i = 0; i < candidates.length && validated.length < 20; i += batchSize) {
      const batch = candidates.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map((proxy) => this.testProxy(proxy))
      );

      for (const r of results) {
        if (r.status === "fulfilled" && r.value) {
          validated.push(r.value);
        }
      }
    }

    return validated;
  }

  private async testProxy(proxyStr: string): Promise<ProxyEntry | null> {
    const [host, portStr] = proxyStr.split(":");
    const port = Number(portStr);
    if (!host || !port) return null;

    try {
      const dispatcher = new ProxyAgent(`http://${host}:${port}`);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), PROXY_TEST_TIMEOUT);

      // Test against NSE — the primary target
      const resp = await undiciFetch("https://www.nseindia.com/api/marketStatus", {
        dispatcher,
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "application/json",
          Referer: "https://www.nseindia.com",
        },
        signal: controller.signal,
        redirect: "follow",
      });
      clearTimeout(timer);

      if (resp.ok) {
        await resp.text();
        return { host, port, failures: 0, lastUsed: 0 };
      }

      // Also accept proxies that work for BSE even if NSE fails
      const controller2 = new AbortController();
      const timer2 = setTimeout(() => controller2.abort(), PROXY_TEST_TIMEOUT);
      const bseResp = await undiciFetch("https://api.bseindia.com/BseIndiaAPI/api/MarketStatus/w", {
        dispatcher: new ProxyAgent(`http://${host}:${port}`),
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "application/json",
          Referer: "https://www.bseindia.com/",
          Origin: "https://www.bseindia.com",
        },
        signal: controller2.signal,
      });
      clearTimeout(timer2);

      if (bseResp.ok) {
        await bseResp.text();
        return { host, port, failures: 0, lastUsed: 0 };
      }

      return null;
    } catch {
      return null;
    }
  }
}

// Singleton
export const proxyPool = new ProxyPool();
