"use client";

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Globe2,
  MousePointerClick,
  Users,
  Sparkles,
} from "lucide-react";

const kpis = [
  {
    title: "Organic Clicks",
    value: "148K",
    change: "+18%",
    icon: MousePointerClick,
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
  {
    title: "Users",
    value: "92.4K",
    change: "+12%",
    icon: Users,
    color: "text-sky-600",
    bg: "bg-sky-100",
  },
  {
    title: "Sessions",
    value: "131K",
    change: "+16%",
    icon: Activity,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    title: "CTR",
    value: "5.72%",
    change: "+0.8%",
    icon: ArrowUpRight,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
];

const keywords = [
  ["seo dashboard", "18.4K"],
  ["ga4 analytics", "12.2K"],
  ["search console", "9.8K"],
  ["traffic report", "8.6K"],
];

export default function DashboardMockup() {
  return (
    <div className="group relative">

      {/* Glow */}

      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-violet-500/20 via-sky-400/20 to-cyan-400/20 blur-3xl" />

      <div
        className="
          relative

          rounded-[40px]

          bg-gradient-to-br

          from-violet-200/60

          via-white

          to-sky-200/60

          p-[2px]
        "
      >

        <div
          className="
            overflow-hidden

            rounded-[38px]

            bg-white

            shadow-[0_70px_180px_rgba(15,23,42,.20)]
          "
        >

          {/* Browser */}

          <div className="flex h-14 items-center justify-between border-b bg-slate-50 px-6">

            <div className="flex gap-2">

              <div className="h-3 w-3 rounded-full bg-red-400" />

              <div className="h-3 w-3 rounded-full bg-yellow-400" />

              <div className="h-3 w-3 rounded-full bg-green-400" />

            </div>

            <div className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">

              ● LIVE

            </div>

          </div>

          <div className="p-8">

            {/* Header */}

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-3xl font-black">

                  Executive Dashboard

                </h3>

                <p className="mt-2 text-slate-500">

                  Last updated 3 seconds ago

                </p>

              </div>

              <div className="rounded-2xl bg-violet-100 px-4 py-2 font-semibold text-violet-700">

                AI Ready

              </div>

            </div>

            {/* KPI */}

            <div className="mt-8 grid gap-5 md:grid-cols-4">

              {kpis.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm text-slate-500">

                          {item.title}

                        </p>

                        <h3 className="mt-2 text-3xl font-black">

                          {item.value}

                        </h3>

                      </div>

                      <div
                        className={`rounded-2xl p-3 ${item.bg}`}
                      >

                        <Icon
                          className={`h-6 w-6 ${item.color}`}
                        />

                      </div>

                    </div>

                    <p className="mt-4 text-sm font-semibold text-emerald-600">

                      {item.change} this month

                    </p>

                  </div>
                );
              })}

            </div>

            {/* Main */}

            <div className="mt-8 grid gap-6 lg:grid-cols-3">

              {/* Chart */}

              <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6">

                <div className="flex items-center justify-between">

                  <h4 className="font-bold">

                    Organic Performance

                  </h4>

                  <BarChart3 className="h-5 w-5 text-violet-600" />

                </div>

                <div className="mt-8 flex h-72 items-end gap-3">

                  {[35,60,42,80,58,74,66,94,82,110,96,130].map((h,index)=>(
                    <div
                      key={index}
                      className="flex-1 rounded-t-xl bg-gradient-to-t from-violet-600 to-sky-400"
                      style={{
                        height:`${h}%`,
                      }}
                    />
                  ))}

                </div>

              </div>

              {/* AI */}

              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-50 to-sky-50 p-6">

                <div className="flex items-center gap-3">

                  <Sparkles className="h-8 w-8 text-violet-600" />

                  <h4 className="font-bold">

                    AI Insight

                  </h4>

                </div>

                <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">

                  <p className="text-sm text-slate-600">

                    Your CTR dropped by

                    <span className="font-bold text-red-500">

                      {" "}12%

                    </span>

                    {" "}on high impression pages.

                  </p>

                  <div className="mt-5 rounded-xl bg-emerald-50 p-4">

                    <p className="text-sm font-semibold text-emerald-700">

                      Recommendation

                    </p>

                    <p className="mt-2 text-sm text-slate-600">

                      Update title tags on
                      your top landing pages.

                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Bottom */}

            <div className="mt-8 grid gap-6 lg:grid-cols-2">

              <div className="rounded-3xl border border-slate-200 p-6">

                <div className="flex items-center gap-2">

                  <Globe2 className="h-5 w-5 text-emerald-600" />

                  <h4 className="font-bold">

                    Top Countries

                  </h4>

                </div>

                <div className="mt-5 space-y-4">

                  {[
                    ["🇺🇸","United States","42%"],
                    ["🇮🇩","Indonesia","24%"],
                    ["🇬🇧","United Kingdom","11%"],
                    ["🇩🇪","Germany","8%"],
                  ].map(([flag,name,value])=>(
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                    >

                      <div className="flex items-center gap-3">

                        <span className="text-2xl">

                          {flag}

                        </span>

                        <span className="font-medium">

                          {name}

                        </span>

                      </div>

                      <span className="font-bold">

                        {value}

                      </span>

                    </div>
                  ))}

                </div>

              </div>

              <div className="rounded-3xl border border-slate-200 p-6">

                <h4 className="font-bold">

                  Top Keywords

                </h4>

                <div className="mt-5 space-y-4">

                  {keywords.map(([keyword,clicks])=>(
                    <div
                      key={keyword}
                      className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                    >

                      <span className="font-medium">

                        {keyword}

                      </span>

                      <span className="font-bold text-violet-600">

                        {clicks}

                      </span>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}