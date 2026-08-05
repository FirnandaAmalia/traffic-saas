import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  getLocale,
  getTranslations,
} from "next-intl/server";


import { authOptions } from "@/lib/auth";


import DashboardHeader from "@/components/dashboard/layout/dashboard-header";
import GrowthOverview from "@/components/dashboard/growth/growth-overview";
import ExecutiveDashboard from "@/components/dashboard/overview/executive-dashboard";


import { generateExecutiveSummary } from "@/lib/ai/executive-summary";
import { calculateSEOHealthScore } from "@/lib/ai/seo-health-score";
import { generateGrowthOpportunity } from "@/lib/ai/growth-opportunity";


import {
  resolveProjectForUser,
} from "@/lib/project-service";


import {
  getDashboardData,
} from "@/lib/dashboard-service";


import {
  calculateCTR,
} from "@/lib/utils";


import type {
  DateRange,
} from "@/lib/date-range";



export const dynamic = "force-dynamic";



interface DashboardPageProps {

  searchParams: Promise<{

    projectId?: string;

    range?: DateRange;

  }>;

}





export default async function Dashboard({

searchParams,

}:DashboardPageProps){



const locale =
await getLocale();



const t =
await getTranslations("dashboard");




const session =
await getServerSession(authOptions);




if(
!session?.user?.id ||
!session.user.email
){

redirect(
`/${locale}/login`
);

}





const {

projectId,

range="28d"

}

=
await searchParams;






const project =
await resolveProjectForUser({

userId:
session.user.id,


projectId:
projectId ?? null,

});





if(!project){

redirect(
`/${locale}/projects`
);

}






if(!projectId){

redirect(
`/${locale}/dashboard?projectId=${project.id}&range=${range}`
);

}







if(!project.gscSiteUrl){

redirect(
`/${locale}/setup/gsc?projectId=${project.id}`
);

}






if(!project.ga4PropertyId){

redirect(
`/${locale}/setup/ga4?projectId=${project.id}`
);

}







if(!session.refreshToken){


return (

<div className="p-10">


<h1 className="text-xl font-bold">

{t("google.required")}

</h1>



<p className="mt-2 text-slate-500">

{t("google.description")}

</p>



</div>

);


}









const dashboard =
await getDashboardData(

session.refreshToken,

project,

range

);







const clicks =
dashboard.data.clicks ?? 0;



const impressions =
dashboard.data.impressions ?? 0;






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

dashboard.data.previousClicks ?? 0,

dashboard.data.previousImpressions ?? 0

)

);

const executiveSummary =
generateExecutiveSummary({

locale:
locale as "id" | "en",

clicks,

previousClicks:
dashboard.data.previousClicks ?? 0,


impressions,

previousImpressions:
dashboard.data.previousImpressions ?? 0,


ctr,

previousCTR,


users:
dashboard.ga4.users ?? 0,


previousUsers:
dashboard.ga4.previousUsers ?? 0,


sessions:
dashboard.ga4.sessions ?? 0,


previousSessions:
dashboard.ga4.previousSessions ?? 0,


queries:
dashboard.queries ?? [],


pages:
dashboard.pages ?? [],


landingPages:
dashboard.landingPages ?? [],


});
const seoHealth =
calculateSEOHealthScore({

locale:
locale as "id" | "en",


clicks,


impressions,


users:
dashboard.ga4.users ?? 0,


sessions:
dashboard.ga4.sessions ?? 0,



engagementRate:
dashboard.ga4.engagementRate ?? 0,



previousClicks:
dashboard.data.previousClicks ?? 0,



previousImpressions:
dashboard.data.previousImpressions ?? 0,



previousUsers:
dashboard.ga4.previousUsers ?? 0,



previousSessions:
dashboard.ga4.previousSessions ?? 0,



ctr,


previousCTR,


});

const growthOpportunities =
generateGrowthOpportunity({

locale:
locale as "id" | "en",

clicks,

previousClicks:
dashboard.data.previousClicks ?? 0,

impressions,

previousImpressions:
dashboard.data.previousImpressions ?? 0,

ctr,

previousCTR,

queries:
dashboard.queries ?? [],

landingPages:
dashboard.landingPages ?? [],

});









return (

<div className="space-y-6">





<div className="tour-dashboard-header">


<DashboardHeader

projectId={
project.id
}


range={
range
}



projectName={
project.projectName
}



gscSiteUrl={
project.gscSiteUrl
}



ga4PropertyId={
project.ga4PropertyId
}



ga4PropertyName={
project.ga4PropertyName
}



lastSyncedAt={
project.lastSyncedAt
}


/>


</div>







<div className="tour-performance">


<GrowthOverview


clicks={
clicks
}



impressions={
impressions
}



users={
dashboard.ga4.users
}



/>


</div>








<div className="tour-ai-insight">


<ExecutiveDashboard


clicks={
clicks
}



impressions={
impressions
}



users={
dashboard.ga4.users
}



sessions={
dashboard.ga4.sessions
}



ctr={
ctr
}



engagementRate={
dashboard.ga4.engagementRate
}



summary={
executiveSummary
}



healthScore={
seoHealth
}



growthOpportunities={
growthOpportunities
}



/>


</div>







</div>


);


}