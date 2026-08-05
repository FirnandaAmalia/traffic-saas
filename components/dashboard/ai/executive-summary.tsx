"use client";


import Link from "next/link";

import {
  useLocale,
} from "next-intl";

import {
  Bot,
  Sparkles,
  ShieldCheck,
  Target,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Trophy,
} from "lucide-react";


import CardShell from "../layout/card-shell";


import type {
  ExecutiveSummary,
} from "@/lib/ai/executive-summary";


import {
  FEATURES,
  hasFeature,
} from "@/lib/features";


import {
  type Plan,
} from "@/lib/plan";





interface ExecutiveSummaryProps {

  plan:Plan;

  summary:ExecutiveSummary;

}







function healthColor(

health:ExecutiveSummary["seoHealth"]

){

switch(health){

case "Sangat Baik":

return "bg-emerald-100 text-emerald-700";


case "Baik":

return "bg-blue-100 text-blue-700";


default:

return "bg-amber-100 text-amber-700";


}

}







function trendColor(

trend:ExecutiveSummary["trend"]

){

switch(trend){

case "Growing":

return "bg-emerald-100 text-emerald-700";


case "Declining":

return "bg-red-100 text-red-700";


default:

return "bg-slate-100 text-slate-700";


}

}








export default function ExecutiveSummary({

plan,

summary,

}:ExecutiveSummaryProps){


const locale = useLocale();
const canUseAI = hasFeature(

plan,

FEATURES.AI_DASHBOARD

);








if(!canUseAI){


return (

<CardShell

title={

<div className="flex items-center gap-2">

<Bot className="h-5 w-5 text-violet-600"/>

AI Executive Dashboard

</div>

}

description="Available on Pro Plan"

>


<div

className="
flex
min-h-[420px]
flex-col
items-center
justify-center
text-center
"

>


<div

className="
flex
h-16
w-16
items-center
justify-center
rounded-full
bg-violet-100
"

>

<Lock

className="
h-8
w-8
text-violet-600
"

/>

</div>



<h2

className="
mt-6
text-2xl
font-bold
"

>

Unlock AI Consultant

</h2>


<p

className="
mt-3
max-w-xl
text-slate-500
"

>

AI analyzes SEO performance,
traffic trends, risks,
and growth opportunities.

</p>



<Link

href={`/${locale}/billing`}

className="
mt-8
rounded-xl
bg-violet-600
px-6
py-3
font-semibold
text-white
hover:bg-violet-700
"

>

Upgrade Pro

</Link>



</div>


</CardShell>

);


}









return (


<CardShell

title={

<div className="flex items-center gap-2">

<Bot

className="
h-5
w-5
text-violet-600
"

/>

AI Executive Dashboard

</div>

}

description="AI-powered website growth analysis"

>


<div className="space-y-6">





{/* KPI */}


<div

className="
grid
gap-4
md:grid-cols-2
xl:grid-cols-4
"

>




<div className="rounded-2xl border p-5">

<div className="flex items-center gap-2 text-sm text-slate-500">

<ShieldCheck

size={16}

className="text-emerald-600"

/>

SEO Health

</div>


<div

className={`
mt-4
inline-flex
rounded-full
px-3
py-1
text-sm
font-bold

${healthColor(
summary.seoHealth
)}
`}

>

{summary.seoHealth}

</div>


</div>






<div className="rounded-2xl border p-5">


<div className="flex items-center gap-2 text-sm text-slate-500">

<TrendingUp

size={16}

/>

Growth Trend

</div>


<div

className={`
mt-4
inline-flex
rounded-full
px-3
py-1
text-sm
font-bold

${trendColor(
summary.trend
)}
`}

>

{summary.trend}

</div>


</div>







<div className="rounded-2xl border p-5">


<div className="flex items-center gap-2 text-sm text-slate-500">

<Target size={16}/>

AI Confidence

</div>


<div className="mt-3 text-3xl font-black">

{summary.confidence}%

</div>


</div>








<div className="rounded-2xl border p-5">


<div className="flex items-center gap-2 text-sm text-slate-500">

<Lightbulb size={16}/>

Priority

</div>


<p className="mt-3 text-sm font-semibold leading-6">

{summary.nextPriority}

</p>


</div>




</div>









{/* OVERVIEW */}



<div

className="
rounded-3xl
bg-gradient-to-r
from-violet-50
via-blue-50
to-cyan-50
p-6
"

>


<div className="flex items-center gap-2">


<Sparkles

className="text-violet-600"

/>


<h3 className="font-bold">

AI Executive Insight

</h3>


</div>


<p

className="
mt-4
leading-8
text-slate-700
"

>

{summary.overview}

</p>


</div>









{/* WINS + RISKS */}



<div

className="
grid
gap-5
lg:grid-cols-2
"

>



<div

className="
rounded-2xl
border
p-6
"

>


<h3 className="flex items-center gap-2 font-bold">

<Trophy

size={18}

className="text-emerald-600"

/>

Key Wins

</h3>



<div className="mt-4 space-y-3">


{summary.keyWins.map(

(item,index)=>(


<div

key={index}

className="
flex
gap-3
text-sm
text-slate-600
"

>


<CheckCircle2

size={18}

className="
text-emerald-600
"

/>


{item}


</div>


)

)}


</div>


</div>









<div

className="
rounded-2xl
border
p-6
"

>


<h3 className="flex items-center gap-2 font-bold">

<AlertTriangle

size={18}

className="text-orange-500"

/>

Risks

</h3>



<div className="mt-4 space-y-3">


{

summary.risks.map(

(item,index)=>(


<div

key={index}

className="
flex
gap-3
text-sm
text-slate-600
"

>

<AlertTriangle

size={16}

className="text-orange-500"

/>


{item}


</div>


)

)


}


</div>


</div>



</div>









{/* OPPORTUNITIES */}



<div

className="
rounded-2xl
border
p-6
"

>


<h3 className="font-bold">

Growth Opportunities

</h3>


<div className="mt-5 space-y-3">


{

summary.opportunities
.slice(0,5)
.map(

(item,index)=>(


<div

key={index}

className="
flex
gap-3
text-sm
leading-7
text-slate-600
"

>


<CheckCircle2

className="
mt-1
text-emerald-600
"

size={17}

/>


{item}


</div>


)


)


}


</div>


</div>






</div>


</CardShell>


);


}