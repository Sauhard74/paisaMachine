import { NewsItemData, PanelType } from "./types";

const GEO_KEYWORDS = [
  "war", "iran", "china", "fed", "oil", "crude", "dollar", "euro",
  "tariff", "global", "us market", "wall street", "nasdaq", "dow jones",
  "s&p 500", "opec", "brent", "wti", "forex", "yen", "yuan", "trump",
  "russia", "ukraine", "gaza", "israel", "sanctions", "geopolitical",
];

const STOCK_CATEGORIES = [
  "earnings", "order_win", "corporate_filing", "management_change",
  "offer_announcement", "broker_report",
];

export function isHighImpactAlert(item: NewsItemData): boolean {
  return item.impact === "high" && item.sentiment !== "neutral";
}

export function routeToPanel(item: NewsItemData): PanelType {
  if (item.category === "regulatory") {
    return "govt_regulatory";
  }

  if (item.tickers.length > 0 && STOCK_CATEGORIES.includes(item.category)) {
    return "ticker_alerts";
  }

  if (item.tickers.length === 0) {
    const text = `${item.headline} ${item.summary}`.toLowerCase();
    if (GEO_KEYWORDS.some((kw) => text.includes(kw))) {
      return "global_geo";
    }
  }

  return "market_pulse";
}

export function isFilingItem(item: NewsItemData): boolean {
  return item.category === "corporate_filing";
}

export function matchesWatchlist(item: NewsItemData, watchlist: string[]): boolean {
  if (watchlist.length === 0) return false;
  return item.tickers.some((t) =>
    watchlist.some((w) => t.toUpperCase() === w.toUpperCase())
  );
}

export interface RoutedNews {
  highImpact: NewsItemData[];
  tickerAlerts: NewsItemData[];
  watchlistItems: NewsItemData[];
  marketPulse: NewsItemData[];
  globalGeo: NewsItemData[];
  govtRegulatory: NewsItemData[];
  recentFilings: NewsItemData[];
}

export function routeAllNews(
  items: NewsItemData[],
  watchlist: string[]
): RoutedNews {
  const result: RoutedNews = {
    highImpact: [],
    tickerAlerts: [],
    watchlistItems: [],
    marketPulse: [],
    globalGeo: [],
    govtRegulatory: [],
    recentFilings: [],
  };

  for (const item of items) {
    if (isHighImpactAlert(item)) {
      result.highImpact.push(item);
    }

    if (isFilingItem(item)) {
      result.recentFilings.push(item);
    }

    if (matchesWatchlist(item, watchlist)) {
      result.watchlistItems.push(item);
    }

    const panel = routeToPanel(item);
    switch (panel) {
      case "ticker_alerts":
        result.tickerAlerts.push(item);
        break;
      case "market_pulse":
        result.marketPulse.push(item);
        break;
      case "global_geo":
        result.globalGeo.push(item);
        break;
      case "govt_regulatory":
        result.govtRegulatory.push(item);
        break;
    }
  }

  return result;
}
