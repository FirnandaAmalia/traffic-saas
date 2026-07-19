import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getSubscriptionUsage,
} from "@/lib/subscription";

import {
  LayoutDashboard,
  FolderKanban,
  Search,
  BarChart3,
  Zap,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";

import SidebarUser from "./sidebar-user";

export default async function Sidebar() {


  const session =
    await getServerSession(authOptions);



  const subscriptionUsage =
  session?.user?.email
    ? await getSubscriptionUsage(
        session.user.email
      )
    : null;

const plan =
  subscriptionUsage?.plan ??
  "FREE";

const projectCount =
  subscriptionUsage
    ?.projectCount ??
  0;

const projectLimit =
  subscriptionUsage
    ? subscriptionUsage.projectLimit
    : 1;

const usagePercentage =
  projectLimit === null
    ? null
    : Math.min(
        (
          projectCount /
          projectLimit
        ) * 100,
        100
      );



  const workspaceName =
    session?.user?.name
    ??
    session?.user?.email?.split("@")[0]
    ??
    "Workspace";




  return (

<aside
className="
flex
h-screen
w-72
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
px-6
py-8
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
h-11
w-11
items-center
justify-center
rounded-2xl
bg-gradient-to-br
from-blue-600
to-indigo-600
shadow-lg
"
>

<Zap
className="
h-5
w-5
text-white
"
/>

</div>


<div>

<h1
className="
text-xl
font-bold
tracking-tight
"
>
TrafficSaaS
</h1>


<p
className="
text-xs
text-slate-500
"
>
SEO Intelligence Platform
</p>


</div>


</div>

</div>





{/* CONTENT */}

<div
className="
flex
flex-1
flex-col
overflow-y-auto
px-5
py-6
"
>


{/* WORKSPACE */}

<div
className="
mb-8
"
>


<p
className="
mb-3
px-3
text-xs
font-semibold
uppercase
tracking-[0.2em]
text-slate-500
"
>
Workspace
</p>



<div
className="
mb-5
rounded-2xl
border
border-slate-200
bg-slate-50
p-4
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
font-semibold
text-slate-900
"
>
{workspaceName}
</p>


<p
className="
mt-1
text-xs
text-slate-500
"
>
{projectCount}{" "}
{projectCount === 1
  ? "Project"
  : "Projects"}
</p>


</div>



<ChevronDown
className="
h-4
w-4
text-slate-400
"
/>


</div>


</div>





<div
className="
space-y-1
"
>


<Link
href="/dashboard"
className="
flex
items-center
gap-3
rounded-xl
bg-blue-50
px-3
py-3
text-sm
font-semibold
text-blue-700
"
>

<LayoutDashboard
className="
h-5
w-5
"
/>

Dashboard

</Link>





<Link
href="/projects"
className="
flex
items-center
gap-3
rounded-xl
px-3
py-3
text-sm
font-medium
text-slate-600
hover:bg-slate-100
"
>

<FolderKanban
className="
h-5
w-5
"
/>

Workspace

</Link>


</div>


</div>





{/* INTEGRATIONS */}

<div>


<p
className="
mb-3
px-3
text-xs
font-semibold
uppercase
tracking-[0.2em]
text-slate-500
"
>
Integrations
</p>




<div
className="
space-y-1
"
>


<Link
href="/setup/gsc"
className="
flex
items-center
gap-3
rounded-xl
px-3
py-3
text-sm
font-medium
text-slate-600
hover:bg-slate-100
"
>

<Search
className="
h-5
w-5
"
/>

Search Console

</Link>




<Link
href="/setup/ga4"
className="
flex
items-center
gap-3
rounded-xl
px-3
py-3
text-sm
font-medium
text-slate-600
hover:bg-slate-100
"
>

<BarChart3
className="
h-5
w-5
"
/>

Google Analytics

</Link>


</div>


</div>






{/* BOTTOM */}

<div
className="
mt-auto
space-y-4
pt-6
"
>




{/* SUBSCRIPTION */}

<div
className="
rounded-2xl
border
border-slate-200
bg-slate-50
p-4
"
>


<p
className="
text-sm
font-semibold
"
>
Subscription
</p>


<p
className="
mt-1
text-xs
text-slate-500
"
>
Current plan
</p>





<div
className="
mt-4
rounded-xl
bg-blue-50
p-4
"
>


<p
className="
text-xs
text-slate-500
"
>
Plan
</p>


<p
className="
text-xl
font-bold
text-blue-600
"
>
{plan}
</p>


</div>






<div
className="
mt-4
"
>


<div
className="
flex
justify-between
text-xs
text-slate-500
"
>

<span>
Projects
</span>

<span>
  {projectLimit === null
    ? "Unlimited"
    : `${projectCount}/${projectLimit}`
  }
</span>

</div>




{projectLimit === null ? (
  <div
    className="
    mt-2
    rounded-xl
    bg-blue-50
    px-3
    py-2
    text-center
    text-xs
    font-medium
    text-blue-700
    "
  >
    Unlimited projects
  </div>
) : (
  <div
    className="
    mt-2
    h-2
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
        width:
          `${usagePercentage ?? 0}%`,
      }}
    />
  </div>
)}


</div>

{plan === "FREE" && (
  <button
    type="button"
    className="
    mt-4
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-blue-200
    bg-white
    px-3
    py-2
    text-sm
    font-medium
    text-blue-600
    hover:bg-blue-50
    "
  >
    Upgrade Plan

    <ArrowUpRight
      className="
      h-4
      w-4
      "
    />
  </button>
)}



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