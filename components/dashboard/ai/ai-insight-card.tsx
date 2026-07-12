import {
  Lightbulb,
  Sparkles,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import CardShell from "../layout/card-shell";

import ProFeature from "@/components/billing/pro-feature";

import {
  FEATURES,
  hasFeature,
} from "@/lib/features";

import {
  PLANS,
} from "@/lib/plan";

import type {
  AIInsight,
} from "@/lib/ai/insight-engine";

interface AIInsightCardProps {
  insights: AIInsight[];
}

export default function AIInsightCard({
  insights,
}: AIInsightCardProps) {

  // sementara hardcode
  const plan = PLANS.FREE;

  const canUseAI = hasFeature(
    plan,
    FEATURES.AI_DASHBOARD
  );

  const getIcon = (
    type: AIInsight["type"]
  ) => {
    switch (type) {
      case "success":
        return (
          <TrendingUp className="mt-1 h-5 w-5 text-emerald-600" />
        );

      case "warning":
        return (
          <TriangleAlert className="mt-1 h-5 w-5 text-amber-500" />
        );

      default:
        return (
          <Lightbulb className="mt-1 h-5 w-5 text-blue-600" />
        );
    }
  };

  return (
    <ProFeature
      locked={!canUseAI}
      title="AI Insight"
      description="Unlock AI-generated recommendations and executive insights."
    >
      <CardShell
        title={
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-600" />
            AI Insight
          </div>
        }
        description="Automatic analysis based on Google Search Console and Google Analytics."
      >
        <div className="space-y-5">

          {insights.length === 0 ? (

            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">

              <Sparkles className="mx-auto mb-3 h-8 w-8 text-slate-400" />

              <p className="font-medium text-slate-700">
                No insights available.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Synchronize your latest Search Console and Google Analytics data to generate AI insights.
              </p>

            </div>

          ) : (

            insights.map((insight, index) => (

              <div
                key={index}
                className="flex gap-3"
              >

                {getIcon(insight.type)}

                <div>

                  <p className="font-medium text-slate-900">
                    {insight.title}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {insight.description}
                  </p>

                </div>

              </div>

            ))

          )}

        </div>
      </CardShell>
    </ProFeature>
  );
}