import type { PrioritizedRecommendation } from "./prioritizer";

import type { RecommendationPriority } from "./recommendation-engine";

export interface ActionTask {
  week: number;

  phase: "Quick Wins" | "Optimization" | "Growth Strategy";

  title: string;

  description: string;

  difficulty: "Easy" | "Medium" | "Hard";

  estimatedDays: number;

  roi: number;

  priority: RecommendationPriority;
}

export interface ActionPlan {
  tasks: ActionTask[];

  totalWeeks: number;
}

export function generateActionPlan(
  recommendations: PrioritizedRecommendation[],
): ActionPlan {
  if (!recommendations || recommendations.length === 0) {
    return {
      tasks: [
        {
          week: 1,

          phase: "Optimization",

          title: "Monitoring performa website",

          description:
            "Lakukan monitoring SEO, traffic, keyword, dan perilaku pengguna secara berkala untuk menemukan peluang optimasi berikutnya.",

          difficulty: "Easy",

          estimatedDays: 3,

          roi: 3,

          priority: "medium",
        },
      ],

      totalWeeks: 1,
    };
  }

  const tasks: ActionTask[] = [];

  let week = 1;

  let usedDays = 0;

  const priorityWeight = {
    critical: 4,

    high: 3,

    medium: 2,

    low: 1,
  };

  const sorted = [...recommendations].sort((a, b) => {
    const priorityDiff =
      priorityWeight[b.priority] - priorityWeight[a.priority];

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return (b.roi ?? 0) - (a.roi ?? 0);
  });

  for (const item of sorted) {
    const days = Math.max(
      item.estimatedDays ?? 3,

      1,
    );

    if (usedDays + days > 7) {
      week++;

      usedDays = 0;
    }

    let phase: ActionTask["phase"];

    if ((item.roi ?? 0) >= 5 && days <= 3) {
      phase = "Quick Wins";
    } else if (days <= 14) {
      phase = "Optimization";
    } else {
      phase = "Growth Strategy";
    }

    tasks.push({
      week,

      phase,

      title: item.title,

      description: item.recommendation,

      difficulty: item.difficulty ?? "Medium",

      estimatedDays: days,

      roi: item.roi ?? 0,

      priority: item.priority,
    });

    usedDays += days;
  }

  return {
    tasks,

    totalWeeks: Math.max(
      week,

      1,
    ),
  };
}
