"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { StatsData } from "../lib/types";

interface SentimentDonutProps {
  stats: StatsData | null;
}

const COLORS: Record<string, string> = {
  positive: "#10b981",
  negative: "#ef4444",
  neutral: "#6b7280",
};

export function SentimentDonut({ stats }: SentimentDonutProps) {
  if (!stats) {
    return (
      <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-4 flex items-center justify-center h-full">
        <span className="text-[10px] text-[#374151]">Loading...</span>
      </div>
    );
  }

  const data = Object.entries(stats.sentiment_counts).map(([name, value]) => ({
    name,
    value,
  }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3 h-full">
      <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider mb-1">
        Sentiment
      </h3>
      <div className="flex items-center gap-2 h-[calc(100%-24px)]">
        <div className="w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="85%"
                dataKey="value"
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[entry.name] || "#6b7280"}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0d1117",
                  border: "1px solid #1b2b1b",
                  borderRadius: "8px",
                  fontSize: "11px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 flex flex-col gap-1">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: COLORS[d.name] }}
                />
                <span className="text-[10px] text-[#6b7280] capitalize">
                  {d.name}
                </span>
              </div>
              <span className="text-xs font-semibold text-[#e5e7eb]">
                {total > 0 ? Math.round((d.value / total) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
