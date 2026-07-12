"use client";

import {
  ArrowUpRight,
} from "lucide-react";

const countries = [
  {
    flag: "🇮🇩",
    country: "Indonesia",
    users: "6.8K",
    growth: "+18%",
    progress: "86%",
  },
  {
    flag: "🇺🇸",
    country: "United States",
    users: "4.2K",
    growth: "+12%",
    progress: "67%",
  },
  {
    flag: "🇬🇧",
    country: "United Kingdom",
    users: "2.7K",
    growth: "+9%",
    progress: "52%",
  },
  {
    flag: "🇸🇬",
    country: "Singapore",
    users: "1.9K",
    growth: "+31%",
    progress: "44%",
  },
];

export default function Countries() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-lg font-bold text-slate-900">

            Top Countries

          </h3>

          <p className="text-sm text-slate-500">

            Visitors by region

          </p>

        </div>

        <button
          className="
            rounded-xl

            bg-slate-100

            p-2

            transition

            hover:bg-slate-200
          "
        >

          <ArrowUpRight className="h-4 w-4" />

        </button>

      </div>

      {/* Countries */}

      <div className="mt-7 space-y-6">

        {countries.map((item) => (

          <div key={item.country}>

            <div className="mb-2 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="text-2xl">

                  {item.flag}

                </div>

                <div>

                  <p className="font-semibold text-slate-900">

                    {item.country}

                  </p>

                  <p className="text-xs text-slate-500">

                    {item.users} visitors

                  </p>

                </div>

              </div>

              <span className="font-bold text-emerald-600">

                {item.growth}

              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-100">

              <div
                className="
                  h-full

                  rounded-full

                  bg-gradient-to-r

                  from-violet-600
                  via-fuchsia-500
                  to-sky-500

                  transition-all
                  duration-1000
                "
                style={{
                  width: item.progress,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}