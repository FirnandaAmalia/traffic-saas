import {
  redirect,
} from "next/navigation";


import {
  getServerSession,
} from "next-auth";


import {
  authOptions,
} from "@/lib/auth";


import {
  prisma,
} from "@/lib/prisma";


import {
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  Banknote,
} from "lucide-react";

import PaymentConfirmButton
from "@/components/admin/payment-confirm-button";

export default async function AdminPaymentsPage(){



const session =
await getServerSession(
  authOptions
);



if(!session?.user?.id){

redirect("/login");

}



if(session.user.role !== "ADMIN"){

redirect("/dashboard");

}







const [

successPayments,

pendingPayments,

failedPayments,

revenue,

payments,

] = await Promise.all([





prisma.payment.count({

where:{

status:"SUCCESS"

}

}),





prisma.payment.count({

where:{

status:"PAYMENT_SUBMITTED"

}

}),





prisma.payment.count({

where:{

status:"FAILED"

}

}),






prisma.payment.aggregate({

where:{

status:"SUCCESS"

},

_sum:{

amount:true

}

}),






prisma.payment.findMany({

orderBy:{

createdAt:"desc"

},

take:50,

include:{

user:true

}

})


]);







const totalRevenue =
revenue._sum.amount ?? 0;







return (

<div

className="
space-y-8
"

>







{/* HEADER */}


<div>


<h1

className="
text-3xl
font-black
tracking-tight
text-slate-900
"

>

Payments Management

</h1>



<p

className="
mt-2
text-sm
text-slate-500
"

>

Monitor transaksi, pembayaran,
dan revenue TrafficSaaS.

</p>


</div>









{/* SUMMARY */}



<div

className="
grid
gap-6
md:grid-cols-5
"

>

<SummaryCard

title="Revenue"

value={
`Rp${totalRevenue.toLocaleString("id-ID")}`
}

icon={<Banknote className="h-6 w-6"/>}

/>

<SummaryCard

title="Success"

value={successPayments.toString()}

icon={<CheckCircle2 className="h-6 w-6"/>}

/>





<SummaryCard

title="Pending"

value={pendingPayments.toString()}

icon={<Clock className="h-6 w-6"/>}

/>





<SummaryCard

title="Failed"

value={failedPayments.toString()}

icon={<XCircle className="h-6 w-6"/>}

/>





<SummaryCard

title="Transactions"

value={
payments.length.toString()
}

icon={<CreditCard className="h-6 w-6"/>}

/>



</div>









{/* TABLE */}



<section

className="
overflow-hidden
rounded-3xl
border
border-slate-200
bg-white
shadow-sm
"

>



<div

className="
border-b
border-slate-200
px-6
py-5
"

>


<h2

className="
font-bold
text-slate-900
"

>

Recent Transactions

</h2>


</div>








<div

className="
overflow-x-auto
"

>


<table

className="
w-full
text-sm
"

>


<thead

className="
bg-slate-50
text-left
text-xs
uppercase
tracking-wide
text-slate-500
"

>


<tr>


<th className="px-6 py-4">

Order ID

</th>


<th className="px-6 py-4">

User

</th>


<th className="px-6 py-4">

Amount

</th>


<th className="px-6 py-4">

Status

</th>


<th className="px-6 py-4">

Date

</th>


<th className="px-6 py-4">

Action

</th>


</tr>


</thead>






<tbody

className="
divide-y
divide-slate-100
"

>



{

payments.map((payment)=>(


<tr

key={payment.id}

className="
transition
hover:bg-slate-50
"

>


<td

className="
px-6
py-4
font-mono
text-xs
text-slate-600
"

>

{payment.orderId}

</td>







<td

className="
px-6
py-4
"

>


<p

className="
font-semibold
text-slate-900
"

>

{payment.user.email}

</p>


</td>







<td

className="
px-6
py-4
font-bold
text-slate-900
"

>


Rp{
payment.amount.toLocaleString("id-ID")
}


</td>







<td

className="
px-6
py-4
"

>


<StatusBadge

status={payment.status}

/>


</td>





<td
className="
px-6
py-4
text-slate-500
"
>
{
new Date(
payment.createdAt
).toLocaleDateString(
"id-ID"
)
}
</td>


<td
className="
px-6
py-4
"
>

{
payment.status === "PAYMENT_SUBMITTED"

?

<PaymentConfirmButton
orderId={payment.orderId}
/>

:

payment.status === "SUCCESS"

?

<span
className="
text-xs
font-semibold
text-emerald-600
"
>
✓ Confirmed
</span>

:

<span
className="
text-xs
text-slate-400
"
>
-
</span>

}

</td>

</tr>


))


}



{

payments.length===0 && (

<tr>

<td

colSpan={6}

className="
px-6
py-10
text-center
text-slate-400
"

>

Belum ada transaksi.

</td>

</tr>

)

}



</tbody>


</table>


</div>





</section>







</div>


);


}









function SummaryCard({

title,

value,

icon,

}:{

title:string;

value:string;

icon:React.ReactNode;

}){


return (

<div

className="
rounded-3xl
border
border-slate-200
bg-white
p-5
shadow-sm
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
font-medium
text-slate-500
"

>

{title}

</p>


<h3

className="
mt-3
text-2xl
font-black
text-slate-900
"

>

{value}

</h3>


</div>




<div

className="
rounded-2xl
bg-blue-50
p-3
text-blue-600
"

>

{icon}

</div>



</div>


</div>

);


}









function StatusBadge({

status,

}:{

status:string;

}){


const isSuccess =
status==="SUCCESS";


const isPending =
status==="PAYMENT_SUBMITTED";



return (

<span

className={`

rounded-full
px-3
py-1
text-xs
font-semibold


${
isSuccess

?

"bg-emerald-50 text-emerald-700"

:

isPending

?

"bg-amber-50 text-amber-700"

:

"bg-red-50 text-red-700"

}

`}

>

{status}

</span>

);


}