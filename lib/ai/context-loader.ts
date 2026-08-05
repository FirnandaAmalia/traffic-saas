import { resolveProjectForUser } from "@/lib/project-service";

import { getDashboardData } from "@/lib/dashboard-service";

import { generateAIInsight } from "@/lib/recommendation";

import { buildAIContext } from "./context-builder";

import { DEFAULT_DATE_RANGE } from "@/lib/date-range";

import type { DateRange } from "@/lib/date-range";

import {
  getLatestConversation,
  getConversationHistory,
} from "./memory";

interface LoadAIContextInput {
  userId: string;

  refreshToken: string;

  projectId?: string;

  range?: DateRange;
}

export async function loadProjectAIContext({
  userId,

  refreshToken,

  projectId,

  range = DEFAULT_DATE_RANGE,
}: LoadAIContextInput) {
  const project = await resolveProjectForUser({
    userId,

    projectId,
  });

  if (!project) {
    throw new Error("Project tidak ditemukan");
  }

  const dashboard = await getDashboardData(
    refreshToken,

    project,

    range,
  );

  const ctr =
    dashboard.data.impressions > 0
      ? dashboard.data.clicks / dashboard.data.impressions
      : 0;

  const ai = generateAIInsight({

     locale: "en",

    clicks: dashboard.data.clicks ?? 0,

    impressions: dashboard.data.impressions ?? 0,

    ctr,

    position: 0,

    previousClicks: 0,

    previousImpressions: 0,

    previousCTR: 0,

    previousUsers: 0,

    previousSessions: 0,

    queries: dashboard.queries,

    pages: dashboard.pages,

    users: dashboard.ga4.users ?? 0,

    sessions: dashboard.ga4.sessions ?? 0,

    pageViews: dashboard.ga4.pageViews ?? 0,

    engagementRate: dashboard.ga4.engagementRate ?? 0,

    country: dashboard.country,

    trafficAcquisition: dashboard.trafficAcquisition,

    deviceCategory: dashboard.deviceCategory,

    landingPages: dashboard.landingPages,

    topEvents: dashboard.topEvents,

    browser: dashboard.browser,
  });

  const context = buildAIContext(
    dashboard,

    ai,
  );

  const conversation =
await getLatestConversation({

  userId,

  projectId: project.id,

});


let memory: {
  role: string;
  content: string;
}[] = [];


if(conversation){

  memory =
  await getConversationHistory({

    conversationId:
    conversation.id,

    limit:10,

  });


  memory =
  memory.reverse();

}


  context.memory = {

    messages: memory,

  };


  return {

    project,

    dashboard,

    ai,

    context,

  };

}