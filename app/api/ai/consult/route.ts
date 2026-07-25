import { NextRequest } from "next/server";

import { openai } from "@/lib/ai/openai-client";

import { buildConsultantPrompt } from "@/lib/ai/consultant";

import type { AIContext } from "@/lib/ai/context-builder";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      context,
      question,
    }: {
      context: AIContext;
      question: string;
    } = body;


    if (!context || !question) {
      return Response.json(
        {
          error: "Context and question are required",
        },
        {
          status: 400,
        },
      );
    }


    /*
    |--------------------------------------------------------------------------
    | BUILD AI CONSULTANT PROMPT
    |--------------------------------------------------------------------------
    */

    const prompt = buildConsultantPrompt(
      context,
      question,
    );


    /*
    |--------------------------------------------------------------------------
    | OPENAI REQUEST
    |--------------------------------------------------------------------------
    */

    const response = await openai.chat.completions.create({

      model: "gpt-5-mini",

      temperature: 0.3,

      messages: [

        {
          role: "system",

          content: `
Anda adalah TrafficSaaS AI Consultant.

Berikan analisis SEO dan business growth
berdasarkan data yang diberikan.

Jangan membuat data baru.
Gunakan bahasa profesional.
`,
        },


        {
          role: "user",

          content: prompt,
        },

      ],

    });


    const answer =
      response.choices[0]?.message?.content ??
      "AI tidak memberikan jawaban.";


    return Response.json({

      success: true,

      answer,

      usage: response.usage,

    });


  } catch (error: unknown) {


    console.error(
      "AI Consultant Error:",
      error,
    );


    return Response.json(

      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown AI error",
      },

      {
        status: 500,
      },

    );

  }
}