"use client";

import {
  Mail,
  MessageSquare,
  Sparkles,
  Send,
  ShieldCheck,
  Clock,
  Globe,
} from "lucide-react";

import { useTranslations } from "next-intl";
import type React from "react";

import { Button } from "@/components/ui/button";


export default function ContactPage(){

const t = useTranslations("contact");


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
relative
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

<Sparkles className="h-4 w-4"/>

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






{/* CONTENT */}


<section
className="
mx-auto
grid
max-w-6xl
gap-8
px-6
pb-24
lg:grid-cols-2
"
>



{/* INFO */}


<div
className="
rounded-[32px]
border
border-slate-200
bg-white
p-10
shadow-sm
"
>


<h2
className="
text-2xl
font-black
text-slate-900
"
>

{t("info.title")}

</h2>



<p
className="
mt-4
leading-7
text-slate-600
"
>

{t("info.description")}

</p>




<div
className="
mt-8
space-y-4
"
>


<ContactItem
icon={Mail}
title={t("info.email.title")}
value="hello@trafficsaas.com"
/>



<ContactItem
icon={MessageSquare}
title={t("info.support.title")}
value={t("info.support.value")}
/>



<ContactItem
icon={ShieldCheck}
title={t("info.security.title")}
value={t("info.security.value")}
/>


</div>



<div
className="
mt-8
grid
grid-cols-2
gap-4
"
>


<MiniTrust
icon={Clock}
text={t("trust.response")}
/>


<MiniTrust
icon={Globe}
text={t("trust.global")}
/>


</div>


</div>







{/* FORM */}


<div
className="
rounded-[32px]
bg-white
border
border-slate-200
p-10
shadow-sm
"
>


<h2
className="
text-2xl
font-black
text-slate-900
"
>

{t("form.title")}

</h2>




<form
className="
mt-8
space-y-5
"
>


<input
placeholder={t("form.name")}
className="
h-12
w-full
rounded-xl
border
border-slate-200
px-4
text-sm
outline-none
focus:border-violet-500
"
/>



<input
placeholder={t("form.email")}
className="
h-12
w-full
rounded-xl
border
border-slate-200
px-4
text-sm
outline-none
focus:border-violet-500
"
/>




<textarea
rows={5}
placeholder={t("form.message")}
className="
w-full
rounded-xl
border
border-slate-200
p-4
text-sm
outline-none
focus:border-violet-500
"
/>



<Button
className="
h-12
w-full
rounded-xl
bg-gradient-to-r
from-violet-600
to-sky-500
"
>

{t("form.button")}

<Send className="ml-2 h-4 w-4"/>

</Button>



</form>


</div>



</section>


</main>

);

}








function ContactItem({
icon:Icon,
title,
value,
}:{
icon:React.ElementType;
title:string;
value:string;
}){


return (

<div
className="
flex
items-center
gap-4
rounded-2xl
bg-slate-50
p-4
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
bg-gradient-to-br
from-violet-600
to-sky-500
"
>

<Icon className="h-5 w-5 text-white"/>

</div>


<div>

<p className="text-sm text-slate-500">
{title}
</p>


<p className="font-semibold text-slate-900">
{value}
</p>


</div>


</div>

);

}





function MiniTrust({
icon:Icon,
text,
}:{
icon:React.ElementType;
text:string;
}){


return (

<div
className="
flex
items-center
gap-2
rounded-xl
bg-slate-50
px-4
py-3
text-xs
font-semibold
text-slate-700
"
>

<Icon
className="
h-4
w-4
text-violet-600
"
/>

{text}

</div>

);

}