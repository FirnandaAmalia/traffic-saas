import { BigQuery } from "@google-cloud/bigquery";
import type {
  GSCBigQueryRow,
  GA4BigQueryRow,
} from "./types/bigquery";

export const bigquery = new BigQuery({
  projectId: process.env.BIGQUERY_PROJECT_ID,
  credentials: {
    client_email: process.env.BIGQUERY_CLIENT_EMAIL,
    private_key: process.env.BIGQUERY_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

export async function writeGSCToBigQuery(
  tenantId: string,
  siteUrl: string,
  rows: GSCBigQueryRow[]
) {
  const table = bigquery
    .dataset("raw_data")
    .table("gsc_search_analytics");

  const formatted = rows.map((row) => ({
    tenant_id: tenantId,
    site_url: siteUrl,
    query: row.query || "",
    page: row.page || "",
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
    date_fetched: new Date().toISOString().split("T")[0],
  }));

  if (formatted.length > 0) {
    try {
  await table.insert(formatted);
} catch (error) {
  console.error("BigQuery Insert Error:", error);
  throw error;
}
  }

  return formatted.length;
}

export async function writeGA4ToBigQuery(
  tenantId: string,
  rows: GA4BigQueryRow[]
) {
  const table = bigquery
    .dataset("raw_data")
    .table("ga4_page_metrics");

  const formatted = rows.map((row) => ({
    tenant_id: tenantId,
    page_path:
  row.pagePath || "",

device_category:
  row.deviceCategory || "",

sessions:
  row.sessions || 0,

engagement_rate:
  row.engagementRate || 0,

page_views:
  row.pageViews || 0,

bounce_rate:
  row.bounceRate || 0,
    date_fetched: new Date().toISOString().split("T")[0],
  }));

  if (formatted.length > 0) {
  try {
    await table.insert(formatted);
  } catch (error) {
    console.error(
      "BigQuery Insert Error:",
      error
    );
    throw error;
  }
}

  return formatted.length;
}