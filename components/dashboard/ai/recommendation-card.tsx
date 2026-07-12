"use client";

import {
  ArrowUpRight,
  CalendarDays,
  CircleDollarSign,
  Sparkles,
} from "lucide-react";

import type {
  PrioritizedRecommendation,
} from "@/lib/recommendation/prioritizer";

interface Props {
  recommendation: PrioritizedRecommendation;
}

function priorityColor(priority: string) {
  switch (priority) {
    case "critical":
      return "bg-red-100 text-red-700";

    case "high":
      return "bg-orange-100 text-orange-700";

    case "medium":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-emerald-100 text-emerald-700";
  }
}

function scoreColor(score: number) {
  if (score >= 90)
    return "text-emerald-600";

  if (score >= 80)
    return "text-sky-600";

  if (score >= 70)
    return "text-yellow-600";

  return "text-red-600";
}

export default function RecommendationCard({
  recommendation,
}: Props) {

  return (

    <div
      className="
        rounded-3xl

        border
        border-slate-200

        bg-white

        p-6

        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-lg
      "
    >

      {/* HEADER */}

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-br
              from-sky-100
              to-indigo-100

              text-2xl
            "
          >
            {recommendation.icon}
          </div>

          <div>

            <h3 className="text-xl font-bold">

              {recommendation.title}

            </h3>

            <p className="mt-1 text-sm text-slate-500">

              {recommendation.description}

            </p>

          </div>

        </div>

        <div
          className={`
            rounded-full
            px-3
            py-1

            text-xs
            font-bold

            ${priorityColor(
              recommendation.priority
            )}
          `}
        >

          {recommendation.priority.toUpperCase()}

        </div>

      </div>

      {/* SCORE */}

      <div className="mt-8 grid gap-4 md:grid-cols-4">

        <div
          className="
            rounded-2xl
            bg-slate-50
            p-4
          "
        >

          <div className="text-xs text-slate-500">

            AI Score

          </div>

          <div
            className={`
              mt-2

              text-3xl
              font-black

              ${scoreColor(
                recommendation.score
              )}
            `}
          >

            {recommendation.score}

          </div>

        </div>

        <div
          className="
            rounded-2xl
            bg-slate-50
            p-4
          "
        >

          <div className="flex items-center gap-2">

            <CircleDollarSign
              size={16}
            />

            <span className="text-xs text-slate-500">

              ROI

            </span>

          </div>

          <div className="mt-2 text-2xl">

            {"★".repeat(
              recommendation.roi
            )}

          </div>

        </div>

        <div
          className="
            rounded-2xl
            bg-slate-50
            p-4
          "
        >

          <div className="flex items-center gap-2">

            <Sparkles
              size={16}
            />

            <span className="text-xs text-slate-500">

              Difficulty

            </span>

          </div>

          <div className="mt-2 font-bold">

            {recommendation.difficulty}

          </div>

        </div>

        <div
          className="
            rounded-2xl
            bg-slate-50
            p-4
          "
        >

          <div className="flex items-center gap-2">

            <CalendarDays
              size={16}
            />

            <span className="text-xs text-slate-500">

              Estimated

            </span>

          </div>

          <div className="mt-2 font-bold">

            {recommendation.estimatedDays} Days

          </div>

        </div>

      </div>

      {/* RECOMMENDATION */}

      <div
        className="
          mt-8

          rounded-2xl

          bg-blue-50

          p-5
        "
      >

        <div className="font-semibold">

          Recommended Action

        </div>

        <p className="mt-2 text-sm leading-7 text-slate-700">

          {recommendation.recommendation}

        </p>

      </div>

      {/* IMPACT */}

      <div
        className="
          mt-5

          rounded-2xl

          bg-emerald-50

          p-5
        "
      >

        <div className="font-semibold">

          Expected Impact

        </div>

        <p className="mt-2 text-sm leading-7 text-slate-700">

          {recommendation.impact}

        </p>

      </div>

      {/* FOOTER */}

      <div className="mt-6 flex items-center justify-between">

        <div
          className="
            rounded-full

            bg-slate-100

            px-3
            py-1

            text-xs
            font-semibold
          "
        >

          {recommendation.category}

        </div>

        <button
          className="
            flex
            items-center
            gap-2

            rounded-xl

            bg-slate-900

            px-4
            py-2

            text-sm
            font-semibold

            text-white

            transition

            hover:bg-black
          "
        >

          View Detail

          <ArrowUpRight
            size={16}
          />

        </button>

      </div>

    </div>

  );

}