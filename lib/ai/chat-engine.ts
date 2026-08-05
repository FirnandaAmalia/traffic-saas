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



  const consultantPrompt =
    buildConsultantPrompt(
      context,
      question
    );



  const intent =
    detectAIIntent(question);



  const previousMessages =
    context.memory?.messages ?? [];




  const t = (

    key:string,

    values?:Record<string,string|number>

  ):string=>{


    const translations:Record<string,string>={


      "title":
      "TrafficSaaS AI Consultant",


      "executiveSummary":
      "Executive Summary",


      "websiteHealth":
      `Website has SEO Health Score {score}/100 with grade {grade}.`,


      "focus":
      "AI found the main focus is {intent}, improving organic visibility and traffic growth.",


      "growthOpportunity.title":
      "Growth Opportunity",


      "impact":
      "Impact",


      "reason":
      "Why this matters",


      "action":
      "Action Plan",


      "result":
      "Expected Result",


      "businessImpact":
      "Business Impact Forecast",


      "potentialClicks":
      "Potential Additional Clicks",


      "potentialUsers":
      "Potential User Growth",


      "conversionOpportunity":
      "Estimated Conversion Opportunity",


      "confidence":
      "AI Confidence",


      "score":
      "Score",


      "level":
      "Level",


      "recommendation":
      "Consultant Recommendation",


      "recommendationText":
      "Based on Google Search Console and Google Analytics 4 data, the next priority is improving keyword opportunities, CTR, and ranking potential pages.",


      "noOpportunity":
      "No optimization opportunities found.",


      "growthOpportunity.quickWin":
      "Quick Win Optimization",


      "growthOpportunity.ctrOpportunity":
      "CTR Optimization Opportunity",


      "growthOpportunity.contentGrowth":
      "Content Growth Opportunity",


      "growthOpportunity.recovery":
      "Traffic Recovery Opportunity",


      "growthOpportunity.maintain":
      "Maintain SEO Performance",


      "growthOpportunity.default":
      "SEO Growth Opportunity",


    };



    let text =
      translations[key] ?? key;



    if(values){

      Object.entries(values).forEach(
        ([k,v])=>{

          text =
          text.replace(
            `{${k}}`,
            String(v)
          );

        }
      );

    }



    return text;

  };





  const answer =
    buildAIResponse({

      context:{
        ...context,

        memory:{
          messages:[
            ...previousMessages,
          ],
        },

      },


      intent,


      // INI YANG TADI HILANG
      t,

    });





  return {


    answer,


    confidence:
      context.confidence?.score ?? 0,


    intent,


    sources:[

      "Google Search Console",

      "Google Analytics 4",

      "SEO Recommendation Engine",

      "Growth Opportunity Engine",

      "Business Impact Model",

      "AI Confidence Model",

    ],


  };


}