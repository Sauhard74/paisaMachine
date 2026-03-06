# BSE JSON API Workflow

**Source:** `bse_json_api`
**Trigger interval:** Every 30 seconds

## Nodes

### 1. Schedule Trigger

- Type: Schedule Trigger
- Interval: Every 30 seconds

### 2. HTTP Request - Fetch Announcements

- Method: **GET**
- URL: `https://api.bseindia.com/BseIndiaAPI/api/AnnGetData/w?strCat=-1&strPrevDate=&strScrip=&strSearch=P&strToDate=&strType=C`
- Headers:
  - `User-Agent`: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36`
  - `Accept`: `application/json`
  - `Referer`: `https://www.bseindia.com/`
  - `Origin`: `https://www.bseindia.com`

### 3. Function - Normalize

```javascript
const items = $input.all();
const results = [];

for (const item of items) {
  const data = item.json;
  const announcements = data.Table || (Array.isArray(data) ? data : []);

  for (const d of announcements) {
    results.push({
      json: {
        source: "bse_json_api",
        headline: d.NEWSSUB || d.HEADLINE,
        url: d.ATTACHMENTNAME
          ? `https://www.bseindia.com/xml-data/corpfiling/AttachLive/${d.ATTACHMENTNAME}`
          : `https://www.bseindia.com/corporates/ann.html`,
        published_at: d.NEWS_DT || d.DisssemDT,
        raw_content: JSON.stringify(d),
        source_id: `bse-${d.NEWSID}-${d.SCRIP_CD}`,
      },
    });
  }
}

return results;
```

### 4. HTTP Request - POST to Ingest

- Method: **POST**
- URL: `http://host.docker.internal:3001/api/ingest`
- Body Content Type: JSON
- Body: `{{ $json }}`
