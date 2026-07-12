import type {
  Recommendation,
} from "./recommendation-engine";

export interface PrioritizedRecommendation
  extends Recommendation {

  roi: number;

  difficulty:
    | "Easy"
    | "Medium"
    | "Hard";

  estimatedDays: number;

}

export function prioritizeRecommendations(
  recommendations: Recommendation[]
): PrioritizedRecommendation[] {

  return recommendations

    .map((item) => {

      let roi = 3;

      let difficulty:
        | "Easy"
        | "Medium"
        | "Hard" = "Medium";

      let estimatedDays = 5;

      switch (item.id) {

        case "quick-win":

          roi = 5;
          difficulty = "Easy";
          estimatedDays = 2;

          break;

        case "high-impression-low-ctr":

          roi = 5;
          difficulty = "Easy";
          estimatedDays = 2;

          break;

        case "content-decay":

          roi = 4;
          difficulty = "Medium";
          estimatedDays = 5;

          break;

        case "organic-dependency":

          roi = 4;
          difficulty = "Hard";
          estimatedDays = 30;

          break;

        case "mobile-first":

          roi = 5;
          difficulty = "Medium";
          estimatedDays = 7;

          break;

        case "browser-compatibility":

          roi = 3;
          difficulty = "Easy";
          estimatedDays = 2;

          break;

        case "landing-page":

          roi = 5;
          difficulty = "Medium";
          estimatedDays = 5;

          break;

        case "event-insight":

          roi = 3;
          difficulty = "Easy";
          estimatedDays = 1;

          break;

        case "country-opportunity":

          roi = 3;
          difficulty = "Hard";
          estimatedDays = 30;

          break;

      }

      return {

        ...item,

        roi,

        difficulty,

        estimatedDays,

      };

    })

    .sort((a, b) => {

      if (b.roi !== a.roi)
        return b.roi - a.roi;

      return b.score - a.score;

    });

}