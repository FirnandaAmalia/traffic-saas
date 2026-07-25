import { Prisma } from "@prisma/client";

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

import PaymentConfirmButton
from "@/components/admin/payment-confirm-button";



type PaymentWithUser =
Prisma.PaymentGetPayload<{
  include:{
    user:true;
  };
}>;




export default async function PaymentsPage(){

const session =
await getServerSession(
  authOptions
);

console.log(
  "PAYMENT ADMIN CHECK:",
  {
    id: session?.user?.id,
    email: session?.user?.email,
    role: session?.user?.role,
  }
);

if(!session?.user?.id){

redirect("/login");

}
if(session.user.role !== "ADMIN"){

redirect("/dashboard");

}







const payments:
PaymentWithUser[] =

await prisma.payment.findMany({

where:{

status:{

in:[

"PAYMENT_SUBMITTED",

"SUCCESS"

]

}

},


orderBy:{

createdAt:"desc"

},


include:{

user:true

}

});







return (

<div
className="
min-h-screen
bg-slate-950
p-8
"
>


<div>


<h1
className="
text-3xl
font-black
text-white
"
>

Payment Management

</h1>



<p
className="
mt-2
text-sm
text-slate-400
"
>

Kelola verifikasi pembayaran subscription TrafficSaaS.

</p>


</div>







<div
className="
mt-8
overflow-x-auto
rounded-3xl
border
border-slate-800
bg-slate-900
shadow-xl
"
>


<table
className="
w-full
text-sm
"
>


<thead>

<tr
className="
border-b
border-slate-800
text-left
text-slate-400
"
>


<th className="p-5">
User
</th>


<th className="p-5">
Order
</th>


<th className="p-5">
Nominal
</th>


<th className="p-5">
Bukti
</th>


<th className="p-5">
Status
</th>


<th className="p-5">
Provider
</th>


<th className="p-5">
Action
</th>


</tr>

</thead>







<tbody>


{
payments.length===0 &&

<tr>

<td
colSpan={7}
className="
p-10
text-center
text-slate-500
"
>

Belum ada pembayaran masuk.

</td>

</tr>

}






{
payments.map(payment=>(


<tr

key={payment.id}

className="
border-b
border-slate-800
transition
hover:bg-white/5
"

>







<td
className="
p-5
"
>


<p
className="
font-semibold
text-white
"
>

{
payment.user.name ??
"User"
}

</p>


<p
className="
text-xs
text-slate-400
"
>

{
payment.user.email
}

</p>


</td>








<td
className="
p-5
font-mono
text-xs
text-slate-300
"
>

{
payment.orderId
}

</td>








<td
className="
p-5
font-bold
text-white
"
>

Rp
{
payment.amount.toLocaleString(
"id-ID"
)
}

</td>








<td
className="
p-5
"
>


{

payment.proofUrl

?

<a

href={payment.proofUrl}

target="_blank"

className="
rounded-lg
bg-violet-500/20
px-3
py-2
text-xs
font-semibold
text-violet-300
"

>

Lihat Bukti

</a>


:

<span
className="
text-xs
text-slate-500
"
>

Belum upload

</span>


}



</td>









<td
className="
p-5
"
>


<span

className={`

rounded-full
px-3
py-1
text-xs
font-bold

${
payment.status==="SUCCESS"

?

"bg-emerald-500/20 text-emerald-400"

:

"bg-orange-500/20 text-orange-400"

}

`}

>

{

payment.status==="SUCCESS"

?

"Berhasil"

:

"Menunggu"

}


</span>


</td>









<td
className="
p-5
text-slate-300
"
>

{
payment.provider ??
"-"
}

</td>









<td
className="
p-5
"
>



{

payment.status==="PAYMENT_SUBMITTED"

&&

<PaymentConfirmButton

orderId={
payment.orderId
}

/>

}





{

payment.status==="SUCCESS"

&&

<span
className="
text-xs
font-semibold
text-emerald-400
"
>

✓ Confirmed

</span>

}



</td>





</tr>


))

}



</tbody>



</table>



</div>



</div>

);

}