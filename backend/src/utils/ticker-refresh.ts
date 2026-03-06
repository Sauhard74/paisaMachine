import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const NSE_EQUITY_URL = "https://nsearchives.nseindia.com/content/equities/EQUITY_L.csv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");

interface TickerInfo {
  symbol: string;
  name: string;
  series: string;
}

async function fetchWithHeaders(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      Referer: "https://www.nseindia.com/",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

function parseNSECSV(csv: string): TickerInfo[] {
  const lines = csv.trim().split("\n");
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    return {
      symbol: cols[0]?.trim().replace(/"/g, "") || "",
      name: cols[1]?.trim().replace(/"/g, "") || "",
      series: cols[2]?.trim().replace(/"/g, "") || "",
    };
  }).filter((t) => t.symbol && t.series === "EQ");
}

export async function refreshTickers(): Promise<void> {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }

  try {
    console.log("Fetching NSE equity list...");
    const nseCsv = await fetchWithHeaders(NSE_EQUITY_URL);
    const nseTickers = parseNSECSV(nseCsv);
    writeFileSync(
      join(DATA_DIR, "nse-symbols.json"),
      JSON.stringify(nseTickers, null, 2)
    );
    console.log(`Saved ${nseTickers.length} NSE symbols`);
  } catch (error: any) {
    console.error("Failed to refresh NSE tickers:", error.message);
  }

  // BSE placeholder
  if (!existsSync(join(DATA_DIR, "bse-symbols.json"))) {
    writeFileSync(join(DATA_DIR, "bse-symbols.json"), "[]");
  }
}

// Run if called directly
const isMainModule = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"));
if (isMainModule) {
  refreshTickers();
}
