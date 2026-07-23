"use client";

import Link from "next/link";

import { signOut } from "next-auth/react";

import {
  LogOut,
  Settings,
  CreditCard,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";



interface SidebarUserProps {

  name?: string | null;

  email?: string | null;

  image?: string | null;

}



export default function SidebarUser({

  name,

  email,

  image,

}: SidebarUserProps) {



return (

<div

className="
rounded-2xl
border
border-slate-200
bg-white
shadow-sm
overflow-hidden
"

>


{/* PROFILE HEADER */}


<div

className="
p-4
"

>


<div

className="
flex
items-center
gap-3
"

>


<Avatar

className="
h-12
w-12
ring-2
ring-blue-100
"

>


<AvatarImage

src={
image ?? ""
}

/>



<AvatarFallback

className="
bg-gradient-to-br
from-blue-600
to-indigo-600
text-white
font-bold
"

>

{
name?.charAt(0)?.toUpperCase()
??
"U"
}


</AvatarFallback>


</Avatar>





<div

className="
min-w-0
"

>


<p

className="
truncate
text-sm
font-bold
text-slate-900
"

>

{
name ?? "User"
}


</p>





<div

className="
mt-1
flex
items-center
gap-1
"

>


<ShieldCheck

className="
h-3.5
w-3.5
text-blue-600
"

/>


<span

className="
text-[11px]
font-semibold
text-blue-600
"

>

Administrator

</span>


</div>





<p

className="
mt-1
truncate
text-[11px]
text-slate-500
"

>

{
email
}


</p>



</div>



</div>



</div>









{/* MENU */}


<div

className="
border-t
border-slate-100
"

>



<Link

href="/settings"

className="
group
flex
w-full
items-center
justify-between
px-4
py-3
transition
hover:bg-slate-50
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
rounded-lg
bg-blue-50
p-2
text-blue-600
"

>

<Settings

className="
h-4
w-4
"

/>


</div>



<div>


<p

className="
text-sm
font-medium
text-slate-700
"

>

Profile Settings

</p>


<p

className="
text-[11px]
text-slate-400
"

>

Manage account

</p>


</div>


</div>




<ChevronRight

className="
h-4
w-4
text-slate-300
transition
group-hover:translate-x-1
group-hover:text-blue-600
"

/>


</Link>









<Link

href="/billing"

className="
group
flex
w-full
items-center
justify-between
px-4
py-3
transition
hover:bg-slate-50
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
rounded-lg
bg-indigo-50
p-2
text-indigo-600
"

>


<CreditCard

className="
h-4
w-4
"

/>


</div>




<div>


<p

className="
text-sm
font-medium
text-slate-700
"

>

Subscription

</p>


<p

className="
text-[11px]
text-slate-400
"

>

Manage plan & billing

</p>


</div>



</div>




<ChevronRight

className="
h-4
w-4
text-slate-300
transition
group-hover:translate-x-1
group-hover:text-indigo-600
"

/>



</Link>



</div>









{/* LOGOUT */}


<div

className="
border-t
border-slate-100
p-3
"

>


<button


onClick={()=>


signOut({

callbackUrl:"/",

})


}


className="
flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-red-50
px-3
py-2.5
text-xs
font-semibold
text-red-600
transition
hover:bg-red-100
"

>


<LogOut

className="
h-4
w-4
"

/>


Sign Out


</button>



</div>





</div>


);


}