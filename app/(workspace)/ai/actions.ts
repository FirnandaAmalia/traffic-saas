"use server";

import {
  askAI,
} from "@/lib/ai/assistant";

import type {
  DashboardData,
} from "@/lib/types/dashboard";

import type {
  AIInsight,
} from "@/lib/recommendation";

export async function askTrafficAI(

  dashboard: DashboardData,

  ai: AIInsight,

  question: string,

) {

  return askAI(

    dashboard,

    ai,

    question,

  );

}