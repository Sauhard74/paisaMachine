const POLL_INTERVAL_MS = 5 * 60_000; // 5 minutes (to stay within Basic tier ~8,640 calls/month)

const ACCOUNT_SOURCE_MAP: Record<string, string> = {
  REDBOXINDIA: "twitter_redbox",
  NSEIndia: "twitter_nse",
  BSEIndia: "twitter_bse",
};

export interface TwitterRawNewsItem {
  source: string;
  headline: string;
  url: string;
  published_at: string;
  raw_content: string;
  source_id: string;
}

export class TwitterFetcher {
  private interval: ReturnType<typeof setInterval> | null = null;
  private sinceId: string | null = null;

  constructor(
    private onNewItem: (item: TwitterRawNewsItem) => Promise<void>,
    private bearerToken: string
  ) {}

  start(): void {
    if (!this.bearerToken) {
      console.warn(
        "[TwitterFetcher] No TWITTER_BEARER_TOKEN set, skipping Twitter polling"
      );
      return;
    }
    console.log("[TwitterFetcher] Starting Twitter polling (every 5 min)");
    setTimeout(() => this.poll(), 8_000);
    this.interval = setInterval(() => this.poll(), POLL_INTERVAL_MS);
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private async poll(): Promise<void> {
    try {
      const query = "from:REDBOXINDIA OR from:NSEIndia OR from:BSEIndia";
      let url = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=20&tweet.fields=created_at,author_id&expansions=author_id&user.fields=username`;

      if (this.sinceId) {
        url += `&since_id=${this.sinceId}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.bearerToken}`,
        },
      });

      if (!response.ok) {
        const body = await response.text();
        console.error(
          `[TwitterFetcher] API error (${response.status}): ${body.substring(0, 200)}`
        );
        return;
      }

      const data: any = await response.json();
      const tweets: any[] = data.data || [];
      const users: any[] = data.includes?.users || [];

      // Build author_id -> username lookup
      const userMap = new Map<string, string>();
      for (const user of users) {
        userMap.set(user.id, user.username);
      }

      console.log(`[TwitterFetcher] Fetched ${tweets.length} tweets`);

      // Update sinceId to the newest tweet (avoid re-fetching)
      if (data.meta?.newest_id) {
        this.sinceId = data.meta.newest_id;
      }

      for (const tweet of tweets) {
        const username = userMap.get(tweet.author_id) || "";
        const source = ACCOUNT_SOURCE_MAP[username] || "twitter_unknown";

        await this.onNewItem({
          source,
          headline: tweet.text,
          url: `https://twitter.com/${username}/status/${tweet.id}`,
          published_at: tweet.created_at || new Date().toISOString(),
          raw_content: tweet.text,
          source_id: `tw-${tweet.id}`,
        });
      }
    } catch (error: any) {
      console.error("[TwitterFetcher] Poll error:", error.message);
    }
  }
}
