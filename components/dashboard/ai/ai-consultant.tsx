"use client";

import {
  Sparkles,
  Brain,
  TrendingUp,
  FileSearch,
  Lightbulb,
  Target,
  ShieldCheck,
} from "lucide-react";

import {
  useTranslations,
} from "next-intl";

import type {
  AIContext,
} from "@/lib/ai/context-builder";


interface Props {
  context: AIContext;
}


export default function AIConsultant({
  context,
}: Props) {


const t =
useTranslations("aiConsultant");



type PriorityItem = {

  title:string;

  titleKey?:string;

  priority:string;

  recommendation:string;

  impact?:string;

  reason?:string;

};




const priorities:PriorityItem[] =


context.recommendations.length > 0


?


context.recommendations

.slice(0,3)

.map((item)=>({


title:

item.titleKey

?

t(
`recommendations.titles.${item.titleKey}`
)

:

"-",



titleKey:
item.titleKey,



priority:
item.priority,



recommendation:

item.recommendation ?? "",



impact:

item.impact ?? "",



reason:

item.reason ?? "",



}))


:


context.growthOpportunities

.slice(0,3)

.map((item)=>({


title:

t(
`opportunity.titles.${item.titleKey}`
),



titleKey:

item.titleKey,



priority:

item.priority,



recommendation:

item.action ?? "",



impact:

item.impact ?? "",



reason:

item.reason ?? "",



}));




const topOpportunity =
context.growthOpportunities?.[0];


return (

<section
className="
rounded-3xl
border
border-blue-200
bg-gradient-to-br
from-blue-50
via-white
to-indigo-50
p-6
shadow-sm
space-y-6
"
>


<div className="flex items-center gap-3">

<div
className="
rounded-xl
bg-blue-100
p-3
"
>

<Sparkles
className="
h-5
w-5
text-blue-600
"
/>

</div>


<div>

<h2 className="text-xl font-bold">

{t("title")}

</h2>


<p className="text-sm text-slate-500">

{t("subtitle")}

</p>

</div>


</div>




<div className="space-y-4">


{
priorities.map(
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


<div className="flex justify-between gap-4">


<h3 className="font-bold">

{item.title}

</h3>


<span
className="
rounded-full
bg-blue-100
px-3
py-1
text-xs
font-semibold
text-blue-700
"
>

{item.priority}

</span>


</div>




<p
className="
mt-3
text-sm
text-slate-600
"
>

{item.recommendation}

</p>



{
item.impact && (

<p
className="
mt-2
text-xs
text-emerald-600
"
>

Impact:
{" "}
{item.impact}

</p>

)

}




{
item.reason && (

<p
className="
mt-2
text-xs
text-slate-500
"
>

{item.reason}

</p>

)

}



</div>


)

)

}


</div>




{
topOpportunity && (

<div
className="
rounded-2xl
bg-indigo-50
p-4
"
>

<p className="text-sm font-semibold">

{t("topOpportunity")}

</p>


<p className="mt-1 text-sm">

{
t(
`opportunity.titles.${topOpportunity.titleKey}`
)
}

</p>


</div>

)

}



</section>

);
}