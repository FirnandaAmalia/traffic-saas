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
  DollarSign,
  CreditCard,
  Clock,
  TrendingUp,
} from "lucide-react";





export default async function AdminRevenuePage(){



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

transactions

]=await Promise.all([



prisma.payment.count({

where:{

status:"SUCCESS"

}

}),




prisma.payment.count({

where:{

status:"PENDING"

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

include:{

user:true

},

take:50

})



]);






const totalRevenue =
revenue._sum.amount ?? 0;



const averageRevenue =
successPayments > 0

?

Math.floor(
totalRevenue / successPayments
)

:

0;









return (

<div

className="
space-y-8
"

>





<header>


<h1

className="
text-3xl
font-black
text-slate-900
"

>

Revenue Analytics

</h1>


<p

className="
mt-2
text-sm
text-slate-500
"

>

Monitoring pendapatan TrafficSaaS.

</p>


</header>








<div

className="
grid
gap-6
md:grid-cols-4
"

>



<Card

title="Total Revenue"

value={
`Rp ${totalRevenue.toLocaleString("id-ID")}`
}

icon={<DollarSign/>}

/>




<Card

title="Successful Payment"

value={successPayments}

icon={<TrendingUp/>}

/>




<Card

title="Pending"

value={pendingPayments}

icon={<Clock/>}

/>




<Card

title="Average Order"

value={
`Rp ${averageRevenue.toLocaleString("id-ID")}`
}

icon={<CreditCard/>}

/>



</div>









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

Payment History

</h2>


</div>







<table

className="
w-full
text-sm
"

>



<thead

className="
bg-slate-50
text-xs
uppercase
text-slate-500
"

>


<tr>


<th className="px-6 py-4 text-left">
User
</th>


<th className="px-6 py-4 text-left">
Order ID
</th>


<th className="px-6 py-4 text-left">
Amount
</th>


<th className="px-6 py-4 text-left">
Status
</th>


<th className="px-6 py-4 text-left">
Date
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

transactions.map((payment)=>(


<tr

key={payment.id}

className="
hover:bg-slate-50
"

>


<td

className="
px-6 py-4
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
px-6 py-4
text-slate-500
"

>

{payment.orderId}

</td>







<td

className="
px-6 py-4
font-bold
text-slate-900
"

>

Rp {payment.amount.toLocaleString("id-ID")}

</td>







<td

className="
px-6 py-4
"

>


<StatusBadge

status={payment.status}

/>


</td>







<td

className="
px-6 py-4
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




</tr>


))


}



</tbody>


</table>



</section>






</div>

);

}









function Card({

title,

value,

icon

}:{

title:string;

value:string|number;

icon:React.ReactNode;

}){


return (

<div

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"

>


<div

className="
flex
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

status

}:{

status:string;

}){


const success =
status==="SUCCESS";


const pending =
status==="PENDING";



return (

<span

className={`

rounded-full
px-3
py-1
text-xs
font-bold


${
success

?

"bg-emerald-50 text-emerald-700"

:

pending

?

"bg-orange-50 text-orange-700"

:

"bg-red-50 text-red-700"

}

`}

>

{status}

</span>


);

}