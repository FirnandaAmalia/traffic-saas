import { buildConsultantPrompt } from "./consultant";

import { detectAIIntent } from "./intent-detector";

import { buildAIResponse } from "./response-builder";

import type { AIContext } from "./context-builder";

export interface AIChatInput {
  context: AIContext;

  question: string;
}

export interface AIChatResponse {
  answer: string;

  confidence: number;

  sources: string[];

  intent?: string;
}

export async function generateAIResponse({
  context,

  question,
}: AIChatInput): Promise<AIChatResponse> {
  /*
  |--------------------------------------------------------------------------
  | BUILD CONSULTANT PROMPT
  |--------------------------------------------------------------------------
  |
  | Prompt tetap dibuat untuk:
  |
  | 1. Future OpenAI integration
  | 2. Audit reasoning
  | 3. Debug AI decision
  |
  */

  const consultantPrompt = buildConsultantPrompt(context, question);

  /*
  |--------------------------------------------------------------------------
  | DETECT USER INTENT
  |--------------------------------------------------------------------------
  |
  | Mengubah pertanyaan user menjadi tujuan analisis.
  |
  | Contoh:
  |
  | "Kenapa traffic turun?"
  |        |
  |        v
  | TRAFFIC_ANALYSIS
  |
  */

  const intent = detectAIIntent(question);

  /*
  |--------------------------------------------------------------------------
  | LOCAL AI REASONING ENGINE
  |--------------------------------------------------------------------------
  |
  | Tidak menggunakan API eksternal.
  |
  | Menggunakan:
  |
  | - SEO Health Score
  | - Recommendation Engine
  | - Growth Opportunity
  | - Business Impact
  | - Confidence Model
  |
  */
const previousMessages =
context.memory?.messages ?? [];

const history =
context.memory?.messages ?? [];

const memorySummary =
previousMessages
.map(
(item)=>
`${item.role}: ${item.content}`
)
.join("\n");

  const answer = buildAIResponse({

  context:{
    ...context,

    memory:{
      messages:[
        ...previousMessages,

      ],
    },

  },


  intent,

});

  /*
  |--------------------------------------------------------------------------
  | FINAL RESPONSE
  |--------------------------------------------------------------------------
  */

  return {
    answer,

    confidence: context.confidence?.score ?? 0,

    intent,

    sources: [
      "Google Search Console",

      "Google Analytics 4",

      "SEO Recommendation Engine",

      "Growth Opportunity Engine",

      "Business Impact Model",

      "AI Confidence Model",
    ],
  };
}
