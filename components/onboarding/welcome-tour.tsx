"use client";

import {
  Joyride,
  STATUS,
} from "react-joyride";

import type {
  Step,
} from "react-joyride";

import { motion } from "framer-motion";


interface Props {

  run:boolean;

  onFinish:()=>void;

}





const steps:Step[]=[

{

target:"body",

placement:"center",


content:(


<div className="w-[380px]">


<motion.div

initial={{
scale:0.5,
opacity:0,
rotate:-20
}}

animate={{
scale:1,
opacity:1,
rotate:0
}}

transition={{
duration:0.5,
type:"spring"
}}

className="
mx-auto
flex
h-24
w-24
items-center
justify-center
rounded-[32px]
bg-gradient-to-br
from-blue-600
via-indigo-600
to-violet-600
text-6xl
shadow-xl
shadow-blue-200
"

>

</motion.div>





<div className="mt-6 text-center">


<p className="
text-xs
font-bold
uppercase
tracking-[0.2em]
text-blue-600
">

WELCOME TO

</p>



<h1 className="
mt-2
text-2xl
font-bold
tracking-tight
text-slate-900
">

TrafficSaaS

</h1>



<p className="
mt-2
text-sm
font-medium
text-blue-600
">

AI-Powered SEO Intelligence Platform

</p>


</div>







<p className="
mt-5
text-center
text-sm
leading-6
text-slate-600
">

Selamat datang di workspace SEO Anda.

TrafficSaaS membantu Anda memahami performa website,
menemukan peluang pertumbuhan, dan mengambil keputusan
berdasarkan data nyata.

</p>







<div className="
mt-5
rounded-2xl
border
border-slate-100
bg-slate-50
p-4
text-left
">


<p className="
mb-3
text-xs
font-bold
text-slate-700
">

Apa yang bisa Anda lakukan:

</p>



<div className="
space-y-2
text-xs
text-slate-600
">


<div>

<span className="
mr-2
text-emerald-500
">
✓
</span>

Pantau performa SEO website

</div>



<div>

<span className="
mr-2
text-emerald-500
">
✓
</span>

Analisis traffic dan perilaku pengguna

</div>



<div>

<span className="
mr-2
text-emerald-500
">
✓
</span>

Temukan peluang keyword baru

</div>



<div>

<span className="
mr-2
text-emerald-500
">
✓
</span>

Dapatkan rekomendasi SEO dari AI

</div>



</div>


</div>







<div className="
mt-5
rounded-2xl
bg-gradient-to-r
from-blue-600
to-indigo-600
p-4
text-white
">


<p className="
text-[10px]
font-bold
uppercase
tracking-wider
text-blue-100
">

NEXT STEP

</p>



<p className="
mt-1
text-xs
leading-5
">

Mari kenali fitur utama TrafficSaaS
dalam beberapa langkah singkat.

</p>


</div>





</div>


)

}

];







export default function WelcomeTour({

run,

onFinish,

}:Props){



return (

<Joyride

steps={steps}

run={run}

continuous

onEvent={(event:any)=>{


if(

event.status===STATUS.FINISHED ||

event.status===STATUS.SKIPPED

){


localStorage.setItem(

"traffic-saas-welcome-completed",

"true"

);



onFinish();


}


}}


styles={{


tooltip:{

borderRadius:"28px",

padding:"28px",

width:"440px",

boxShadow:
"0 25px 70px rgba(15,23,42,.20)"

},



tooltipContainer:{

padding:0

},



overlay:{

backgroundColor:
"rgba(15,23,42,.65)"

}



}}


/>

);


}