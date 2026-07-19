"use client";

import {
  Brain,
  Database,
  Globe,
  LineChart,
  Monitor,
  Search,
} from "lucide-react";

import type {
  MaturityAssessment,
} from "@/lib/recommendation/maturity-score";

interface Props {
  maturity: MaturityAssessment;
}

function Progress({
  value,
}: {
  value: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{value}</span>
        <span>%</span>
      </div>

      <div className="h-2 rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">

      <div className="mb-4 flex items-center gap-3">

        <div className="rounded-xl bg-indigo-100 p-2">

          {icon}

        </div>

        <span className="font-medium">

          {title}

        </span>

      </div>

      <Progress value={value} />

    </div>
  );
}

function badge(level: string) {

  switch (level) {

    case "Leading":

      return "bg-emerald-100 text-emerald-700";

    case "Advanced":

      return "bg-sky-100 text-sky-700";

    case "Developing":

      return "bg-yellow-100 text-yellow-700";

    default:

      return "bg-red-100 text-red-700";

  }

}

export default function MaturityScoreCard({

  maturity,

}: Props) {

  return (

    <section className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">

            Digital Maturity Assessment

          </h2>

          <p className="text-slate-500">

  AI evaluates your organization&apos;s digital capability
  across multiple dimensions.

</p>

        </div>

        <div
          className={`rounded-full px-5 py-2 text-sm font-semibold ${badge(
            maturity.level
          )}`}
        >
          {maturity.level}
        </div>

      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">

        {/* SCORE */}

        <div className="rounded-3xl border bg-white p-8 text-center shadow-sm">

          <div className="text-6xl font-black text-indigo-600">

            {maturity.overall}

          </div>

          <div className="mt-2 text-xl font-semibold">

            /100

          </div>

          <div className="mt-5 text-lg font-bold">

            {maturity.level}

          </div>

          <p className="mt-4 text-sm text-slate-500">

            Overall Digital
            Maturity Score

          </p>

        </div>

        {/* DIMENSIONS */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          <Card
            title="SEO"
            value={maturity.dimensions.seo}
            icon={<Search size={18} />}
          />

          <Card
            title="Analytics"
            value={maturity.dimensions.analytics}
            icon={<LineChart size={18} />}
          />

          <Card
            title="Content"
            value={maturity.dimensions.content}
            icon={<Monitor size={18} />}
          />

          <Card
            title="Marketing"
            value={maturity.dimensions.marketing}
            icon={<Globe size={18} />}
          />

          <Card
            title="User Experience"
            value={maturity.dimensions.userExperience}
            icon={<Brain size={18} />}
          />

          <Card
            title="Data Driven"
            value={maturity.dimensions.dataDriven}
            icon={<Database size={18} />}
          />

        </div>

      </div>

    </section>

  );

}