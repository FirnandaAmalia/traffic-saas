// lib/ai/context-builder.ts


import type { DashboardData } from "@/lib/types/dashboard";

import type { AIInsight } from "@/lib/recommendation";



export interface AIContext {

  websiteHealth: {
    score: number;
    grade: string;
  };


  business: {
    clicks: number;
    users: number;
    conversion: number;
  };


  maturity: {
    score: number;
    level: string;
  };


  confidence: {
    score: number;
    level: string;
    explanation: string[];
  };


  recommendations: {
    title: string;
    priority: string;
    recommendation: string;
    impact?: string;
    reason?: string;
  }[];


  growthOpportunities: {
    title: string;
    type: string;
    impact: string;
    estimatedImpact: string;
    reason: string;
    action: string;
    source: string;
    priority: string;
    confidence: number;
  }[];


  queries: string[];

  pages: string[];

  trafficSources: string[];

  countries: string[];

  devices: string[];

  browsers: string[];

  events: string[];


  memory?: {

    messages:{
      role:string;
      content:string;
    }[];

  };

}

export function buildAIContext(
  dashboard: DashboardData,
  ai: AIInsight,
): AIContext {

  return {

    websiteHealth: {
      score: ai.health.score,
      grade: ai.health.grade,
    },


    business: {
      clicks: ai.business.potentialClicks,
      users: ai.business.potentialUsers,
      conversion: ai.business.potentialConversion,
    },


    maturity: {
      score: ai.maturity.overall,
      level: ai.maturity.level,
    },


    confidence: {
      score: ai.confidence.score,
      level: ai.confidence.level,
      explanation: ai.confidence.explanation,
    },


    recommendations:
      ai.recommendations
        .slice(0, 10)
        .map((item) => ({
          title: item.title,
          priority: item.priority,
          recommendation: item.recommendation,
          impact: item.impact,
          reason: item.reason,
        })),


    growthOpportunities:
      ai.growthOpportunities
        .slice(0, 5)
        .map((item) => ({
          title: item.title,
          type: item.type,
          impact: item.impact,
          estimatedImpact: item.estimatedImpact,
          reason: item.reason,
          action: item.action,
          source: item.source,
          priority: item.priority,
          confidence: item.confidence,
        })),


    queries:
      dashboard.queries?.slice(0,10).map((q)=>`
Keyword:
${q.keys?.[0] ?? "-"}

Clicks:
${q.clicks ?? 0}

Impressions:
${q.impressions ?? 0}

CTR:
${q.ctr ? (q.ctr * 100).toFixed(2) : 0}%

Position:
${q.position ?? "-"}
`) ?? [],


    pages:
      dashboard.pages?.slice(0,10).map((p)=>`
Page:
${p.keys?.[0] ?? "-"}

Clicks:
${p.clicks ?? 0}

Impressions:
${p.impressions ?? 0}
`) ?? [],


    trafficSources:
      dashboard.trafficAcquisition?.slice(0,8).map((t)=>`
Channel:
${t.channel}

Sessions:
${t.sessions}
`) ?? [],


    countries:
      dashboard.country?.slice(0,8).map((c)=>`
Country:
${c.country}

Users:
${c.users}
`) ?? [],


    devices:
      dashboard.deviceCategory?.slice(0,8).map((d)=>`
Device:
${d.device}

Users:
${d.users}
`) ?? [],


    browsers:
      dashboard.browser?.slice(0,8).map((b)=>`
Browser:
${b.browser}

Users:
${b.users}
`) ?? [],


    events:
      dashboard.topEvents?.slice(0,8).map((e)=>`
Event:
${e.event}

Count:
${e.count}
`) ?? [],


    memory:{
      messages:[]
    }

  };

}