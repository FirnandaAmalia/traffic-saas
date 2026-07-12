import OpenAI from "openai";

import {
  buildAIContext,
} from "./context-builder";

import {
  buildConsultantPrompt,
} from "./consultant";

import type {
  DashboardData,
} from "@/lib/types/dashboard";

import type {
  AIInsight,
} from "@/lib/recommendation";

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "OPENAI_API_KEY is missing."
  );
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function askAI(

  dashboard: DashboardData,

  ai: AIInsight,

  question: string,

) {

  const context =
    buildAIContext(

      dashboard,

      ai,

    );

  const prompt =
    buildConsultantPrompt(

      context,

      question,

    );

  const completion =
    await openai.chat.completions.create({

      model: process.env.OPENAI_MODEL ?? "gpt-5",
      temperature: 0.2,
      messages: [

        {

          role: "system",

          content:
            "You are TrafficSaaS AI.",

        },

        {

          role: "user",

          content: prompt,

        },

      ],

    });

  return (
    completion.choices[0]
      ?.message
      ?.content ??
    "No response."
  );

}