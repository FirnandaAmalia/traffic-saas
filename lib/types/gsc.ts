export interface GSCRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

export interface GSCSite {
  siteUrl: string;
  permissionLevel: string;
}

export interface GSCSummary {
  clicks: number;
  impressions: number;
  previousClicks: number;
  previousImpressions: number;
}