"use client";

import Link from "next/link";

import {
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";


const product = [
  {
    label:"Features",
    href:"#features",
  },
  {
    label:"Pricing",
    href:"#pricing",
  },
  {
    label:"AI Insights",
    href:"#ai",
  },
  {
    label:"Dashboard",
    href:"/dashboard",
  },
];


const resources = [
  {
    label:"Documentation",
    href:"/documentation",
  },
  {
    label:"FAQ",
    href:"#faq",
  },
];


const company = [
  {
    label:"About",
    href:"/about",
  },
  {
    label:"Contact",
    href:"/contact",
  },
  {
    label:"Privacy Policy",
    href:"/privacy",
  },
  {
    label:"Terms",
    href:"/terms",
  },
];



export default function Footer(){

return (

<footer
className="
relative
overflow-hidden
border-t
border-slate-800
bg-slate-950
text-white
"
>


{/* Glow */}

<div
className="
absolute
left-1/2
top-0
h-72
w-72
-translate-x-1/2
rounded-full
bg-violet-600/20
blur-[140px]
"
/>



<div
className="
relative
mx-auto
max-w-7xl
px-6
py-12
"
>


<div
className="
grid
gap-10
lg:grid-cols-5
"
>



{/* BRAND */}

<div
className="
lg:col-span-2
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
h-11
w-11
items-center
justify-center
rounded-2xl
bg-gradient-to-br
from-violet-600
to-sky-500
shadow-lg
"
>

<Sparkles
className="
h-5
w-5
text-white
"
/>

</div>



<div>

<h2
className="
text-xl
font-black
"
>
TrafficSaaS
</h2>


<p
className="
text-xs
text-slate-400
"
>
AI SEO Intelligence Platform
</p>


</div>


</div>



<p
className="
mt-5
max-w-sm
text-sm
leading-7
text-slate-400
"
>

Platform AI untuk membantu bisnis memahami performa website,
menemukan peluang SEO, dan membuat keputusan berdasarkan data.

</p>



{/* Trust */}

<div
className="
mt-6
flex
flex-wrap
gap-3
"
>


<div
className="
flex
items-center
gap-2
rounded-xl
border
border-slate-800
bg-slate-900/60
px-3
py-2
text-xs
text-slate-300
"
>

<ShieldCheck
className="
h-4
w-4
text-emerald-400
"
/>

Secure OAuth

</div>



<div
className="
flex
items-center
gap-2
rounded-xl
border
border-slate-800
bg-slate-900/60
px-3
py-2
text-xs
text-slate-300
"
>

<Zap
className="
h-4
w-4
text-yellow-400
"
/>

AI Powered

</div>



<div
className="
flex
items-center
gap-2
rounded-xl
border
border-slate-800
bg-slate-900/60
px-3
py-2
text-xs
text-slate-300
"
>

<Globe
className="
h-4
w-4
text-sky-400
"
/>

Global Analytics

</div>



</div>


</div>





{/* PRODUCT */}

<FooterColumn
title="Product"
items={product}
/>



{/* RESOURCES */}

<FooterColumn
title="Resources"
items={resources}
/>



{/* COMPANY */}

<FooterColumn
title="Company"
items={company}
/>



</div>





{/* Bottom */}


<div
className="
mt-10
border-t
border-slate-800
pt-6
flex
flex-col
gap-3
text-xs
text-slate-500
md:flex-row
md:justify-between
"
>


<p>
© {new Date().getFullYear()} TrafficSaaS. All rights reserved.
</p>


<p>
Built with AI & modern web technology.
</p>


</div>


</div>


</footer>

);

}





function FooterColumn({
title,
items,
}:{
title:string;
items:{
label:string;
href:string;
}[];
}){

return (

<div>

<h3
className="
text-sm
font-bold
text-white
"
>
{title}
</h3>


<div
className="
mt-4
space-y-3
"
>

{
items.map(item=>(

<Link
key={item.label}
href={item.href}
className="
block
text-sm
text-slate-400
transition
hover:text-violet-400
"
>

{item.label}

</Link>

))
}


</div>


</div>

);

}