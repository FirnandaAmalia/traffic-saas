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
  Users,
  CreditCard,
  DollarSign,
  Clock,
} from "lucide-react";

import { getLocale } from "next-intl/server";



export default async function AdminPage(){

const locale = await getLocale();
const session =
await getServerSession(
  authOptions
);



if(!session?.user?.id){

redirect("/login");

}



if(session.user.role !== "ADMIN"){

redirect(`/${locale}/dashboard`);

}





const [

totalUsers,

proUsers,

payments,

pendingPayments,

revenue

] = await Promise.all([



prisma.user.count(),



prisma.subscription.count({

where:{

plan:"PRO"

}

}),



prisma.payment.findMany({

orderBy:{

createdAt:"desc"

},

take:5,

include:{

user:true

}

}),



prisma.payment.count({

where:{

status:"PAYMENT_SUBMITTED"

}

}),



prisma.payment.aggregate({

where:{

status:"SUCCESS"

},

_sum:{

amount:true

}

})


]);





const totalRevenue =
revenue._sum.amount ?? 0;





return (

<div

className="
min-h-screen
bg-slate-50
p-8
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

TrafficSaaS Admin

</h1>



<p

className="
mt-2
text-sm
text-slate-500
"

>

Monitoring platform, user, subscription,
dan transaksi TrafficSaaS.

</p>


</div>







{/* STAT CARD */}



<div

className="
grid
gap-6
md:grid-cols-4
"

>



<StatCard

title="Total Users"

value={totalUsers.toString()}

icon={<Users className="h-6 w-6"/>}

/>




<StatCard

title="PRO Users"

value={proUsers.toString()}

icon={<CreditCard className="h-6 w-6"/>}

/>




<StatCard

title="Revenue"

value={
`Rp${totalRevenue.toLocaleString("id-ID")}`
}

icon={<DollarSign className="h-6 w-6"/>}

/>




<StatCard

title="Pending Payment"

value={pendingPayments.toString()}

icon={<Clock className="h-6 w-6"/>}

/>



</div>








{/* PAYMENT TABLE */}



<section

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
items-center
justify-between
"

>


<h2

className="
text-xl
font-bold
text-slate-900
"

>

Recent Payments

</h2>



<span

className="
text-xs
text-slate-400
"

>

Last 5 transaction

</span>


</div>







<div

className="
mt-5
space-y-3
"

>


{

payments.map(payment=>(


<div

key={payment.id}

className="
flex
items-center
justify-between
rounded-2xl
border
border-slate-100
bg-slate-50
p-4
"

>


<div>


<p

className="
font-semibold
text-slate-900
"

>

{payment.user.email}

</p>



<p

className="
text-xs
text-slate-500
"

>

{payment.orderId}

</p>


</div>







<div

className="
text-right
"

>


<p

className="
font-bold
text-slate-900
"

>

Rp{
payment.amount.toLocaleString("id-ID")
}

</p>



<span

className="
text-xs
font-medium
text-emerald-600
"

>

{payment.status}

</span>


</div>




</div>


))


}



{
payments.length===0 && (

<p

className="
py-10
text-center
text-sm
text-slate-400
"

>

Belum ada transaksi.

</p>

)

}



</div>



</section>






</div>


);


}









function StatCard({

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
p-6
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
text-3xl
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