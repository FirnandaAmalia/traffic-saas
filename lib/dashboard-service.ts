import {
  getSearchConsoleSummary,
  getTopQueries,
  getTopPages,
  getSearchConsoleHistory,
} from "./google/gsc";

import {
  getGA4Summary,
  getGA4History,
} from "./google/ga4";

import type { DashboardData } from "./types/dashboard";

export async function getDashboardData(
  refreshToken: string,
  project: {
    gscSiteUrl: string;
    ga4PropertyId: string;
  }
): Promise<DashboardData> {
  
  const [
    data,
    queries,
    pages,
    ga4,
    gscHistory,
    ga4History,
  ] = await Promise.all([
    getSearchConsoleSummary(
      refreshToken,
      project.gscSiteUrl
    ),
    getTopQueries(
      refreshToken,
      project.gscSiteUrl
    ),
    getTopPages(
      refreshToken,
      project.gscSiteUrl
    ),
    getGA4Summary(
      refreshToken,
      project.ga4PropertyId
    ),
    getSearchConsoleHistory(
      refreshToken,
      project.gscSiteUrl
    ),
    getGA4History(
      refreshToken,
      project.ga4PropertyId
    ),
  ]);

  return {
    data,
    queries,
    pages,
    ga4,
    gscHistory,
    ga4History,
  };
}