"use client";

import {
  Award,
  TrendingUp,
} from "lucide-react";

import type {
  HealthScore,
} from "@/lib/recommendation/health-score";

interface Props {
  health: HealthScore;
}

function getColor(score: number) {

  if (score >= 90)
    return "text-emerald-600";

  if (score >= 80)
    return "text-sky-600";

  if (score >= 70)
    return "text-yellow-600";

  return "text-red-600";
}

function Progress({
  value,
}: {
  value: number;
}) {

  return (

    <div>

      <div className="mb-1 flex justify-between text-xs">

        <span>{value}</span>

      </div>

      <div className="h-2 rounded-full bg-slate-100">

        <div
          className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>

  );

}

export default function HealthScoreCard({
  health,
}: Props) {

  return (

    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      "
    >

      <div className="flex items-center gap-3">

        <Award
          className="text-indigo-600"
          size={26}
        />

        <div>

          <h2 className="text-2xl font-bold">

            AI Website Health

          </h2>

          <p className="text-sm text-slate-500">

            Generated from all SEO &
            Analytics signals

          </p>

        </div>

      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">

        {/* LEFT */}

        <div className="flex flex-col items-center justify-center">

          <div
            className={`
              text-7xl
              font-black

              ${getColor(
                health.score
              )}
            `}
          >
            {health.grade}
          </div>

          <div className="mt-2 text-4xl font-bold">

            {health.score}

            <span className="text-xl text-slate-400">

              /100

            </span>

          </div>

          <div className="mt-6 w-full">

            <Progress
              value={health.score}
            />

          </div>

          <div
            className="
              mt-6
              rounded-xl
              bg-slate-50
              p-4
              text-center
              text-sm
              text-slate-600
            "
          >

            {health.summary}

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <div className="mb-6 flex items-center gap-2">

            <TrendingUp
              size={18}
            />

            <span className="font-semibold">

              Category Breakdown

            </span>

          </div>

          <div className="space-y-6">

            <div>

              <div className="mb-2 flex justify-between">

                <span>SEO</span>

                <span>

                  {health.breakdown.seo}

                </span>

              </div>

              <Progress
                value={
                  health.breakdown.seo
                }
              />

            </div>

            <div>

              <div className="mb-2 flex justify-between">

                <span>Content</span>

                <span>

                  {
                    health.breakdown
                      .content
                  }

                </span>

              </div>

              <Progress
                value={
                  health.breakdown
                    .content
                }
              />

            </div>

            <div>

              <div className="mb-2 flex justify-between">

                <span>UX</span>

                <span>

                  {health.breakdown.ux}

                </span>

              </div>

              <Progress
                value={
                  health.breakdown.ux
                }
              />

            </div>

            <div>

              <div className="mb-2 flex justify-between">

                <span>Performance</span>

                <span>

                  {
                    health.breakdown
                      .performance
                  }

                </span>

              </div>

              <Progress
                value={
                  health.breakdown
                    .performance
                }
              />

            </div>

            <div>

              <div className="mb-2 flex justify-between">

                <span>Analytics</span>

                <span>

                  {
                    health.breakdown
                      .analytics
                  }

                </span>

              </div>

              <Progress
                value={
                  health.breakdown
                    .analytics
                }
              />

            </div>

            <div>

              <div className="mb-2 flex justify-between">

                <span>Marketing</span>

                <span>

                  {
                    health.breakdown
                      .marketing
                  }

                </span>

              </div>

              <Progress
                value={
                  health.breakdown
                    .marketing
                }
              />

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}