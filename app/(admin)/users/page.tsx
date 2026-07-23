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



export default async function UsersPage(){



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






const users =

await prisma.user.findMany({

orderBy:{

createdAt:"desc"

},


include:{


subscription:true,


_count:{


select:{


projects:true


}


}


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



<h1

className="
text-3xl
font-black
text-white
"

>

User Management

</h1>



<p

className="
mt-2
text-sm
text-slate-400
"

>

Kelola user dan subscription TrafficSaaS.

</p>






<div

className="
mt-8
overflow-x-auto
rounded-3xl
border
border-slate-800
bg-slate-900
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
Role
</th>


<th className="p-5">
Plan
</th>


<th className="p-5">
Projects
</th>


<th className="p-5">
Join Date
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
border-slate-800
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
user.name ??
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
user.email
}

</p>


</td>







<td

className="
p-5
"

>


<span

className="
rounded-full
bg-blue-500/20
px-3
py-1
text-xs
font-bold
text-blue-400
"

>

{
user.role
}

</span>


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
user.subscription?.plan==="PRO"

?

"bg-emerald-500/20 text-emerald-400"

:

"bg-slate-700 text-slate-300"

}

`}

>


{
user.subscription?.plan ??
"FREE"
}


</span>


</td>








<td

className="
p-5
text-white
"

>


{
user._count.projects
}

 Project


</td>








<td

className="
p-5
text-slate-400
"

>


{
new Date(
user.createdAt
)
.toLocaleDateString(
"id-ID"
)

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