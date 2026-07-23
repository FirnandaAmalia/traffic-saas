"use client";


import ProFeature from "@/components/billing/pro-feature";


import {
  FEATURES,
  hasFeature,
} from "@/lib/features";


import {
  PLANS,
  type Plan,
} from "@/lib/plan";


import HealthScoreCard
from "../metrics/health-score";


import RecommendationCard
from "./recommendation-card";


import BusinessImpactCard
from "./business-impact";


import ActionPlanCard
from "./action-plan";


import AIConsultant
from "./ai-consultant";


import type {
  AIInsight,
} from "@/lib/recommendation";


import type {
  AIContext,
} from "@/lib/ai/context-builder";

import ConsultantChat
from "./consultant-chat";



interface Props {


health:
AIInsight["health"];


recommendations:
AIInsight["recommendations"];


business:
AIInsight["business"];


actionPlan:
AIInsight["actionPlan"];


growthOpportunities:
AIInsight["growthOpportunities"];


context:
AIContext;


plan?:Plan;

}






export default function RecommendationCenter({

health,

recommendations,

business,

actionPlan,

growthOpportunities,

context,

plan = PLANS.FREE,

}:Props){





const canUseRecommendation =

hasFeature(

plan,

FEATURES.AI_RECOMMENDATION

);





const critical =
recommendations.filter(

item =>
item.priority==="critical"

);



const high =
recommendations.filter(

item =>
item.priority==="high"

);



const technical =
recommendations.filter(

item =>

item.category==="Performance"

);



const content =
recommendations.filter(

item =>

item.category==="Content"

);






function renderGroup(

title:string,

description:string,

items:typeof recommendations

){


if(!items.length)
return null;



return (

<div className="space-y-4">


<div>

<h3 className="text-xl font-bold">

{title}

</h3>


<p className="text-sm text-slate-500">

{description}

</p>


</div>





<div className="grid gap-5">


{

items.map(item=>(


<RecommendationCard

key={item.id}

recommendation={item}

/>


))

}


</div>


</div>

);

}









return (


<ProFeature


locked={!canUseRecommendation}


title="AI SEO Consultant"


description="AI-powered SEO intelligence, growth prediction, and business optimization."

>



<section className="space-y-10">






{/* HEALTH */}

<HealthScoreCard

health={health}

/>







{/* BUSINESS FORECAST */}

<BusinessImpactCard

business={business}

/>







{/* AI CHAT CONSULTANT */}

<AIConsultant
context={context}
/>


<ConsultantChat
context={context}
/>







{/* ACTION PLAN */}

<ActionPlanCard

plan={actionPlan}

/>









<div className="space-y-8">



<div>


<h2 className="text-3xl font-bold">

AI Growth Intelligence

</h2>


<p className="mt-2 text-slate-500">

Analisis peluang SEO berdasarkan Google Search Console dan Google Analytics.

</p>


</div>










{/* GROWTH OPPORTUNITY */}



{

growthOpportunities.length > 0 && (

<div

className="
rounded-3xl
border
border-blue-100
bg-gradient-to-br
from-blue-50
to-white
p-6
"

>



<div className="flex items-center justify-between">


<h3 className="text-xl font-bold text-blue-900">

🚀 Growth Opportunities

</h3>


<span className="text-sm text-blue-600">

AI Prediction

</span>


</div>






<div className="mt-5 space-y-4">


{

growthOpportunities.map(

(item,index)=>(


<div

key={index}

className="
rounded-2xl
border
bg-white
p-5
"

>



<div className="flex justify-between">


<h4 className="font-bold">

{item.title}

</h4>


<span className="
rounded-full
bg-blue-100
px-3
py-1
text-xs
font-semibold
text-blue-700
">

{item.priority}

</span>


</div>





<p className="mt-2 text-sm text-slate-600">

{item.estimatedImpact}

</p>





<p className="mt-3 text-sm">

<strong>Alasan:</strong>

{" "}

{item.reason}

</p>





<p className="mt-2 text-sm">

<strong>Aksi:</strong>

{" "}

{item.action}

</p>





<div className="mt-3 flex gap-4 text-xs text-slate-500">


<span>

Impact:
{item.impact}

</span>


<span>

Confidence:
{item.confidence}%

</span>



</div>





</div>


)

)


}


</div>



</div>

)

}









{/* RECOMMENDATION GROUP */}



{renderGroup(

"🚨 Priority Issues",

"Masalah dengan dampak bisnis terbesar.",

critical

)}







{renderGroup(

"⚡ Quick Wins",

"Peluang optimasi dengan implementasi cepat.",

high

)}







{renderGroup(

"📝 Content Growth",

"Peningkatan performa melalui strategi konten.",

content

)}







{renderGroup(

"🔧 Technical Improvements",

"Optimasi teknis website dan user experience.",

technical

)}










{

recommendations.length===0 &&

growthOpportunities.length===0 &&

(

<div

className="
rounded-3xl
border
bg-slate-50
p-10
text-center
"

>


<h3 className="font-bold text-lg">

Website dalam kondisi optimal 🎉

</h3>



<p className="mt-2 text-sm text-slate-500">

AI belum menemukan peluang optimasi berdasarkan data terbaru.

</p>


</div>


)

}





</div>







</section>



</ProFeature>


);


}