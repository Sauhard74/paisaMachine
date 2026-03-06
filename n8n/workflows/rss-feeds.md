# RSS Feed Workflows

Three RSS-based workflows. These can be built as separate workflows or combined into one with multiple branches.

---

## Workflow A: NSE RSS

**Source:** `nse_rss`
**Trigger interval:** Every 1 minute

### Nodes

#### 1. RSS Feed Trigger

- Feed URL: `https://www.nseindia.com/api/rss?category=corporates`
- Poll interval: Every 1 minute

#### 2. Function - Normalize

```javascript
const items = $input.all();
return items.map((item) => ({
  json: {
    source: "nse_rss",
    headline: item.json.title,
    url: item.json.link,
    published_at: item.json.pubDate || item.json.isoDate,
    raw_content: item.json.content || item.json["content:encoded"] || item.json.title,
    source_id: `nse-rss-${item.json.guid || item.json.link}`,
  },
}));
```

#### 3. HTTP Request - POST to Ingest

- Method: **POST**
- URL: `http://host.docker.internal:3001/api/ingest`
- Body Content Type: JSON
- Body: `{{ $json }}`

---

## Workflow B: BSE RSS

**Source:** `bse_rss`
**Trigger interval:** Every 1 minute

### Nodes

#### 1. RSS Feed Trigger

- Feed URL: `https://www.bseindia.com/data/xml/notices.xml`
- Poll interval: Every 1 minute

#### 2. Function - Normalize

```javascript
const items = $input.all();
return items.map((item) => ({
  json: {
    source: "bse_rss",
    headline: item.json.title,
    url: item.json.link,
    published_at: item.json.pubDate || item.json.isoDate,
    raw_content: item.json.content || item.json["content:encoded"] || item.json.title,
    source_id: `bse-rss-${item.json.guid || item.json.link}`,
  },
}));
```

#### 3. HTTP Request - POST to Ingest

- Method: **POST**
- URL: `http://host.docker.internal:3001/api/ingest`
- Body Content Type: JSON
- Body: `{{ $json }}`

---

## Workflow C: Moneycontrol RSS

**Source:** `moneycontrol`
**Trigger interval:** Every 1 minute

### Nodes

#### 1. RSS Feed Trigger

Configure with multiple feeds (use separate RSS Trigger nodes if n8n doesn't support multiple URLs in one):

- `https://www.moneycontrol.com/rss/latestnews.xml` (Top News)
- `https://www.moneycontrol.com/rss/marketreports.xml` (Market Reports)
- `https://www.moneycontrol.com/rss/results.xml` (Results)

Poll interval: Every 1 minute

#### 2. Function - Normalize

```javascript
const items = $input.all();
return items.map((item) => ({
  json: {
    source: "moneycontrol",
    headline: item.json.title,
    url: item.json.link,
    published_at: item.json.pubDate || item.json.isoDate,
    raw_content: item.json.content || item.json["content:encoded"] || item.json.title,
    source_id: `mc-${item.json.guid || item.json.link}`,
  },
}));
```

#### 3. HTTP Request - POST to Ingest

- Method: **POST**
- URL: `http://host.docker.internal:3001/api/ingest`
- Body Content Type: JSON
- Body: `{{ $json }}`
