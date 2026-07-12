import {
  Bot,
  Sparkles,
  ShieldCheck,
  Target,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

import CardShell from "../layout/card-shell";

import type {
  ExecutiveSummary,
} from "@/lib/ai/executive-summary";

import Link from "next/link";
import { Lock } from "lucide-react";

import {
  FEATURES,
  hasFeature,
} from "@/lib/features";

import {
  PLANS,
  type Plan,
} from "@/lib/plan";

interface ExecutiveSummaryProps {
  plan: Plan;
  summary: ExecutiveSummary;
}

export default function ExecutiveSummary({
  plan,
  summary,
}: ExecutiveSummaryProps) {

  const canUseAI = hasFeature(
    plan,
    FEATURES.AI_DASHBOARD
  );

  const healthColor = {
    Excellent:
      "bg-emerald-100 text-emerald-700",

    Good:
      "bg-blue-100 text-blue-700",

    "Needs Attention":
      "bg-amber-100 text-amber-700",
  };

  if (!canUseAI) {
  return (
    <CardShell
      title={
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-violet-600" />
          AI Executive Dashboard
        </div>
      }
      description="Available on Pro Plan"
    >
      <div className="flex min-h-[420px] flex-col items-center justify-center text-center">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
          <Lock className="h-8 w-8 text-violet-600" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-900">
          Unlock AI Executive Dashboard
        </h2>

        <p className="mt-3 max-w-xl text-slate-500">
          AI akan menganalisis data Google Search Console dan Google Analytics
          untuk memberikan executive summary, SEO health, peluang pertumbuhan,
          serta rekomendasi prioritas.
        </p>

        <div className="mt-8 grid w-full max-w-2xl gap-4 md:grid-cols-2">

          <div className="rounded-xl border p-4 text-left">
            <Sparkles className="mb-2 h-5 w-5 text-violet-600" />
            <h4 className="font-semibold">Executive Summary</h4>
            <p className="mt-2 text-sm text-slate-500">
              Ringkasan otomatis performa website.
            </p>
          </div>

          <div className="rounded-xl border p-4 text-left">
            <ShieldCheck className="mb-2 h-5 w-5 text-emerald-600" />
            <h4 className="font-semibold">SEO Health</h4>
            <p className="mt-2 text-sm text-slate-500">
              Analisis kesehatan SEO secara otomatis.
            </p>
          </div>

          <div className="rounded-xl border p-4 text-left">
            <TrendingUp className="mb-2 h-5 w-5 text-blue-600" />
            <h4 className="font-semibold">Growth Opportunities</h4>
            <p className="mt-2 text-sm text-slate-500">
              Temukan peluang peningkatan traffic.
            </p>
          </div>

          <div className="rounded-xl border p-4 text-left">
            <Lightbulb className="mb-2 h-5 w-5 text-amber-500" />
            <h4 className="font-semibold">Priority Recommendation</h4>
            <p className="mt-2 text-sm text-slate-500">
              Prioritas tindakan berdasarkan AI.
            </p>
          </div>

        </div>

        <Link
          href="/billing"
          className="mt-8 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
        >
          Upgrade to Pro
        </Link>

      </div>
    </CardShell>
  );
}

  return (

    <CardShell
      title={
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-violet-600" />
          AI Executive Dashboard
        </div>
      }
      description="AI generated business insight"
    >

      <div className="space-y-6">

        {/* KPI */}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-xl border p-4">

            <div className="flex items-center gap-2 text-sm text-slate-500">

              <ShieldCheck className="h-4 w-4 text-emerald-600"/>

              Health

            </div>

            <div
              className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${healthColor[summary.seoHealth]}`}
            >

              {summary.seoHealth}

            </div>

          </div>

          <div className="rounded-xl border p-4">

            <div className="flex items-center gap-2 text-sm text-slate-500">

              <Target className="h-4 w-4 text-blue-600"/>

              Confidence

            </div>

            <div className="mt-3 text-3xl font-bold">

              {summary.confidence}%

            </div>

          </div>

          <div className="rounded-xl border p-4">

            <div className="flex items-center gap-2 text-sm text-slate-500">

              <TrendingUp className="h-4 w-4 text-green-600"/>

              Opportunity

            </div>

            <div className="mt-3 text-3xl font-bold text-green-600">

              {summary.opportunities.length}

            </div>

            <div className="text-xs text-slate-500">

              Actionable insights

            </div>

          </div>

          <div className="rounded-xl border p-4">

            <div className="flex items-center gap-2 text-sm text-slate-500">

              <Lightbulb className="h-4 w-4 text-yellow-500"/>

              Next Action

            </div>

            <div className="mt-3 text-sm font-medium leading-6">

              {summary.opportunities[0] ?? "-"}

            </div>

          </div>

        </div>

        {/* Executive Summary */}

        <div className="rounded-2xl bg-gradient-to-r from-violet-50 via-blue-50 to-cyan-50 p-6">

          <div className="flex items-center gap-2">

            <Sparkles className="h-5 w-5 text-violet-600"/>

            <span className="font-semibold">

              Executive Insight

            </span>

          </div>

          <p className="mt-4 leading-8 text-slate-700">

            {summary.overview}

          </p>

        </div>

        {/* Opportunities */}

        <div className="rounded-2xl border p-6">

          <h3 className="font-semibold">

            Priority Recommendations

          </h3>

          <div className="mt-5 space-y-3">

            {summary.opportunities
              .slice(0,5)
              .map((item,index)=>(

                <div
                  key={index}
                  className="flex gap-3"
                >

                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 text-emerald-600"
                  />

                  <p className="text-sm leading-7 text-slate-600">

                    {item}

                  </p>

                </div>

              ))}

          </div>

        </div>

      </div>

    </CardShell>

  );

}