import type { GSCRow } from "./gsc";

import type {
  GA4History,
  GA4Summary,
  CountryMetric,
  TrafficSourceMetric,
  DeviceCategoryMetric,
  LandingPageMetric,
  EventMetric,
  BrowserMetric,
} from "./ga4";

export interface DashboardSummary {
  clicks: number;
  previousClicks: number;

  impressions: number;
  previousImpressions: number;

  users: number;
  previousUsers: number;

  sessions: number;
  previousSessions: number;

  pageViews: number;
  previousPageViews: number;

  engagementRate: number;
  previousEngagementRate: number;
}

export interface DashboardData {
  data: DashboardSummary;

  queries: GSCRow[];

  pages: GSCRow[];

  gscHistory: GSCRow[];

  ga4History: GA4History[];

  ga4: GA4Summary;

  country: CountryMetric[];

  trafficAcquisition: TrafficSourceMetric[];

  deviceCategory: DeviceCategoryMetric[];

  landingPages: LandingPageMetric[];

  topEvents: EventMetric[];

  browser: BrowserMetric[];
}