import type { GSCRow } from "@/lib/types/gsc";
import type { GA4History } from "@/lib/types/ga4";

export interface ReportMetric {
  title: string;

  value: number;

  previousValue: number;

  change: number;
}

export interface ReportSummary {
  seoHealth: string;

  confidence: number;

  overview: string;

  opportunities: string[];
}

export interface ReportPeriod {
  label: string;

  startDate: string;

  endDate: string;
}

export interface ReportData {
  website: string;

  projectName: string;

  generatedAt: Date;

  period: ReportPeriod;

  summary: ReportSummary;

  metrics: {
    clicks: ReportMetric;

    impressions: ReportMetric;

    users: ReportMetric;

    sessions: ReportMetric;

    pageViews: ReportMetric;

    engagementRate: ReportMetric;
  };

  topQueries: GSCRow[];
  topPages: GSCRow[];
  gscHistory: GSCRow[];
  ga4History: GA4History[];
}