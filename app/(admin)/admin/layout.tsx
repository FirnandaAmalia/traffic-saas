"use client";


import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FolderKanban,
  BadgeDollarSign,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { usePathname } from "next/navigation";





const menu = [

{
  name:"Dashboard",
  href:"/admin",
  icon:LayoutDashboard,
},


{
  name:"Users",
  href:"/admin/users",
  icon:Users,
},


{
  name:"Payments",
  href:"/admin/payments",
  icon:CreditCard,
},


{
  name:"Projects",
  href:"/admin/projects",
  icon:FolderKanban,
},


{
  name:"Subscriptions",
  href:"/admin/subscriptions",
  icon:BadgeDollarSign,
},


];






export default function AdminDashboardLayout({

children,

}:{

children:React.ReactNode;

}){


const pathname =
usePathname();




return (

<div

className="
flex
min-h-screen
bg-slate-50
"

>


{/* SIDEBAR */}


<aside

className="
fixed
left-0
top-0
z-40
h-screen
w-72
border-r
border-slate-200
bg-white
"

>



<div

className="
flex
h-20
items-center
gap-3
border-b
border-slate-200
px-6
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
text-white
shadow-lg
shadow-blue-200
"

>

<ShieldCheck

className="
h-6
w-6
"

/>


</div>



<div>


<h1

className="
font-black
tracking-tight
text-slate-900
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

Admin Console

</p>


</div>



</div>








{/* MENU */}


<nav

className="
mt-6
space-y-1
px-4
"

>


{

menu.map((item)=>{


const Icon =
item.icon;



const active =
pathname === item.href;



return (

<Link

key={item.href}

href={item.href}

className={`

flex
items-center
gap-3
rounded-2xl
px-4
py-3
text-sm
font-medium
transition


${
active

?

"bg-blue-50 text-blue-700"

:

"text-slate-600 hover:bg-slate-50 hover:text-slate-900"

}

`}

>


<Icon

className="
h-5
w-5
"

/>


<span>

{item.name}

</span>


</Link>


);


})


}



</nav>









{/* FOOTER */}


<div

className="
absolute
bottom-0
left-0
right-0
border-t
border-slate-200
p-4
"

>


<div

className="
rounded-2xl
bg-slate-50
p-4
"

>


<p

className="
text-xs
font-semibold
text-slate-700
"

>

Administrator

</p>


<p

className="
mt-1
text-xs
text-slate-500
"

>

Full platform access

</p>


</div>





<button

className="
mt-3
flex
w-full
items-center
gap-3
rounded-xl
px-4
py-3
text-sm
font-medium
text-slate-500
hover:bg-red-50
hover:text-red-600
"

>


<LogOut

className="
h-5
w-5
"

/>


Logout


</button>



</div>






</aside>









{/* CONTENT */}


<main

className="
ml-72
min-h-screen
flex-1
p-8
"

>


{children}


</main>





</div>

);


}