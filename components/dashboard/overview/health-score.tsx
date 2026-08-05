"use client";

import {
  ShieldCheck,
} from "lucide-react";

import {
  useTranslations,
} from "next-intl";



interface HealthScoreData {

score?: number;

label?: string;

signals?: {

traffic?: number;

visibility?: number;

engagement?: number;

};

strengths?: string[];

issues?: string[];

}





interface HealthScoreProps {

data:HealthScoreData | null;

}





export default function HealthScore({

data,

}:HealthScoreProps){


const t =
useTranslations("dashboard.healthScore");



const score =
data?.score ?? 0;



const label =
data?.label ??
t("notAnalyzed");



const signals =
data?.signals ?? {};



const strengths =
data?.strengths ?? [];



const issues =
data?.issues ?? [];





const statusColor =


score >= 85

?

"text-emerald-600"


:


score >= 65

?

"text-blue-600"


:

"text-red-600";







return (

<div

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"

>





<div

className="
flex
items-center
gap-2
"

>


<ShieldCheck

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









<div

className="
mt-6
flex
justify-center
"

>


<div

className="
flex
h-36
w-36
items-center
justify-center
rounded-full
bg-blue-50
"

>


<div

className="
flex
h-28
w-28
flex-col
items-center
justify-center
rounded-full
bg-white
shadow-inner
"

>


<span

className="
text-4xl
font-black
text-slate-900
"

>

{score}

</span>




<span

className="
text-xs
text-slate-400
"

>

/100

</span>



</div>


</div>


</div>








<div

className="
mt-6
text-center
"

>


<p

className={`

text-lg

font-bold

${statusColor}

`}

>

{label}

</p>




<p

className="
mt-1
text-xs
text-slate-500
"

>

{t("evaluation")}

</p>



</div>









<div

className="
mt-6
grid
grid-cols-3
gap-3
"

>


<MiniMetric

title={t("metrics.traffic")}

value={
Math.round(
signals.traffic ?? 0
)
}

/>





<MiniMetric

title={t("metrics.visibility")}

value={
Math.round(
signals.visibility ?? 0
)
}

/>





<MiniMetric

title={t("metrics.engagement")}

value={
Math.round(
signals.engagement ?? 0
)
}

/>



</div>










{

strengths.length > 0 &&

<div

className="
mt-6
rounded-xl
bg-emerald-50
p-4
"

>


<p

className="
text-xs
font-bold
text-emerald-700
"

>

{t("strength")}

</p>





<p

className="
mt-2
text-xs
text-slate-600
"

>

{strengths[0]}

</p>




</div>


}









{

issues.length > 0 &&

<div

className="
mt-3
rounded-xl
bg-red-50
p-4
"

>


<p

className="
text-xs
font-bold
text-red-700
"

>

{t("attention")}

</p>




<p

className="
mt-2
text-xs
text-slate-600
"

>

{issues[0]}

</p>




</div>


}





</div>

);


}









function MiniMetric({

title,

value,

}:{

title:string;

value:number|string;

}){


return (

<div

className="
rounded-xl
bg-slate-50
p-3
"

>


<p

className="
text-[11px]
text-slate-500
"

>

{title}

</p>




<p

className="
mt-1
text-sm
font-bold
text-slate-800
"

>

{value}

</p>




</div>


);


}