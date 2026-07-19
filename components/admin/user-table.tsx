import { prisma } from "@/lib/prisma";
import { toggleUserPlan } from "./actions";


export default async function UserTable(){


const users = await prisma.user.findMany({

include:{
subscription:true,
},

orderBy:{
createdAt:"desc",
},

});



return (

<div
className="
overflow-hidden

rounded-3xl

border

border-slate-200

bg-white

shadow-sm
"
>


<table className="w-full">


<thead
className="
border-b
bg-slate-50
"
>

<tr>

<th className="p-5 text-left text-sm">
User
</th>


<th className="p-5 text-center text-sm">
Role
</th>


<th className="p-5 text-center text-sm">
Plan
</th>


<th className="p-5 text-center text-sm">
Action
</th>

</tr>

</thead>

<tbody>

{
users.map(user=>(

<tr
key={user.id}
className="
border-b
last:border-0
"
>


<td className="p-5">

<p
className="
font-bold
text-slate-900
"
>
{user.name ?? "No Name"}
</p>

<p
className="
text-sm
text-slate-500
"
>
{user.email}
</p>

</td>



<td className="p-5 text-center">

<span
className="
rounded-full
bg-slate-100
px-3
py-1
text-xs
font-bold
"
>
{user.role}
</span>

</td>




<td className="p-5 text-center">

<span
className={`
rounded-full
px-4
py-2
text-xs
font-black

${
user.subscription?.plan === "PRO"

?

"bg-violet-100 text-violet-700"

:

"bg-slate-100 text-slate-700"

}
`}
>

{
user.subscription?.plan ?? "FREE"
}

</span>

</td>




<td className="p-5 text-center">

<form
action={async()=>{

  await toggleUserPlan(
    user.id
  );

}}
>


<button
className="
rounded-xl
bg-gradient-to-r
from-violet-600
to-sky-500
px-5
py-2
text-sm
font-bold
text-white
transition
hover:scale-105
"
>

{
user.subscription?.plan === "PRO"
?
"Downgrade"
:
"Upgrade"
}

</button>


</form>

</td>



</tr>

))
}

</tbody>


</table>


</div>

);

}