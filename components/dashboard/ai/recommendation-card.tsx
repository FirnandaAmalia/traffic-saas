"use client";

import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CircleDollarSign,
  FileText,
  Search,
  Smartphone,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";


import type {
  PrioritizedRecommendation,
} from "@/lib/recommendation/prioritizer";



interface Props {

  recommendation:
  PrioritizedRecommendation;

}





const ICON_MAP = {

  analytics: BarChart3,

  growth: TrendingUp,

  target: Target,

  keyword: Search,

  content: FileText,

  mobile: Smartphone,

};





function RecommendationIcon({

  icon,

}:{

  icon:string;

}){


const Icon =
ICON_MAP[
icon as keyof typeof ICON_MAP
]
??
BarChart3;



return (

<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-xl
bg-blue-50
text-blue-600
"

>

<Icon

className="
h-6
w-6
"

/>

</div>

);


}







function priorityColor(
priority:string
){

switch(priority){

case "critical":

return "bg-red-50 text-red-700";


case "high":

return "bg-orange-50 text-orange-700";


case "medium":

return "bg-yellow-50 text-yellow-700";


default:

return "bg-emerald-50 text-emerald-700";

}

}







function scoreColor(
score:number
){

if(score>=90)

return "text-emerald-600";


if(score>=80)

return "text-blue-600";


if(score>=70)

return "text-yellow-600";


return "text-red-600";

}








function roiText(
roi:number
){

if(roi>=5)

return "Excellent";


if(roi>=4)

return "High";


if(roi>=2)

return "Medium";


return "Low";

}









export default function RecommendationCard({

recommendation,

}:Props){



return (


<div

className="
rounded-2xl
border
border-slate-200
bg-white
p-5
shadow-sm
transition
hover:shadow-md
"

>





{/* HEADER */}


<div

className="
flex
items-start
justify-between
gap-5
"

>


<div

className="
flex
gap-4
"

>


<RecommendationIcon

icon={
recommendation.icon
}

/>



<div>


<h3

className="
text-lg
font-bold
text-slate-900
"

>

{recommendation.title}

</h3>



<p

className="
mt-2
text-sm
leading-6
text-slate-500
"

>

{recommendation.description}

</p>



</div>


</div>







<span

className={`

rounded-full

px-3

py-1

text-xs

font-semibold

${priorityColor(
recommendation.priority
)}

`}

>

{
recommendation.priority.toUpperCase()
}


</span>



</div>









{/* METRICS */}



<div

className="
mt-6
grid
gap-3
md:grid-cols-4
"

>



<div

className="
rounded-xl
bg-slate-50
p-4
"

>

<p className="
text-xs
text-slate-500
">

Confidence Score

</p>


<p

className={`

mt-2

text-2xl

font-black

${scoreColor(
recommendation.score
)}

`}

>

{
recommendation.score
}

</p>


</div>







<div

className="
rounded-xl
bg-slate-50
p-4
"

>


<div className="
flex
items-center
gap-2
"
>

<CircleDollarSign
size={15}
/>

<span className="
text-xs
text-slate-500
">

ROI Potential

</span>

</div>


<p className="
mt-3
font-bold
text-slate-900
">

{
roiText(
recommendation.roi
)
}

</p>


</div>









<div

className="
rounded-xl
bg-slate-50
p-4
"

>


<div className="
flex
items-center
gap-2
"
>

<Zap
size={15}
/>


<span className="
text-xs
text-slate-500
">

Difficulty

</span>


</div>


<p className="
mt-3
font-bold
text-slate-900
">

{
recommendation.difficulty
}

</p>


</div>









<div

className="
rounded-xl
bg-slate-50
p-4
"

>


<div className="
flex
items-center
gap-2
"
>

<CalendarDays
size={15}
/>


<span className="
text-xs
text-slate-500
">

Timeline

</span>


</div>



<p className="
mt-3
font-bold
text-slate-900
">

{
recommendation.estimatedDays
}

 Days

</p>


</div>





</div>









{/* ANALYSIS */}



<div

className="
mt-6
rounded-xl
bg-slate-50
p-5
"

>


<h4

className="
font-semibold
text-slate-900
"

>

Analysis Summary

</h4>


<p

className="
mt-3
text-sm
leading-6
text-slate-600
"

>

Rekomendasi berdasarkan performa trafik,
ranking keyword, CTR, user behavior,
dan peluang peningkatan website.

</p>


</div>









{/* ACTION */}



<div

className="
mt-4
rounded-xl
bg-blue-50
p-5
"

>


<h4

className="
font-semibold
text-blue-900
"

>

Recommended Action

</h4>


<p

className="
mt-2
text-sm
leading-6
text-slate-700
"

>

{
recommendation.recommendation
}

</p>


</div>









{/* IMPACT */}



<div

className="
mt-4
rounded-xl
bg-emerald-50
p-5
"

>


<h4

className="
font-semibold
text-emerald-900
"

>

Expected Impact

</h4>


<p

className="
mt-2
text-sm
leading-6
text-slate-700
"

>

{
recommendation.impact
}

</p>


</div>









{/* FOOTER */}



<div

className="
mt-5
flex
items-center
justify-between
"

>


<span

className="
rounded-full
bg-slate-100
px-3
py-1
text-xs
font-semibold
text-slate-600
"

>

{
recommendation.category
}

</span>





<button

className="
flex
items-center
gap-2
rounded-lg
bg-slate-900
px-4
py-2
text-sm
font-semibold
text-white
transition
hover:bg-slate-800
"

>

View Details


<ArrowRight

size={16}

/>


</button>



</div>





</div>


);

}