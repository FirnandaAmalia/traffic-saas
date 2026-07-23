import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import {
  getSubscriptionUsage,
} from "@/lib/subscription";

import {
  Zap,
  ArrowUpRight,
} from "lucide-react";

import SidebarUser from "./sidebar-user";
import SidebarNavItem from "./sidebar-nav";


export default async function Sidebar() {


const session =
await getServerSession(authOptions);



const subscriptionUsage =
session?.user?.email
?
await getSubscriptionUsage(
session.user.email
)
:
null;



const plan =
subscriptionUsage?.plan
??
"FREE";


const projectCount =
subscriptionUsage?.projectCount
??
0;


const projectLimit =
subscriptionUsage
?
subscriptionUsage.projectLimit
:
1;



const usagePercentage =
projectLimit === null
?
null
:
Math.min(
(projectCount / projectLimit) * 100,
100
);




return (

<aside
className="
flex
h-screen
w-64
flex-col
border-r
border-slate-200
bg-white
"
>


{/* BRAND */}

<div
className="
border-b
border-slate-200
px-5
py-4
"
>


<div
className="
flex
items-center
gap-3
"
>


<div
className="
flex
h-9
w-9
items-center
justify-center
rounded-xl
bg-gradient-to-br
from-blue-600
to-indigo-600
shadow-sm
"
>

<Zap
className="
h-4
w-4
text-white
"
/>

</div>



<div>

<h1
className="
text-lg
font-bold
tracking-tight
text-slate-900
"
>
TrafficSaaS
</h1>


<p
className="
text-[11px]
text-slate-500
"
>
SEO Intelligence Platform
</p>


</div>


</div>


</div>







{/* NAVIGATION */}

<div
className="
flex
flex-1
flex-col
overflow-y-auto
px-3
py-4
"
>


<SidebarSection title="Main">

<SidebarNavItem
href="/dashboard"
label="Dashboard"
icon="dashboard"
/>

</SidebarSection>





<SidebarSection title="SEO Intelligence">


<SidebarNavItem
href="/analytics"
label="Traffic Analytics"
icon="trending"
/>


<SidebarNavItem
href="/keywords"
label="Keyword Intelligence"
icon="target"
/>


<SidebarNavItem
href="/ai"
label="AI SEO Consultant"
icon="brain"
/>


</SidebarSection>

<SidebarSection title="Integrations">

<SidebarNavItem
href="/setup/gsc"
label="Search Console"
icon="search"
/>


<SidebarNavItem
href="/setup/ga4"
label="Google Analytics"
icon="chart"
/>


</SidebarSection>








<SidebarSection title="Workspace">


<SidebarNavItem
href="/projects"
label="Projects"
icon="folder"
/>


</SidebarSection>

{/* BOTTOM AREA */}


<div
className="
mt-auto
space-y-3
pt-3
"
>



{/* SUBSCRIPTION */}


<div
className="
rounded-xl
border
border-slate-200
bg-slate-50
p-3
"
>


<p
className="
text-xs
font-semibold
text-slate-700
"
>
Subscription
</p>


<p
className="
mt-0.5
text-[11px]
text-slate-500
"
>
Current plan
</p>





<div
className="
mt-2
rounded-lg
bg-blue-50
px-3
py-2
"
>


<div
className="
flex
items-center
justify-between
"
>


<span
className="
text-xs
text-slate-500
"
>
Plan
</span>


<span
className="
text-lg
font-bold
text-blue-600
"
>
{plan}
</span>


</div>


</div>







<div
className="
mt-3
"
>


<div
className="
flex
justify-between
text-[11px]
text-slate-500
"
>


<span>
Projects
</span>


<span>

{
projectLimit === null
?
"Unlimited"
:
`${projectCount}/${projectLimit}`
}

</span>


</div>






{
projectLimit === null

?

<div
className="
mt-1.5
rounded-lg
bg-blue-50
px-2
py-1.5
text-center
text-[11px]
font-medium
text-blue-700
"
>

Unlimited projects

</div>


:


<div
className="
mt-1.5
h-1.5
overflow-hidden
rounded-full
bg-slate-200
"
>


<div
className="
h-full
rounded-full
bg-blue-600
"
style={{
width:`${usagePercentage ?? 0}%`
}}
/>


</div>

}


</div>








{
plan==="FREE"
&&

<Link
href="/billing"
className="
mt-3
flex
items-center
justify-center
gap-1
rounded-lg
border
border-blue-200
bg-white
px-3
py-1.5
text-xs
font-medium
text-blue-600
hover:bg-blue-50
"
>

Upgrade

<ArrowUpRight
className="
h-3.5
w-3.5
"
/>


</Link>

}




</div>







<SidebarUser

name={
session?.user?.name
}

email={
session?.user?.email
}

image={
session?.user?.image
}

/>





</div>



</div>


</aside>


);

}







function SidebarSection({

title,

children,

}:{

title:string;

children:React.ReactNode;

}){


return (

<div
className="
mb-4
"
>


<p
className="
mb-2
px-2
text-[10px]
font-semibold
uppercase
tracking-[0.18em]
text-slate-400
"
>

{title}

</p>



<div
className="
space-y-0.5
"
>

{children}

</div>



</div>


);


}