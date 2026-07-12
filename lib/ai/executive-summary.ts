export interface ExecutiveSummary {
  overview: string;

  seoHealth:
    | "Excellent"
    | "Good"
    | "Needs Attention";

  confidence: number;

  opportunities: string[];
}

interface ExecutiveSummaryInput {
  clicks: number;
  previousClicks: number;

  impressions: number;
  previousImpressions: number;

  ctr: number;
  previousCTR: number;

  users: number;
  previousUsers: number;

  sessions: number;
  previousSessions: number;
}

function growth(
  current: number,
  previous: number
): number {
  if (previous === 0) {
    return 0;
  }

  return (
    ((current - previous) /
      previous) *
    100
  );
}

export function generateExecutiveSummary({
  clicks,
  previousClicks,
  impressions,
  previousImpressions,
  ctr,
  previousCTR,
  users,
  previousUsers,
  sessions,
  previousSessions,
}: ExecutiveSummaryInput): ExecutiveSummary {
  const clicksGrowth = growth(
    clicks,
    previousClicks
  );

  const impressionGrowth = growth(
    impressions,
    previousImpressions
  );

  const usersGrowth = growth(
    users,
    previousUsers
  );

  const sessionGrowth = growth(
    sessions,
    previousSessions
  );

  let overview = "";

  overview += `During the current reporting period, organic clicks ${
    clicksGrowth >= 0
      ? "increased"
      : "decreased"
  } by ${Math.abs(
    clicksGrowth
  ).toFixed(
    1
  )}%, while search impressions ${
    impressionGrowth >= 0
      ? "grew"
      : "declined"
  } by ${Math.abs(
    impressionGrowth
  ).toFixed(1)}%. `;

  if (ctr > previousCTR) {
    overview +=
      "Click-through rate improved, indicating search listings are attracting more users. ";
  } else {
    overview +=
      "Click-through rate declined, suggesting that titles and meta descriptions should be optimized. ";
  }

  overview += `Google Analytics reports that active users ${
    usersGrowth >= 0
      ? "increased"
      : "decreased"
  } by ${Math.abs(
    usersGrowth
  ).toFixed(
    1
  )}%, while sessions ${
    sessionGrowth >= 0
      ? "grew"
      : "declined"
  } by ${Math.abs(
    sessionGrowth
  ).toFixed(1)}%.`;

  const opportunities: string[] = [];

  if (
    impressions >
      previousImpressions &&
    ctr < previousCTR
  ) {
    opportunities.push(
      "Improve title tags and meta descriptions on high-impression pages."
    );
  }

  if (clicks < previousClicks) {
    opportunities.push(
      "Refresh top-performing content that has recently lost traffic."
    );
  }

  if (users < previousUsers) {
    opportunities.push(
      "Analyze landing pages with declining user engagement."
    );
  }

  if (sessions < previousSessions) {
    opportunities.push(
      "Strengthen internal linking to increase page exploration."
    );
  }

  if (
    opportunities.length === 0
  ) {
    opportunities.push(
      "Website performance is stable. Continue publishing quality content consistently."
    );
  }

  let score = 100;

  if (clicksGrowth < 0)
    score -= 25;

  if (
    impressionGrowth < 0
  )
    score -= 15;

  if (ctr < previousCTR)
    score -= 15;

  if (usersGrowth < 0)
    score -= 25;

  if (sessionGrowth < 0)
    score -= 20;

  score = Math.max(
    40,
    Math.min(100, score)
  );

  let seoHealth:
    | "Excellent"
    | "Good"
    | "Needs Attention";

  if (score >= 85) {
    seoHealth =
      "Excellent";
  } else if (
    score >= 65
  ) {
    seoHealth = "Good";
  } else {
    seoHealth =
      "Needs Attention";
  }

  const confidence =
    Math.min(
      98,
      Math.max(
        75,
        90 -
          opportunities.length *
            3
      )
    );

  return {
    overview,
    seoHealth,
    confidence,
    opportunities,
  };
}