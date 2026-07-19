import type { GSCRow } from "@/lib/types/gsc";

import type {
  GA4History,
  CountryMetric,
  TrafficSourceMetric,
  DeviceCategoryMetric,
  LandingPageMetric,
  EventMetric,
  BrowserMetric,
} from "@/lib/types/ga4";

/*
|--------------------------------------------------------------------------
| Basic Metric
|--------------------------------------------------------------------------
*/

export interface ReportMetric {

  title:string;

  value:number;

  previousValue:number;

  change:number | null;

}

/*
|--------------------------------------------------------------------------
| Executive Summary
|--------------------------------------------------------------------------
*/

export interface ReportSummary {
seoHealth:string;

confidence:number;

overview:string;

businessCondition:string;

mainRisk:string;

mainOpportunity:string;

seoWins:string[];

executiveRecommendation:string;

opportunities:string[];

recommendations:string[];

}

/*
|--------------------------------------------------------------------------
| AI Insight Engine
|--------------------------------------------------------------------------
*/

export type InsightPriority =
  | "HIGH"
  | "MEDIUM"
  | "LOW";



export interface SEOInsight {

  title:string;

  description:string;

  priority:InsightPriority;

  impact:string;

  recommendation:string;

}





/*
|--------------------------------------------------------------------------
| SEO Health Score
|--------------------------------------------------------------------------
*/

export interface SEOHealthScore {

score:number;

status:string;

trafficScore:number;

contentScore:number;

visibilityScore:number;

engagementScore:number;

}

/*
|--------------------------------------------------------------------------
| Keyword Opportunity Intelligence
|--------------------------------------------------------------------------
*/
export interface KeywordOpportunity {

keyword:string;

displayKeyword:string;

clicks:number;

impressions:number;

ctr:number;

score:number;

category:
"SAFE"
|
"COMMERCIAL"
|
"INFORMATIONAL"
|
"SENSITIVE";

visibilityStatus:
"HIDDEN"
|
"VISIBLE";

intent:
"TRANSACTIONAL"
|
"INFORMATIONAL"
|
"NAVIGATIONAL"
|
"UNKNOWN";

businessValue:
"HIGH"
|
"MEDIUM"
|
"LOW";

reason:string;

recommendation:string;

opportunity:
"HIGH"
|
"MEDIUM"
|
"LOW";

}

/*
|--------------------------------------------------------------------------
| Content Opportunity
|--------------------------------------------------------------------------
*/

export interface ContentOpportunity {


page:string;


clicks:number;


impressions:number;


ctr:number;


score:number;



issue:string;



impact:string;



recommendation:string;



priority:
"HIGH"
|
"MEDIUM"
|
"LOW";


}

/*
|--------------------------------------------------------------------------
| Opportunity Score
|--------------------------------------------------------------------------
*/

export interface OpportunityScore {

  score:number;

  title:string;

  description:string;

  impact:string;

  priority:
    "HIGH"
    |
    "MEDIUM"
    |
    "LOW";

  recommendation:string;

}





/*
|--------------------------------------------------------------------------
| AI Business Diagnosis
|--------------------------------------------------------------------------
*/

export interface TrafficDiagnosis {

  situation:string;

  strengths:string[];

  weaknesses:string[];

  focus:string[];

}





/*
|--------------------------------------------------------------------------
| 30 Days Growth Roadmap
|--------------------------------------------------------------------------
*/

export interface SEOActionPlan {

  period:string;

  objective:string;

  reason:string;

  tasks:string[];

}





/*
|--------------------------------------------------------------------------
| Reporting Period
|--------------------------------------------------------------------------
*/

export interface ReportPeriod {

  label:string;

  startDate:string;

  endDate:string;

}


export interface ContentInsight {


page:string;


clicks:number;


impressions:number;


ctr:number;


performance:
"TOP_PERFORMER"
|
"CTR_ISSUE"
|
"GROWTH_OPPORTUNITY";


recommendation:string;


}

/*
|--------------------------------------------------------------------------
| Raw Search Console Export
|--------------------------------------------------------------------------
*/


export interface GSCRawData {


date:string;


query:string;


page:string;


clicks:number;


impressions:number;


ctr:number;


position:number;


}

/*
|--------------------------------------------------------------------------
| Main Report Data
|--------------------------------------------------------------------------
*/

export interface ReportData {


website:string;

projectName:string;

generatedAt:Date;

businessImpact:BusinessImpact;

period:ReportPeriod;

summary:ReportSummary;

seoHealthScore:SEOHealthScore;

trafficDiagnosis:TrafficDiagnosis;

aiInsights:SEOInsight[];

actionPlan:SEOActionPlan[];

opportunities:OpportunityScore[];

keywordOpportunities:KeywordOpportunity[];

contentOpportunities:ContentOpportunity[];

metrics:{

clicks:ReportMetric;

impressions:ReportMetric;

users:ReportMetric;

sessions:ReportMetric;

pageViews:ReportMetric;

engagementRate:ReportMetric;

};

topQueries:GSCRow[];

topPages:GSCRow[];

gscHistory:GSCRow[];

gscRawData:GSCRawData[];

ga4History:GA4History[];

country:CountryMetric[];

deviceCategory:DeviceCategoryMetric[];

browser:BrowserMetric[];

trafficAcquisition:TrafficSourceMetric[];

landingPages:LandingPageMetric[];

topEvents:EventMetric[];

}

/*
|--------------------------------------------------------------------------
| Business Impact Intelligence
|--------------------------------------------------------------------------
*/

export interface BusinessImpact {

level:
"HIGH"
|
"MEDIUM"
|
"LOW";


summary:string;


risks:string[];


opportunities:string[];


expectedOutcome:string;

}