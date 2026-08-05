"use client";

import Link from "next/link";

import {
  ArrowRight,
  Sparkles,
  Brain,
  Database,
  TrendingUp,
  ShieldCheck,
  Cloud,
} from "lucide-react";

import type React from "react";

import { Button } from "@/components/ui/button";

import {
  useLocale,
  useTranslations,
} from "next-intl";

export default function AboutPage() {

  const t = useTranslations("about");

  const locale = useLocale();


  return (

    <main
      className="
      relative
      overflow-hidden
      bg-slate-50
      "
    >

{/* BACKGROUND */}

<div
className="
absolute
inset-0
-z-10
"
>

<div
className="
absolute
left-1/2
top-0
h-[600px]
w-[600px]
-translate-x-1/2
rounded-full
bg-violet-500/10
blur-[160px]
"
/>

</div>





{/* HERO */}

<section
className="
mx-auto
max-w-6xl
px-6
pt-28
pb-16
"
>


<div
className="
text-center
"
>


<div
className="
inline-flex
items-center
gap-2
rounded-full
border
border-violet-200
bg-white
px-5
py-2
text-xs
font-bold
text-violet-700
shadow-sm
"
>

<Sparkles
className="
h-4
w-4
"
/>

{t("badge")}

</div>





<h1
className="
mt-8
text-5xl
font-black
tracking-tight
text-slate-900
lg:text-6xl
"
>


{t("hero.title")}


<br/>


<span
className="
bg-gradient-to-r
from-violet-600
to-sky-500
bg-clip-text
text-transparent
"
>

{t("hero.highlight")}

</span>


</h1>






<p
className="
mx-auto
mt-6
max-w-2xl
text-lg
leading-8
text-slate-600
"
>

{t("hero.description")}

</p>





<div
className="
mt-8
flex
justify-center
gap-4
"
>


<Button
asChild
className="
rounded-full
bg-slate-950
px-6
"
>

<Link href="/">

{t("hero.button")}

<ArrowRight
className="
ml-2
h-4
w-4
"
/>

</Link>


</Button>

</div>


</div>


</section>







{/* TRUST */}

<section
className="
mx-auto
max-w-6xl
px-6
pb-14
"
>


<div
className="
rounded-[32px]
border
border-slate-200
bg-white
p-8
shadow-xl
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

<p
className="
text-sm
text-slate-500
"
>

{t("trust.label")}

</p>


<h2
className="
text-2xl
font-black
text-slate-900
"
>

{t("trust.title")}

</h2>

</div>



<div
className="
rounded-full
bg-emerald-100
px-4
py-2
text-xs
font-bold
text-emerald-700
"
>

✓ {t("active")}

</div>


</div>






<div
className="
mt-7
grid
gap-4
md:grid-cols-4
"
>


<TrustCard
icon={<Brain/>}
title={t("trust.items.ai")}
/>


<TrustCard
icon={<Database/>}
title={t("trust.items.data")}
/>


<TrustCard
icon={<Cloud/>}
title={t("trust.items.cloud")}
/>


<TrustCard
icon={<ShieldCheck/>}
title={t("trust.items.security")}
/>


</div>


</div>


</section>








{/* FEATURES */}

<section
className="
mx-auto
grid
max-w-6xl
gap-6
px-6
pb-24
md:grid-cols-3
"
>


<FeatureCard
icon={Brain}
title={t("features.ai.title")}
text={t("features.ai.description")}
/>


<FeatureCard
icon={Database}
title={t("features.data.title")}
text={t("features.data.description")}
/>


<FeatureCard
icon={TrendingUp}
title={t("features.growth.title")}
text={t("features.growth.description")}
/>


</section>




</main>

);












function TrustCard({
icon,
title,
}:{
icon:React.ReactNode;
title:string;
}){


return (

<div
className="
rounded-2xl
bg-slate-50
p-5
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
bg-violet-100
text-violet-600
"
>

{icon}

</div>


<p
className="
mt-4
text-sm
font-bold
text-slate-800
"
>

{title}

</p>


</div>

);


}









function FeatureCard({
icon:Icon,
title,
text,
}:{
icon:React.ElementType;
title:string;
text:string;
}){


return (

<div
className="
rounded-[30px]
border
border-slate-200
bg-white
p-8
shadow-sm
transition
hover:-translate-y-2
hover:shadow-xl
"
>


<div
className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-gradient-to-br
from-violet-600
to-sky-500
"
>

<Icon
className="
h-7
w-7
text-white
"
/>

</div>




<h3
className="
mt-6
text-xl
font-black
text-slate-900
"
>

{title}

</h3>



<p
className="
mt-3
leading-7
text-slate-600
"
>

{text}

</p>



</div>

);


}}