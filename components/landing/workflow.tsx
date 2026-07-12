"use client";

import {
  Link2,
  DatabaseZap,
  BrainCircuit,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    icon: Link2,
    title: "Connect",
    description:
      "Connect your Google Search Console and Google Analytics 4 account securely with one click.",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: DatabaseZap,
    title: "Sync",
    description:
      "TrafficSaaS automatically syncs your SEO and analytics data into a unified workspace.",
    color: "from-sky-500 to-cyan-500",
  },
  {
    icon: BrainCircuit,
    title: "Analyze",
    description:
      "AI analyzes performance, detects opportunities, prioritizes issues, and generates executive summaries.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: TrendingUp,
    title: "Grow",
    description:
      "Implement recommendations, monitor improvements, and continuously increase organic traffic.",
    color: "from-orange-500 to-amber-500",
  },
];

export default function Workflow() {
  return (
    <section className="relative py-32 overflow-hidden">

      <div className="absolute inset-0">

        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">

            Simple Workflow

          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight">

            From Raw Data

            <br />

            to Business Decisions

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-500">

            Setup only takes a few minutes.
            Connect your Google accounts and let AI
            transform raw analytics into actionable insights.

          </p>

        </div>

        <div className="relative mt-20">

          {/* connector */}

          <div className="absolute left-0 right-0 top-10 hidden h-[2px] bg-gradient-to-r from-violet-300 via-sky-300 to-emerald-300 lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="relative"
                >

                  <div
                    className="
                      relative
                      rounded-3xl
                      border
                      border-white/60
                      bg-white/80
                      p-8
                      shadow-xl
                      backdrop-blur-xl
                      transition
                      duration-500
                      hover:-translate-y-2
                      hover:shadow-2xl
                    "
                  >

                    <div className="absolute right-6 top-6 text-sm font-bold text-slate-300">

                      0{index + 1}

                    </div>

                    <div
                      className={`
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        ${step.color}
                        shadow-lg
                      `}
                    >

                      <Icon className="h-8 w-8 text-white" />

                    </div>

                    <h3 className="mt-8 text-2xl font-bold">

                      {step.title}

                    </h3>

                    <p className="mt-4 leading-7 text-slate-500">

                      {step.description}

                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}