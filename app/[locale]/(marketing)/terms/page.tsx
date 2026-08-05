"use client";

import {
  FileText,
  UserCheck,
  CreditCard,
  ShieldCheck,
  Ban,
  RefreshCcw,
  Scale,
  Sparkles,
} from "lucide-react";

import { useTranslations } from "next-intl";
import type React from "react";


export default function TermsPage(){

const t = useTranslations("terms");


return (

<main
className="
relative
overflow-hidden
bg-slate-50
"
>


{/* Background */}

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


<div className="text-center">


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

<FileText className="h-4 w-4"/>

{t("hero.badge")}

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


</div>


</section>








{/* TERMS */}

<section
className="
mx-auto
grid
max-w-6xl
gap-6
px-6
pb-24
md:grid-cols-2
"
>



<TermsCard
icon={UserCheck}
title={t("sections.service.title")}
>

{t("sections.service.content")}

</TermsCard>




<TermsCard
icon={CreditCard}
title={t("sections.billing.title")}
>

{t("sections.billing.content")}

</TermsCard>




<TermsCard
icon={Sparkles}
title={t("sections.data.title")}
>

{t("sections.data.content")}

</TermsCard>




<TermsCard
icon={Ban}
title={t("sections.usage.title")}
>

{t("sections.usage.content")}

</TermsCard>




<TermsCard
icon={ShieldCheck}
title={t("sections.security.title")}
>

{t("sections.security.content")}

</TermsCard>




<TermsCard
icon={Scale}
title={t("sections.liability.title")}
>

{t("sections.liability.content")}

</TermsCard>





<div
className="
md:col-span-2
rounded-[32px]
border
border-slate-200
bg-white
p-8
shadow-sm
"
>


<div
className="
flex
items-center
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
rounded-xl
bg-violet-100
text-violet-600
"
>

<RefreshCcw/>

</div>



<h2
className="
text-xl
font-black
text-slate-900
"
>

{t("sections.update.title")}

</h2>


</div>




<p
className="
mt-5
leading-7
text-slate-600
"
>

{t("sections.update.content")}

</p>



</div>



</section>



</main>

);

}








function TermsCard({
icon:Icon,
title,
children,
}:{
icon:React.ElementType;
title:string;
children:React.ReactNode;
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
hover:-translate-y-1
hover:shadow-xl
"
>


<div
className="
flex
items-center
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
bg-gradient-to-br
from-violet-600
to-sky-500
"
>

<Icon className="h-5 w-5 text-white"/>

</div>



<h2
className="
font-black
text-slate-900
"
>

{title}

</h2>



</div>




<p
className="
mt-5
text-sm
leading-7
text-slate-600
"
>

{children}

</p>



</div>

);

}