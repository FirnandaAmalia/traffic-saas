import {
  getServerSession,
} from "next-auth";

import {
  redirect,
} from "next/navigation";

import {
  authOptions,
} from "@/lib/auth";


import RecommendationCenter
from "@/components/dashboard/ai/recommendation-center";


import {
  UpgradeCard,
} from "@/components/billing/upgrade-card";


import {
  getUserPlan,
} from "@/lib/user-plan";


import {
  loadProjectAIContext,
} from "@/lib/ai/context-loader";


import {
  type DateRange,
} from "@/lib/date-range";


import {
  hasProAccess,
} from "@/lib/feature-access";



interface Props {

  searchParams: Promise<{

    projectId?: string;

    range?: DateRange;

  }>;

}





export default async function AIPage({

searchParams,

}:Props){



const session =
await getServerSession(
authOptions
);



if(
!session?.user?.id ||
!session.refreshToken
){

redirect("/login");

}



const userPlan =
await getUserPlan(
session.user.id
);



const proAccess =
await hasProAccess(
session.user.id
);



const {

projectId,

range="28d",

} =
await searchParams;




/*
|--------------------------------------------------------------------------
| FREE USER
|--------------------------------------------------------------------------
*/

if(!proAccess){


return (

<div className="space-y-10">


<UpgradeCard

title="AI SEO Consultant"

description="
Gunakan AI untuk mendapatkan analisis SEO otomatis, rekomendasi keyword, dan peluang pertumbuhan website.
"

featureList={[

"AI SEO Health Analysis",

"Keyword Opportunity Detection",

"Content Growth Recommendation",

"SEO Strategy Assistant",

"Business Impact Analysis"

]}

/>


</div>

);


}





/*
|--------------------------------------------------------------------------
| PRO USER
|--------------------------------------------------------------------------
*/



const {

project,

ai,

context,

}

=
await loadProjectAIContext({


userId:

session.user.id,


refreshToken:

session.refreshToken,


projectId,


range,


});





if(!project){

redirect("/projects");

}






return (


<div className="space-y-10">


<RecommendationCenter


health={

ai.health

}



business={

ai.business

}



recommendations={

ai.recommendations

}



actionPlan={

ai.actionPlan

}



growthOpportunities={

ai.growthOpportunities

}



context={

context

}



plan={

userPlan

}



/>


</div>


);


}