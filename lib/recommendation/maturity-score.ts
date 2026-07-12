import type {
  RecommendationInput,
} from "./recommendation-engine";

export interface MaturityAssessment {

  overall: number;

  level:
    | "Beginner"
    | "Developing"
    | "Advanced"
    | "Leading";

  dimensions: {

    seo: number;

    analytics: number;

    content: number;

    marketing: number;

    userExperience: number;

    dataDriven: number;

  };

}

export function calculateMaturity(
  data: RecommendationInput
): MaturityAssessment {

  // ==========================
  // SEO
  // ==========================

  let seo = 50;

  if (data.ctr >= 3)
    seo += 20;

  if (data.position <= 10)
    seo += 15;

  if (data.impressions > 100000)
    seo += 15;

  // ==========================
  // Analytics
  // ==========================

  let analytics = 40;

  if (data.topEvents.length >= 5)
    analytics += 20;

  if (data.browser.length >= 3)
    analytics += 20;

  if (data.country.length >= 3)
    analytics += 20;

  // ==========================
  // Content
  // ==========================

  let content = 40;

  if (data.pages.length >= 10)
    content += 30;

  if (data.landingPages.length >= 5)
    content += 30;

  // ==========================
  // Marketing
  // ==========================

  let marketing = 40;

  if (
    data.trafficAcquisition.length >= 5
  )
    marketing += 30;

  if (
    data.country.length >= 5
  )
    marketing += 30;

  // ==========================
  // UX
  // ==========================

  let ux = 50;

  if (
    data.engagementRate >= 0.6
  )
    ux += 30;

  if (
    data.deviceCategory.length >= 3
  )
    ux += 20;

  // ==========================
  // Data Driven
  // ==========================

  let dataDriven = 50;

  if (
    data.browser.length > 0
  )
    dataDriven += 10;

  if (
    data.topEvents.length > 0
  )
    dataDriven += 10;

  if (
    data.country.length > 0
  )
    dataDriven += 10;

  if (
    data.landingPages.length > 0
  )
    dataDriven += 10;

  if (
    data.trafficAcquisition.length > 0
  )
    dataDriven += 10;

  const overall =
    Math.round(

      (
        seo +
        analytics +
        content +
        marketing +
        ux +
        dataDriven
      ) / 6

    );

  let level:
    MaturityAssessment["level"];

  if (overall >= 90)
    level = "Leading";

  else if (overall >= 80)
    level = "Advanced";

  else if (overall >= 65)
    level = "Developing";

  else
    level = "Beginner";

  return {

    overall,

    level,

    dimensions: {

      seo,

      analytics,

      content,

      marketing,

      userExperience: ux,

      dataDriven,

    },

  };

}