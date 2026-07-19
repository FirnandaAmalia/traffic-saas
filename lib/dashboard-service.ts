import {
  createOAuthClient,
  createSearchConsoleClient,
  createGA4Client,
} from "./google/client";

import {
  getSearchConsoleSummaryWithClient,
  getTopQueriesWithClient,
  getTopPagesWithClient,
  getSearchConsoleHistoryWithClient,
  fetchGSCRawDataWithClient,
} from "./google/gsc";

import {
  getGA4SummaryWithClient,
  getGA4HistoryWithClient,
  getActiveUsersByCountryWithClient,
  getTrafficAcquisitionWithClient,
  getDeviceCategoryWithClient,
  getLandingPagesWithClient,
  getTopEventsWithClient,
  getBrowserWithClient,
} from "./google/ga4";

import type {
  DashboardData,
} from "./types/dashboard";

import {
  DEFAULT_DATE_RANGE,
  type DateRange,
} from "@/lib/date-range";

export async function getDashboardData(
  refreshToken: string,
  project: {
    gscSiteUrl: string | null;
    ga4PropertyId: string | null;
  },
  range: DateRange = DEFAULT_DATE_RANGE
): Promise<DashboardData> {

  // ===================================================
  // Validate Project
  // ===================================================

  if (!project.gscSiteUrl) {
    throw new Error(
      "Google Search Console belum terhubung."
    );
  }

  if (!project.ga4PropertyId) {
    throw new Error(
      "Google Analytics belum terhubung."
    );
  }

  // ===================================================
  // Shared OAuth Client
  // ===================================================

  if (!refreshToken) {
  throw new Error(
    "Refresh token tidak ditemukan."
  );
}

  const auth =
    createOAuthClient(refreshToken);

  // ===================================================
  // Shared Google Clients
  // ===================================================

  const searchConsole =
    createSearchConsoleClient(auth);

  const analytics =
    createGA4Client(auth);

  // ===================================================
  // Parallel Fetch
  // ===================================================

const [
  gscSummary,
  queries,
  pages,
  ga4Summary,
  gscHistory,
  gscRawData,
  ga4History,
  country,
  trafficAcquisition,
  deviceCategory,
  landingPages,
  topEvents,
  browser,
] = await Promise.all([
  getSearchConsoleSummaryWithClient(
    searchConsole,
    project.gscSiteUrl,
    range
  ),

  getTopQueriesWithClient(
    searchConsole,
    project.gscSiteUrl,
    range
  ),

  getTopPagesWithClient(
    searchConsole,
    project.gscSiteUrl,
    range
  ),

  getGA4SummaryWithClient(
    analytics,
    project.ga4PropertyId,
    range
  ),

  getSearchConsoleHistoryWithClient(
  searchConsole,
  project.gscSiteUrl,
  range
),


fetchGSCRawDataWithClient(
  searchConsole,
  project.gscSiteUrl,
  range
),


getGA4HistoryWithClient(
  analytics,
  project.ga4PropertyId,
  range
),

  getActiveUsersByCountryWithClient(
    analytics,
    project.ga4PropertyId,
    range
  ),

  getTrafficAcquisitionWithClient(
  analytics,
  project.ga4PropertyId,
  range
),

  getDeviceCategoryWithClient(
  analytics,
  project.ga4PropertyId,
  range
),

getLandingPagesWithClient(
  analytics,
  project.ga4PropertyId,
  range
),

getTopEventsWithClient(
  analytics,
  project.ga4PropertyId,
  range
),

  getBrowserWithClient(
    analytics,
    project.ga4PropertyId,
    range
  ),

]);

 return {

data:{
  ...gscSummary,
  ...ga4Summary,
},

queries,

pages,

gscHistory,

gscRawData,

ga4History,

ga4: ga4Summary,

country,

trafficAcquisition,

deviceCategory,

landingPages,

topEvents,

browser,

};

}