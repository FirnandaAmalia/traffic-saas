"use client";


import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";


import type {
  PrioritizedRecommendation,
} from "@/lib/recommendation/prioritizer";



interface Props {

  recommendation:
  PrioritizedRecommendation;

}







function priorityColor(
priority:string
){

switch(priority){

case "critical":

return "bg-red-100 text-red-700";


case "high":

return "bg-orange-100 text-orange-700";


case "medium":

return "bg-yellow-100 text-yellow-700";


default:

return "bg-emerald-100 text-emerald-700";

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
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
transition
hover:-translate-y-1
hover:shadow-xl
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


<div

className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-gradient-to-br
from-indigo-100
to-blue-100
text-2xl
"

>

{recommendation.icon}

</div>



<div>


<h3

className="
text-xl
font-bold
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





<div

className={`

rounded-full

px-3

py-1

text-xs

font-bold

${priorityColor(
recommendation.priority
)}

`}

>

{recommendation.priority.toUpperCase()}


</div>



</div>









{/* AI SCORE GRID */}



<div

className="
mt-8
grid
gap-4
md:grid-cols-4
"

>


<div

className="
rounded-2xl
bg-slate-50
p-4
"

>

<p className="text-xs text-slate-500">

AI Confidence Score

</p>


<p

className={`

mt-2
text-3xl
font-black

${scoreColor(
recommendation.score
)}

`}

>

{recommendation.score}

</p>


</div>







<div

className="
rounded-2xl
bg-slate-50
p-4
"

>


<div className="flex gap-2 items-center">


<CircleDollarSign size={16}/>

<span className="text-xs text-slate-500">

ROI Potential

</span>


</div>


<p className="mt-3 font-bold">

{roiText(
recommendation.roi
)}

</p>


</div>







<div

className="
rounded-2xl
bg-slate-50
p-4
"

>


<div className="flex gap-2 items-center">

<Zap size={16}/>

<span className="text-xs text-slate-500">

Difficulty

</span>

</div>


<p className="mt-3 font-bold">

{recommendation.difficulty}

</p>


</div>








<div

className="
rounded-2xl
bg-slate-50
p-4
"

>


<div className="flex gap-2 items-center">

<CalendarDays size={16}/>

<span className="text-xs text-slate-500">

Timeline

</span>


</div>


<p className="mt-3 font-bold">

{recommendation.estimatedDays}

 Days

</p>


</div>



</div>









{/* AI REASONING */}


<div

className="
mt-8
rounded-2xl
bg-indigo-50
p-5
"

>


<div

className="
flex
items-center
gap-2
font-semibold
text-indigo-900
"

>


<Sparkles size={18}/>


Why AI Recommends This


</div>



<p

className="
mt-3
text-sm
leading-7
text-slate-700
"

>

AI mendeteksi peluang terbesar berdasarkan kombinasi
traffic, ranking, CTR, user behavior, dan potensi ROI.

</p>


</div>









{/* ACTION */}



<div

className="
mt-5
rounded-2xl
bg-blue-50
p-5
"

>


<h4 className="font-bold text-blue-900">

Recommended Action

</h4>


<p

className="
mt-2
text-sm
leading-7
text-slate-700
"

>

{recommendation.recommendation}

</p>


</div>









{/* IMPACT */}


<div

className="
mt-5
rounded-2xl
bg-emerald-50
p-5
"

>


<div

className="
flex
items-center
gap-2
font-bold
text-emerald-900
"

>


<Target size={18}/>

Expected Impact


</div>



<p

className="
mt-2
text-sm
leading-7
text-slate-700
"

>

{recommendation.impact}

</p>


</div>









{/* FOOTER */}



<div

className="
mt-6
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
"

>

{recommendation.category}

</span>





<button

className="
flex
items-center
gap-2
rounded-xl
bg-slate-900
px-5
py-2
text-sm
font-semibold
text-white
transition
hover:bg-black
"

>

View Strategy


<ArrowRight size={16}/>


</button>



</div>





</div>


);

}