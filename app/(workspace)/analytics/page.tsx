import {
  getServerSession,
} from "next-auth";

import {
  redirect,
} from "next/navigation";

import {
  authOptions,
} from "@/lib/auth";

import {
  resolveProjectForUser,
} from "@/lib/project-service";

import {
  getDashboardData,
} from "@/lib/dashboard-service";

import {
  formatGA4History,
} from "@/lib/formatters/ga4";

import TrafficChart from "@/components/charts/TrafficChart";
import AnalyticsGrid from "@/components/dashboard/analytics/analytics-grid";

export default async function AnalyticsPage(){

  const session =
  await getServerSession(
    authOptions
  );


console.log(
  "ANALYTICS SESSION USER",
  session?.user
);


if (
  !session?.user?.id ||
  !session.refreshToken
) {
  redirect("/login");
}



const project =
  await resolveProjectForUser({
    userId: session.user.id,
  });



console.log(
  "ANALYTICS PROJECT RESULT",
  project
);



if (!project) {
  return (
    <div className="p-10">
      Belum ada project
    </div>
  );
}


  const {
  ga4History,
  ga4,
  country,
  trafficAcquisition,
  deviceCategory,
  landingPages,
  topEvents,
  browser,
} =
  await getDashboardData(
    session.refreshToken,
    project,
    "28d"
  );


  const trafficData =
    formatGA4History(
      ga4History,
      "28d"
    );


return (

<div className="space-y-6">


{/* HEADER */}

<div>

<h1
className="
text-3xl
font-bold
"
>
Traffic Analytics
</h1>


<p
className="
mt-2
text-slate-500
"
>
Analyze website traffic, audience behavior, and acquisition channels.
</p>


</div>

{/* TRAFFIC TREND */}

<div
className="
rounded-2xl
border
bg-white
p-6
"
>

<TrafficChart

title="Traffic Trend"

data={trafficData}

dataKey="users"

rangeLabel="Last 28 Days"

/>

</div>


<AnalyticsGrid

users={ga4.users}

sessions={ga4.sessions}

pageViews={ga4.pageViews}

engagementRate={
  ga4.engagementRate
}

country={country}

trafficAcquisition={
  trafficAcquisition
}

deviceCategory={
  deviceCategory
}

landingPages={
  landingPages
}

topEvents={
  topEvents
}

browser={
  browser
}

/>

</div>


)

}
