"use client";

import {
  Globe,
  MousePointerClick,
  Search,
} from "lucide-react";

const sources = [
  {
    icon: Search,
    name: "Google Search",
    value: 48,
    color: "bg-violet-500",
  },
  {
    icon: MousePointerClick,
    name: "Direct",
    value: 27,
    color: "bg-sky-500",
  },
  {
    icon: Globe,
    name: "Referral",
    value: 25,
    color: "bg-emerald-500",
  },
];

export default function TrafficSource() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h3 className="text-lg font-bold text-slate-900">
            Traffic Sources
          </h3>

          <p className="text-sm text-slate-500">
            Acquisition overview
          </p>

        </div>

      </div>

      <div className="space-y-5">

        {sources.map((item) => {

          const Icon = item.icon;

          return (
            <div key={item.name}>

              <div className="mb-2 flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-slate-100 p-2">

                    <Icon className="h-4 w-4 text-slate-600" />

                  </div>

                  <span className="font-medium text-slate-700">
                    {item.name}
                  </span>

                </div>

                <span className="font-bold text-slate-900">
                  {item.value}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className={`${item.color} h-full rounded-full transition-all duration-700`}
                  style={{
                    width: `${item.value}%`,
                  }}
                />

              </div>

            </div>
          );

        })}

      </div>

    </div>
  );
}