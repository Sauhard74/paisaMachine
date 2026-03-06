"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { NewsItem, type NewsItemData } from "./NewsItem";
import { Filters, type FilterState } from "./Filters";

const BACKEND_URL = "http://localhost:3001";

export function NewsFeed() {
  const [items, setItems] = useState<NewsItemData[]>([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    source: "",
    ticker: "",
    category: "",
    sentiment: "",
    impact: "",
    search: "",
  });
  const eventSourceRef = useRef<EventSource | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Load initial items (large batch)
  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_URL}/api/news?limit=1000`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setHasMore(data.length === 1000);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Load more when scrolling to bottom
  const loadMore = useCallback(() => {
    if (loading || !hasMore || items.length === 0) return;
    setLoading(true);

    const lastItem = items[items.length - 1];
    fetch(
      `${BACKEND_URL}/api/news?limit=500&before=${lastItem.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setItems((prev) => [...prev, ...data]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [loading, hasMore, items]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 200) {
      loadMore();
    }
  }, [loadMore]);

  // SSE connection — new items prepend, no cap
  useEffect(() => {
    const es = new EventSource(`${BACKEND_URL}/api/stream`);
    eventSourceRef.current = es;

    es.onopen = () => setConnected(true);

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "connected") return;
        setItems((prev) => [data, ...prev]);
      } catch {
        // ignore parse errors
      }
    };

    es.onerror = () => {
      setConnected(false);
    };

    return () => {
      es.close();
    };
  }, []);

  const filteredItems = items.filter((item) => {
    if (filters.source && item.source !== filters.source) return false;
    if (filters.sentiment && item.sentiment !== filters.sentiment) return false;
    if (filters.category && item.category !== filters.category) return false;
    if (filters.impact && item.impact !== filters.impact) return false;
    if (
      filters.ticker &&
      !item.tickers.some((t) => t.includes(filters.ticker))
    )
      return false;
    if (
      filters.search &&
      !item.headline.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="flex flex-col h-screen bg-black text-gray-200 font-mono">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-950 border-b border-gray-800">
        <h1 className="text-sm font-bold text-gray-100">
          PaisaMachine &mdash; Stock News Terminal
        </h1>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">
            {filteredItems.length}/{items.length} items
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              connected ? "bg-green-400" : "bg-red-400"
            }`}
          />
          <span className={connected ? "text-green-400" : "text-red-400"}>
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      <Filters filters={filters} onChange={setFilters} />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
        onScroll={handleScroll}
      >
        {filteredItems.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-600 text-sm">
            {items.length === 0
              ? loading
                ? "Loading news..."
                : "Waiting for news..."
              : "No items match filters"}
          </div>
        ) : (
          <>
            {filteredItems.map((item) => (
              <NewsItem key={item.id} item={item} />
            ))}
            {loading && (
              <div className="text-center text-gray-600 text-xs py-2">
                Loading more...
              </div>
            )}
            {!hasMore && items.length > 0 && (
              <div className="text-center text-gray-700 text-xs py-2">
                End of history
              </div>
            )}
          </>
        )}
      </div>

      <div className="px-4 py-1 bg-gray-950 border-t border-gray-800 text-[10px] text-gray-600 flex justify-between">
        <span>
          NSE/BSE API | Zerodha | ET | Mint | NDTV | Bloomberg | TradingView |
          Screener
        </span>
        <span>
          {connected
            ? "\u2591\u2591\u2591\u2591\u2591\u2591\u2591 live \u2591\u2591\u2591\u2591\u2591\u2591\u2591"
            : "reconnecting..."}
        </span>
      </div>
    </div>
  );
}
