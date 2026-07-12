"use client";

import Link from "next/link";

import {
  ArrowRight,
  Play,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export default function HeroContent() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      <motion.div
        animate={{
          opacity: [1, .75, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
        }}
        className="
          inline-flex
          items-center
          gap-2

          rounded-full

          border

          border-violet-200

          bg-violet-50

          px-4

          py-2

          text-sm

          font-semibold

          text-violet-700
        "
      >
        <Sparkles className="h-4 w-4" />

        AI Powered SEO Analytics

      </motion.div>

      <h1 className="mt-8 text-6xl font-black leading-tight tracking-tight lg:text-7xl">

        Grow Your

        <br />

        SEO With

        <span className="bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent">

          {" "}AI

        </span>

      </h1>

      <p className="mt-8 max-w-xl text-xl leading-9 text-slate-600">

        Connect Google Search Console and
        Google Analytics 4 into one modern
        AI-powered dashboard.

      </p>

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
          className="rounded-full px-8"
        >
          <Play className="mr-2 h-4 w-4" />

          Live Demo

        </Button>

      </div>

      <div className="mt-12 flex gap-10">

        <div>

          <h2 className="text-4xl font-black">

            100+

          </h2>

          <p className="text-slate-500">

            Connected Sites

          </p>

        </div>

        <div>

          <h2 className="text-4xl font-black">

            4.9★

          </h2>

          <p className="text-slate-500">

            Product Experience

          </p>

        </div>

      </div>

    </motion.div>
  );
}