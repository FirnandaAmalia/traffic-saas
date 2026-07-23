import { calculateHealthScore } from "./health-score";

import { generateRecommendations } from "./recommendation-engine";

import { prioritizeRecommendations } from "./prioritizer";

import type { RecommendationInput } from "./recommendation-engine";

import { calculateBusinessImpact } from "./business-impact";

import { generateActionPlan } from "./action-plan";

import { calculateMaturity } from "./maturity-score";

import {
  generateGrowthOpportunity,
  type GrowthOpportunity,
} from "@/lib/ai/growth-opportunity";

import {
  calculateAIConfidence,
  type AIConfidence,
} from "@/lib/ai/confidence-score";

export interface AIInsight {
  health: ReturnType<typeof calculateHealthScore>;

  recommendations: ReturnType<typeof prioritizeRecommendations>;

  business: ReturnType<typeof calculateBusinessImpact>;

  actionPlan: ReturnType<typeof generateActionPlan>;

  maturity: ReturnType<typeof calculateMaturity>;

  growthOpportunities: GrowthOpportunity[];

  confidence: AIConfidence;
}

export function generateAIInsight(data: RecommendationInput): AIInsight {
  /*
|--------------------------------------------------------------------------
| AI RECOMMENDATION ENGINE
|--------------------------------------------------------------------------
*/

  const recommendations = generateRecommendations(data);

  const prioritized = prioritizeRecommendations(recommendations);

  /*
|--------------------------------------------------------------------------
| ACTION PLAN GENERATOR
|--------------------------------------------------------------------------
*/

  const actionPlan = generateActionPlan(prioritized);

  /*
|--------------------------------------------------------------------------
| WEBSITE INTELLIGENCE
|--------------------------------------------------------------------------
*/

  const maturity = calculateMaturity(data);

  const health = calculateHealthScore(recommendations);

  /*
|--------------------------------------------------------------------------
| BUSINESS FORECAST
|--------------------------------------------------------------------------
*/

  const business = calculateBusinessImpact({
    recommendations: prioritized,

    data,
  });

  /*
|--------------------------------------------------------------------------
| GROWTH OPPORTUNITY
|--------------------------------------------------------------------------
*/

  const growthOpportunities = generateGrowthOpportunity({
    clicks: data.clicks,

    previousClicks: data.previousClicks ?? 0,

    impressions: data.impressions,

    previousImpressions: data.previousImpressions ?? 0,

    ctr: data.ctr,

    previousCTR: data.previousCTR ?? 0,

    users: data.users,

    previousUsers: data.previousUsers ?? 0,

    queries: data.queries,

    landingPages: data.landingPages,
  });

  /*
|--------------------------------------------------------------------------
| AI CONFIDENCE
|--------------------------------------------------------------------------
*/

  const confidence = calculateAIConfidence({
    healthScore: health.score,

    recommendations: prioritized.length,

    growthOpportunities,

    dataPoints:
      data.queries.length +
      data.pages.length +
      data.landingPages.length +
      data.country.length +
      data.topEvents.length,

    hasGSC: data.queries.length > 0,

    hasGA4: data.users > 0 || data.sessions > 0,
  });

  return {
    health,

    recommendations: prioritized,

    business,

    actionPlan,

    maturity,

    growthOpportunities,

    confidence,
  };
}
