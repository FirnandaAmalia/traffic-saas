"use client";

import {
  ArrowRight,
  BarChart3,
  Brain,
  Globe,
  Sparkles,
} from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import DashboardMockup from "./dashboard-mockup";

export default function DashboardPreview() {
  return (
    <section
      id="dashboard"
      className="relative overflow-hidden py-32"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-[-180px] top-20 h-[520px] w-[520px] rounded-full bg-violet-500/20 blur-[140px]" />

        <div className="absolute right-[-180px] bottom-0 h-[520px] w-[520px] rounded-full bg-sky-500/20 blur-[140px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

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

            Dashboard Preview

          </span>

          <h2
            className="
              mt-6

              text-5xl

              font-black

              tracking-tight

              text-slate-900
            "
          >

            Your Entire SEO Stack

            <br />

            Inside One Dashboard

          </h2>

          <p
            className="
              mx-auto
              mt-6

              max-w-2xl

              text-lg

              leading-8

              text-slate-500
            "
          >

            Stop switching between Google Search Console,
            Google Analytics 4, spreadsheets and reports.

            Everything lives inside one beautiful AI-powered
            workspace.

          </p>

        </div>

        {/* Mockup */}

        <div className="relative mt-24">

          <DashboardMockup />

          {/* Floating Card */}

          <div
            className="
              absolute

              -left-8

              top-12

              hidden

              rounded-3xl

              border

              bg-white/90

              p-5

              shadow-2xl

              backdrop-blur-xl

              lg:block
            "
          >

            <div className="flex items-center gap-3">

              <BarChart3 className="h-11 w-11 rounded-2xl bg-violet-100 p-3 text-violet-700" />

              <div>

                <p className="text-xs text-slate-500">

                  Organic Traffic

                </p>

                <h3 className="text-3xl font-black text-emerald-600">

                  +42%

                </h3>

              </div>

            </div>

          </div>

          {/* Floating AI */}

          <div
            className="
              absolute

              -right-8

              top-40

              hidden

              rounded-3xl

              border

              bg-white/90

              p-5

              shadow-2xl

              backdrop-blur-xl

              lg:block
            "
          >

            <div className="flex items-start gap-3">

              <Brain className="mt-1 h-11 w-11 rounded-2xl bg-sky-100 p-3 text-sky-700" />

              <div>

                <p className="text-xs text-slate-500">

                  AI Recommendation

                </p>

                <h3 className="mt-1 font-bold">

                  Improve CTR by 18%

                </h3>

                <p className="mt-2 text-xs text-slate-500">

                  Optimize title tags on your
                  highest-impression pages.

                </p>

              </div>

            </div>

          </div>

          {/* Floating Country */}

          <div
            className="
              absolute

              bottom-10

              left-24

              hidden

              rounded-3xl

              border

              bg-white/90

              p-5

              shadow-2xl

              backdrop-blur-xl

              lg:block
            "
          >

            <div className="flex items-center gap-3">

              <Globe className="h-11 w-11 rounded-2xl bg-emerald-100 p-3 text-emerald-700" />

              <div>

                <p className="text-xs text-slate-500">

                  Active Countries

                </p>

                <h3 className="font-bold">

                  128 Regions

                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* CTA */}

        <div className="mt-20 flex justify-center">

          <Button
            asChild
            size="lg"
            className="
              rounded-full

              bg-gradient-to-r

              from-violet-600

              to-sky-500

              px-8
            "
          >

            <Link href="/dashboard">

              Explore Dashboard

              <ArrowRight className="ml-2 h-4 w-4" />

            </Link>

          </Button>

        </div>

      </div>

    </section>
  );
}