"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  Payload,
} from "recharts/types/component/DefaultTooltipContent";

type ChartData = {
  date: string;
  [key: string]: string | number;
};

interface TrafficChartProps {
  title: string;
  data: ChartData[];
  dataKey: string;
  rangeLabel: string;
}

function parseDate(value: string): Date |null {

  if (!value) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {

    const [year, month, day] =
      value
        .split("-")
        .map(Number);

    return new Date(
      year,
      month - 1,
      day
    );

  }

  if (/^\d{8}$/.test(value)) {

    return new Date(
      Number(value.slice(0, 4)),
      Number(value.slice(4, 6)) - 1,
      Number(value.slice(6, 8))
    );

  }

  return null;

}

export default function TrafficChart({
  title,
  data,
  dataKey,
  rangeLabel,
}: TrafficChartProps) {

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const latest = Number(
    data.at(-1)?.[dataKey] ?? 0
  );

  const xTicks = useMemo(() => {

    if (!data.length) {
      return [];
    }

    switch (rangeLabel) {

      case "Last 7 Days":
        return data.map((d) => d.date);

      case "Last 28 Days": {

        const ticks =
          data
            .filter((_, i) => i % 4 === 0)
            .map((d) => d.date);

        const last =
          data.at(-1)?.date;

        if (
          last &&
          ticks.at(-1) !== last
        ) {
          ticks.push(last);
        }

        return ticks;

      }

      case "Last 3 Months": {

        const ticks =
          data
            .filter((_, i) => i % 14 === 0)
            .map((d) => d.date);

        const last =
          data.at(-1)?.date;

        if (
          last &&
          ticks.at(-1) !== last
        ) {
          ticks.push(last);
        }

        return ticks;

      }

      case "Last 6 Months": {

        const ticks =
          data
            .filter((_, i) => i % 28 === 0)
            .map((d) => d.date);

        const last =
          data.at(-1)?.date;

        if (
          last &&
          ticks.at(-1) !== last
        ) {
          ticks.push(last);
        }

        return ticks;

      }

      case "Last 12 Months": {

        const ticks =
          data
            .filter((_, i) => i % 60 === 0)
            .map((d) => d.date);

        const last =
          data.at(-1)?.date;

        if (
          last &&
          ticks.at(-1) !== last
        ) {
          ticks.push(last);
        }

        return ticks;

      }

      default:
        return data.map((d) => d.date);

    }

  }, [
    data,
    rangeLabel,
  ]);

  function formatXAxis(
    value: string
  ) {

    const date =
      parseDate(value);

    if (!date) {
      return value;
    }

    return date.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
      }
    );

  }

  function formatTooltipLabel(
    _: unknown,
    payload?: readonly Payload<any, any>[]
  ) {

    const raw =
      payload?.[0]?.payload?.date;

    if (!raw) {
      return "";
    }

    const date =
      parseDate(
        String(raw)
      );

    if (!date) {
      return String(raw);
    }

    return date.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  }

  return (
  <div className="flex flex-col">

    {/* Header */}
    <div className="mb-4 flex items-center justify-between">

      <div>

        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {title}
        </p>

        <div className="mt-1 flex items-end gap-3">

          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {latest.toLocaleString()}
          </h2>

          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600">
            {rangeLabel}
          </span>

        </div>

      </div>

      <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">

        <span className="h-2 w-2 rounded-full bg-blue-600" />

        <span className="text-xs font-medium capitalize text-slate-600">
          {dataKey}
        </span>

      </div>

    </div>

    {/* Chart */}
    <div className="h-[420px] w-full">

      {!mounted ? (

        <div className="h-full animate-pulse rounded-xl bg-slate-100" />

      ) : (

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
  width={900}
  height={420}
  data={data}
  margin={{
    top: 5,
    right: 10,
    left: 0,
    bottom: 0,
  }}
>

            <defs>

              <linearGradient
                id="trafficGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.22}
                />

                <stop
                  offset="100%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#eef2f7"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
              ticks={xTicks}
              tickFormatter={formatXAxis}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
            />

            <YAxis
              width={55}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) =>
                Number(v).toLocaleString()
              }
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
              }}
            />

            <Tooltip
              labelFormatter={formatTooltipLabel}
              formatter={(value) =>
                Number(value).toLocaleString()
              }
              cursor={{
                stroke: "#2563eb",
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow:
                  "0 8px 20px rgba(15,23,42,.15)",
              }}
            />

            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#trafficGradient)"
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 3,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      )}

    </div>

  </div>
);

}