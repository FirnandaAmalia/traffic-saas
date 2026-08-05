import { getDashboardData } from "@/lib/dashboard-service";

import { generateInsights } from "@/lib/ai/insight-engine";

import {
  generateExecutiveSummary,
} from "@/lib/ai/executive-summary";

import {
  buildReport,
} from "./report-builder";

import type {
  DateRange,
} from "@/lib/date-range";

interface ExportProject {
  projectName: string;
  gscSiteUrl: string | null;
  ga4PropertyId: string | null;
}

interface ExportOptions {
  refreshToken: string;
  project: ExportProject;
  range: DateRange;
}

export async function buildExportReport({
  refreshToken,
  project,
  range,
}: ExportOptions) {
  // ===============================
  // Dashboard
  // ===============================

  const dashboard =
    await getDashboardData(
      refreshToken,
      project,
      range
    );

  // ===============================
  // Metrics
  // ===============================

  const clicks =
    dashboard.data.clicks;

  const impressions =
    dashboard.data.impressions;

  const ctr =
    impressions === 0
      ? 0
      : (clicks /
          impressions) *
        100;

  const previousCTR =
    dashboard.data
      .previousImpressions === 0
      ? 0
      : (dashboard.data
          .previousClicks /
          dashboard.data
            .previousImpressions) *
        100;

  // ===============================
  // AI Insight
  // ===============================

  const insights =
    generateInsights({
      clicks,
      previousClicks:
        dashboard.data
          .previousClicks,

      impressions,

      previousImpressions:
        dashboard.data
          .previousImpressions,

      ctr,

      previousCTR,

      users:
        dashboard.ga4.users,

      previousUsers:
        dashboard.ga4
          .previousUsers,
    });

  // ===============================
  // Executive Summary
  // ===============================

 const executiveSummary =
    generateExecutiveSummary({

      locale: "en",

      clicks,

      previousClicks:
        dashboard.data.previousClicks ?? 0,

      impressions,

      previousImpressions:
        dashboard.data.previousImpressions ?? 0,

      ctr,

      previousCTR,

      users:
        dashboard.ga4.users ?? 0,

      previousUsers:
        dashboard.ga4.previousUsers ?? 0,

      sessions:
        dashboard.ga4.sessions ?? 0,

      previousSessions:
        dashboard.ga4.previousSessions ?? 0,

    });

  // ===============================
  // Report
  // ===============================

  const report =
  buildReport({
    projectName:
      project.projectName,

    website:
      project.gscSiteUrl ?? "",

    period: range,

    dashboard,

    summary:
      executiveSummary,
  });

  return {
    dashboard,

    insights,

    executiveSummary,

    report,
  };
}