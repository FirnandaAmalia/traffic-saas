"use client";

import {
  Sparkles,
  Lock,
  ArrowRight,
  TrendingUp,
  Search,
  Brain,
  Target,
} from "lucide-react";

import Link from "next/link";


interface Props {

title:string;

description:string;

featureList:string[];

}


export function UpgradeCard({

title,

description,

featureList,

}:Props){


return (

<div
className="
relative
mx-auto
w-full
max-w-5xl
overflow-hidden
rounded-3xl
border
border-slate-200
bg-white
shadow-xl
"
>


{/* TOP AI HEADER */}

<div

className="
relative
overflow-hidden
bg-gradient-to-br
from-blue-700
via-indigo-700
to-purple-700
px-10
py-12
"

>


<div

className="
absolute
right-10
top-5
h-40
w-40
rounded-full
bg-white/10
blur-3xl
"

/>


<div

className="
relative
flex
items-center
gap-5
"

>


<div

className="
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-white/20
backdrop-blur
"

>

<Sparkles

className="
h-8
w-8
text-white
"

/>


</div>



<div>


<h1

className="
text-3xl
font-black
text-white
"

>

{title}

</h1>


<p

className="
mt-2
max-w-xl
text-sm
text-blue-100
"

>

{description}

</p>


</div>


</div>


</div>





{/* BODY */}

<div

className="
p-10
"

>


<div

className="
grid
gap-6
lg:grid-cols-3
"

>


{/* PREVIEW CARD */}


<div

className="
rounded-2xl
border
border-slate-200
bg-slate-50
p-5
"

>


<div

className="
flex
items-center
gap-2
text-sm
font-bold
text-slate-700
"

>

<TrendingUp
size={18}
className="text-emerald-600"
/>

SEO Health Score

</div>



<div

className="
mt-6
text-5xl
font-black
text-slate-900
"

>

82

</div>



<div

className="
mt-3
h-2
overflow-hidden
rounded-full
bg-slate-200
"

>

<div

className="
h-full
w-[82%]
rounded-full
bg-gradient-to-r
from-blue-500
to-indigo-600
"

/>

</div>



<div

className="
mt-3
flex
items-center
gap-2
text-xs
text-slate-500
"

>

<Lock size={12}/>

Available on PRO

</div>


</div>





<div

className="
rounded-2xl
border
border-slate-200
bg-slate-50
p-5
"

>


<div

className="
flex
items-center
gap-2
text-sm
font-bold
text-slate-700
"

>

<Search
size={18}
className="text-blue-600"
/>

Keyword Opportunity

</div>



<div

className="
mt-5
text-3xl
font-black
text-slate-900
"

>

24

</div>



<p

className="
mt-2
text-xs
text-slate-500
"

>

keyword potensial ditemukan

</p>



<div

className="
mt-4
rounded-lg
bg-white
px-3
py-2
text-xs
text-slate-400
"

>

AI Recommendation Locked

</div>


</div>







<div

className="
rounded-2xl
border
border-slate-200
bg-slate-50
p-5
"

>


<div

className="
flex
items-center
gap-2
text-sm
font-bold
text-slate-700
"

>

<Brain
size={18}
className="text-purple-600"
/>

AI Strategy

</div>



<div

className="
mt-5
space-y-3
"

>

{

featureList.slice(0,3).map(item=>(


<div

key={item}

className="
flex
items-center
gap-2
rounded-lg
bg-white
px-3
py-2
text-xs
text-slate-600
"

>

<Target
size={13}
className="text-purple-500"
/>

{item}

</div>


))


}

</div>


</div>



</div>






{/* CTA */}

<div

className="
mt-10
flex
flex-col
items-center
justify-center
rounded-2xl
bg-gradient-to-r
from-blue-50
to-indigo-50
p-6
"

>


<p

className="
text-sm
font-semibold
text-slate-700
"

>

Unlock AI-powered SEO growth insights

</p>



<Link

href="/billing"

className="
mt-4
flex
items-center
gap-2
rounded-xl
bg-gradient-to-r
from-blue-600
to-indigo-600
px-10
py-3
font-bold
text-white
shadow-lg
transition
hover:scale-105
"

>

Unlock AI Consultant

<ArrowRight size={18}/>

</Link>


</div>



</div>


</div>

);

}