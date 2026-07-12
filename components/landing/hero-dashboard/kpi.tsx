"use client";

import {
  MousePointerClick,
  TrendingUp,
  Users,
} from "lucide-react";

import AnimatedCounter from "@/components/ui/animated-counter";

const cards = [
  {
    title: "Users",
    value: 18.3,
    suffix: "K",
    growth: "+18%",
    icon: Users,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    progress: "78%",
  },
  {
    title: "Clicks",
    value: 42.1,
    suffix: "K",
    growth: "+27%",
    icon: MousePointerClick,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    progress: "91%",
  },
  {
    title: "CTR",
    value: 6.18,
    suffix: "%",
    growth: "+0.9%",
    icon: TrendingUp,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    progress: "64%",
  },
];

export default function HeroKPI() {
  return (
    <div className="grid grid-cols-3 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              group
              relative
              overflow-hidden

              rounded-3xl

              border
              border-slate-200

              bg-white/90

              p-5

              shadow-sm

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-violet-200
              hover:shadow-xl
            "
          >
            {/* Background Glow */}

            <div
              className="
                pointer-events-none

                absolute
                -right-8
                -top-8

                h-28
                w-28

                rounded-full

                bg-violet-500/5

                blur-2xl
              "
            />

            {/* Header */}

            <div className="relative z-10 flex items-center justify-between">
              <div
                className={`
                  flex
                  h-12
                  w-12

                  items-center
                  justify-center

                  rounded-2xl

                  shadow-md
                  ring-1
                  ring-white

                  ${card.iconBg}
                `}
              >
                <Icon
                  className={`
                    h-6
                    w-6

                    ${card.iconColor}

                    transition-all
                    duration-300

                    group-hover:scale-110
                    group-hover:rotate-6
                  `}
                />
              </div>

              <span
                className="
                  rounded-full

                  bg-emerald-100

                  px-3
                  py-1

                  text-xs
                  font-bold

                  text-emerald-700
                "
              >
                {card.growth}
              </span>
            </div>

            {/* Number */}

            <div className="relative z-10 mt-5">
              <h3 className="text-[2.6rem] font-black leading-none text-slate-900">
                <AnimatedCounter
                  value={card.value}
                  suffix={card.suffix}
                  decimals={card.suffix === "%" ? 2 : 1}
                />
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {card.title}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Compared to last month
              </p>
            </div>

            {/* Progress */}

            <div className="relative z-10 mt-6">
              <div
                className="
                  relative

                  h-2

                  overflow-hidden

                  rounded-full

                  bg-slate-100
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    top-0

                    h-full

                    rounded-full

                    bg-gradient-to-r

                    from-violet-600
                    to-sky-500

                    shadow-[0_0_20px_rgba(124,58,237,.45)]

                    transition-all
                    duration-1000
                  "
                  style={{
                    width: card.progress,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}