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

import { 
  getTranslations,
  getLocale,
} from "next-intl/server";

export default async function BillingPage(){

const locale =
await getLocale();

const t =
await getTranslations("billing");

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
{t("title")}
</h1>

<p
className="
mt-2
text-sm
text-slate-500
"
>
{t("description")}
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

{t("currentPlan")}

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
t("active")
:
t("freePlan")
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

title={t("usage.workspace")}

value={
currentPlan === "PRO"
?
t("unlimited")
:
t("workspaceCount")
}

/>



<UsageCard

title={t("usage.project")}

value={
currentPlan === "PRO"
?
t("unlimited")
:
t("projectCount")
}

/>



<UsageCard

title={t("usage.aiFeature")}

value={
currentPlan === "PRO"
?
t("aiActive")
:
t("locked")
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

title={t("plans.free.title")}

price="Rp0"

period={t("plans.free.period")}

description={t("plans.free.description")}

features={[
t("plans.free.features.0"),
t("plans.free.features.1"),
t("plans.free.features.2"),
t("plans.free.features.3"),
t("plans.free.features.4"),
t("plans.free.features.5"),
t("plans.free.features.6"),
t("plans.free.features.7"),
t("plans.free.features.8")
]}

/>



<PlanCard

active={
currentPlan !== "PRO"
}

title={t("plans.pro.title")}

price={t("plans.pro.price")}

period={t("plans.pro.period")}

description={t("plans.pro.description")}

features={[
t("plans.pro.features.0"),
t("plans.pro.features.1"),
t("plans.pro.features.2"),
t("plans.pro.features.3"),
t("plans.pro.features.4"),
t("plans.pro.features.5"),
t("plans.pro.features.6"),
t("plans.pro.features.7"),
t("plans.pro.features.8")
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
{t("payment.title")}
</h3>



</div>




<p
className="
mt-3
text-sm
text-slate-500
"
>
{t("payment.description")}
</p>

<Link

href={`/${locale}/subscription`}

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

{t("payment.manage")}

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