"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "1", users: 1240 },
  { day: "4", users: 1680 },
  { day: "7", users: 1510 },
  { day: "10", users: 2360 },
  { day: "13", users: 2140 },
  { day: "16", users: 2820 },
  { day: "19", users: 3010 },
  { day: "22", users: 3520 },
  { day: "25", users: 3370 },
  { day: "28", users: 4010 },
];

const stats = [
  {
    label: "Users",
    value: "18.3K",
  },
  {
    label: "Clicks",
    value: "42.1K",
  },
  {
    label: "CTR",
    value: "6.18%",
  },
  {
    label: "Position",
    value: "4.9",
  },
];

export default function TrafficChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-lg font-bold text-slate-900">
            Organic Traffic
          </h3>

          <p className="text-sm text-slate-500">
            Last 28 Days
          </p>

        </div>

        <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
          +18.4%
        </div>

      </div>

      {/* KPI */}

      <div className="mt-7 grid grid-cols-4 gap-4">

        {stats.map((item) => (

          <div
            key={item.label}
            className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >

            <p className="text-xs text-slate-500">
              {item.label}
            </p>

            <h4 className="mt-2 text-xl font-black text-slate-900">
              {item.value}
            </h4>

          </div>

        ))}

      </div>

      {/* Chart */}

      <div className="mt-8 h-72">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
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
                  stopColor="#7C3AED"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#7C3AED"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="5 5"
              stroke="#E2E8F0"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              tick={{
                fontSize: 12,
                fill: "#64748B",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fontSize: 12,
                fill: "#64748B",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                stroke: "#8B5CF6",
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                borderRadius: 16,
                border: "1px solid #E2E8F0",
                boxShadow: "0 12px 40px rgba(0,0,0,.08)",
                backdropFilter: "blur(20px)",
              }}
            />

            <Area
              type="monotone"
              dataKey="users"
              stroke="#7C3AED"
              strokeWidth={4}
              fill="url(#trafficGradient)"
              animationDuration={1800}
              activeDot={{
                r: 7,
                stroke: "#7C3AED",
                strokeWidth: 3,
                fill: "#fff",
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center gap-8 text-sm text-slate-600">

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-violet-600" />

          Organic Sessions

        </div>

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-sky-500" />

          Growth Trend

        </div>

      </div>

    </div>
  );
}