export interface AIInsight {
  type:
    | "success"
    | "warning"
    | "info";

  title: string;

  description: string;
}

interface InsightInput {
  clicks: number;
  previousClicks: number;

  impressions: number;
  previousImpressions: number;

  ctr: number;
  previousCTR: number;

  users: number;
  previousUsers: number;
}

export function generateInsights({
  clicks,
  previousClicks,
  impressions,
  previousImpressions,
  ctr,
  previousCTR,
  users,
  previousUsers,
}: InsightInput): AIInsight[] {
  const insights: AIInsight[] = [];

  if (clicks > previousClicks) {
    insights.push({
      type: "success",
      title: "Organic traffic increased",
      description:
        "Clicks are higher than the previous period, indicating improved search visibility.",
    });
  } else {
    insights.push({
      type: "warning",
      title: "Organic traffic decreased",
      description:
        "Clicks dropped compared to the previous period. Review your top landing pages.",
    });
  }

  if (impressions > previousImpressions) {
    insights.push({
      type: "info",
      title: "Search visibility is growing",
      description:
        "Your pages are appearing more frequently in Google Search results.",
    });
  }

  if (
    impressions > previousImpressions &&
    ctr < previousCTR
  ) {
    insights.push({
      type: "warning",
      title: "CTR opportunity detected",
      description:
        "Impressions increased but CTR decreased. Improve titles and meta descriptions.",
    });
  }

  if (users > previousUsers) {
    insights.push({
      type: "success",
      title: "User acquisition improved",
      description:
        "Google Analytics shows more active users than the previous period.",
    });
  } else {
    insights.push({
      type: "warning",
      title: "User acquisition declined",
      description:
        "Active users decreased compared to the previous period.",
    });
  }

  return insights;
}