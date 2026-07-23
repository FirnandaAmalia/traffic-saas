import GA4Section from "./ga4-section";


import type {
  CountryMetric,
  TrafficSourceMetric,
  DeviceCategoryMetric,
  LandingPageMetric,
  EventMetric,
  BrowserMetric,
} from "@/lib/types/ga4";




interface AnalyticsGridProps {


  users:number;

  sessions:number;

  pageViews:number;

  engagementRate:number;



  country:CountryMetric[];


  trafficAcquisition:
    TrafficSourceMetric[];


  deviceCategory:
    DeviceCategoryMetric[];


  landingPages:
    LandingPageMetric[];


  topEvents:
    EventMetric[];


  browser:
    BrowserMetric[];

}






export default function AnalyticsGrid(

props:Readonly<AnalyticsGridProps>

){


return (


<GA4Section

{...props}

/>


);


}