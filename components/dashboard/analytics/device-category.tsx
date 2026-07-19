"use client";

import {
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";

import Widget from "../layout/widget";
import LiveBadge from "../metrics/live-badge";

import type {
  DeviceCategoryMetric,
} from "@/lib/types/ga4";

interface Props {
  data: DeviceCategoryMetric[];
}

const ICONS: Record<
  string,
  React.ElementType
> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

const COLORS = [
  "#2563eb",
  "#06b6d4",
  "#8b5cf6",
  "#f97316",
];

export default function DeviceCategory({
  data,
}: Props) {
  const total = data.reduce(
    (sum, item) => sum + item.users,
    0
  );

  const gradient = data
  .reduce(
    (acc, item, index) => {
      const percent =
        total === 0
          ? 0
          : (item.users / total) * 100;

      const start = acc.current;
      const end = start + percent;

      acc.current = end;

      acc.parts.push(
        `${COLORS[index % COLORS.length]} ${start}% ${end}%`
      );

      return acc;
    },
    {
      current: 0,
      parts: [] as string[],
    }
  )
  .parts.join(", ");

  return (
    <Widget
      className="h-[270px]"
      title="📱 Device Category"
      subtitle="Active users by device"
      badge={<LiveBadge />}
    >
      <div className="grid h-full grid-cols-[20%_80%]">

        {/* DONUT */}

        <div className="flex items-center justify-center border-r border-slate-100 px-2">

          <div
            className="relative h-24 w-24 rounded-full"
            style={{
              background: `conic-gradient(${gradient})`,
            }}
          >

            <div
              className="
                absolute
                left-1/2
                top-1/2
                flex
                h-14
                w-14
                -translate-x-1/2
                -translate-y-1/2
                flex-col
                items-center
                justify-center
                rounded-full
                bg-white
              "
            >

              <span className="text-sm font-bold text-slate-900">
                {total.toLocaleString()}
              </span>

              <span className="text-[10px] text-slate-500">
                Users
              </span>

            </div>

          </div>

        </div>

        {/* LEGEND */}

        <div
          className="
            overflow-y-auto
            px-5
            py-2
            space-y-3

            scrollbar-thin
            scrollbar-thumb-slate-300
            scrollbar-track-transparent
          "
        >

          {data
            .slice(0, 10)
            .map((item, index) => {

              const Icon =
                ICONS[
                  item.device.toLowerCase()
                ] ?? Monitor;

              const percent =
                total === 0
                  ? 0
                  : (item.users / total) * 100;

              return (

                <div
                  key={item.device}
                  className="rounded-lg border border-slate-100 px-3 py-2.5 transition hover:bg-slate-50"
                >

                  <div className="mb-2 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <Icon
                        className="h-4 w-4"
                        style={{
                          color:
                            COLORS[
                              index %
                                COLORS.length
                            ],
                        }}
                      />

                      <span className="text-sm font-medium capitalize text-slate-700">
                        {item.device}
                      </span>

                    </div>

                    <span className="text-sm font-semibold text-slate-900">
                      {item.users.toLocaleString()}
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        background:
                          COLORS[
                            index %
                              COLORS.length
                          ],
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