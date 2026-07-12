import type {
  DashboardData,
} from "@/lib/types/dashboard";

import type {
  AIInsight,
} from "@/lib/recommendation";

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

  recommendations: {

    title: string;

    priority: string;

    recommendation: string;

  }[];

  queries: string[];

  pages: string[];

  trafficSources: string[];

  countries: string[];

  devices: string[];

  browsers: string[];

  events: string[];

}

export function buildAIContext(

  dashboard: DashboardData,

  ai: AIInsight,

): AIContext {

  return {

    websiteHealth: {

      score:
        ai.health.score,

      grade:
        ai.health.grade,

    },

    business: {

      clicks:
        ai.business.potentialClicks,

      users:
        ai.business.potentialUsers,

      conversion:
        ai.business.potentialConversion,

    },

    maturity: {

      score:
        ai.maturity.overall,

      level:
        ai.maturity.level,

    },

    recommendations:

      ai.recommendations

        .slice(0, 8)

        .map(r => ({

          title:
            r.title,

          priority:
            r.priority,

          recommendation:
            r.recommendation,

        })),

    queries:

      dashboard.queries

        .slice(0, 10)

        .map(

          q =>

            q.keys?.[0] ??

            ""

        ),

    pages:

      dashboard.pages

        .slice(0, 10)

        .map(

          p =>

            p.keys?.[0] ??

            ""

        ),

    trafficSources:

      dashboard.trafficAcquisition

        .slice(0, 8)

        .map(

          t =>

            `${t.channel} (${t.sessions})`

        ),

    countries:

      dashboard.country

        .slice(0, 8)

        .map(

          c =>

            `${c.country} (${c.users})`

        ),

    devices:

      dashboard.deviceCategory

        .slice(0, 8)

        .map(

          d =>

            `${d.device} (${d.users})`

        ),

    browsers:

      dashboard.browser

        .slice(0, 8)

        .map(

          b =>

            `${b.browser} (${b.users})`

        ),

    events:

      dashboard.topEvents

        .slice(0, 8)

        .map(

          e =>

            `${e.event} (${e.count})`

        ),

  };

}