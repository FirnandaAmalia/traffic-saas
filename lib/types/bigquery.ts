export interface GSCBigQueryRow {
  date?: string | null;
  query?: string | null;
  page?: string | null;
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

export interface GA4BigQueryRow {
  date?: string | null;
  pagePath?: string | null;
  deviceCategory?: string | null;
  sessions?: number;
  engagementRate?: number;
  pageViews?: number;
  bounceRate?: number;
}