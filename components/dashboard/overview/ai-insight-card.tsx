"use client";

import {
  Sparkles,
} from "lucide-react";

import {
  useTranslations,
} from "next-intl";


interface AIInsightSummary {

  overview?: string;

}



interface AIHealthScore {

  label?: string;

  strengths?: string[];

  issues?: string[];

  recommendations?: string[];

}



interface AIInsightCardProps {

  summary?: AIInsightSummary | null;

  healthScore?: AIHealthScore | null;

}





export default function AIInsightCard({

summary,

healthScore,

}:AIInsightCardProps){


const t = useTranslations("dashboard.aiInsight");



const data =
summary ?? {};



const health =
healthScore ?? {};



const healthStrengths =
health.strengths ?? [];



const healthIssues =
health.issues ?? [];



const overview =
data.overview ??
t("empty");





return (

<section

className="
relative
overflow-hidden
rounded-3xl
border
border-blue-200
bg-gradient-to-br
from-blue-50
via-white
to-indigo-50
p-6
shadow-md
"

>



<div

className="
absolute
-right-10
-top-10
h-32
w-32
rounded-full
bg-blue-200/30
blur-3xl
"

/>






<div

className="
relative
flex
items-start
gap-4
"

>



<div

className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-blue-600
shadow-lg
shadow-blue-200
"

>


<Sparkles

className="
h-6
w-6
text-white
"

/>


</div>







<div

className="
flex-1
"

>



<div

className="
flex
items-center
justify-between
"

>


<div>


<h2

className="
text-sm
font-bold
text-blue-700
"

>

{t("title")}

</h2>




<p

className="
mt-1
text-xs
text-slate-500
"

>

{t("subtitle")}

</p>



</div>







<span

className="
rounded-full
bg-white
px-3
py-1
text-[11px]
font-semibold
text-blue-600
shadow-sm
"

>

{t("generated")}

</span>



</div>






<p

className="
mt-4
text-sm
leading-relaxed
font-medium
text-slate-700
"

>

{overview}

</p>




</div>



</div>









<div

className="
relative
mt-5
grid
grid-cols-3
gap-3
"

>





<div

className="
rounded-xl
bg-white
border
border-blue-100
p-3
"

>


<p

className="
text-[10px]
text-slate-500
"

>

{t("status")}

</p>



<p

className="
mt-1
text-sm
font-bold
text-blue-700
"

>

{
health.label ??
t("analyzing")
}

</p>



</div>









<div

className="
rounded-xl
bg-white
border
border-emerald-100
p-3
"

>



<p

className="
text-[10px]
text-slate-500
"

>

{t("strength")}

</p>



<p

className="
mt-1
text-sm
font-bold
text-emerald-600
"

>

{healthStrengths.length}

</p>



</div>









<div

className="
rounded-xl
bg-white
border
border-red-100
p-3
"

>



<p

className="
text-[10px]
text-slate-500
"

>

{t("attention")}

</p>




<p

className="
mt-1
text-sm
font-bold
text-red-500
"

>

{healthIssues.length}

</p>



</div>






</div>






</section>

);


}