"use client";

import Link from "next/link";

import {
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const freeFeatures = [
  "1 Project",
  "Google Search Console",
  "Google Analytics 4",
  "Dashboard Overview",
];

const proFeatures = [
  "Unlimited Projects",
  "Unlimited Workspaces",
  "AI Executive Dashboard",
  "AI Recommendations",
  "Compare Date Range",
  "PDF Export",
  "Excel Export",
  "Priority Support",
];

export default function PricingPreview() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-32"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-violet-500/15 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-sky-500/15 blur-[140px]" />

        <div className="absolute left-1/2 top-40 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">

            <Sparkles className="h-4 w-4" />

            Pricing

          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">

            Start Free.

            <br />

            Upgrade Anytime.

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">

            Begin with everything you need to monitor SEO.
            Upgrade whenever you're ready to unlock AI,
            unlimited projects and advanced reporting.

          </p>

        </div>

        {/* Toggle */}

        <div className="mt-12 flex justify-center">

          <div className="inline-flex rounded-full bg-white p-1 shadow-xl">

            <button className="rounded-full bg-violet-600 px-6 py-2 font-semibold text-white">

              Monthly

            </button>

            <button className="rounded-full px-6 py-2 font-medium text-slate-600">

              Yearly

              <span className="ml-2 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">

                Save 20%

              </span>

            </button>

          </div>

        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-2">

          {/* FREE */}

          <div
            className="
              rounded-[36px]
              border
              border-white/70
              bg-white/70
              p-10
              shadow-xl
              backdrop-blur-xl

              transition-all
              duration-500

              hover:-translate-y-2
              hover:shadow-2xl
            "
          >

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold">

              FREE

            </span>

            <div className="mt-8 flex items-end gap-2">

              <h2 className="text-6xl font-black">

                $0

              </h2>

              <span className="mb-2 text-slate-500">

                /forever

              </span>

            </div>

            <p className="mt-3 text-slate-500">

              Perfect for personal websites and learning SEO.

            </p>

            <div className="my-8 h-px bg-slate-200" />

            <div className="space-y-5">

              {freeFeatures.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">

                    <Check className="h-4 w-4 text-emerald-600" />

                  </div>

                  <span className="font-medium">

                    {item}

                  </span>

                </div>

              ))}

            </div>

            <Button
              asChild
              variant="outline"
              className="mt-10 h-14 w-full rounded-2xl"
            >

              <Link href="/api/auth/signin">

                Start Free

              </Link>

            </Button>

          </div>

          {/* PRO */}

          <div
            className="
              relative

              overflow-hidden

              rounded-[36px]

              bg-gradient-to-br

              from-violet-600

              via-indigo-600

              to-sky-500

              p-[1px]

              shadow-[0_40px_120px_rgba(124,58,237,.45)]

              transition-all
              duration-500

              hover:scale-[1.02]
            "
          >

            {/* Glow */}

            <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-violet-400/40 blur-[130px]" />

            <div className="relative rounded-[35px] bg-slate-950 p-10 text-white">

              <div className="absolute right-8 top-8">

                <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-xl">

                  🔥 Best Value

                </div>

              </div>

              <span className="text-sm font-semibold uppercase tracking-widest text-violet-300">

                PRO

              </span>

              <div className="mt-6 flex items-end gap-2">

                <h2 className="text-7xl font-black">

                  $19

                </h2>

                <span className="mb-3 text-xl text-slate-400">

                  /month

                </span>

              </div>

              <p className="mt-3 text-slate-300">

                Built for agencies, startups and growing businesses.

              </p>

              <div className="my-8 h-px bg-white/10" />

              <div className="space-y-5">

                {proFeatures.map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >

                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">

                      <Check className="h-4 w-4 text-emerald-400" />

                    </div>

                    <span>

                      {item}

                    </span>

                  </div>

                ))}

              </div>

              <Button
                asChild
                className="
                  mt-10

                  h-14
                  w-full

                  rounded-2xl

                  bg-white

                  text-violet-700

                  font-semibold

                  hover:bg-slate-100
                "
              >

                <Link href="/billing">

                  Upgrade to Pro

                  <ArrowRight className="ml-2 h-4 w-4" />

                </Link>

              </Button>

              <p className="mt-6 text-center text-sm text-slate-400">

                Trusted by freelancers, agencies and growing startups.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}