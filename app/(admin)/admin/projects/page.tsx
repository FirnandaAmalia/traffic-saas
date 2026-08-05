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
  Globe2,
  BarChart3,
  Search,
  FolderKanban,
} from "lucide-react";

import { getLocale } from "next-intl/server";




export default async function AdminProjectsPage(){


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

totalProjects,

ga4Connected,

gscConnected,

projects

] = await Promise.all([



prisma.project.count(),



prisma.project.count({

where:{

ga4PropertyId:{
not:null
}

}

}),



prisma.project.count({

where:{

gscSiteUrl:{
not:null
}

}

}),





prisma.project.findMany({

orderBy:{

createdAt:"desc"

},


take:50,


include:{

user:true

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

Projects Management

</h1>



<p

className="
mt-2
text-sm
text-slate-500
"

>

Monitor seluruh website dan integrasi SEO user TrafficSaaS.

</p>


</div>









{/* SUMMARY */}



<div

className="
grid
gap-6
md:grid-cols-4
"

>


<SummaryCard

title="Total Projects"

value={totalProjects.toString()}

icon={<FolderKanban className="h-6 w-6"/>}

/>



<SummaryCard

title="GA4 Connected"

value={ga4Connected.toString()}

icon={<BarChart3 className="h-6 w-6"/>}

/>



<SummaryCard

title="GSC Connected"

value={gscConnected.toString()}

icon={<Search className="h-6 w-6"/>}

/>



<SummaryCard

title="Active Website"

value={projects.length.toString()}

icon={<Globe2 className="h-6 w-6"/>}

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

Latest Projects

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

Website

</th>


<th className="px-6 py-4">

Owner

</th>


<th className="px-6 py-4">

GA4

</th>


<th className="px-6 py-4">

GSC

</th>


<th className="px-6 py-4">

Last Sync

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

projects.map((project)=>(


<tr

key={project.id}

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


<p

className="
font-semibold
text-slate-900
"

>

{project.projectName}

</p>



<p

className="
text-xs
text-slate-500
"

>

{project.gscSiteUrl ?? "-"}

</p>


</td>








<td

className="
px-6
py-4
"

>


<div>


<p

className="
font-medium
text-slate-900
"

>

{project.user.email}

</p>


</div>


</td>








<td

className="
px-6
py-4
"

>


<StatusBadge

active={
Boolean(project.ga4PropertyId)
}

/>


</td>







<td

className="
px-6
py-4
"

>


<StatusBadge

active={
Boolean(project.gscSiteUrl)
}

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

project.lastSyncedAt

?

new Date(
project.lastSyncedAt
).toLocaleDateString(
"id-ID"
)

:

"-"

}


</td>





</tr>


))


}



{

projects.length===0 && (

<tr>

<td

colSpan={5}

className="
px-6
py-10
text-center
text-slate-400
"

>

Belum ada project.

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









function StatusBadge({

active,

}:{

active:boolean;

}){


return (

<span

className={`

rounded-full
px-3
py-1
text-xs
font-semibold


${
active

?

"bg-emerald-50 text-emerald-700"

:

"bg-slate-100 text-slate-500"

}

`}

>

{

active

?

"Connected"

:

"Not Connected"

}


</span>

);


}