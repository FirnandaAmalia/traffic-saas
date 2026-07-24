import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

import DashboardHeader from "@/components/dashboard/layout/dashboard-header";
import GrowthOverview from "@/components/dashboard/growth/growth-overview";

import ExecutiveDashboard 
from "@/components/dashboard/overview/executive-dashboard";

import {
  generateExecutiveSummary,
} from "@/lib/ai/executive-summary";

import {
  resolveProjectForUser,
} from "@/lib/project-service";

import {
  getCurrentPlan,
} from "@/lib/subscription";

import {
  getDashboardData,
} from "@/lib/dashboard-service";

import {
  formatGSCHistory,
} from "@/lib/formatters/gsc";

import {
  formatGA4History,
} from "@/lib/formatters/ga4";

import {
  calculateCTR,
} from "@/lib/utils";

import {
  getRangeLabel,
  type DateRange,
} from "@/lib/date-range";

import {
 calculateSEOHealthScore
} from "@/lib/ai/seo-health-score";

import {
generateGrowthOpportunity
}
from "@/lib/ai/growth-opportunity";

export const metadata = {
  title: "Dashboard SEO Intelligence | TrafficSaaS",
  description:
    "Pantau performa SEO, trafik organik, Google Search Console, dan Google Analytics dalam satu dashboard.",
};


interface DashboardPageProps {

  searchParams: Promise<{

    projectId?: string;

    range?: DateRange;

  }>;

}

export default async function Dashboard({

  searchParams,

}: DashboardPageProps) {



/*
|--------------------------------------------------------------------------
| Autentikasi User
|--------------------------------------------------------------------------
*/


const session =
await getServerSession(
  authOptions
);



if(
  !session?.user?.id ||
  !session.user.email
){

  redirect("/login");

}





/*
|--------------------------------------------------------------------------
| Parameter Dashboard
|--------------------------------------------------------------------------
*/


const {

  projectId,

  range="28d",

}=await searchParams;



const requestedProjectId =
projectId?.trim() || null;





/*
|--------------------------------------------------------------------------
| Validasi Project User
|--------------------------------------------------------------------------
*/


const project =
await resolveProjectForUser({

  userId:
  session.user.id,

  projectId:
  requestedProjectId,

});





if(
  requestedProjectId &&
  !project
){

return (

<main className="p-10">


<h1 className="text-2xl font-bold text-slate-900">

Proyek Tidak Ditemukan

</h1>



<p className="mt-2 text-slate-500">

Proyek tidak tersedia atau akun Anda
tidak memiliki izin untuk mengakses data tersebut.

</p>


</main>

);

}

if(!project){

redirect("/projects");

}

/*
|--------------------------------------------------------------------------
| Redirect Dashboard Default
|--------------------------------------------------------------------------
*/


if(!requestedProjectId){

redirect(

`/dashboard?projectId=${project.id}&range=${range}`

);

}





/*
|--------------------------------------------------------------------------
| Validasi Integrasi Google
|--------------------------------------------------------------------------
*/


if(!project.gscSiteUrl){

redirect(

`/setup/gsc?projectId=${project.id}`

);

}



if(!project.ga4PropertyId){

redirect(

`/setup/ga4?projectId=${project.id}`

);

}







/*
|--------------------------------------------------------------------------
| Validasi Credential Google
|--------------------------------------------------------------------------
*/


if(!session.refreshToken){

return (

<main className="p-10">


<h1 className="text-2xl font-bold text-slate-900">

Koneksi Google Perlu Diperbarui

</h1>



<p className="mt-2 max-w-xl text-slate-500">

Sesi TrafficSaaS masih aktif,
namun akses Google Analytics dan Search Console
tidak tersedia.

Silakan hubungkan kembali akun Google Anda.

</p>


</main>

);

}





/*
|--------------------------------------------------------------------------
| Subscription
|--------------------------------------------------------------------------
*/


const plan =
await getCurrentPlan(
  session.user.email
);






/*
|--------------------------------------------------------------------------
| Ambil Data Dashboard
|--------------------------------------------------------------------------
*/


const {

data,

queries,

pages,

ga4,

gscHistory,

ga4History,

country,

trafficAcquisition,

deviceCategory,

landingPages,

topEvents,

browser,


}=await getDashboardData(

session.refreshToken,

project,

range

);







/*
|--------------------------------------------------------------------------
| Perhitungan Metric
|--------------------------------------------------------------------------
*/


const clicks =
data.clicks ?? 0;



const impressions =
data.impressions ?? 0;



const ctr =
Number(

calculateCTR(

clicks,

impressions

)

);




const previousCTR =
Number(

calculateCTR(

data.previousClicks,

data.previousImpressions

)

);

/*
|--------------------------------------------------------------------------
| AI Executive Summary
|--------------------------------------------------------------------------
*/


const executiveSummary =

generateExecutiveSummary({

clicks,


previousClicks:

data.previousClicks ?? 0,



impressions,


previousImpressions:

data.previousImpressions ?? 0,



ctr,


previousCTR,



users:

ga4.users ?? 0,



previousUsers:

ga4.previousUsers ?? 0,



sessions:

ga4.sessions ?? 0,



previousSessions:

ga4.previousSessions ?? 0,




queries:

queries ?? [],



pages:

pages ?? [],



landingPages:

landingPages ?? [],



trafficAcquisition:

trafficAcquisition ?? [],



deviceCategory:

deviceCategory ?? [],



country:

country ?? [],



browser:

browser ?? [],


});

const seoHealth =
calculateSEOHealthScore({

clicks,

impressions,

users:ga4.users,

sessions:ga4.sessions,

engagementRate:
ga4.engagementRate,


previousClicks:
data.previousClicks,


previousImpressions:
data.previousImpressions,


previousUsers:
ga4.previousUsers,


previousSessions:
ga4.previousSessions,


ctr,

previousCTR,


});

const growthOpportunities =
generateGrowthOpportunity({

clicks,

previousClicks:
data.previousClicks ?? 0,


impressions,


previousImpressions:
data.previousImpressions ?? 0,


ctr,


previousCTR,


queries:
queries ?? [],


landingPages:
landingPages ?? [],


});

/*
|--------------------------------------------------------------------------
| Format Chart Data
|--------------------------------------------------------------------------
*/


const clicksHistory =

formatGSCHistory(

gscHistory

);



const usersHistory =

formatGA4History(

ga4History,

range

);



const rangeLabel =

getRangeLabel(

range

);

/*
|--------------------------------------------------------------------------
| Render Dashboard
|--------------------------------------------------------------------------
*/
return (

<div className="space-y-6">


<div className="tour-dashboard-header">

<DashboardHeader

projectId={project.id}

range={range}

projectName={project.projectName}

gscSiteUrl={project.gscSiteUrl}

ga4PropertyId={project.ga4PropertyId}

ga4PropertyName={project.ga4PropertyName}

lastSyncedAt={project.lastSyncedAt}

/>

</div>





<div className="tour-performance">

<GrowthOverview

clicks={clicks}

impressions={impressions}

users={ga4.users}

/>

</div>





<div className="tour-ai-insight">

<ExecutiveDashboard

clicks={clicks}

impressions={impressions}

users={ga4.users}

sessions={ga4.sessions}

ctr={ctr}

engagementRate={ga4.engagementRate}

summary={executiveSummary}

healthScore={seoHealth}

growthOpportunities={growthOpportunities}

/>

</div>





</div>

);

}