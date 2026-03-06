# Twitter Feeds Workflow

**Sources:** `twitter_redbox`, `twitter_nse`, `twitter_bse`, `twitter_capmkt`
**Trigger interval:** Every 2 minutes

> **Rate Limit Warning:** Twitter Basic API tier allows only 10,000 reads/month. This single workflow covers all 4 accounts to conserve quota. Adjust the interval if you approach the limit.

## Nodes

### 1. Schedule Trigger

- Type: Schedule Trigger
- Interval: Every 2 minutes

### 2. Twitter Node - Search Recent Tweets

- Operation: Search
- Search query: `from:REDBOXINDIA OR from:NSEIndia OR from:BSEIndia OR from:CapitalMkt_`
- Max results: 20 (keep low to conserve quota)
- Credentials: Configure Twitter API v2 credentials (Bearer Token from Twitter Developer Portal)

### 3. Function - Normalize and Map Source

```javascript
const items = $input.all();
const results = [];

// Map Twitter handles to source identifiers
const handleToSource = {
  REDBOXINDIA: "twitter_redbox",
  redboxindia: "twitter_redbox",
  NSEIndia: "twitter_nse",
  nseindia: "twitter_nse",
  BSEIndia: "twitter_bse",
  bseindia: "twitter_bse",
  CapitalMkt_: "twitter_capmkt",
  capitalmkt_: "twitter_capmkt",
};

for (const item of items) {
  const tweet = item.json;

  // Determine source from author username
  const username = tweet.author?.username || tweet.user?.screen_name || "";
  const source = handleToSource[username] || handleToSource[username.toLowerCase()] || "twitter_unknown";

  const tweetId = tweet.id || tweet.id_str;
  const authorHandle = username || "unknown";

  results.push({
    json: {
      source: source,
      headline: (tweet.text || tweet.full_text || "").slice(0, 280),
      url: `https://twitter.com/${authorHandle}/status/${tweetId}`,
      published_at: tweet.created_at,
      raw_content: tweet.text || tweet.full_text || "",
      source_id: `tw-${tweetId}`,
    },
  });
}

return results;
```

### 4. HTTP Request - POST to Ingest

- Method: **POST**
- URL: `http://host.docker.internal:3001/api/ingest`
- Body Content Type: JSON
- Body: `{{ $json }}`

## Twitter API Setup Notes

1. Create a Twitter Developer account at https://developer.twitter.com
2. Create a project and app under the Basic tier
3. Generate a Bearer Token
4. In n8n, add Twitter API credentials with the Bearer Token
5. The search query uses `from:` to filter by specific accounts
