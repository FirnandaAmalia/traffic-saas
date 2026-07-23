// lib/ai/confidence-score.ts

import type { GrowthOpportunity } from "./growth-opportunity";

interface ConfidenceInput {
  healthScore: number;

  recommendations: number;

  growthOpportunities: GrowthOpportunity[];

  dataPoints: number;

  hasGSC?: boolean;

  hasGA4?: boolean;
}

export interface AIConfidence {
  score: number;

  level: "High Confidence" | "Medium Confidence" | "Low Confidence";

  explanation: string[];
}

export function calculateAIConfidence({
  healthScore,

  recommendations,

  growthOpportunities,

  dataPoints,

  hasGSC = true,

  hasGA4 = true,
}: ConfidenceInput): AIConfidence {
  let score = 0;

  const explanation: string[] = [];

  /*
|--------------------------------------------------------------------------
| HEALTH SIGNAL
|--------------------------------------------------------------------------
*/

  const healthContribution = healthScore * 0.2;

  score += healthContribution;

  explanation.push(
    `SEO health score memberikan ${Math.round(
      healthContribution,
    )} poin validasi.`,
  );

  /*
|--------------------------------------------------------------------------
| RECOMMENDATION SIGNAL
|--------------------------------------------------------------------------
*/

  const recommendationContribution = Math.min(
    recommendations * 5,

    20,
  );

  score += recommendationContribution;

  if (recommendations > 0) {
    explanation.push(
      `${recommendations} rekomendasi AI ditemukan berdasarkan data website.`,
    );
  }

  /*
|--------------------------------------------------------------------------
| GROWTH OPPORTUNITY QUALITY
|--------------------------------------------------------------------------
*/

  const avgGrowthConfidence =
    growthOpportunities.length > 0
      ? growthOpportunities.reduce(
          (total, item) => total + item.confidence,

          0,
        ) / growthOpportunities.length
      : 0;

  const growthContribution = avgGrowthConfidence * 0.35;

  score += growthContribution;

  if (growthOpportunities.length) {
    explanation.push(
      `${growthOpportunities.length} growth opportunity memiliki confidence rata-rata ${Math.round(avgGrowthConfidence)}%.`,
    );
  }

  /*
|--------------------------------------------------------------------------
| DATA QUALITY
|--------------------------------------------------------------------------
*/

  let dataContribution = 0;

  if (hasGSC) {
    dataContribution += 10;

    explanation.push("Google Search Console tersedia.");
  }

  if (hasGA4) {
    dataContribution += 10;

    explanation.push("Google Analytics tersedia.");
  }

  dataContribution += Math.min(
    dataPoints / 10,

    10,
  );

  score += dataContribution;

  /*
|--------------------------------------------------------------------------
| FINAL SCORE
|--------------------------------------------------------------------------
*/

  const finalScore = Math.round(
    Math.min(
      100,

      Math.max(
        0,

        score,
      ),
    ),
  );

  let level: AIConfidence["level"];

  if (finalScore >= 80) {
    level = "High Confidence";
  } else if (finalScore >= 60) {
    level = "Medium Confidence";
  } else {
    level = "Low Confidence";
  }

  return {
    score: finalScore,

    level,

    explanation,
  };
}
