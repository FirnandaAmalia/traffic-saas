"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";


import PricingHeader from "@/components/billing/pricing-header";
import PricingCard from "@/components/billing/pricing-card";
import PricingFAQ from "@/components/billing/pricing-faq";
import PricingToggle from "@/components/billing/pricing-toggle";
import PricingComparison from "@/components/billing/pricing-comparison";
import FeatureMatrix from "@/components/billing/feature-matrix";
import WhyUpgrade from "@/components/billing/why-upgrade";


import {
  PLANS,
} from "@/lib/plan";


import type {
  Plan,
} from "@prisma/client";




interface Props {

currentPlan:Plan;

}





export default function BillingClient({

currentPlan,

}:Props){



const router =
useRouter();



const [yearly,setYearly] =
useState(false);



const [loading,setLoading] =
useState(false);

async function upgradePro(){

try{

setLoading(true);


const response =
await fetch(
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



const data =
await response.json();


console.log(
"CREATE PAYMENT RESPONSE:",
data
);



if(!response.ok){

throw new Error(
data.error ??
"Gagal membuat pembayaran"
);

}



const orderId =
data.orderId ??
data.payment?.orderId;



if(!orderId){

throw new Error(
"Order pembayaran tidak ditemukan"
);

}



router.push(
`/payment/${orderId}`
);



}
catch(error){


console.error(
"UPGRADE ERROR:",
error
);


alert(
error instanceof Error
?
error.message
:
"Gagal membuka pembayaran"
);


}
finally{

setLoading(false);

}

}

return (


<main

className="
relative
overflow-hidden
bg-slate-50
"

>



<div

className="
absolute
inset-0
overflow-hidden
"

>


<div
className="
absolute
left-[-220px]
top-[-160px]
h-[520px]
w-[520px]
rounded-full
bg-violet-500/20
blur-[140px]
"
/>


<div
className="
absolute
right-[-180px]
top-40
h-[460px]
w-[460px]
rounded-full
bg-sky-500/20
blur-[140px]
"
/>


</div>







<div

className="
relative
mx-auto
max-w-7xl
px-6
py-20
"

>



<PricingHeader />






<div

className="
mt-6
text-center
"

>

<p
className="
text-sm
text-slate-500
"

>

Paket aktif

</p>


<h2

className="
mt-2
text-3xl
font-black
text-blue-600
"

>

{currentPlan}

</h2>


</div>







<PricingToggle

yearly={yearly}

onChange={setYearly}

/>








<div

className="
mt-16
grid
gap-8
lg:grid-cols-2
"

>



<PricingCard

plan={PLANS.FREE}

yearly={yearly}

currentPlan={currentPlan}

/>







<div

className="
relative
"

>


<PricingCard

plan={PLANS.PRO}

recommended

yearly={yearly}

currentPlan={currentPlan}

/>





{

currentPlan !== "PRO"

&&

<button

onClick={upgradePro}

disabled={loading}

className="
mt-5
w-full
rounded-2xl
bg-gradient-to-r
from-blue-600
to-indigo-600
py-4
font-bold
text-white
shadow-lg
transition
hover:scale-[1.02]
disabled:opacity-50
"

>


{

loading

?

"Membuat pembayaran..."

:

"Upgrade ke PRO"

}



</button>

}



</div>




</div>








<WhyUpgrade />


<PricingComparison />


<FeatureMatrix />


<PricingFAQ />






</div>


</main>


);


}