"use client";

import {
  TrendingUp,
  Users,
  DollarSign,
  CalendarClock,
  Star,
  Rocket,
  Target,
  Info,
} from "lucide-react";

import {
  useTranslations,
} from "next-intl";

import type {
  BusinessImpact,
} from "@/lib/recommendation/business-impact";


interface Props {
  business: BusinessImpact;
}



function Stars({
  value,
}:{
  value:number;
}) {

  const stars =
    Math.round(value / 20);


  return (
    <div className="flex gap-1">

      {Array.from({
        length:5,
      }).map((_,i)=>(

        <Star
          key={i}
          size={18}
          className={
            i < stars
            ? "fill-yellow-400 text-yellow-400"
            : "text-slate-300"
          }
        />

      ))}

    </div>
  );

}





function StatCard({

icon,
title,
value,
description,

}:{
icon:React.ReactNode;
title:string;
value:React.ReactNode;
description:string;

}){


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
hover:shadow-md
"
>


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
bg-blue-50
p-3
text-blue-600
"
>

{icon}

</div>


<div>

<p
className="
text-sm
text-slate-500
"
>

{title}

</p>


<h3
className="
mt-1
text-3xl
font-black
text-slate-900
"
>

{value}

</h3>


</div>


</div>


<p
className="
mt-4
text-xs
leading-5
text-slate-500
"
>

{description}

</p>


</div>

);

}






export default function BusinessImpactCard({

business,

}:Props){


const t =
useTranslations("businessImpact");



return (

<section
className="
space-y-6
"
>


{/* HEADER */}


<div
className="
flex
items-center
justify-between
"
>


<div>


<div
className="
flex
items-center
gap-2
"
>


<Rocket
className="text-indigo-600"
/>


<h2
className="
text-2xl
font-bold
"
>

{t("title")}

</h2>


</div>



<p
className="
mt-2
text-slate-500
"
>

{t("description")}

</p>


</div>





<div
className="
rounded-full
bg-indigo-50
px-4
py-2
text-sm
font-semibold
text-indigo-700
"
>

{t("priority")}:

{" "}

{t(
`levels.${business.businessPriority}`
)}

</div>



</div>







{/* DISCLAIMER */}


<div
className="
flex
items-center
gap-2
rounded-2xl
border
border-blue-100
bg-blue-50
p-4
text-sm
text-blue-700
"
>


<Info size={18}/>


<span>

{t("disclaimer")}

</span>


</div>







{/* KPI */}


<div
className="
grid
gap-5
md:grid-cols-2
xl:grid-cols-5
"
>


<StatCard

icon={<TrendingUp size={22}/>}

title={t("metrics.traffic.title")}

value={
"+"+
business.potentialClicks.toLocaleString("id-ID")
}

description={
t("metrics.traffic.description")
}

/>





<StatCard

icon={<Users size={22}/>}

title={
t("metrics.users.title")
}

value={
"+"+
business.potentialUsers.toLocaleString("id-ID")
}

description={
t("metrics.users.description")
}

/>






<StatCard

icon={<DollarSign size={22}/>}

title={
t("metrics.conversion.title")
}

value={
"+"+
business.potentialConversion
+
"%"
}

description={
t("metrics.conversion.description")
}

/>







<StatCard

icon={<CalendarClock size={22}/>}

title={
t("metrics.implementation.title")
}

value={
business.estimatedWeeks
+
" "
+
t("weeks")
}

description={
t("metrics.implementation.description")
}

/>







<StatCard

icon={<Target size={22}/>}

title={
t("metrics.roi.title")
}

value={
<Stars
value={
business.roiScore
}
/>
}

description={
t("metrics.roi.description")
}

/>



</div>









{/* INSIGHT */}


<div
className="
grid
gap-5
lg:grid-cols-2
"
>



<div
className="
rounded-3xl
bg-gradient-to-br
from-indigo-50
to-blue-50
p-6
"
>


<div
className="
flex
items-center
gap-2
font-semibold
"
>


<TrendingUp size={18}/>


{t("traffic.title")}


</div>



<p
className="
mt-4
text-2xl
font-black
text-indigo-700
"
>

{t(
`traffic.levels.${business.trafficGrowth}`
)}

</p>



<p
className="
mt-3
text-sm
leading-6
text-slate-600
"
>

{t("traffic.description")}

</p>


</div>









<div
className="
rounded-3xl
bg-gradient-to-br
from-emerald-50
to-green-50
p-6
"
>


<div
className="
flex
items-center
gap-2
font-semibold
"
>


<Target size={18}/>


{t("revenue.title")}


</div>





<p
className="
mt-4
text-lg
font-bold
text-emerald-700
"
>


{t(
`revenue.levels.${business.revenueOpportunity}`
)}


</p>





<p
className="
mt-3
text-sm
leading-6
text-slate-600
"
>

{t("revenue.description")}

</p>



</div>



</div>



</section>

);

}