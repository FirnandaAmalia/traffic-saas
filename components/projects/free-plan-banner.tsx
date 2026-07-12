"use client";

import {
  Crown,
  FolderOpen,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { goToBilling } from "@/lib/upgrade";

interface Props {
  usedProjects: number;
  maxProjects: number;
}

export default function FreePlanBanner({
  usedProjects,
  maxProjects,
}: Props) {
  const percent =
    Math.min(
      (usedProjects / maxProjects) * 100,
      100
    );

  return (
    <div
      className="
        relative
        overflow-hidden

        rounded-3xl

        border

        border-violet-200

        bg-gradient-to-r

        from-violet-50

        via-blue-50

        to-cyan-50

        p-8
      "
    >
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="absolute -bottom-12 left-0 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">

            <Crown className="h-4 w-4" />

            Free Plan

          </div>

          <h2 className="mt-5 text-3xl font-bold text-slate-900">

            You're using

            {" "}

            {usedProjects}/{maxProjects}

            {" "}

            available project

          </h2>

          <p className="mt-3 max-w-xl text-slate-600">

            Upgrade to Pro to unlock unlimited projects,
            AI Dashboard, Compare Date Range,
            PDF Export and many more features.

          </p>

          <div className="mt-6">

            <div className="mb-2 flex items-center justify-between text-sm">

              <span className="font-medium">

                Project Usage

              </span>

              <span className="font-bold">

                {usedProjects}/{maxProjects}

              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white">

              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600 transition-all duration-700"
                style={{
                  width: `${percent}%`,
                }}
              />

            </div>

          </div>

        </div>

        <div className="shrink-0">

          <Button
  size="lg"
  onClick={goToBilling}
  className="
    rounded-xl
    bg-gradient-to-r
    from-violet-600
    to-blue-600
    px-8
    shadow-lg
  "
>
  <Sparkles className="mr-2 h-4 w-4" />
  Upgrade to Pro
</Button>

        </div>

      </div>

    </div>
  );
}