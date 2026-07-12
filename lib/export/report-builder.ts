import type { DashboardData } from "@/lib/types/dashboard";
import type { ExecutiveSummary } from "@/lib/ai/executive-summary";

import type {
  ReportData,
  ReportMetric,
} from "./report-types";

import {
  getDateRange,
  getRangeLabel,
  type DateRange,
} from "@/lib/date-range";

function calculateGrowth(
  current: number,
  previous: number
): number {
  if (previous === 0) {
    return 0;
  }

  return Number(
    (
      ((current - previous) /
        previous) *
      100
    ).toFixed(1)
  );
}

function metric(
  title: string,
  value: number,
  previousValue: number
): ReportMetric {
  return {
    title,
    value,
    previousValue,
    change: calculateGrowth(
      value,
      previousValue
    ),
  };
}

interface BuildReportOptions {
  projectName: string;

  website: string;

  period: DateRange;

  dashboard: DashboardData;

  summary: ExecutiveSummary;
}

export function buildReport({
  projectName,
  website,
  period,
  dashboard,
  summary,
}: BuildReportOptions): ReportData {

  const dateRange =
    getDateRange(period);

  return {
    projectName,

    website,

    generatedAt: new Date(),

    period: {
      label: getRangeLabel(period),
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    },

    summary: {
      seoHealth: summary.seoHealth,
      confidence: summary.confidence,
      overview: summary.overview,
      opportunities:
        summary.opportunities,
    },

    metrics: {
      clicks: metric(
        "Clicks",
        dashboard.data.clicks,
        dashboard.data.previousClicks
      ),

      impressions: metric(
        "Impressions",
        dashboard.data.impressions,
        dashboard.data.previousImpressions
      ),

      users: metric(
        "Users",
        dashboard.data.users,
        dashboard.data.previousUsers
      ),

      sessions: metric(
        "Sessions",
        dashboard.data.sessions,
        dashboard.data.previousSessions
      ),

      pageViews: metric(
        "Page Views",
        dashboard.data.pageViews,
        dashboard.data.previousPageViews
      ),

      engagementRate: metric(
        "Engagement Rate",
        dashboard.data.engagementRate,
        dashboard.data.previousEngagementRate
      ),
    },

    topQueries:
      dashboard.queries,

    topPages:
      dashboard.pages,

    gscHistory:
      dashboard.gscHistory,

    ga4History:
      dashboard.ga4History,
  };
}