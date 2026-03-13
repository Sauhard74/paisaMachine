import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface NewsItem {
  source: string;
  headline: string;
  url: string;
  summary: string;
  raw_content: string;
  published_at: string;
  tickers: string[];
  sentiment: "positive" | "negative" | "neutral";
  category: string;
  impact: "high" | "medium" | "low";
  key_figures: string[];
  source_id: string;
  fingerprint: string;
}

export interface StoredNewsItem extends NewsItem {
  id: number;
  ingested_at: string;
}

export interface NewsFilters {
  sentiment?: string;
  category?: string;
  impact?: string;
  source?: string;
  ticker?: string;
  search?: string;
  beforeId?: number;
}

export class StorageService {
  private supabase: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;
    if (!url || !key) {
      throw new Error("SUPABASE_URL and SUPABASE_SERVICE_KEY are required");
    }
    this.supabase = createClient(url, key);
  }

  async insert(item: NewsItem): Promise<number> {
    const { data, error } = await this.supabase
      .from("news_items")
      .insert({
        source: item.source,
        headline: item.headline,
        url: item.url,
        summary: item.summary,
        raw_content: item.raw_content,
        published_at: item.published_at,
        tickers: item.tickers,
        sentiment: item.sentiment,
        category: item.category,
        impact: item.impact,
        key_figures: item.key_figures,
        source_id: item.source_id,
        fingerprint: item.fingerprint,
      })
      .select("id")
      .single();

    if (error) throw new Error(error.message);
    return data.id;
  }

  async getRecent(limit: number = 50, filters: NewsFilters = {}): Promise<StoredNewsItem[]> {
    let query = this.supabase
      .from("news_items")
      .select("*");

    if (filters.sentiment) query = query.eq("sentiment", filters.sentiment);
    if (filters.category) query = query.eq("category", filters.category);
    if (filters.impact) query = query.eq("impact", filters.impact);
    if (filters.source) query = query.eq("source", filters.source);
    if (filters.ticker) query = query.contains("tickers", [filters.ticker]);
    if (filters.search) query = query.ilike("headline", `%${filters.search}%`);
    if (filters.beforeId) query = query.lt("id", filters.beforeId);

    query = query.order("published_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(limit);

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return (data || []) as StoredNewsItem[];
  }

  async getStats(): Promise<{
    sentiment_counts: Record<string, number>;
    category_counts: Record<string, number>;
    velocity: { minute: string; count: number }[];
    total_items: number;
  }> {
    // Sentiment counts
    const { data: sentimentData } = await this.supabase.rpc("get_sentiment_counts");
    const sentiment_counts: Record<string, number> = {};
    for (const row of sentimentData || []) {
      sentiment_counts[row.sentiment] = row.count;
    }

    // Category counts
    const { data: categoryData } = await this.supabase.rpc("get_category_counts");
    const category_counts: Record<string, number> = {};
    for (const row of categoryData || []) {
      category_counts[row.category] = row.count;
    }

    // Velocity (last 120 minutes)
    const { data: velocityData } = await this.supabase.rpc("get_velocity");
    const velocity = (velocityData || []).map((row: any) => ({
      minute: row.minute,
      count: row.count,
    }));

    // Total count
    const { count } = await this.supabase
      .from("news_items")
      .select("*", { count: "exact", head: true });

    return {
      sentiment_counts,
      category_counts,
      velocity,
      total_items: count || 0,
    };
  }

  close() {
    // No-op: Supabase client doesn't need explicit cleanup
  }
}
