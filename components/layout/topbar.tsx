"use client";

import {
  ChevronDown,
  Settings,
  CreditCard,
  LogOut,
} from "lucide-react";

import {
  useSession,
  signOut,
} from "next-auth/react";

import {
  useState,
} from "react";

import Link from "next/link";

export default function Topbar(){


const {
 data:session,
 status,
}=useSession();


const [open,setOpen]=
useState(false);



const userName =
session?.user?.name ??
"User";


const userRole =
session?.user?.role==="ADMIN"
?
"Administrator"
:
"Member";


const userImage =
session?.user?.image;

const initial =
userName
.charAt(0)
.toUpperCase();

if(status==="loading"){

return (

<header
className="
sticky
top-0
z-30
flex
h-16
items-center
justify-between
border-b
border-slate-200
bg-white/80
px-8
backdrop-blur-xl
"
>

<div/>

</header>

);

}

return (

<header
className="
sticky
top-0
z-30
flex
h-16
items-center
justify-between
border-b
border-slate-200
bg-white/80
px-8
backdrop-blur-xl
"
>

{/* LEFT EMPTY */}

<div />

{/* RIGHT */}

<div
className="
flex
items-center
gap-3
"
>

{/* PROFILE DROPDOWN */}



<div
className="
relative
"
>


<button

onClick={()=>setOpen(!open)}

className="
flex
h-11
items-center
gap-3
rounded-xl
border
border-slate-200
bg-white
px-3
hover:bg-slate-50
"

>


<div

className="
flex
h-9
w-9
items-center
justify-center
overflow-hidden
rounded-full
bg-gradient-to-br
from-blue-600
to-indigo-600
font-bold
text-white
"

>


{
userImage

?

<img

src={userImage}

alt={userName}

className="
h-full
w-full
object-cover
"

/>

:

initial

}


</div>





<div
className="
text-left
"
>


<p

className="
text-sm
font-semibold
text-slate-900
"

>

{userName}

</p>


<p

className="
text-xs
text-slate-500
"

>

{userRole}

</p>



</div>




<ChevronDown
size={15}
className="
text-slate-400
"
/>



</button>









{
open &&

<div

className="
absolute
right-0
mt-3
w-56
rounded-2xl
border
bg-white
p-2
shadow-xl
"

>


<Link

href="/settings"

className="
flex
items-center
gap-3
rounded-xl
px-3
py-3
text-sm
hover:bg-slate-50
"

>

<Settings size={16}/>

Profile Settings

</Link>






<Link

href="/billing"

className="
flex
items-center
gap-3
rounded-xl
px-3
py-3
text-sm
hover:bg-slate-50
"

>


<CreditCard size={16}/>

Subscription


</Link>






<button

onClick={()=>signOut({
callbackUrl:"/"
})}

className="
flex
w-full
items-center
gap-3
rounded-xl
px-3
py-3
text-sm
text-red-600
hover:bg-red-50
"

>


<LogOut size={16}/>

Sign Out


</button>




</div>

}



</div>





</div>



</header>

);


}