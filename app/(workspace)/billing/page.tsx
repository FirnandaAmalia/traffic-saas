import {
  getServerSession,
} from "next-auth";

import {
  authOptions,
} from "@/lib/auth";

import {
  CreditCard,
  Sparkles,
} from "lucide-react";

import {
  prisma,
} from "@/lib/prisma";

import PlanCard from "@/components/billing/plan-card";

import Link from "next/link";

export default async function BillingPage(){


const session =
await getServerSession(authOptions);



if(!session?.user?.id){

return null;

}



const subscription =
await prisma.subscription.findUnique({

where:{
userId:session.user.id
}

});



const currentPlan =
subscription?.plan ?? "FREE";



return (

<div
className="
space-y-8
p-8
max-w-6xl
"
>


{/* HEADER */}

<div>

<h1
className="
text-3xl
font-bold
text-slate-900
"
>

Langganan & Pembayaran

</h1>


<p
className="
mt-2
text-sm
text-slate-500
"
>

Kelola paket TrafficSaaS, penggunaan fitur, dan informasi pembayaran Anda.

</p>

</div>





{/* CURRENT PLAN */}

<section

className="
rounded-3xl
bg-gradient-to-br
from-blue-600
to-indigo-600
p-8
text-white
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


<div

className="
flex
items-center
gap-4
"

>


<div

className="
rounded-2xl
bg-white/20
p-4
"

>

<Sparkles/>

</div>



<div>


<p
className="
text-sm
text-blue-100
"
>

Paket Saat Ini

</p>


<h2

className="
text-4xl
font-black
"
>

{currentPlan}

</h2>


</div>


</div>




<span

className="
rounded-full
bg-white/20
px-4
py-2
text-sm
font-semibold
"
>

{
currentPlan === "PRO"
?
"Aktif"
:
"Free Plan"
}

</span>



</div>




<div

className="
mt-8
grid
gap-4
md:grid-cols-3
"
>


<UsageCard

title="Workspace"

value={
currentPlan === "PRO"
?
"Tidak Terbatas"
:
"1 Workspace"
}

/>



<UsageCard

title="Project"

value={
currentPlan === "PRO"
?
"Tidak Terbatas"
:
"1 Project"
}

/>



<UsageCard

title="Fitur AI"

value={
currentPlan === "PRO"
?
"Aktif"
:
"Terkunci"
}

/>



</div>



</section>





{/* PACKAGE */}


<div

className="
grid
gap-6
md:grid-cols-2
"

>


<PlanCard

title="PAKET GRATIS"

price="Rp0"

period="selamanya"

description="
Cocok untuk mencoba analisis SEO dan memahami performa website.
"

features={[

"Satu Website Project",

"Integrasi Google Search Console",

"Integrasi Google Analytics 4",

"Dashboard SEO Dasar",

"Ringkasan Traffic Website",

"Monitoring Keyword Dasar",

"Analisis Performa Traffic",

"Export CSV",

"Ringkasan SEO Mingguan"

]}

/>



<PlanCard

active={
currentPlan !== "PRO"
}

title="PAKET PRO"

price="Rp299.000"

period="/bulan"

description="
Untuk freelancer SEO, agency, dan bisnis yang membutuhkan insight berbasis data.
"

features={[

"Workspace Tidak Terbatas",

"Project Tidak Terbatas",

"AI Executive Dashboard",

"AI SEO Insights",

"AI Recommendation",

"Analisis Keyword & Halaman",

"Export Laporan PDF",

"Export Excel",

"Prioritas Support"

]}

/>



</div>





{/* PAYMENT */}

<section

className="
rounded-3xl
border
bg-white
p-6
shadow-sm
"

>


<div

className="
flex
items-center
gap-3
"

>


<CreditCard

className="
text-blue-600
"

/>



<h3

className="
text-lg
font-bold
"

>

Metode Pembayaran

</h3>



</div>




<p

className="
mt-3
text-sm
text-slate-500
"

>

Kelola pembayaran, invoice, dan informasi langganan TrafficSaaS Anda.

</p>

<Link

href="/subscription"

className="
inline-block
mt-5
rounded-xl
bg-blue-600
px-6
py-3
text-sm
font-semibold
text-white
hover:bg-blue-700
transition
"

>

Kelola Langganan

</Link>

</section>



</div>


);

}





function UsageCard({

title,

value,

}:{

title:string;

value:string;

}){


return (

<div

className="
rounded-2xl
bg-white/15
p-4
"

>


<p

className="
text-xs
text-blue-100
"

>

{title}

</p>



<p

className="
mt-1
text-xl
font-bold
"

>

{value}

</p>



</div>

);


}