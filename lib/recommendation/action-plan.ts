import type {
  PrioritizedRecommendation,
} from "./prioritizer";

export interface ActionTask {

  week: number;

  title: string;

  description: string;

  difficulty: string;

  estimatedDays: number;

  roi: number;

}

export interface ActionPlan {

  tasks: ActionTask[];

}

export function generateActionPlan(
  recommendations: PrioritizedRecommendation[]
): ActionPlan {

  const tasks: ActionTask[] = [];

  let week = 1;

  let currentDays = 0;

  for (const item of recommendations) {

    if (
      currentDays + item.estimatedDays > 7
    ) {

      week++;

      currentDays = 0;

    }

    tasks.push({

      week,

      title: item.title,

      description:
        item.recommendation,

      difficulty:
        item.difficulty,

      estimatedDays:
        item.estimatedDays,

      roi:
        item.roi,

    });

    currentDays +=
      item.estimatedDays;

  }

  return {

    tasks,

  };

}