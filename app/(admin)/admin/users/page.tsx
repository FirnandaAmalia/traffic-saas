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
  Crown,
  UserCheck,
} from "lucide-react";

import UserPlanSelector from "@/components/admin/user-plan-selector";




export default async function AdminUsersPage(){



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

users,

] = await Promise.all([



prisma.user.count(),



prisma.subscription.count({

where:{

plan:"PRO"

}

}),





prisma.user.findMany({

orderBy:{

createdAt:"desc"

},


take:50,


include:{

subscription:true

}


})


]);







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

Users Management

</h1>



<p

className="
mt-2
text-sm
text-slate-500
"

>

Kelola pengguna TrafficSaaS dan informasi subscription.

</p>


</div>









{/* SUMMARY */}



<div

className="
grid
gap-6
md:grid-cols-3
"

>



<SummaryCard

title="Total Users"

value={totalUsers.toString()}

icon={<Users className="h-6 w-6"/>}

/>





<SummaryCard

title="PRO Users"

value={proUsers.toString()}

icon={<Crown className="h-6 w-6"/>}

/>





<SummaryCard

title="Active Account"

value={users.length.toString()}

icon={<UserCheck className="h-6 w-6"/>}

/>



</div>









{/* USER TABLE */}



<section

className="
rounded-3xl
border
border-slate-200
bg-white
shadow-sm
overflow-hidden
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

Latest Users

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

User

</th>


<th className="px-6 py-4">

Plan

</th>


<th className="px-6 py-4">

Joined

</th>


<th className="px-6 py-4">

ID

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

users.map((user)=>(


<tr

key={user.id}

className="
hover:bg-slate-50
transition
"

>


<td

className="
px-6
py-4
"

>


<div>


<p

className="
font-semibold
text-slate-900
"

>

{user.email}

</p>



<p

className="
text-xs
text-slate-500
"

>

{user.name ?? "No name"}

</p>


</div>


</td>

<td
className="
px-6
py-4
"
>

<UserPlanSelector

  userId={user.id}

  currentPlan={
    user.subscription?.plan ?? "FREE"
  }

/>

</td>

<td

className="
px-6
py-4
text-slate-600
"

>


{

new Date(
user.createdAt
).toLocaleDateString(
"id-ID"
)

}


</td>






<td

className="
px-6
py-4
font-mono
text-xs
text-slate-400
"

>


{user.id.slice(0,8)}


</td>



</tr>


))


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