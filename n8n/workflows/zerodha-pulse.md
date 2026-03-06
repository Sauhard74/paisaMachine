# Zerodha Pulse Workflow

**Source:** `zerodha_pulse`
**Trigger interval:** Every 2 minutes

## Nodes

### 1. Schedule Trigger

- Type: Schedule Trigger
- Interval: Every 2 minutes

### 2. HTTP Request - Fetch Pulse Page

- Method: **GET**
- URL: `https://pulse.zerodha.com/`
- Headers:
  - `User-Agent`: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36`

### 3. HTML Extract - Extract News Items

- Source Data: JSON (from previous node body)
- Extraction Values:
  - **headline**: CSS selector `.popular li h2 a` or `.box .item h2 a` — extract text
  - **url**: CSS selector `.popular li h2 a` or `.box .item h2 a` — extract `href` attribute
  - **date**: CSS selector `.popular li .date` or `.box .item .date` — extract text
  - **summary**: CSS selector `.popular li .desc` or `.box .item .desc` — extract text

> Note: Inspect `https://pulse.zerodha.com/` to confirm the exact CSS selectors. The above are approximate and may need adjustment.

### 4. Function - Normalize

```javascript
const items = $input.all();
const results = [];

for (const item of items) {
  const d = item.json;
  // headline and url come as arrays from HTML Extract
  const headlines = Array.isArray(d.headline) ? d.headline : [d.headline];
  const urls = Array.isArray(d.url) ? d.url : [d.url];
  const dates = Array.isArray(d.date) ? d.date : [d.date];
  const summaries = Array.isArray(d.summary) ? d.summary : [d.summary];

  for (let i = 0; i < headlines.length; i++) {
    const fullUrl = (urls[i] || "").startsWith("http")
      ? urls[i]
      : `https://pulse.zerodha.com${urls[i] || ""}`;

    results.push({
      json: {
        source: "zerodha_pulse",
        headline: headlines[i] || "",
        url: fullUrl,
        published_at: dates[i] || new Date().toISOString(),
        raw_content: summaries[i] || headlines[i] || "",
        source_id: `zp-${Buffer.from(fullUrl).toString("base64").slice(0, 32)}`,
      },
    });
  }
}

return results;
```

### 5. HTTP Request - POST to Ingest

- Method: **POST**
- URL: `http://host.docker.internal:3001/api/ingest`
- Body Content Type: JSON
- Body: `{{ $json }}`
