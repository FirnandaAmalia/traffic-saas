"use client";

import Link from "next/link";

import {
  ArrowRight,
  Sparkles,
  Play,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-36">

      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[180px]" />

        <div className="absolute left-0 bottom-0 h-[420px] w-[420px] rounded-full bg-sky-500/15 blur-[150px]" />

        <div className="absolute right-0 top-20 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[150px]" />

      </div>

      <div className="relative mx-auto max-w-6xl px-6">

        <div
          className="
            overflow-hidden

            rounded-[40px]

            border
            border-white/60

            bg-gradient-to-br

            from-slate-950

            via-violet-950

            to-slate-900

            px-10
            py-24

            text-center

            shadow-[0_40px_120px_rgba(15,23,42,.25)]
          "
        >

          {/* Badge */}

          <span
            className="
              inline-flex

              items-center

              gap-2

              rounded-full

              bg-white/10

              px-5
              py-2

              text-sm

              font-semibold

              text-white

              backdrop-blur
            "
          >

            <Sparkles className="h-4 w-4 text-yellow-300" />

            Ready to Grow?

          </span>

          {/* Heading */}

          <h2
            className="
              mx-auto

              mt-8

              max-w-4xl

              text-5xl

              font-black

              leading-tight

              tracking-tight

              text-white

              lg:text-7xl
            "
          >

            Stop Guessing.

            <br />

            Start Growing with AI.

          </h2>

          {/* Description */}

          <p
            className="
              mx-auto

              mt-8

              max-w-2xl

              text-xl

              leading-9

              text-slate-300
            "
          >

            Connect Google Search Console and
            Google Analytics 4 in minutes.

            Unlock AI-powered SEO insights,
            executive summaries, and smarter
            business decisions from one dashboard.

          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Button
              asChild
              size="lg"
              className="
                h-14

                rounded-full

                bg-white

                px-10

                text-violet-700

                hover:bg-slate-100
              "
            >

              <Link href="/api/auth/signin">

                Start Free

                <ArrowRight className="ml-2 h-4 w-4" />

              </Link>

            </Button>

            <Button
              variant="outline"
              size="lg"
              className="
                h-14

                rounded-full

                border-white/30

                bg-white/10

                px-10

                text-white

                backdrop-blur

                hover:bg-white/20
              "
            >

              <Play className="mr-2 h-4 w-4" />

              Watch Demo

            </Button>

          </div>

          {/* Stats */}

          <div
            className="
              mt-16

              grid

              gap-10

              border-t

              border-white/10

              pt-12

              sm:grid-cols-3
            "
          >

            <div>

              <h3 className="text-4xl font-black text-white">

                100+

              </h3>

              <p className="mt-2 text-slate-400">

                Connected Websites

              </p>

            </div>

            <div>

              <h3 className="text-4xl font-black text-white">

                99.9%

              </h3>

              <p className="mt-2 text-slate-400">

                Platform Uptime

              </p>

            </div>

            <div>

              <h3 className="text-4xl font-black text-white">

                AI

              </h3>

              <p className="mt-2 text-slate-400">

                Executive Insights

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}