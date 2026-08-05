import {
  prisma,
} from "@/lib/prisma";

import {
  getServerSession,
} from "next-auth";

import {
  authOptions,
} from "@/lib/auth";

import {
  CreditCard,
  CheckCircle,
  Download,
} from "lucide-react";

import Link from "next/link";

import {
  getTranslations,
  getLocale,
} from "next-intl/server";

export default async function SubscriptionPage(){


const locale =
await getLocale();


const t = await getTranslations("subscriptionPage");

const session =
await getServerSession(authOptions);


if(!session?.user?.id){

return null;

}




const subscription =
await prisma.subscription.findUnique({

where:{
userId:
session.user.id
}

});





const payments =
await prisma.payment.findMany({

where:{
userId:
session.user.id
},

orderBy:{
createdAt:
"desc"
}

});





const latestPayment =
payments[0];



const successPayment =
payments.find(
(payment)=>
payment.status==="SUCCESS"
);



return (


<div

className="
p-8
space-y-8
max-w-5xl
"

>



{/* HEADER */}


<div>


<h1

className="
text-3xl
font-bold
"

>

{t("title")}

</h1>



<p

className="
mt-2
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
bg-gradient-to-r
from-blue-600
to-indigo-600
p-8
text-white
"

>


<p

className="
text-sm
opacity-80
"

>

{t("currentPlan")}

</p>



<h2

className="
mt-2
text-5xl
font-black
"

>

{
subscription?.plan ??
"FREE"
}

</h2>




<div

className="
mt-5
flex
items-center
gap-2
"

>

<CheckCircle size={18}/>


{t("active")}


</div>


</section>









{/* PAYMENT HISTORY */}


<section

className="
rounded-3xl
border
bg-white
p-6
"

>


<div

className="
flex
items-center
gap-3
"

>


<CreditCard/>


<h2

className="
text-xl
font-bold
"

>

{t("paymentHistory")}

</h2>



</div>







<div

className="
mt-6
space-y-4
"

>


{

payments.length === 0 &&

<p

className="
text-sm
text-slate-500
"

>

{t("noPayment")}
</p>

}






{

payments.map(payment=>(


<div

key={
payment.id
}

className="
flex
items-center
justify-between
rounded-xl
border
p-4
"

>


<div>


<p

className="
font-semibold
"

>

{
payment.orderId
}

</p>



<p

className="
text-sm
text-slate-500
"

>

Rp
{
payment.amount.toLocaleString(
"id-ID"
)
}

</p>


</div>





<span

className="
rounded-full
bg-green-100
px-3
py-1
text-xs
font-bold
text-green-700
"

>

{
payment.status
}

</span>



</div>


))

}



</div>



</section>











{/* INVOICE */}


<section

className="
rounded-3xl
border
bg-white
p-6
"

>


<h2

className="
text-xl
font-bold
"

>

{t("invoice")}

</h2>




<p

className="
mt-2
text-sm
text-slate-500
"

>

{t("invoiceDescription")}
</p>





{

successPayment ?


<Link

href={
`/api/invoice/${successPayment.id}`
}

className="
mt-5
inline-flex
items-center
gap-2
rounded-xl
border
px-5
py-3
text-sm
font-semibold
transition
hover:bg-slate-50
"

>


<Download
size={16}
/>


{t("downloadInvoice")}


</Link>



:


<button

disabled

className="
mt-5
rounded-xl
border
px-5
py-3
text-sm
font-semibold
text-slate-400
cursor-not-allowed
"

>

{t("invoiceUnavailable")}

</button>


}



</section>






</div>


);


}