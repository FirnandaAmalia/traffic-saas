"use client";

import Link from "next/link";

import {
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";

import {
  useTranslations,
  useLocale,
} from "next-intl";



const product = [
  {
    key: "features",
    href: "#features",
    anchor: true,
  },
  {
    key: "pricing",
    href: "#pricing",
    anchor: true,
  },
  {
    key: "ai",
    href: "#ai",
    anchor: true,
  },
];


const resources = [
  {
    key: "faq",
    href: "#faq",
    anchor: true,
  },
];



const company = [
  {
    key: "about",
    href: "/about",
  },
  {
    key: "contact",
    href: "/contact",
  },
  {
    key: "privacy",
    href: "/privacy",
  },
  {
    key: "terms",
    href: "/terms",
  },
];




export default function Footer() {


  const t = useTranslations("footer");

  const locale = useLocale();



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

{t("brand.tagline")}

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

{t("brand.description")}

</p>





<div
className="
mt-6

flex

flex-wrap

gap-3
"
>


<Trust
icon={ShieldCheck}
text={t("trust.secure")}
/>


<Trust
icon={Zap}
text={t("trust.ai")}
/>


<Trust
icon={Globe}
text={t("trust.global")}
/>


</div>



</div>






<FooterColumn
title={t("columns.product")}
items={product}
locale={locale}
t={t}
/>




<FooterColumn
title={t("columns.resources")}
items={resources}
locale={locale}
t={t}
/>




<FooterColumn
title={t("columns.company")}
items={company}
locale={locale}
t={t}
/>




</div>








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

© {new Date().getFullYear()} TrafficSaaS.
{" "}
{t("copyright")}

</p>


<p>

{t("bottom")}

</p>


</div>




</div>


</footer>


  );

}








function Trust({
icon:Icon,
text,
}:{
icon:any;
text:string;
}){


return (

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


<Icon
className="
h-4

w-4

text-emerald-400
"
/>


{text}


</div>

);


}








function FooterColumn({

title,

items,

locale,

t,

}:{

title:string;

items:{
key:string;
href:string;
anchor?:boolean;
}[];

locale:string;

t:any;

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
items.map((item)=>(


<Link

key={item.key}

href={

item.anchor

?

item.href

:

`/${locale}${item.href}`

}

className="
block

text-sm

text-slate-400

transition

hover:text-violet-400
"

>


{t(`links.${item.key}`)}


</Link>


))

}



</div>


</div>


);


}