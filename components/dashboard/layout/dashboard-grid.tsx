import {
  Users,
  Activity,
  FileText,
  Gauge,
} from "lucide-react";


import PerformanceSection from "../analytics/performance-section";

import CountrySection from "../analytics/country-section";
import TrafficAcquisition from "../analytics/traffic-acquisition";
import DeviceCategory from "../analytics/device-category";

import BrowserSection from "./browser-section";

import LandingPages from "../analytics/landing-pages";
import TopEvents from "../analytics/top-events";

import StatCard from "../metrics/stat-card";


import type {
  Plan,
} from "@/lib/plan";


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
  getTranslations,
} from "next-intl/server";



interface ClickHistoryPoint {

  date:string;

  clicks:number;

  impressions:number;

}



interface UserHistoryPoint {

  date:string;

  users:number;

  sessions:number;

}





interface DashboardGridProps {


plan:Plan;


clicksHistory:ClickHistoryPoint[];

usersHistory:UserHistoryPoint[];


clicks:number;

impressions:number;


previousClicks:number;

previousImpressions:number;



users:number;

sessions:number;

pageViews:number;

engagementRate:number;


rangeLabel:string;



queries:GSCRow[];

pages:GSCRow[];



country:CountryMetric[];


trafficAcquisition:
TrafficSourceMetric[];


deviceCategory:
DeviceCategoryMetric[];


browser:
BrowserMetric[];


landingPages:
LandingPageMetric[];


topEvents:
EventMetric[];

}


export default async function DashboardGrid({

plan,

clicksHistory,

usersHistory,

clicks,

impressions,

users,

sessions,

pageViews,

engagementRate,

rangeLabel,

queries,

pages,

country,

trafficAcquisition,

deviceCategory,

browser,

landingPages,

topEvents,

}:DashboardGridProps){


const t =
await getTranslations("dashboard");

return (

<div

className="
w-full
space-y-5
"

>





{/* =====================
 PERFORMANCE
===================== */}


<PerformanceSection

clicksHistory={clicksHistory}

usersHistory={usersHistory}

clicks={clicks}

impressions={impressions}

users={users}

sessions={sessions}

rangeLabel={rangeLabel}

queries={queries}

pages={pages}

/>









{/* =====================
 KPI
===================== */}


<div

className="
grid
gap-5
sm:grid-cols-2
xl:grid-cols-4
"

>

<StatCard

title={
t("metrics.users")
}

value={
users.toLocaleString("id-ID")
}

icon={Users}

iconColor="text-blue-600"

/>





<StatCard

title={
t("metrics.sessions")
}

value={
sessions.toLocaleString("id-ID")
}

icon={Activity}

iconColor="text-emerald-600"

/>





<StatCard

title={
t("metrics.pageViews")
}

value={
pageViews.toLocaleString("id-ID")
}

icon={FileText}

iconColor="text-rose-600"

/>





<StatCard

title={
t("metrics.engagement")
}

value={
`${(engagementRate * 100).toFixed(2)}%`
}

icon={Gauge}

iconColor="text-amber-600"

/>


</div>









{/* =====================
 ANALYTICS SECTION
===================== */}


<div

className="
grid
gap-5
items-start
xl:grid-cols-12
"

>





{/* COUNTRY */}


<div

className="
min-w-0
xl:col-span-5
"

>

<CountrySection

country={country}

title={
t("analytics.sections.country")
}

description={
t("analytics.sections.countryDescription")
}

actionLabel={
t("analytics.sections.viewAll")
}

/>


</div>








{/* RIGHT STACK */}


<div

className="
grid
gap-5
min-w-0
xl:col-span-7
"

>


<div

className="
min-w-0
"

>

<TrafficAcquisition

data={trafficAcquisition}

title={
t("analytics.sections.acquisition")
}

subtitle={
t("analytics.traffic.subtitle")
}

empty={
t("analytics.traffic.empty")
}

sessionLabel={
t("analytics.traffic.session")
}

labels={{

organicSearch:
t("analytics.acquisition.labels.organicSearch"),

direct:
t("analytics.acquisition.labels.direct"),

referral:
t("analytics.acquisition.labels.referral"),

organicSocial:
t("analytics.acquisition.labels.organicSocial"),

email:
t("analytics.acquisition.labels.email"),

}}

/>


</div>






<div

className="
min-w-0
"

>

<DeviceCategory

data={deviceCategory}

title={
t("analytics.sections.device")
}

subtitle={
t("analytics.deviceSubtitle")
}

/>

</div>



</div>






</div>









{/* =====================
 TECHNOLOGY
===================== */}


<div

className="
grid
items-start
gap-5
xl:grid-cols-3
"

>


<div

className="
min-w-0
"

>


<BrowserSection

data={browser}

title={
t("analytics.sections.browser")
}

/>


</div>







<div

className="
min-w-0
"

>

<LandingPages

data={landingPages}

title={
t("analytics.sections.landingPages")
}

/>


</div>







<div

className="
min-w-0
"

>


<TopEvents

data={topEvents}

title={
t("analytics.sections.events")
}

/>


</div>





</div>







</div>


);


}