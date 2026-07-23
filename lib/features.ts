import {
  PLANS,
  type Plan,
} from "./plan";



/*
|--------------------------------------------------------------------------
| Feature Registry
|--------------------------------------------------------------------------
*/

export const FEATURES = {

  // Dashboard
  DASHBOARD: "DASHBOARD",
  KPI: "KPI",
  PERFORMANCE_TREND: "PERFORMANCE_TREND",
  TOP_KEYWORDS: "TOP_KEYWORDS",
  TOP_PAGES: "TOP_PAGES",
  COUNTRY: "COUNTRY",
  TRAFFIC_ACQUISITION: "TRAFFIC_ACQUISITION",
  DEVICE_CATEGORY: "DEVICE_CATEGORY",
  BROWSER: "BROWSER",
  LANDING_PAGES: "LANDING_PAGES",
  TOP_EVENTS: "TOP_EVENTS",


  // Integration
  GSC: "GSC",
  GA4: "GA4",


  // AI
  AI_DASHBOARD: "AI_DASHBOARD",
  AI_INSIGHT: "AI_INSIGHT",
  AI_RECOMMENDATION: "AI_RECOMMENDATION",


  // Analytics
  COMPARE_DATE: "COMPARE_DATE",


  // Export
  EXPORT_CSV: "EXPORT_CSV",
  EXPORT_PDF: "EXPORT_PDF",
  EXPORT_EXCEL: "EXPORT_EXCEL",


  // Workspace
  UNLIMITED_PROJECT: "UNLIMITED_PROJECT",
  UNLIMITED_WORKSPACE: "UNLIMITED_WORKSPACE",


} as const;




export type Feature =
  typeof FEATURES[keyof typeof FEATURES];





/*
|--------------------------------------------------------------------------
| Permission Matrix
|--------------------------------------------------------------------------
|
| FREE:
| - Dashboard basic
| - GSC
| - GA4
| - CSV Export
|
| PRO:
| - Semua FREE
| - AI
| - Advanced analytics
| - Export premium
| - Unlimited
|
*/


const PERMISSIONS:Record<
  Plan,
  readonly Feature[]
> = {



  [PLANS.FREE]: [


    // Dashboard

    FEATURES.DASHBOARD,

    FEATURES.KPI,

    FEATURES.PERFORMANCE_TREND,

    FEATURES.TOP_KEYWORDS,

    FEATURES.TOP_PAGES,

    FEATURES.COUNTRY,

    FEATURES.TRAFFIC_ACQUISITION,

    FEATURES.DEVICE_CATEGORY,

    FEATURES.BROWSER,

    FEATURES.LANDING_PAGES,

    FEATURES.TOP_EVENTS,



    // Integration

    FEATURES.GSC,

    FEATURES.GA4,



    // Export

    FEATURES.EXPORT_CSV,


  ],






  [PLANS.PRO]: [


    /*
    |--------------------------------------------------------------------------
    | FREE FEATURES
    |--------------------------------------------------------------------------
    */


    FEATURES.DASHBOARD,

    FEATURES.KPI,

    FEATURES.PERFORMANCE_TREND,

    FEATURES.TOP_KEYWORDS,

    FEATURES.TOP_PAGES,

    FEATURES.COUNTRY,

    FEATURES.TRAFFIC_ACQUISITION,

    FEATURES.DEVICE_CATEGORY,

    FEATURES.BROWSER,

    FEATURES.LANDING_PAGES,

    FEATURES.TOP_EVENTS,



    FEATURES.GSC,

    FEATURES.GA4,



    FEATURES.EXPORT_CSV,





    /*
    |--------------------------------------------------------------------------
    | PRO FEATURES
    |--------------------------------------------------------------------------
    */


    FEATURES.AI_DASHBOARD,

    FEATURES.AI_INSIGHT,

    FEATURES.AI_RECOMMENDATION,



    FEATURES.COMPARE_DATE,



    FEATURES.EXPORT_PDF,

    FEATURES.EXPORT_EXCEL,



    FEATURES.UNLIMITED_PROJECT,

    FEATURES.UNLIMITED_WORKSPACE,


  ],


};






/*
|--------------------------------------------------------------------------
| Check Feature Access
|--------------------------------------------------------------------------
*/


export function hasFeature(

  plan:Plan,

  feature:Feature

){


  const permissions =
    PERMISSIONS[plan] ?? [];



  return permissions.includes(
    feature
  );


}






/*
|--------------------------------------------------------------------------
| Get All Features
|--------------------------------------------------------------------------
*/


export function getPlanFeatures(

  plan:Plan

){


  return PERMISSIONS[plan] ?? [];


}