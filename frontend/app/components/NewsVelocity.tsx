"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { StatsData } from "../lib/types";

interface NewsVelocityProps {
  stats: StatsData | null;
}

export function NewsVelocity({ stats }: NewsVelocityProps) {
  if (!stats || stats.velocity.length === 0) {
    return (
      <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-4 flex items-center justify-center h-full">
        <span className="text-[10px] text-[#374151]">No data yet</span>
      </div>
    );
  }

  const data = stats.velocity.map((v) => ({
    time: v.minute.slice(11, 16),
    count: v.count,
  }));

  return (
    <div className="bg-[#0d1117] rounded-lg border border-[#1b2b1b] p-3 h-full">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[10px] text-[#6b7280] uppercase tracking-wider">
          News Velocity
        </h3>
        <span className="text-xs font-semibold text-[#10b981]">
          {stats.total_items.toLocaleString()} total
        </span>
      </div>
      <div className="h-[calc(100%-24px)]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 9, fill: "#374151" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <Tooltip
              contentStyle={{
                background: "#0d1117",
                border: "1px solid #1b2b1b",
                borderRadius: "8px",
                fontSize: "11px",
              }}
              labelStyle={{ color: "#6b7280" }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#velocityGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
