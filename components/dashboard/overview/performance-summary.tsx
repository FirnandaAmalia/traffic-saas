"use client";

import {
  TrendingUp,
  TrendingDown,
  MousePointerClick,
  Search,
  Users,
  Activity,
  BarChart3,
} from "lucide-react";

import type React from "react";

import { useTranslations } from "next-intl";


interface PerformanceSummaryProps {

  clicks:number;

  impressions:number;

  users:number;

  sessions:number;

}





function MetricItem({

title,

value,

description,

icon:Icon,

trend,

}:{

title:string;

value:string;

description:string;

icon:React.ElementType;

trend:"up"|"down"|"stable";

}){


const TrendIcon =

trend==="up"

?

TrendingUp

:

trend==="down"

?

TrendingDown

:

BarChart3;



const trendColor =

trend==="up"

?

"text-emerald-600"

:

trend==="down"

?

"text-red-500"

:

"text-slate-500";



return (

<div

className="
rounded-2xl
border
border-slate-100
bg-slate-50
p-5
min-h-[135px]
transition
hover:border-blue-100
hover:bg-white
"

>


<div

className="
flex
items-center
justify-between
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
flex
h-9
w-9
items-center
justify-center
rounded-xl
bg-white
shadow-sm
"

>

<Icon

className="
h-4
w-4
text-blue-600
"

/>

</div>





<div>


<p

className="
text-xs
font-medium
text-slate-500
"

>

{title}

</p>




<p

className="
mt-0.5
text-lg
font-bold
text-slate-900
"

>

{value}

</p>


</div>


</div>





<TrendIcon

className={`
h-4
w-4
${trendColor}
`}

/>


</div>





<p

className="
mt-3
text-xs
leading-relaxed
text-slate-500
"

>

{description}

</p>



</div>


);

}








export default function PerformanceSummary({

clicks,

impressions,

users,

sessions,

}:PerformanceSummaryProps){



const t = useTranslations("dashboard.performance");



return (

<section

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
min-h-[605px]
"

>



<div

className="
flex
items-start
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


<BarChart3

className="
h-5
w-5
text-blue-600
"

/>



<h2

className="
text-lg
font-bold
text-slate-900
"

>

{t("title")}

</h2>


</div>




<p

className="
mt-1
text-sm
text-slate-500
"

>

{t("subtitle")}

</p>


</div>






<span

className="
rounded-full
bg-blue-50
px-3
py-1
text-xs
font-semibold
text-blue-600
"

>

{t("badge")}

</span>




</div>








<div

className="
mt-5
grid
gap-4
sm:grid-cols-2
"

>



<MetricItem


title={t("metrics.clicks.title")}

value={
clicks.toLocaleString()
}


description={
t("metrics.clicks.description")
}


icon={MousePointerClick}


trend="up"


/>







<MetricItem


title={t("metrics.visibility.title")}

value={
impressions.toLocaleString()
}


description={
t("metrics.visibility.description")
}


icon={Search}


trend="up"


/>








<MetricItem


title={t("metrics.users.title")}

value={
users.toLocaleString()
}


description={
t("metrics.users.description")
}


icon={Users}


trend="stable"


/>








<MetricItem


title={t("metrics.sessions.title")}

value={
sessions.toLocaleString()
}


description={
t("metrics.sessions.description")
}


icon={Activity}


trend="stable"


/>


</div>








<div

className="
mt-6
rounded-2xl
bg-blue-50
p-4
"

>


<p

className="
text-xs
font-semibold
text-blue-600
"

>

{t("summary.title")}

</p>




<p

className="
mt-2
text-sm
leading-relaxed
text-slate-600
"

>

{t("summary.description",{
clicks:
clicks.toLocaleString(),

impressions:
impressions.toLocaleString()

})}

</p>



</div>





</section>

);


}