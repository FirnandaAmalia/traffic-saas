export interface GSCRow {
  keys?: string[] | null;
  clicks?: number | null;
  impressions?: number | null;
}

export interface GSCSite {
  siteUrl: string;
  permissionLevel: string;
}