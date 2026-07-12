"use client";

import { TrendingUp } from "lucide-react";

export default function HeroFloatingGrowth() {
  return (
    <div
      className="
        absolute
        -left-10
        bottom-16

        hidden
        xl:block

        animate-float-delay
      "
    >
      <div
        className="
          rounded-3xl

          border
          border-white/60

          bg-white/95

          p-5

          shadow-[0_20px_60px_rgba(15,23,42,.18)]

          backdrop-blur-xl

          transition-all
          duration-300

          hover:-translate-y-1
          hover:shadow-[0_30px_80px_rgba(15,23,42,.22)]
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-11
              w-11

              items-center
              justify-center

              rounded-xl

              bg-emerald-100
            "
          >

            <TrendingUp className="h-5 w-5 text-emerald-700" />

          </div>

          <div>

            <p className="text-xs text-slate-500">

              Organic Growth

            </p>

            <h3 className="font-bold text-slate-900">

              Performance

            </h3>

          </div>

        </div>

        <div className="mt-5">

          <h2 className="text-4xl font-black text-emerald-600">

            +42%

          </h2>

          <p className="mt-1 text-xs text-slate-500">

            compared to previous month

          </p>

        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">

          <div
            className="
              h-full
              w-[72%]

              rounded-full

              bg-gradient-to-r

              from-emerald-500
              to-teal-400
            "
          />

        </div>

      </div>

    </div>
  );
}