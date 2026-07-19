"use client";

import { signIn } from "next-auth/react";

export default function LoginPage(){


return (

<main
className="
min-h-screen
flex
items-center
justify-center
bg-slate-50
"
>


<div
className="
w-full
max-w-md
rounded-3xl
border
border-slate-200
bg-white
p-10
shadow-xl
text-center
"
>


<h1
className="
text-3xl
font-black
text-slate-900
"
>
TrafficSaaS
</h1>


<p
className="
mt-3
text-slate-500
"
>
Login to your workspace
</p>



<button

onClick={()=>signIn(
"google",
{
 callbackUrl:"/dashboard"
}
)}

className="
mt-8
w-full
rounded-xl
bg-gradient-to-r
from-violet-600
to-sky-500
px-6
py-3
font-bold
text-white
transition
hover:scale-105
"

>

Continue with Google

</button>



</div>


</main>

);

}