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
  Crown,
  Users,
  CalendarDays,
} from "lucide-react";

import { getLocale } from "next-intl/server";



export default async function AdminSubscriptionsPage(){

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

totalSubscriptions,

proSubscriptions,

freeSubscriptions,

subscriptions

]=await Promise.all([



prisma.subscription.count(),



prisma.subscription.count({

where:{

plan:"PRO"

}

}),



prisma.subscription.count({

where:{

plan:"FREE"

}

}),



prisma.subscription.findMany({

orderBy:{

createdAt:"desc"

},


include:{

user:true

},


take:50

})



]);







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

Subscription Management

</h1>



<p

className="
mt-2
text-sm
text-slate-500
"

>

Kelola paket pengguna TrafficSaaS.

</p>


</header>









<div

className="
grid
gap-6
md:grid-cols-3
"

>


<StatCard

title="Total Subscription"

value={totalSubscriptions}

icon={<Users/>}

/>



<StatCard

title="PRO Users"

value={proSubscriptions}

icon={<Crown/>}

/>



<StatCard

title="FREE Users"

value={freeSubscriptions}

icon={<CalendarDays/>}

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

All Subscriptions

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
Plan
</th>


<th className="px-6 py-4 text-left">
Created
</th>


<th className="px-6 py-4 text-left">
Updated
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

subscriptions.map((sub)=>(


<tr

key={sub.id}

className="
hover:bg-slate-50
"

>


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

{sub.user.email}

</p>


</td>









<td

className="
px-6
py-4
"

>


<PlanBadge

plan={sub.plan}

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
sub.createdAt
).toLocaleDateString(
"id-ID"
)

}


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
sub.updatedAt
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









function StatCard({

title,

value,

icon

}:{

title:string;

value:number;

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









function PlanBadge({

plan

}:{

plan:string;

}){


const isPro =
plan==="PRO";



return (

<span

className={`

rounded-full
px-3
py-1
text-xs
font-bold

${
isPro

?

"bg-purple-50 text-purple-700"

:

"bg-slate-100 text-slate-600"

}

`}

>

{plan}

</span>


);

}