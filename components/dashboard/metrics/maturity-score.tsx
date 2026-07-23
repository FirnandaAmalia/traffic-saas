"use client";


import {
  Brain,
  Database,
  Globe,
  LineChart,
  Monitor,
  Search,
  Trophy,
  AlertTriangle,
} from "lucide-react";


import type {
  MaturityAssessment,
} from "@/lib/recommendation/maturity-score";



interface Props {

  maturity:MaturityAssessment;

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
Maturity Level
</span>


<span className="font-bold">

{value}%

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
from-indigo-500
to-sky-500
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








function getLevelColor(
level:string
){

switch(level){

case "Leading":

return "bg-emerald-100 text-emerald-700";


case "Advanced":

return "bg-sky-100 text-sky-700";


case "Developing":

return "bg-yellow-100 text-yellow-700";


default:

return "bg-red-100 text-red-700";

}

}







function DimensionCard({

title,

value,

icon,

}:{

title:string;

value:number;

icon:React.ReactNode;

}){


return (

<div

className="
rounded-2xl
border
border-slate-200
bg-white
p-5
shadow-sm
"

>


<div

className="
mb-4
flex
items-center
gap-3
"

>


<div

className="
rounded-xl
bg-indigo-50
p-2
text-indigo-600
"

>

{icon}

</div>



<div>


<p

className="
font-semibold
"

>

{title}

</p>


<p

className="
text-xs
text-slate-500
"

>

Score {value}/100

</p>


</div>


</div>



<Progress

value={value}

/>


</div>


)

}








export default function MaturityScoreCard({

maturity,

}:Props){



const dimensions = [

{
title:"SEO Foundation",
value:maturity.dimensions.seo,
icon:<Search size={18}/>
},

{
title:"Analytics Capability",
value:maturity.dimensions.analytics,
icon:<LineChart size={18}/>
},

{
title:"Content Authority",
value:maturity.dimensions.content,
icon:<Monitor size={18}/>
},

{
title:"Marketing Growth",
value:maturity.dimensions.marketing,
icon:<Globe size={18}/>
},

{
title:"User Experience",
value:maturity.dimensions.userExperience,
icon:<Brain size={18}/>
},

{
title:"Data Driven",
value:maturity.dimensions.dataDriven,
icon:<Database size={18}/>
},

];




const strongest =

[...dimensions]
.sort(
(a,b)=>b.value-a.value
)[0];


const weakest =

[...dimensions]
.sort(
(a,b)=>a.value-b.value
)[0];







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
items-start
justify-between
"

>


<div>


<h2

className="
text-2xl
font-bold
"

>

Digital Maturity Assessment

</h2>


<p

className="
mt-1
text-slate-500
"

>

AI evaluation of your website growth capability,
SEO readiness, and digital performance.

</p>


</div>



<div

className={`
rounded-full
px-5
py-2
text-sm
font-bold

${getLevelColor(
maturity.level
)}
`}

>

{maturity.level}

</div>



</div>







<div

className="
grid
gap-6
lg:grid-cols-[300px_1fr]
"

>





{/* SCORE */}


<div

className="
rounded-3xl
border
bg-white
p-8
shadow-sm
"

>


<div

className="
flex
items-center
justify-center
gap-2
text-sm
text-slate-500
"

>

<Trophy size={16}/>

Overall Maturity

</div>



<div

className="
mt-5
text-center
text-7xl
font-black
text-indigo-600
"

>

{maturity.overall}

</div>



<div

className="
text-center
text-xl
font-bold
"

>

/100

</div>





<div className="mt-6">

<Progress

value={
maturity.overall
}

/>

</div>





<div

className="
mt-6
rounded-2xl
bg-slate-50
p-4
text-sm
leading-6
text-slate-600
"

>

{maturity.summary}

</div>




<div

className="
mt-5
space-y-3
text-sm
"

>


<div

className="
flex
items-center
gap-2
rounded-xl
bg-emerald-50
p-3
text-emerald-700
"

>

<Trophy size={16}/>

Strongest:
<strong>

{strongest.title}

</strong>

</div>





<div

className="
flex
items-center
gap-2
rounded-xl
bg-orange-50
p-3
text-orange-700
"

>

<AlertTriangle size={16}/>

Improve:
<strong>

{weakest.title}

</strong>

</div>



</div>




</div>








{/* DIMENSIONS */}



<div

className="
grid
gap-5
md:grid-cols-2
"

>


{

dimensions.map(
(item)=>(


<DimensionCard

key={item.title}

{...item}

/>


)

)


}


</div>




</div>




</section>


);

}