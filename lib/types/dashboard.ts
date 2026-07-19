import type {
  GSCRow,
  GSCRawData,
} from "./gsc";

import type {
  GA4History,
  GA4Summary,
  CountryMetric,
  TrafficSourceMetric,
  DeviceCategoryMetric,
  LandingPageMetric,
  EventMetric,
  BrowserMetric,
} from "./ga4";


/*
|--------------------------------------------------------------------------
| Dashboard Summary
|--------------------------------------------------------------------------
*/

export interface DashboardSummary {

  clicks:number;

  previousClicks:number;


  impressions:number;

  previousImpressions:number;


  users:number;

  previousUsers:number;


  sessions:number;

  previousSessions:number;


  pageViews:number;

  previousPageViews:number;


  engagementRate:number;

  previousEngagementRate:number;

}



/*
|--------------------------------------------------------------------------
| Dashboard Data
|--------------------------------------------------------------------------
*/

export interface DashboardData {


  /*
  |--------------------------------------------------------------------------
  | KPI Summary
  |--------------------------------------------------------------------------
  */

  data:DashboardSummary;



  /*
  |--------------------------------------------------------------------------
  | Google Search Console
  |--------------------------------------------------------------------------
  */


  queries:GSCRow[];


  pages:GSCRow[];


  gscHistory:GSCRow[];


  /*
  | Raw data export untuk Excel / Analyst
  */
 
gscRawData:GSCRawData[];
  /*
  |--------------------------------------------------------------------------
  | Google Analytics 4
  |--------------------------------------------------------------------------
  */

  ga4History:GA4History[];

  ga4:GA4Summary;

  country:CountryMetric[];

  trafficAcquisition:TrafficSourceMetric[];

  deviceCategory:DeviceCategoryMetric[];

  landingPages:LandingPageMetric[];

  topEvents:EventMetric[];

  browser:BrowserMetric[];

}