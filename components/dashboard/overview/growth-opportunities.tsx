import {
  Rocket,
  FileSearch,
  Target,
  ArrowRight,
} from "lucide-react";

interface GrowthOpportunity {


title:string;


type:
"Quick Win"
|
"CTR Opportunity"
|
"Content Growth"
|
"Recovery";



impact:
"High"
|
"Medium"
|
"Low";



estimatedImpact:string;


reason:string;


action:string;


metric:string;



source:
"GSC"
|
"GA4"
|
"Combined";



priority:
"High"
|
"Medium"
|
"Low";



confidence:number;


}

interface GrowthOpportunitiesProps {

data:GrowthOpportunity[];

}

export default function GrowthOpportunities({

data,

}:GrowthOpportunitiesProps){

const opportunities:GrowthOpportunity[] =

data?.length

?

data

:

[
{
title:"Belum ada peluang optimasi",
type:"Quick Win",
impact:"Low",
estimatedImpact:"Monitoring SEO",
reason:"Belum ditemukan peluang signifikan.",
action:"Lanjutkan monitoring performa website.",
metric:"Stable",
source:"Combined",
priority:"Low",
confidence:60
}
];


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





<div>


<div

className="
flex
items-center
gap-2
"

>


<Rocket

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

Growth Opportunities

</h2>



</div>





<p

className="
mt-1
text-sm
text-slate-500
"

>

Peluang terbesar untuk meningkatkan performa SEO website

</p>



</div>









<div

className="
mt-5
grid
gap-4
md:grid-cols-3
"

>


{

opportunities.slice(0,3).map(

(item,index)=>(



<div

key={index}

className="
rounded-2xl
border
border-slate-100
bg-slate-50
p-4
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
h-10
w-10
items-center
justify-center
rounded-xl
bg-white
shadow-sm
"

>


{

index===0

?

<Rocket

className="
h-5
w-5
text-blue-600
"

/>


:

index===1

?

<FileSearch

className="
h-5
w-5
text-emerald-600
"

/>


:

<Target

className="
h-5
w-5
text-purple-600
"

/>


}


</div>





<ArrowRight

className="
h-4
w-4
text-slate-300
"

/>



</div>

<div

className="
mt-4
space-y-2
"

>


<p

className="
text-sm
font-bold
text-slate-800
"

>

{item.title}

</p>



<p

className="
text-xs
leading-relaxed
text-slate-600
"

>

{item.reason}

</p>




<div

className="
mt-2
rounded-lg
bg-white
px-3
py-2
"

>


<p

className="
text-xs
font-medium
text-blue-600
"

>

Action:

</p>


<p

className="
text-xs
text-slate-600
"

>

{item.action}

</p>


</div>




<div

className="
flex
items-center
gap-2
"

>


<span

className="
rounded-full
bg-blue-100
px-2
py-1
text-[10px]
font-semibold
text-blue-700
"

>

{item.type}

</span>



<span

className="
rounded-full
bg-emerald-100
px-2
py-1
text-[10px]
font-semibold
text-emerald-700
"

>

Impact {item.impact}

</span>

<span

className="
rounded-full
bg-purple-100
px-2
py-1
text-[10px]
font-semibold
text-purple-700
"

>

AI {item.confidence}%

</span>


</div>


</div>


</div>


)

)


}



</div>







</section>


);


}