# NSE JSON API Workflow

**Source:** `nse_json_api`
**Trigger interval:** Every 30 seconds

## Nodes

### 1. Schedule Trigger

- Type: Schedule Trigger
- Interval: Every 30 seconds

### 2. HTTP Request - Get Session Cookies

- Method: **GET**
- URL: `https://www.nseindia.com`
- Purpose: Establish a session and capture cookies (NSE requires a valid session before API calls)

### 3. HTTP Request - Fetch Announcements

- Method: **GET**
- URL: `https://www.nseindia.com/api/corporate-announcements?index=equities`
- Send cookies from previous step (enable "Send cookies from previous node")
- Headers:
  - `User-Agent`: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36`
  - `Accept`: `application/json`
  - `Referer`: `https://www.nseindia.com/companies-listing/corporate-filings-announcements`

### 4. Function - Normalize

JavaScript code:

```javascript
const items = $input.all();
const results = [];

for (const item of items) {
  const data = item.json;
  // The API returns an array of announcements
  const announcements = Array.isArray(data) ? data : (data.data || []);

  for (const d of announcements) {
    results.push({
      json: {
        source: "nse_json_api",
        headline: d.desc || d.subject,
        url: d.attchmntFile
          ? `https://www.nseindia.com${d.attchmntFile}`
          : `https://www.nseindia.com/companies-listing/corporate-filings-announcements`,
        published_at: d.an_dt,
        raw_content: JSON.stringify(d),
        source_id: `nse-${d.seq_id}-${d.symbol}`,
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
- Body: `{{ $json }}` (send the current item as the request body)
