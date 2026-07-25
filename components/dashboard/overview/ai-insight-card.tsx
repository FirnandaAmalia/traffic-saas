import {
  Sparkles,
  ArrowRight,
} from "lucide-react";


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


const data: AIInsightSummary =
summary ?? {};


const health: AIHealthScore =
healthScore ?? {};



const healthStrengths =
health.strengths ?? [];

const healthIssues =
health.issues ?? [];

const healthRecommendations =
health.recommendations ?? [];



const overview =
data.overview ??
"Belum ada analisis AI tersedia.";

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


{/* decorative glow */}

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

AI SEO Insight

</h2>


<p

className="
mt-1
text-xs
text-slate-500
"

>

Automated SEO performance analysis

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

AI Generated

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






{/* AI SIGNAL */}

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

SEO Status

</p>


<p

className="
mt-1
text-sm
font-bold
text-blue-700
"

>

{health.label ?? "Analyzing"}

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

Strength

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

Attention

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

function InsightCard({

icon,

title,

items,

}:{

icon:React.ReactNode;

title:string;

items:string[];

}){


return (

<div

className="
rounded-2xl
border
border-slate-100
bg-white
p-4
"

>


<div

className="
flex
items-center
gap-2
text-sm
font-bold
text-slate-800
"

>


<span

className="
text-blue-600
"

>

{icon}

</span>


{title}


</div>





<div

className="
mt-3
space-y-2
"

>


{

items.map(

(item,index)=>(


<p

key={index}

className="
text-xs
leading-relaxed
text-slate-600
"

>

• {item}

</p>


)

)


}


</div>


</div>

);


}









function ListCard({

title,

icon,

color,

items,

}:{

title:string;

icon:React.ReactNode;

color:string;

items:string[];

}){


return (

<div

className="
rounded-2xl
border
border-slate-100
bg-white
p-4
"

>


<div

className={`
flex
items-center
gap-2
text-sm
font-bold
${color}
`}

>


{icon}

{title}


</div>





<div

className="
mt-3
space-y-3
"

>


{

items.map(

(item,index)=>(


<div

key={index}

className="
flex
gap-2
text-xs
leading-relaxed
text-slate-600
"

>


<ArrowRight

className="
mt-0.5
h-3
w-3
shrink-0
"

/>


<span>

{item}

</span>


</div>


)

)


}


</div>


</div>


);

}