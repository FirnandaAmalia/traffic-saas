"use client";

import {
  Brain,
  CheckCircle2,
  FileText,
  Sparkles,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

export default function AiCard() {
  return (
    <div
      className="
        relative
        overflow-hidden

        rounded-3xl

        border
        border-violet-200

        bg-gradient-to-br

        from-violet-600
        via-fuchsia-600
        to-sky-500

        p-7

        text-white

        shadow-[0_20px_60px_rgba(124,58,237,.35)]
      "
    >
      {/* Glow */}

      <div
        className="
          absolute
          -right-20
          -top-20

          h-56
          w-56

          rounded-full

          bg-white/10

          blur-3xl
        "
      />

      {/* Header */}

      <div className="relative z-10 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14

              items-center
              justify-center

              rounded-2xl

              bg-white/15

              backdrop-blur
            "
          >
            <Brain className="h-7 w-7" />
          </div>

          <div>

            <p className="text-sm text-violet-100">

              AI Copilot

            </p>

            <h3 className="text-2xl font-black">

              Executive Summary

            </h3>

          </div>

        </div>

        <div
          className="
            rounded-full

            bg-emerald-400/20

            px-4
            py-2

            text-sm
            font-bold

            text-emerald-100
          "
        >
          98% Confidence
        </div>

      </div>

      {/* Score */}

      <div className="relative z-10 mt-8 flex items-end gap-4">

        <div>

          <p className="text-sm text-violet-100">

            SEO Score

          </p>

          <h2 className="text-6xl font-black">

            92

          </h2>

        </div>

        <div className="pb-2">

          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              bg-emerald-400/20

              px-4
              py-2

              text-sm
              font-bold
            "
          >

            <TrendingUp className="h-4 w-4" />

            +18%

          </div>

        </div>

      </div>

      {/* Divider */}

      <div className="relative z-10 my-7 h-px bg-white/15" />

      {/* Insights */}

      <div className="relative z-10 space-y-4">

        <div className="flex items-start gap-3">

          <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />

          <div>

            <p className="font-semibold">

              CTR increased by 18%

            </p>

            <p className="text-sm text-violet-100">

              Meta title improvements are performing well.

            </p>

          </div>

        </div>

        <div className="flex items-start gap-3">

          <Sparkles className="mt-0.5 h-5 w-5 text-yellow-300" />

          <div>

            <p className="font-semibold">

              12 keywords entered Top 10

            </p>

            <p className="text-sm text-violet-100">

              Strong growth for informational pages.

            </p>

          </div>

        </div>

        <div className="flex items-start gap-3">

          <TriangleAlert className="mt-0.5 h-5 w-5 text-orange-300" />

          <div>

            <p className="font-semibold">

              3 landing pages lost clicks

            </p>

            <p className="text-sm text-violet-100">

              Refresh outdated content to recover rankings.

            </p>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="relative z-10 mt-8 flex items-center justify-between">

        <div className="text-sm text-violet-100">

          Generated just now

        </div>

        <button
          className="
            flex
            items-center
            gap-2

            rounded-2xl

            bg-white

            px-5
            py-3

            font-semibold

            text-violet-700

            transition-all
            duration-300

            hover:scale-105
          "
        >

          <FileText className="h-4 w-4" />

          Generate Report

        </button>

      </div>
    </div>
  );
}