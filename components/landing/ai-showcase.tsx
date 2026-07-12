"use client";

import {
  Brain,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function AIShowcase() {
  return (
    <section
      id="ai"
      className="relative overflow-hidden py-32"
    >
      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[140px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">

          {/* LEFT */}

          <div>

            <span
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                bg-violet-100

                px-4
                py-2

                text-sm
                font-semibold
                text-violet-700
              "
            >
              <Sparkles className="h-4 w-4" />

              AI Powered Analytics

            </span>

            <h2 className="mt-8 text-5xl font-black tracking-tight text-slate-900">

              Your Personal

              <br />

              SEO Consultant

            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">

              TrafficSaaS doesn't just display data.

              It understands your Google Search Console
              and Google Analytics reports, then generates
              executive summaries, SEO opportunities and
              business recommendations automatically.

            </p>

            <div className="mt-10 space-y-5">

              {[
                "Executive Summary",
                "CTR Opportunity Detection",
                "Content Decay Analysis",
                "Business Impact Estimation",
                "Prioritized SEO Recommendations",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />

                  <span className="font-medium text-slate-700">

                    {item}

                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
              rounded-[34px]

              border

              border-white/60

              bg-white/80

              p-8

              shadow-[0_40px_120px_rgba(15,23,42,.15)]

              backdrop-blur-xl
            "
          >

            {/* Header */}

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-2xl

                  bg-gradient-to-br

                  from-violet-600
                  to-sky-500
                "
              >

                <Brain className="h-6 w-6 text-white" />

              </div>

              <div>

                <h3 className="font-bold">

                  TrafficSaaS AI

                </h3>

                <p className="text-sm text-slate-500">

                  Executive Insight

                </p>

              </div>

            </div>

            {/* Chat */}

            <div className="mt-8 space-y-4">

              <div className="rounded-2xl bg-slate-100 p-4 text-sm leading-7">

                Analyze my SEO performance.

              </div>

              <div
                className="
                  rounded-2xl

                  bg-gradient-to-br

                  from-violet-600
                  to-sky-500

                  p-6

                  text-white
                "
              >

                <p className="font-semibold">

                  Analysis Complete

                </p>

                <div className="mt-5 space-y-4 text-sm leading-7">

                  <p>

                    ✅ Organic clicks increased by
                    <strong> 42%</strong> compared
                    to the previous period.

                  </p>

                  <p>

                    ⚠️ Several pages have high
                    impressions but low CTR.

                  </p>

                  <p>

                    💡 Updating titles and meta
                    descriptions could significantly
                    increase organic traffic.

                  </p>

                  <p>

                    🚀 Estimated traffic growth:
                    <strong> +18%</strong>

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}