import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import {
  User,
  Mail,
  ShieldCheck,
  Globe2,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";


export default async function SettingsPage(){


const session =
await getServerSession(authOptions);



const user = session?.user;



return (

<div className="
space-y-8
p-8
max-w-5xl
">


{/* HEADER */}

<div>

<h1 className="
text-3xl
font-bold
text-slate-900
">

Profile Settings

</h1>


<p className="
mt-2
text-sm
text-slate-500
">

Manage your TrafficSaaS account and preferences.

</p>


</div>







{/* PROFILE CARD */}


<section
className="
rounded-3xl
border
bg-white
p-8
shadow-sm
"
>


<div
className="
flex
items-center
gap-6
"
>


<Avatar
className="
h-24
w-24
ring-4
ring-blue-100
"
>

<AvatarImage
src={
user?.image ?? ""
}
/>


<AvatarFallback
className="
bg-gradient-to-br
from-blue-600
to-indigo-600
text-white
text-3xl
font-bold
"
>

{
user?.name
?.charAt(0)
?.toUpperCase()
?? "U"
}

</AvatarFallback>


</Avatar>




<div>


<h2
className="
text-2xl
font-bold
text-slate-900
"
>

{
user?.name ?? "User"
}

</h2>


<p
className="
text-sm
text-slate-500
"
>

{
user?.email
}

</p>



<div
className="
mt-3
inline-flex
items-center
gap-2
rounded-full
bg-blue-50
px-3
py-1
text-xs
font-semibold
text-blue-600
"
>

<ShieldCheck
size={14}
/>

Administrator

</div>


</div>



</div>


</section>









{/* ACCOUNT INFORMATION */}


<section
className="
rounded-3xl
border
bg-white
p-6
shadow-sm
"
>


<h3
className="
text-lg
font-bold
text-slate-900
"
>

Account Information

</h3>



<div
className="
mt-5
grid
gap-4
md:grid-cols-2
"
>



<InfoCard

icon={<User/>}

title="Full Name"

value={
user?.name ?? "-"
}

/>



<InfoCard

icon={<Mail/>}

title="Email Address"

value={
user?.email ?? "-"
}

/>



<InfoCard

icon={<Globe2/>}

title="Login Provider"

value="Google OAuth"

/>



<InfoCard

icon={<ShieldCheck/>}

title="Account Role"

value="Administrator"

/>



</div>


</section>










{/* SECURITY */}


<section
className="
rounded-3xl
border
bg-white
p-6
shadow-sm
"
>


<div
className="
flex
items-center
gap-3
"
>

<ShieldCheck
className="
text-blue-600
"
/>


<h3
className="
text-lg
font-bold
"
>

Security

</h3>


</div>




<p
className="
mt-3
text-sm
text-slate-500
"
>

Your account is protected using Google authentication.
Password management is handled by Google.

</p>



<div
className="
mt-5
rounded-2xl
bg-green-50
p-4
text-sm
font-medium
text-green-700
"
>

✓ Google account connected securely

</div>


</section>





</div>

);


}







function InfoCard({

icon,

title,

value,

}:{

icon:React.ReactNode;

title:string;

value:string;

}){


return (

<div
className="
rounded-2xl
border
bg-slate-50
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


<div
className="
text-blue-600
"
>

{icon}

</div>



<div>

<p
className="
text-xs
text-slate-500
"
>

{title}

</p>


<p
className="
mt-1
font-semibold
text-slate-900
break-all
"
>

{value}

</p>


</div>


</div>


</div>


);

}