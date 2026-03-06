# n8n Workflows - PaisaMachine

## Overview

n8n runs in Docker on port **5678**. All workflows POST normalized items to:

```
http://host.docker.internal:3001/api/ingest
```

(`host.docker.internal` is used because n8n runs inside Docker and needs to reach the host machine's backend.)

## Required Item Schema

Every item sent to the ingest endpoint must include:

| Field          | Description                          |
|----------------|--------------------------------------|
| `source`       | Identifier for the data source       |
| `headline`     | News headline or announcement title  |
| `url`          | Link to the original item            |
| `published_at` | Publication date/time                |
| `raw_content`  | Full text or raw payload             |
| `source_id`    | Unique ID to prevent duplicates      |

## Workflows

| # | File                  | Source(s)                        | Interval   |
|---|-----------------------|----------------------------------|------------|
| 1 | `nse-json-api.md`     | `nse_json_api`                   | 30 seconds |
| 2 | `bse-json-api.md`     | `bse_json_api`                   | 30 seconds |
| 3 | `rss-feeds.md`        | `nse_rss`, `bse_rss`, `moneycontrol` | 1 minute |
| 4 | `zerodha-pulse.md`    | `zerodha_pulse`                  | 2 minutes  |
| 5 | `twitter-feeds.md`    | `twitter_redbox`, `twitter_nse`, `twitter_bse`, `twitter_capmkt` | 2 minutes |
