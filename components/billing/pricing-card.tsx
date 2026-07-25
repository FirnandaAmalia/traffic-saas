"use client";

import {
  Crown,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import PricingFeature from "./pricing-feature";

import {
  PLANS,
  type Plan,
} from "@/lib/plan";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {

  plan: Plan;

  recommended?: boolean;

  currentPlan: Plan;

}



export default function PricingCard({

  plan,

  recommended = false,

  currentPlan,

}: Props) {



  const isFree =
    plan === PLANS.FREE;



  const isCurrent =
    currentPlan === plan;



  const monthlyPrice = 299000;

  const title =
    isFree
      ? "Free"
      : "Pro";



  const subtitle =
    isFree
      ? "Perfect for getting started"
      : "Built for Agencies & Businesses";


const [loading,setLoading] = useState(false);

const router = useRouter();


async function upgrade(){

console.log("UPGRADE PRO CLICKED");


try{

setLoading(true);


const response = await fetch(
"/api/payment/create",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
plan:"PRO",
billing:"MONTHLY"
})
}
);



const data = await response.json();


console.log(
"PAYMENT RESPONSE:",
data
);



if(!response.ok){

throw new Error(
data.error ||
"Gagal membuat pembayaran"
);

}



const orderId =
data.orderId ??
data.payment?.orderId;



if(!orderId){

throw new Error(
"Order ID pembayaran tidak ditemukan"
);

}

window.location.href =
`/payment/${orderId}`;

}
catch(error){


console.error(
"UPGRADE ERROR",
error
);


alert(
error instanceof Error
?
error.message
:
"Gagal membuat pembayaran"
);


}
finally{

setLoading(false);

}


}

  return (

<div
className={`
group
relative
overflow-hidden
rounded-3xl
bg-white
p-8
transition-all
duration-500
hover:-translate-y-2

${
recommended

?

`
border-2
border-violet-500
shadow-2xl
shadow-violet-200/70
`

:

`
border
border-slate-200
hover:shadow-xl
`

}

`}
>



{/* Glow */}

{recommended && (

<>

<div
className="
absolute
-left-24
-top-24
h-72
w-72
rounded-full
bg-violet-400/20
blur-[110px]
"
/>


<div
className="
absolute
-bottom-24
-right-24
h-72
w-72
rounded-full
bg-cyan-400/20
blur-[110px]
"
/>

</>

)}




<div
className="
relative
z-10
"
>



{/* Popular */}

{recommended && (

<div
className="
absolute
right-0
top-0
"
>

<div
className="
rounded-bl-2xl
bg-gradient-to-r
from-violet-600
to-blue-600
px-5
py-2
text-xs
font-bold
text-white
shadow-lg
"
>

PALING POPULER

</div>

</div>

)}





{/* Header */}

<div
className="
flex
items-center
gap-4
"
>


{!isFree && (

<div
className="
rounded-2xl
bg-violet-100
p-3
"
>

<Crown
className="
h-6
w-6
text-violet-700
"
/>

</div>

)}



<div>


<h2
className="
text-3xl
font-bold
text-slate-900
"
>

{title}

</h2>


<p
className="
mt-1
text-slate-500
"
>

{subtitle}

</p>


</div>



</div>



{/* Price */}

<div className="mt-10">

<div className="flex items-end gap-2">

<span
className="
text-5xl
font-black
tracking-tight
"
>
{
isFree
?
"Rp0"
:
`Rp${monthlyPrice.toLocaleString("id-ID")}`
}
</span>


{!isFree && (

<span
className="
mb-2
text-lg
text-slate-500
"
>
/bulan
</span>

)}

</div>

</div>

{/* CTA */}

<Button

onClick={
  !isFree
    ? upgrade
    : undefined
}

disabled={loading || isFree}

className={
recommended
?
`
mt-8
w-full
bg-gradient-to-r
from-violet-600
via-blue-600
to-cyan-500
text-white
shadow-lg
transition-all
hover:scale-[1.03]
`
:
"mt-8 w-full"
}

variant={
isFree
?
"outline"
:
"default"
}

>

{
loading
?
"Membuat Pembayaran..."
:
isFree
?
"Mulai Gratis"
:
"Upgrade ke Pro"
}

</Button>

{/* Features */}

<div
className="
mt-10
space-y-4
"
>


<PricingFeature available>
Dashboard Overview
</PricingFeature>


<PricingFeature available>
KPI Cards
</PricingFeature>


<PricingFeature available>
Performance Trend
</PricingFeature>


<PricingFeature available>
Top Keywords
</PricingFeature>


<PricingFeature available>
Top Pages
</PricingFeature>


<PricingFeature available>
Google Search Console
</PricingFeature>


<PricingFeature available>
Google Analytics 4
</PricingFeature>


<PricingFeature available>
CSV Export
</PricingFeature>



<PricingFeature available>

{
isFree
?
"1 Workspace"
:
"Unlimited Workspaces"
}

</PricingFeature>



<PricingFeature available>

{
isFree
?
"1 Project"
:
"Unlimited Projects"
}

</PricingFeature>





<PricingFeature available={!isFree}>
AI Executive Dashboard
</PricingFeature>


<PricingFeature available={!isFree}>
AI Insights
</PricingFeature>


<PricingFeature available={!isFree}>
AI Recommendation
</PricingFeature>


<PricingFeature available={!isFree}>
PDF Export
</PricingFeature>


<PricingFeature available={!isFree}>
Excel Export
</PricingFeature>



</div>



</div>



</div>

  );

}