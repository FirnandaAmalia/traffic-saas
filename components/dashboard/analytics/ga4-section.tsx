import {
  Users,
  Activity,
  FileText,
  Gauge,
} from "lucide-react";

import StatCard from "../metrics/stat-card";

import CountrySection from "./country-section";

import TrafficAcquisition from "./traffic-acquisition";

import DeviceCategory from "./device-category";

import BrowserSection from "../layout/browser-section";

import LandingPages from "./landing-pages";

import TopEvents from "./top-events";

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


interface GA4SectionProps {

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


export default async function GA4Section({

  users,
  sessions,
  pageViews,
  engagementRate,
  country,
  trafficAcquisition,
  deviceCategory,
  landingPages,
  topEvents,
  browser,

}:GA4SectionProps){


const t =
await getTranslations("analytics");


return (


<section

className="
space-y-5
"

>





{/* RINGKASAN GOOGLE ANALYTICS */}


<div

className="
grid
grid-cols-1
gap-4
md:grid-cols-2
xl:grid-cols-4
"

>
<StatCard

title={t("cards.users")}

value={
users.toLocaleString("id-ID")
}

icon={Users}

iconColor="text-blue-600"

/>

<StatCard

title={t("cards.sessions")}

value={
sessions.toLocaleString("id-ID")
}

icon={Activity}

iconColor="text-green-600"

/>

<StatCard

title={t("cards.pageViews")}

value={
pageViews.toLocaleString("id-ID")
}

icon={FileText}

iconColor="text-red-600"

/>

<StatCard

title={t("cards.engagement")}

value={
`${(engagementRate * 100).toFixed(2)}%`
}

icon={Gauge}

iconColor="text-yellow-600"

/>

</div>









{/* DETAIL ANALITIK PENGUNJUNG */}


<div

className="
grid
grid-cols-12
gap-4
"

>







{/* BARIS 1 */}




<div

className="
col-span-12
xl:col-span-4
"

>

<div

className="
col-span-12
xl:col-span-4
"

>

<CountrySection

country={country}

title={
  t("sections.country")
}

description={
  t("sections.countryDescription")
}

actionLabel={
  t("sections.viewAll")
}

/>

</div>

</div>









<div

className="
col-span-12
xl:col-span-4
"

>


<TrafficAcquisition

data={trafficAcquisition}

title={
t("sections.acquisition")
}

subtitle={
t("traffic.subtitle")
}

empty={
t("traffic.empty")
}

sessionLabel={
t("traffic.session")
}

labels={{
 organicSearch:
 t("traffic.labels.organicSearch"),

 direct:
 t("traffic.labels.direct"),

 referral:
 t("traffic.labels.referral"),

 organicSocial:
 t("traffic.labels.organicSocial"),

 email:
 t("traffic.labels.email")
}}

/>


</div>









<div

className="
col-span-12
xl:col-span-4
"

>

<DeviceCategory

data={deviceCategory}

title={t("sections.device")}

subtitle={t("device.subtitle")}

/>


</div>













{/* BARIS 2 */}






<div

className="
col-span-12
xl:col-span-4
"

>


<BrowserSection

data={
browser
}

title={
t("sections.browser")
}

/>


</div>









<div

className="
col-span-12
xl:col-span-4
"

>

<LandingPages

data={
landingPages
}

title={
t("sections.landingPages")
}

/>


</div>









<div

className="
col-span-12
xl:col-span-4
"

>

<TopEvents

data={
topEvents
}

title={
t("sections.events")
}

/>


</div>









</div>







</section>



);


}