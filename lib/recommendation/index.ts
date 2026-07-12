import {
  calculateHealthScore,
} from "./health-score";

import {
  generateRecommendations,
} from "./recommendation-engine";

import {
  prioritizeRecommendations,
} from "./prioritizer";

import type {
  RecommendationInput,
} from "./recommendation-engine";

import {
  calculateBusinessImpact,
} from "./business-impact";

import {
  generateActionPlan,
} from "./action-plan";

import {
  calculateMaturity,
} from "./maturity-score";

export interface AIInsight {

  health: ReturnType<
    typeof calculateHealthScore
  >;

  recommendations: ReturnType<
    typeof prioritizeRecommendations
  >;

  business: ReturnType<
    typeof calculateBusinessImpact
  >;

  actionPlan: ReturnType<
    typeof generateActionPlan
  >;

  maturity: ReturnType<
    typeof calculateMaturity
    >;

}

export function generateAIInsight(
  data: RecommendationInput
): AIInsight {

  // Generate Recommendation Rules

  const recommendations =
    generateRecommendations(data);

  // Prioritize Recommendation

  const prioritized =
    prioritizeRecommendations(
      recommendations
    );

  const actionPlan =
    generateActionPlan(
     prioritized
   );

  const maturity =
  calculateMaturity(
    data
  );

  // Calculate Website Health

  const health =
    calculateHealthScore(
      recommendations
    );
  
  const business =
  calculateBusinessImpact(
    prioritized
  );

  return {

    health,

    recommendations:
      prioritized,

    business,
    actionPlan,
    maturity,
  };
}