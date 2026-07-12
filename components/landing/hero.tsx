"use client";

import Link from "next/link";

import {
  ArrowRight,
  Play,
  Sparkles,
} from "lucide-react";

import Aurora from "@/components/background/aurora";
import Particles from "@/components/background/particles";
import Spotlight from "@/components/background/spotlight";

import FadeUp from "@/components/motion/fade-up";

import HeroDashboard from "./hero-dashboard";

import AnimatedCounter from "@/components/ui/animated-counter";
import { Button } from "@/components/ui/button";
import Tilt from "@/components/motion/tilt";
import Shimmer from "@/components/ui/shimmer";

export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-gradient-to-b

        from-white
        via-slate-50/40
        to-white
      "
    >
      {/* Background */}

      <Aurora />

      <Particles />

      <Spotlight />

      {/* Radial Glow */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          bg-[radial-gradient(circle_at_top,rgba(124,58,237,.10),transparent_55%)]

          opacity-80
        "
      />

      {/* Content */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-28">

        <div className="grid w-full items-center gap-24 lg:grid-cols-2">

          {/* LEFT */}

          <FadeUp>

            <div>

              {/* Badge */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-full

                  border
                  border-violet-200

                  bg-violet-50/90

                  px-4
                  py-2

                  text-sm
                  font-semibold

                  text-violet-700

                  backdrop-blur
                "
              >

                <Sparkles className="h-4 w-4" />

                AI Powered SEO Analytics

              </div>

              {/* Heading */}

              <h1 className="mt-8 text-6xl font-black leading-tight tracking-tight text-slate-900 lg:text-7xl">

                Monitor SEO

                <br />

                <span className="bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">

                  Smarter,

                </span>

                <br />

                Grow Faster

              </h1>

              {/* Description */}

              <p className="mt-8 max-w-xl text-xl leading-9 text-slate-600">

                Combine Google Search Console and
                Google Analytics 4 into one beautiful
                AI-powered dashboard with executive
                summaries, actionable insights,
                and smart recommendations for
                modern SEO teams.

              </p>

              {/* CTA */}

              <div className="mt-10 flex flex-wrap gap-4">

                <Button
                  asChild
                  size="lg"
                  className="
                    rounded-full

                    bg-gradient-to-r

                    from-violet-600
                    to-sky-500

                    px-8

                    shadow-xl

                    transition-transform

                    hover:scale-[1.03]
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
                    rounded-full

                    border-white/70

                    bg-white/70

                    px-8

                    backdrop-blur-xl

                    transition-all

                    hover:bg-white
                    hover:shadow-lg
                  "
                >

                  <Play className="mr-2 h-4 w-4" />

                  Live Demo

                </Button>

              </div>

              {/* Stats */}

              <div className="mt-14 grid grid-cols-3 gap-8">

                <div>

                  <h3
                    className="
                      bg-gradient-to-r

                      from-violet-600
                      to-sky-500

                      bg-clip-text

                      text-4xl
                      font-black

                      text-transparent
                    "
                  >

                    <AnimatedCounter
                      value={100}
                      suffix="+"
                    />

                  </h3>

                  <p className="mt-2 text-sm text-slate-500">

                    Connected Websites

                  </p>

                </div>

                <div>

                  <h3
                    className="
                      bg-gradient-to-r

                      from-violet-600
                      to-sky-500

                      bg-clip-text

                      text-4xl
                      font-black

                      text-transparent
                    "
                  >

                    <AnimatedCounter
                      value={24}
                      suffix="/7"
                    />

                  </h3>

                  <p className="mt-2 text-sm text-slate-500">

                    AI Monitoring

                  </p>

                </div>

                <div>

                  <h3
                    className="
                      bg-gradient-to-r

                      from-violet-600
                      to-sky-500

                      bg-clip-text

                      text-4xl
                      font-black

                      text-transparent
                    "
                  >

                    <AnimatedCounter
                      value={99}
                      suffix="%"
                    />

                  </h3>

                  <p className="mt-2 text-sm text-slate-500">

                    Faster Reporting

                  </p>

                </div>

              </div>

            </div>

          </FadeUp>

          {/* RIGHT */}

          <FadeUp delay={0.2}>

            <div
  style={{
    perspective: "1800px",
  }}
>

  <Tilt>

    <HeroDashboard />

  </Tilt>

</div>

          </FadeUp>

        </div>

      </div>

    </section>
  );
}