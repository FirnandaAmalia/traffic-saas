"use client";

import { Globe } from "lucide-react";

import Widget from "./widget";
import LiveBadge from "../metrics/live-badge";

import type {
  BrowserMetric,
} from "@/lib/types/ga4";

interface BrowserSectionProps {
  data: BrowserMetric[];
}

const ICONS: Record<string, string> = {
  Chrome: "🌐",
  Safari: "🧭",
  Edge: "🟦",
  Firefox: "🦊",
  Opera: "🎭",
  "Samsung Internet": "📱",
  Android: "🤖",
  SafariWebview: "🍎",
};

export default function BrowserSection({
  data,
}: BrowserSectionProps) {

  const total = data.reduce(
    (sum, item) => sum + item.users,
    0
  );

  const max = Math.max(
    ...data.map((item) => item.users),
    1
  );

  return (

    <Widget
      title="🌐 Browser"
      subtitle="Top browsers"
      badge={<LiveBadge />}
      className="h-[270px]"
    >

      <div className="flex h-full flex-col">

        <div
          className="
            flex-1
            overflow-y-auto
            space-y-3
            p-4
            pr-3

            scrollbar-thin
            scrollbar-thumb-slate-300
            scrollbar-track-transparent
          "
        >

          {data.map((item) => {

            const percent =
              total === 0
                ? 0
                : (item.users / total) * 100;

            const width =
              (item.users / max) * 100;

            return (

              <div
                key={item.browser}
                className="
                  rounded-xl
                  border
                  border-slate-100
                  bg-white
                  p-3
                  transition
                  hover:bg-slate-50
                  hover:border-blue-100
                "
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3 min-w-0">

                    <span className="text-lg shrink-0">
                      {ICONS[item.browser] ?? "🌐"}
                    </span>

                    <span className="truncate text-sm font-semibold text-slate-700">
                      {item.browser}
                    </span>

                  </div>

                  <div className="flex items-center gap-2 shrink-0">

                    <Globe className="h-4 w-4 text-blue-600" />

                    <span className="text-sm font-bold text-slate-900">
                      {item.users.toLocaleString()}
                    </span>

                  </div>

                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

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

      </div>

    </Widget>

  );

}