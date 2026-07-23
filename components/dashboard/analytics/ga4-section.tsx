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






export default function GA4Section({

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

title="Pengguna Aktif"

value={
users.toLocaleString("id-ID")
}

icon={Users}

iconColor="text-blue-600"

/>

<StatCard

title="Sesi Kunjungan"

value={
sessions.toLocaleString("id-ID")
}

icon={Activity}

iconColor="text-green-600"

/>

<StatCard

title="Tayangan Halaman"

value={
pageViews.toLocaleString("id-ID")
}

icon={FileText}

iconColor="text-red-600"

/>

<StatCard

title="Tingkat Keterlibatan"

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


<CountrySection

country={country}

/>


</div>









<div

className="
col-span-12
xl:col-span-4
"

>


<TrafficAcquisition


data={
trafficAcquisition
}


/>


</div>









<div

className="
col-span-12
xl:col-span-4
"

>


<DeviceCategory


data={
deviceCategory
}


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


/>


</div>









</div>







</section>



);


}