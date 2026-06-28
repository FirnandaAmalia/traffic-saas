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
  sessions: number;
  pageViews: number;
  engagementRate: number;
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