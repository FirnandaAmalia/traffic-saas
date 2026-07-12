"use client";
import ProFeature from "@/components/billing/pro-feature";

import {
  FEATURES,
  hasFeature,
} from "@/lib/features";

import {
  PLANS,
} from "@/lib/plan";
import HealthScoreCard from "../metrics/health-score";
import RecommendationCard from "./recommendation-card";

import type {
  AIInsight,
} from "@/lib/recommendation";

import BusinessImpactCard from "./business-impact";

import ActionPlanCard from "./action-plan";
import actionPlan from "./action-plan";

interface Props {

  health: AIInsight["health"];

  recommendations:
    AIInsight["recommendations"];

   business:
    AIInsight["business"];

  actionPlan:
    AIInsight["actionPlan"];

}

export default function RecommendationCenter({

  health,

  recommendations,

  business,

  actionPlan,

}: Props) {

  const plan = PLANS.FREE;

const canUseRecommendation = hasFeature(
  plan,
  FEATURES.AI_RECOMMENDATION
);

  return (
  <ProFeature
    locked={!canUseRecommendation}
    title="AI Recommendation"
    description="Unlock AI-powered recommendations, health analysis, business impact, and action plans."
  >
    <section className="space-y-8">

      <HealthScoreCard
        health={health}
      />

      <BusinessImpactCard
        business={business}
      />

      <ActionPlanCard
        plan={actionPlan}
      />

      <div>

        <div className="mb-5">

          <h2 className="text-2xl font-bold">
            AI Recommendations
          </h2>

          <p className="text-slate-500">
            Prioritized opportunities generated
            from Google Search Console &
            Google Analytics.
          </p>

        </div>

        <div className="grid gap-5">

          {recommendations.map((item) => (
            <RecommendationCard
              key={item.id}
              recommendation={item}
            />
          ))}

        </div>

      </div>

    </section>
  </ProFeature>
);

}