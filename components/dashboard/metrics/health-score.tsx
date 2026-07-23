"use client";


import {
  Award,
  TrendingUp,
  Search,
  FileText,
  Smartphone,
  Gauge,
  BarChart3,
  Megaphone,
} from "lucide-react";


import type {
  HealthScore,
} from "@/lib/recommendation/health-score";



interface Props {

  health: HealthScore;

}




function getScoreColor(
score:number
){

if(score >= 90)
return "text-emerald-600";


if(score >= 80)
return "text-sky-600";


if(score >= 70)
return "text-yellow-600";


return "text-red-600";

}





function getStatus(
score:number
){

if(score >=90)

return {
label:"Excellent",
color:"bg-emerald-100 text-emerald-700"
};


if(score >=80)

return {
label:"Good",
color:"bg-sky-100 text-sky-700"
};


if(score >=70)

return {
label:"Needs Optimization",
color:"bg-yellow-100 text-yellow-700"
};


return {
label:"Critical",
color:"bg-red-100 text-red-700"
};

}








function Progress({

value,

}:{
value:number;
}){


return (

<div className="space-y-2">


<div

className="
flex
justify-between
text-xs
text-slate-500
"

>

<span>

Health Score

</span>


<span className="font-semibold">

{value}/100

</span>


</div>



<div

className="
h-2
overflow-hidden
rounded-full
bg-slate-100
"

>


<div

className="
h-full
rounded-full
bg-gradient-to-r
from-sky-500
to-indigo-600
transition-all
"

style={{

width:`${value}%`

}}

/>


</div>


</div>

)

}









export default function HealthScoreCard({

health,

}:Props){



const status =
getStatus(
health.score
);





const categories = [

{
label:"SEO",
value:health.breakdown.seo,
icon:Search,
},

{
label:"Content",
value:health.breakdown.content,
icon:FileText,
},

{
label:"UX",
value:health.breakdown.ux,
icon:Smartphone,
},

{
label:"Performance",
value:health.breakdown.performance,
icon:Gauge,
},

{
label:"Analytics",
value:health.breakdown.analytics,
icon:BarChart3,
},

{
label:"Marketing",
value:health.breakdown.marketing,
icon:Megaphone,
},

];






return (



<section

className="
rounded-3xl
border
border-slate-200
bg-white
p-8
shadow-sm
"

>



{/* HEADER */}



<div

className="
flex
items-start
justify-between
"

>


<div

className="
flex
gap-3
"

>


<div

className="
rounded-2xl
bg-indigo-50
p-3
"

>


<Award

className="
text-indigo-600
"

size={26}

/>


</div>




<div>


<h2

className="
text-2xl
font-bold
"

>

AI Website Health

</h2>


<p

className="
mt-1
text-sm
text-slate-500
"

>

AI evaluation from SEO,
traffic, UX, and analytics signals.

</p>


</div>


</div>






<div

className={`
rounded-full
px-4
py-2
text-sm
font-bold

${status.color}
`}

>

{status.label}

</div>



</div>









<div

className="
mt-8
grid
gap-8
lg:grid-cols-[300px_1fr]
"

>



{/* SCORE */}



<div

className="
rounded-3xl
bg-slate-50
p-8
text-center
"

>


<p

className="
text-sm
text-slate-500
"

>

Overall Website Score

</p>



<div

className={`
mt-4
text-7xl
font-black

${getScoreColor(
health.score
)}
`}

>

{health.grade}

</div>





<div

className="
mt-2
text-4xl
font-bold
"

>

{health.score}

<span

className="
text-xl
text-slate-400
"

>

/100

</span>


</div>




<div className="mt-6">

<Progress

value={
health.score
}

/>

</div>







<div

className="
mt-6
rounded-2xl
bg-white
p-4
text-sm
leading-6
text-slate-600
"

>

{health.summary}

</div>



</div>









{/* BREAKDOWN */}



<div>


<div

className="
mb-6
flex
items-center
gap-2
"

>


<TrendingUp

size={18}

/>


<h3

className="
font-bold
"

>

Category Breakdown

</h3>


</div>







<div

className="
grid
gap-5
md:grid-cols-2
"

>


{

categories.map(
(item)=>(


<div

key={item.label}

className="
rounded-2xl
border
border-slate-100
p-4
"

>


<div

className="
mb-3
flex
items-center
justify-between
"

>


<div

className="
flex
items-center
gap-2
"

>


<item.icon

size={16}

className="text-slate-500"

/>


<span

className="
font-medium
"

>

{item.label}

</span>


</div>




<span

className="
font-bold
"

>

{item.value}

</span>



</div>




<Progress

value={
item.value
}

/>


</div>



)

)

}


</div>



</div>




</div>




</section>



);


}