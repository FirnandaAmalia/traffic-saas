"use client";

import {
  Calendar,
  Clock,
  Rocket,
} from "lucide-react";

import type {
  ActionPlan,
} from "@/lib/recommendation/action-plan";

interface Props {

  plan: ActionPlan;

}

export default function ActionPlanCard({

  plan,

}: Props) {

  const grouped =
    plan.tasks.reduce(

      (acc, item) => {

        if (!acc[item.week]) {

          acc[item.week] = [];

        }

        acc[item.week].push(item);

        return acc;

      },

      {} as Record<
        number,
        typeof plan.tasks
      >

    );

  return (

    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold">

          30-Day AI Action Plan

        </h2>

        <p className="text-slate-500">

          Recommended implementation roadmap
          based on AI priorities.

        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {Object.entries(grouped).map(

          ([week, tasks]) => (

            <div

              key={week}

              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
              "

            >

              <div className="mb-6 flex items-center gap-3">

                <Calendar />

                <h3 className="text-xl font-bold">

                  Week {week}

                </h3>

              </div>

              <div className="space-y-5">

                {tasks.map(task => (

                  <div
                    key={task.title}
                    className="
                      rounded-xl
                      border
                      border-slate-100
                      bg-slate-50
                      p-4
                    "
                  >

                    <div className="flex items-center justify-between">

                      <div className="font-semibold">

                        {task.title}

                      </div>

                      <div className="text-sm">

                        ⭐ {task.roi}/5

                      </div>

                    </div>

                    <p className="mt-3 text-sm leading-7 text-slate-600">

                      {task.description}

                    </p>

                    <div className="mt-4 flex gap-3 text-xs text-slate-500">

                      <span className="flex items-center gap-1">

                        <Rocket size={14} />

                        {task.difficulty}

                      </span>

                      <span className="flex items-center gap-1">

                        <Clock size={14} />

                        {task.estimatedDays} Days

                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )

        )}

      </div>

    </section>

  );

}