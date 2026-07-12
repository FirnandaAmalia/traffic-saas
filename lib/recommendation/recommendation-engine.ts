import type {
  GSCRow,
} from "@/lib/types/gsc";

import type {
  CountryMetric,
  TrafficSourceMetric,
  DeviceCategoryMetric,
  LandingPageMetric,
  EventMetric,
  BrowserMetric,
} from "@/lib/types/ga4";

import {
  quickWinRule,
} from "./rules/quick-win";

import {
  contentDecayRule,
} from "./rules/content-decay";

import {
  highImpressionLowCTRRule,
} from "./rules/high-impression-low-ctr";

import {
  organicDependencyRule,
} from "./rules/organic-dependency";

import {
  mobileFirstRule,
} from "./rules/mobile-first";

import {
  browserCompatibilityRule,
} from "./rules/browser-compatibility";

import {
  landingPageOptimizationRule,
} from "./rules/landing-page-optimization";

import {
  eventInsightRule,
} from "./rules/event-insight";

import {
  countryOpportunityRule,
} from "./rules/country-opportunity";

export interface RecommendationInput {

  // ===========================
  // GSC
  // ===========================

  clicks: number;
  impressions: number;
  ctr: number;
  position: number;

  queries: GSCRow[];
  pages: GSCRow[];

  // ===========================
  // GA4
  // ===========================

  users: number;
  sessions: number;
  pageViews: number;
  engagementRate: number;

  country: CountryMetric[];

  trafficAcquisition: TrafficSourceMetric[];

  deviceCategory: DeviceCategoryMetric[];

  landingPages: LandingPageMetric[];

  topEvents: EventMetric[];

  browser: BrowserMetric[];
}

export type RecommendationPriority =
  | "critical"
  | "high"
  | "medium"
  | "low";

export interface Recommendation {

  id: string;

  priority: RecommendationPriority;

  score: number;

  title: string;

  description: string;

  recommendation: string;

  impact: string;

  category:
    | "SEO"
    | "Content"
    | "UX"
    | "Performance"
    | "Conversion"
    | "Marketing"
    | "Analytics";

  icon: string;
}

export function generateRecommendations(
  data: RecommendationInput
): Recommendation[] {

  const recommendations: Recommendation[] = [];

  recommendations.push(
  ...quickWinRule(data),
);
  
recommendations.push(

  ...quickWinRule(data),

  ...highImpressionLowCTRRule(data),

  ...contentDecayRule(data),

  ...organicDependencyRule(data),

   ...mobileFirstRule(data),

   ...browserCompatibilityRule(data),

   ...landingPageOptimizationRule(data),

    ...eventInsightRule(data),

    ...countryOpportunityRule(data),
);

  // ===================================================
  // Sort by Score
  // ===================================================

  return recommendations.sort(
    (a, b) => b.score - a.score
  );
}