import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

import {
  getProject,
} from "@/lib/project-service";

import {
  getDashboardData,
} from "@/lib/dashboard-service";

import {
  generateAIInsight,
} from "@/lib/recommendation";

import RecommendationCenter from "@/components/dashboard/ai/recommendation-center";
import MaturityScoreCard from "@/components/dashboard/metrics/maturity-score";

import {
  type DateRange,
} from "@/lib/date-range";

interface Props {

  searchParams: Promise<{

    projectId?: string;

    range?: DateRange;

  }>;

}

export default async function AIPage({

  searchParams,

}: Props) {

  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.refreshToken) {

    redirect("/");

  }

  const {

    projectId,

    range = "28d",

  } = await searchParams;

  if (!projectId) {

    redirect("/projects");

  }

  const project =
    await getProject(
      projectId
    );

  if (!project) {

    redirect("/projects");

  }

  const dashboard =
    await getDashboardData(

      session.refreshToken as string,

      project,

      range

    );

  const ai =
    generateAIInsight({

      clicks:
        dashboard.data.clicks,

      impressions:
        dashboard.data.impressions,

      ctr:
        dashboard.data.clicks /
        dashboard.data.impressions *
        100,

      position: 0,

      queries:
        dashboard.queries,

      pages:
        dashboard.pages,

      users:
        dashboard.ga4.users,

      sessions:
        dashboard.ga4.sessions,

      pageViews:
        dashboard.ga4.pageViews,

      engagementRate:
        dashboard.ga4.engagementRate,

      country:
        dashboard.country,

      trafficAcquisition:
        dashboard.trafficAcquisition,

      deviceCategory:
        dashboard.deviceCategory,

      landingPages:
        dashboard.landingPages,

      topEvents:
        dashboard.topEvents,

      browser:
        dashboard.browser,

    });

  return (

    <div className="space-y-10">

      <RecommendationCenter

        health={ai.health}

        business={ai.business}

        recommendations={
          ai.recommendations
        }

        actionPlan={
          ai.actionPlan
        }

      />

      <MaturityScoreCard

        maturity={
          ai.maturity
        }

      />

    </div>

  );

}