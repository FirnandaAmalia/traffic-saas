export interface GA4History {
  dimensionValues?: {
    value?: string | null;
  }[] | null;

  metricValues?: {
    value?: string | null;
  }[] | null;
}

export interface GA4Summary {
  users: number;
  previousUsers: number;

  sessions: number;
  previousSessions: number;

  pageViews: number;
  previousPageViews: number;

  engagementRate: number;
  previousEngagementRate: number;
}

export interface GA4Property {
  property: string;
  displayName: string;
}

export interface GA4Account {
  account: string;
  displayName: string;
  propertySummaries?: GA4Property[];
}

export interface CountryMetric {
  country: string;
  users: number;
}

export interface TrafficSourceMetric {
  channel: string;
  sessions: number;
}

export interface DeviceCategoryMetric {
  device: string;
  users: number;
}

export interface LandingPageMetric {
  page: string;
  sessions: number;
}

export interface EventMetric {
  event: string;
  count: number;
}

export interface BrowserMetric {
  browser: string;
  users: number;
}

export interface OperatingSystemMetric {
  os: string;
  users: number;
}
