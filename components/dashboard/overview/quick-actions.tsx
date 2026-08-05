"use client";

import Link from "next/link";

import {
  Search,
  Brain,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import {
  useTranslations,
} from "next-intl";



const actions = [

{
key:"keyword",

href:"/keywords",

icon:Search,

color:
"bg-blue-50 text-blue-600",

},


{
key:"landing",

href:"/analytics",

icon:TrendingUp,

color:
"bg-emerald-50 text-emerald-600",

},


{
key:"ai",

href:"/ai",

icon:Brain,

color:
"bg-indigo-50 text-indigo-600",

},


];





export default function QuickActions(){


const t =
useTranslations("dashboard.quickActions");



return (

<section

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"

>


{/* HEADER */}

<div>


<div

className="
flex
items-center
gap-2
"

>


<h2

className="
text-lg
font-black
text-slate-900
"

>

{t("title")}

</h2>




<span

className="
flex
items-center
gap-1
rounded-full
bg-violet-100
px-3
py-1
text-[10px]
font-bold
text-violet-700
"

>


<Sparkles size={11}/>


{t("badge")}


</span>



</div>





<p

className="
mt-2
text-sm
text-slate-500
"

>

{t("subtitle")}

</p>



</div>








{/* CARDS */}


<div

className="
mt-6
grid
gap-4
md:grid-cols-2
xl:grid-cols-3
"

>



{

actions.map((action)=>(


<Link

key={action.key}

href={action.href}

className="
group
relative
overflow-hidden
rounded-2xl
border
border-slate-200
bg-white
p-5
transition-all
duration-300
hover:-translate-y-1
hover:border-blue-200
hover:shadow-xl
"

>



<div

className="
flex
items-start
justify-between
"

>



<div

className={`
flex
h-12
w-12
items-center
justify-center
rounded-2xl
${action.color}
transition
group-hover:scale-110
`}

>


<action.icon

className="
h-6
w-6
"

/>


</div>





<div

className="
rounded-full
bg-slate-50
px-3
py-1
text-[10px]
font-semibold
text-slate-500
"

>


{t(`items.${action.key}.impact`)}


</div>



</div>







<h3

className="
mt-5
text-sm
font-bold
text-slate-900
"

>


{t(`items.${action.key}.title`)}


</h3>







<p

className="
mt-2
text-xs
leading-relaxed
text-slate-500
"

>


{t(`items.${action.key}.description`)}


</p>







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
text-xs
font-semibold
text-blue-600
"

>


{t("view")}


</span>






<ArrowRight

className="
h-4
w-4
text-slate-300
transition-all
group-hover:translate-x-1
group-hover:text-blue-600
"

/>



</div>







</Link>


))


}



</div>






</section>


);


}