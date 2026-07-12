"use client";

import { FileText } from "lucide-react";

import Widget from "../layout/widget";
import LiveBadge from "../metrics/live-badge";

import type {
  LandingPageMetric,
} from "@/lib/types/ga4";

interface LandingPagesProps {
  data: LandingPageMetric[];
}

export default function LandingPages({
  data,
}: LandingPagesProps) {

  const total =
    data.reduce(
      (sum, item) => sum + item.sessions,
      0
    );

  const max =
    Math.max(
      ...data.map(
        item => item.sessions
      ),
      1
    );

  return (

    <Widget
      title="📄 Top Landing Pages"
      subtitle="Top organic landing pages"
      badge={<LiveBadge />}
    >

      <div className="space-y-4">

        {data
          .slice(0, 5)
          .map((item) => {

            const percent =
              total === 0
                ? 0
                : (item.sessions / total) * 100;

            const width =
              (item.sessions / max) * 100;

            const path =
              item.page === "/"
                ? "/"
                : item.page
                    .replace("(not set)", "/")
                    .replace(
                      "https://yaplegal.id",
                      ""
                    );

            return (

              <div
                key={item.page}
              >

                <div className="mb-2 flex items-center justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-2">

                    <FileText
                      className="h-4 w-4 shrink-0 text-blue-600"
                    />

                    <span
                      className="truncate text-sm font-medium text-slate-700"
                      title={path}
                    >
                      {path}
                    </span>

                  </div>

                  <span className="text-sm font-semibold text-slate-900">
                    {item.sessions.toLocaleString()}
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{
                      width: `${width}%`,
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