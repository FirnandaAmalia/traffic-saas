"use client";

import {
  Brain,
  BarChart3,
  Globe,
  FileSpreadsheet,
  FolderOpen,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Unified SEO Dashboard",
    description:
      "Monitor Google Search Console and Google Analytics 4 from one beautiful dashboard without switching platforms.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Brain,
    title: "AI Executive Insights",
    description:
      "Automatically generate executive summaries, performance analysis, and actionable SEO recommendations.",
    gradient: "from-sky-500 to-cyan-500",
    pro: true,
  },
  {
    icon: Globe,
    title: "Traffic Intelligence",
    description:
      "Analyze countries, devices, browsers, landing pages, events, and acquisition channels in one place.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: FolderOpen,
    title: "Unlimited Workspaces",
    description:
      "Manage multiple websites, clients, and projects from a single account with centralized analytics.",
    gradient: "from-orange-500 to-amber-500",
    pro: true,
  },
  {
    icon: FileSpreadsheet,
    title: "Professional Reports",
    description:
      "Export polished CSV, Excel, and PDF reports ready to share with clients and stakeholders.",
    gradient: "from-pink-500 to-rose-500",
    pro: true,
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description:
      "Receive prioritized opportunities based on SEO impact, traffic potential, and business value.",
    gradient: "from-indigo-500 to-violet-500",
    pro: true,
  },
];

export default function FeatureGrid() {
  return (
    <section
      id="features"
      className="relative py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Everything You Need
          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">
            Built for Modern
            <br />
            SEO Teams
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
            Stop switching between Google Search Console,
            Google Analytics and spreadsheets.
            Everything is available inside one AI-powered platform.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  relative
                  overflow-hidden

                  rounded-3xl

                  border
                  border-slate-200

                  bg-white

                  p-8

                  shadow-sm

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

                    h-44
                    w-44

                    rounded-full

                    bg-gradient-to-br
                    ${feature.gradient}

                    opacity-10
                    blur-3xl

                    transition-all
                    duration-500

                    group-hover:opacity-25
                  `}
                />

                {feature.pro && (
                  <div className="absolute right-6 top-6 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                    PRO
                  </div>
                )}

                <div
                  className={`
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center

                    rounded-2xl

                    bg-gradient-to-br
                    ${feature.gradient}

                    shadow-lg
                  `}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-500">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}