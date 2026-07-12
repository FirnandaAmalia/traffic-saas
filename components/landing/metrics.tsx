"use client";

import {
  ArrowUpRight,
  Activity,
  MousePointerClick,
  Users,
  Globe,
} from "lucide-react";

const metrics = [
  {
    icon: MousePointerClick,
    value: "+42%",
    title: "Organic Clicks",
    description:
      "Average improvement after implementing AI recommendations.",
    gradient: "from-violet-600 to-fuchsia-500",
  },
  {
    icon: Users,
    value: "2.4M",
    title: "Users Analyzed",
    description:
      "Traffic processed across connected Google Analytics properties.",
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    icon: Globe,
    value: "180+",
    title: "Countries",
    description:
      "Visitor locations visualized automatically in the dashboard.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Activity,
    value: "99.9%",
    title: "Platform Uptime",
    description:
      "Reliable synchronization with Google services.",
    gradient: "from-orange-500 to-amber-500",
  },
];

export default function Metrics() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Glow */}

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-400/10 blur-[160px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">

            Platform Performance

          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">

            Numbers That Matter

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-500">

            Built for modern SEO teams with reliable infrastructure,
            AI-powered analysis, and enterprise-grade performance.

          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {metrics.map((metric) => {

            const Icon = metric.icon;

            return (

              <div
                key={metric.title}
                className="
                  group
                  relative
                  overflow-hidden

                  rounded-3xl

                  border
                  border-white/60

                  bg-white/80

                  p-8

                  shadow-lg

                  backdrop-blur-xl

                  transition-all
                  duration-500

                  hover:-translate-y-2
                  hover:shadow-2xl
                "
              >

                <div
                  className={`
                    absolute
                    -right-12
                    -top-12
                    h-40
                    w-40
                    rounded-full
                    bg-gradient-to-br
                    ${metric.gradient}
                    opacity-10
                    blur-3xl
                    transition-all
                    duration-500
                    group-hover:opacity-30
                  `}
                />

                <div
                  className={`
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center

                    rounded-2xl

                    bg-gradient-to-br
                    ${metric.gradient}

                    shadow-lg
                  `}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="mt-8 flex items-center gap-2 text-5xl font-black">

                  {metric.value}

                  <ArrowUpRight className="h-6 w-6 text-emerald-500" />

                </h3>

                <p className="mt-3 text-xl font-bold text-slate-900">

                  {metric.title}

                </p>

                <p className="mt-4 leading-7 text-slate-500">

                  {metric.description}

                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}