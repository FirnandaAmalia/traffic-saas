import type {
  PrioritizedRecommendation,
} from "./prioritizer";

export interface BusinessImpact {

  potentialClicks: number;

  potentialUsers: number;

  potentialConversion: number;

  estimatedWeeks: number;

  roiScore: number;

}

export function calculateBusinessImpact(
  recommendations: PrioritizedRecommendation[]
): BusinessImpact {

  let clicks = 0;

  let users = 0;

  let conversion = 0;

  let days = 0;

  let roi = 0;

  for (const item of recommendations) {

    roi += item.roi;

    days += item.estimatedDays;

    switch (item.id) {

      case "quick-win":

        clicks += 8000;
        users += 3200;
        conversion += 1.2;

        break;

      case "high-impression-low-ctr":

        clicks += 12000;
        users += 4500;
        conversion += 1.5;

        break;

      case "content-decay":

        clicks += 6000;
        users += 2400;
        conversion += 0.8;

        break;

      case "organic-dependency":

        users += 3000;
        conversion += 0.7;

        break;

      case "mobile-first":

        users += 2500;
        conversion += 1.8;

        break;

      case "browser-compatibility":

        conversion += 0.5;

        break;

      case "landing-page":

        clicks += 5000;
        users += 2000;
        conversion += 2.0;

        break;

      case "event-insight":

        conversion += 1.3;

        break;

      case "country-opportunity":

        users += 1800;
        conversion += 0.9;

        break;

    }

  }

  return {

    potentialClicks:
      Math.round(clicks),

    potentialUsers:
      Math.round(users),

    potentialConversion:
      Number(
        conversion.toFixed(1)
      ),

    estimatedWeeks:
      Math.ceil(days / 7),

    roiScore:
      Math.round(
        roi /
          Math.max(
            recommendations.length,
            1
          )
      ),

  };

}