"use client";

import {
  TrendingUp,
  Users,
  DollarSign,
  CalendarClock,
  Star,
} from "lucide-react";

import type {
  BusinessImpact,
} from "@/lib/recommendation/business-impact";

interface Props {
  business: BusinessImpact;
}

function Stars({
  value,
}: {
  value: number;
}) {

  return (
    <div className="flex gap-1">

      {Array.from({
        length: 5,
      }).map((_, i) => (

        <Star
          key={i}
          size={18}
          className={
            i < value
              ? "fill-yellow-400 text-yellow-400"
              : "text-slate-300"
          }
        />

      ))}

    </div>
  );

}

function Stat({

  icon,

  title,

  value,

}: {

  icon: React.ReactNode;

  title: string;

  value: React.ReactNode;

}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      <div className="mb-4 flex items-center gap-3">

        <div
          className="
            rounded-xl
            bg-sky-100
            p-2
          "
        >
          {icon}
        </div>

        <span
          className="
            text-sm
            text-slate-500
          "
        >
          {title}
        </span>

      </div>

      <div
        className="
          text-3xl
          font-bold
        "
      >
        {value}
      </div>

    </div>

  );

}

export default function BusinessImpactCard({

  business,

}: Props) {

  return (

    <section className="space-y-5">

      <div>

        <h2 className="text-2xl font-bold">

          Business Impact Forecast

        </h2>

        <p className="text-slate-500">

          Estimated impact if all recommendations
          are successfully implemented.

        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">

        <Stat
          icon={
            <TrendingUp
              size={20}
            />
          }
          title="Organic Clicks"
          value={
            "+" +
            business.potentialClicks.toLocaleString()
          }
        />

        <Stat
          icon={
            <Users
              size={20}
            />
          }
          title="Potential Users"
          value={
            "+" +
            business.potentialUsers.toLocaleString()
          }
        />

        <Stat
          icon={
            <DollarSign
              size={20}
            />
          }
          title="Conversion"
          value={
            "+" +
            business.potentialConversion +
            "%"
          }
        />

        <Stat
          icon={
            <CalendarClock
              size={20}
            />
          }
          title="Implementation"
          value={
            business.estimatedWeeks +
            " Weeks"
          }
        />

        <Stat
          icon={
            <Star
              size={20}
            />
          }
          title="Estimated ROI"
          value={
            <Stars
              value={
                business.roiScore
              }
            />
          }
        />

      </div>

    </section>

  );

}