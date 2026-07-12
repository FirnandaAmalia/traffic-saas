"use client";

import {
  Activity,
} from "lucide-react";

import Widget from "../layout/widget";
import LiveBadge from "../metrics/live-badge";

import type {
  EventMetric,
} from "@/lib/types/ga4";

interface TopEventsProps {
  data: EventMetric[];
}

function formatNumber(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return value.toLocaleString();
}

const COLORS = [
  "#2563eb",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
];

export default function TopEvents({
  data,
}: TopEventsProps) {

  const total =
    data.reduce(
      (sum, item) => sum + item.count,
      0
    );

  const max =
    Math.max(
      ...data.map(
        item => item.count
      ),
      1
    );

  return (

    <Widget
      title="⚡ Top Events"
      subtitle="Most triggered GA4 events"
      badge={<LiveBadge />}
    >

      <div className="space-y-4">

        {data
          .slice(0, 5)
          .map((item, index) => {

            const percent =
              total === 0
                ? 0
                : (item.count / total) * 100;

            const width =
              (item.count / max) * 100;

            return (

              <div
                key={item.event}
              >

                <div className="mb-2 flex items-center justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-2">

                    <Activity
                      className="h-4 w-4 shrink-0"
                      style={{
                        color:
                          COLORS[index % COLORS.length],
                      }}
                    />

                    <span
                      className="truncate text-sm font-medium text-slate-700"
                    >
                      {item.event}
                    </span>

                  </div>

                  <span className="text-sm font-semibold text-slate-900">

                    {formatNumber(item.count)}

                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${width}%`,
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />

                </div>

                <div className="mt-1 text-right text-xs text-slate-500">

                  {percent.toFixed(1)}%

                </div>

              </div>

            );

          })}

      </div>

    </Widget>

  );

}