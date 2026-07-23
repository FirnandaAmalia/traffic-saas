"use client";


import {
  Calendar,
  Clock,
  Rocket,
  Target,
  CheckCircle2,
  Layers,
} from "lucide-react";


import type {
  ActionPlan,
} from "@/lib/recommendation/action-plan";



interface Props {

  plan: ActionPlan;

}





function phaseStyle(
phase:string
){

switch(phase){

case "Quick Wins":

return "bg-emerald-100 text-emerald-700";


case "Optimization":

return "bg-blue-100 text-blue-700";


case "Growth Strategy":

return "bg-purple-100 text-purple-700";


default:

return "bg-slate-100 text-slate-700";

}

}





function priorityStyle(
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

return "bg-slate-100 text-slate-700";

}

}







export default function ActionPlanCard({

plan,

}:Props){



const grouped =

plan.tasks.reduce(

(acc,item)=>{


if(!acc[item.week]){

acc[item.week]=[];

}


acc[item.week].push(item);


return acc;


},

{} as Record<
number,
typeof plan.tasks
>

);





const totalTasks =
plan.tasks.length;



return (


<section className="space-y-6">





{/* HEADER */}


<div

className="
flex
flex-col
gap-5
lg:flex-row
lg:items-start
lg:justify-between
"

>



<div>


<div

className="
flex
items-center
gap-3
"

>


<div

className="
rounded-2xl
bg-indigo-100
p-3
"

>

<Rocket

className="
text-indigo-600
"

/>

</div>



<div>

<h2

className="
text-2xl
font-bold
"

>

AI Growth Roadmap

</h2>


<p

className="
mt-1
text-slate-500
"

>

Strategic execution plan generated from
SEO opportunities and business impact.

</p>


</div>


</div>


</div>







<div

className="
grid
grid-cols-2
gap-3
"

>


<div

className="
rounded-2xl
bg-blue-50
px-5
py-4
text-center
"

>


<p className="text-xs text-slate-500">

Timeline

</p>


<p className="mt-1 text-xl font-bold text-blue-600">

{plan.totalWeeks}

 Weeks

</p>


</div>




<div

className="
rounded-2xl
bg-emerald-50
px-5
py-4
text-center
"

>


<p className="text-xs text-slate-500">

Tasks

</p>


<p className="mt-1 text-xl font-bold text-emerald-600">

{totalTasks}

 Actions

</p>


</div>



</div>




</div>









{/* ROADMAP */}


<div

className="
space-y-6
"

>


{

Object.entries(grouped).map(

([week,tasks])=>(



<div

key={week}

className="
rounded-3xl
border
bg-white
p-6
shadow-sm
"

>



<div

className="
mb-6
flex
items-center
gap-3
"

>


<div

className="
rounded-xl
bg-indigo-50
p-3
"

>

<Calendar

className="
text-indigo-600
"

/>

</div>


<div>


<h3

className="
text-xl
font-bold
"

>

Week {week}

</h3>


<p

className="
text-sm
text-slate-500
"

>

{tasks.length} strategic actions

</p>


</div>


</div>







<div className="space-y-4">


{

tasks.map((task,index)=>(



<div

key={`${task.title}-${index}`}

className="
rounded-2xl
border
bg-slate-50
p-5
transition
hover:bg-white
hover:shadow-md
"

>



<div

className="
flex
items-start
justify-between
gap-4
"

>



<div>


<h4

className="
font-bold
text-slate-900
"

>

{task.title}

</h4>



<div

className="
mt-3
flex
flex-wrap
gap-2
"

>


<span

className={`
rounded-full
px-3
py-1
text-xs
font-semibold
${phaseStyle(task.phase)}
`}

>

{task.phase}

</span>




<span

className={`
rounded-full
px-3
py-1
text-xs
font-semibold
${priorityStyle(task.priority)}
`}

>

{task.priority}

</span>


</div>



</div>







<div

className="
rounded-xl
bg-white
px-3
py-2
font-bold
shadow-sm
"

>

⭐ {task.roi}/5


</div>


</div>







<p

className="
mt-4
text-sm
leading-7
text-slate-600
"

>

{task.description}

</p>







<div

className="
mt-5
flex
flex-wrap
gap-5
text-xs
text-slate-500
"

>


<span

className="
flex
items-center
gap-1
"

>

<Layers size={14}/>

{task.difficulty}

</span>





<span

className="
flex
items-center
gap-1
"

>

<Clock size={14}/>

{task.estimatedDays} days

</span>





<span

className="
flex
items-center
gap-1
text-emerald-600
"

>

<CheckCircle2 size={14}/>

Recommended

</span>



</div>





</div>



))

}



</div>






</div>



)

)

}



</div>





</section>


);


}