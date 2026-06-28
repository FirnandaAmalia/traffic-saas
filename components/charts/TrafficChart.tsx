"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type ChartData = {
  date: string;
  [key: string]: string | number;
};

type TrafficChartProps = {
  title: string;
  data: ChartData[];
  dataKey: string;
};

export default function TrafficChart({
  title,
  data,
  dataKey,
}: TrafficChartProps) {

  const latest =
    Number(
      data[data.length - 1]?.[dataKey] ?? 0
    );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">

      <div className="border-b border-slate-100 px-6 py-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-medium text-slate-500">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {latest.toLocaleString()}
            </h2>

          </div>

          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            Last 28 Days
          </div>

        </div>

      </div>

      <div className="h-[320px] px-2 py-4">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#2563eb"
                  stopOpacity={0.02}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#e5e7eb"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
            />

            <YAxis
              tickFormatter={(v) =>
                Number(v).toLocaleString()
              }
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "1px solid #e2e8f0",
                boxShadow:
                  "0 8px 24px rgba(0,0,0,.08)",
              }}
              formatter={(value) =>
                Number(value).toLocaleString()
              }
            />

            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#gradient)"
              dot={false}
              activeDot={{
                r: 6,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}