"use client";

import {
  ArrowRight,
  Brain,
  Globe,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function DashboardShowcase() {
  return (
    <section
      id="dashboard"
      className="relative overflow-hidden py-32"
    >
      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-0 top-20 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-[460px] w-[460px] rounded-full bg-sky-500/10 blur-[140px]" />

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

              Dashboard Showcase

            </span>

            <h2 className="mt-8 text-5xl font-black tracking-tight text-slate-900">

              One Workspace.

              <br />

              Every SEO Metric.

            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">

              Stop switching between Google Search Console,
              Google Analytics 4 and spreadsheets.

              TrafficSaaS combines everything into one
              modern AI-powered dashboard.

            </p>

            <div className="mt-10 space-y-5">

              {[
                "Google Search Console Integration",
                "Google Analytics 4 Integration",
                "Executive AI Summary",
                "Realtime KPI Dashboard",
                "PDF & Excel Export",
                "Country & Device Analytics",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">

                    <Sparkles className="h-5 w-5 text-violet-700" />

                  </div>

                  <span className="font-medium text-slate-700">

                    {item}

                  </span>

                </div>

              ))}

            </div>

            <Button
              asChild
              size="lg"
              className="
                mt-10

                rounded-full

                bg-gradient-to-r

                from-violet-600
                to-sky-500

                px-8
              "
            >

              <Link href="/api/auth/signin">

                Start Free

                <ArrowRight className="ml-2 h-4 w-4" />

              </Link>

            </Button>

          </div>

          {/* RIGHT */}

          <div className="relative">

            {/* Dashboard */}

            <div
              className="
                overflow-hidden

                rounded-[34px]

                border
                border-white/60

                bg-white

                shadow-[0_40px_120px_rgba(15,23,42,.18)]
              "
            >

              {/* Browser */}

              <div className="flex h-12 items-center gap-2 border-b bg-slate-50 px-5">

                <div className="h-3 w-3 rounded-full bg-red-400" />

                <div className="h-3 w-3 rounded-full bg-yellow-400" />

                <div className="h-3 w-3 rounded-full bg-green-400" />

              </div>

              <img
                src="/dashboard-preview.png"
                alt="TrafficSaaS Dashboard"
                className="w-full"
              />

            </div>

            {/* Floating Card */}

            <div
              className="
                absolute

                -left-10

                top-10

                hidden

                rounded-2xl

                border

                bg-white/95

                p-5

                shadow-2xl

                backdrop-blur-xl

                lg:block
              "
            >

              <div className="flex items-center gap-3">

                <TrendingUp className="h-10 w-10 rounded-xl bg-violet-100 p-2 text-violet-700" />

                <div>

                  <p className="text-xs text-slate-500">

                    Organic Traffic

                  </p>

                  <h3 className="text-3xl font-bold">

                    +42%

                  </h3>

                </div>

              </div>

            </div>

            {/* Floating Card */}

            <div
              className="
                absolute

                -right-10

                top-40

                hidden

                rounded-2xl

                border

                bg-white/95

                p-5

                shadow-2xl

                backdrop-blur-xl

                lg:block
              "
            >

              <div className="flex items-center gap-3">

                <Brain className="h-10 w-10 rounded-xl bg-sky-100 p-2 text-sky-700" />

                <div>

                  <p className="text-xs text-slate-500">

                    AI Summary

                  </p>

                  <h3 className="font-semibold">

                    Improve CTR

                  </h3>

                </div>

              </div>

            </div>

            {/* Floating Card */}

            <div
              className="
                absolute

                bottom-10

                left-14

                hidden

                rounded-2xl

                border

                bg-white/95

                p-5

                shadow-2xl

                backdrop-blur-xl

                lg:block
              "
            >

              <div className="flex items-center gap-3">

                <Globe className="h-10 w-10 rounded-xl bg-emerald-100 p-2 text-emerald-700" />

                <div>

                  <p className="text-xs text-slate-500">

                    Active Countries

                  </p>

                  <h3 className="font-semibold">

                    128 Countries

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}