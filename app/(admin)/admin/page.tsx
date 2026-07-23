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




export default async function AdminPage(){



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
bg-slate-950
p-8
space-y-8
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

Admin Dashboard

</h1>



<p

className="
mt-2
text-sm
text-slate-400
"

>

Monitoring TrafficSaaS platform.

</p>


</div>








<div

className="
grid
gap-5
md:grid-cols-4
"

>


<StatCard

title="Total Users"

value={totalUsers.toString()}

icon={<Users/>}

/>



<StatCard

title="PRO Users"

value={proUsers.toString()}

icon={<CreditCard/>}

/>



<StatCard

title="Revenue"

value={
`Rp${totalRevenue.toLocaleString("id-ID")}`
}

icon={<DollarSign/>}

/>



<StatCard

title="Pending Payment"

value={pendingPayments.toString()}

icon={<Clock/>}

/>



</div>









<section

className="
rounded-3xl
border
border-slate-800
bg-slate-900
p-6
"

>


<h2

className="
text-xl
font-bold
text-white
"

>

Recent Payment

</h2>





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
bg-slate-800
p-4
"

>


<div>


<p

className="
font-semibold
text-white
"

>

{
payment.user.email
}

</p>



<p

className="
text-xs
text-slate-400
"

>

{
payment.orderId
}

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
text-white
"

>

Rp{
payment.amount.toLocaleString("id-ID")
}

</p>



<span

className="
text-xs
text-emerald-400
"

>

{
payment.status
}

</span>


</div>



</div>


))


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
border-slate-800
bg-slate-900
p-5
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
text-slate-400
"

>

{title}

</p>



<h3

className="
mt-2
text-3xl
font-black
text-white
"

>

{value}

</h3>


</div>




<div

className="
rounded-2xl
bg-blue-500/20
p-3
text-blue-400
"

>

{icon}

</div>



</div>


</div>


);


}