"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type TrafficChartProps = {
  data: any[];
  title: string;
  dataKey: string;
};

export default function TrafficChart({
  data,
  title,
  dataKey,
}: TrafficChartProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">
        {title}
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <AreaChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="date" />

          <YAxis
            tickFormatter={(value) =>
              Number(value).toLocaleString()
            }
          />

          <Tooltip
            formatter={(value: any) =>
              Number(value).toLocaleString()
            }
          />

          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#2563eb"
            fill="#93c5fd"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}