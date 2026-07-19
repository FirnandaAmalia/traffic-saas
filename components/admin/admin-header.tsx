import {
  ShieldCheck,
  Users,
  Crown,
} from "lucide-react";


export default function AdminHeader(){

return (

<div
className="
flex
items-center
justify-between

rounded-3xl

border
border-slate-200

bg-white

p-6

shadow-sm
"
>


<div className="flex items-center gap-4">


<div
className="
flex
h-14
w-14
items-center
justify-center

rounded-2xl

bg-gradient-to-br

from-violet-600

to-sky-500

text-white

shadow-lg
"
>

<ShieldCheck />

</div>



<div>

<h1
className="
text-2xl
font-black
text-slate-900
"
>
TrafficSaaS Admin
</h1>


<p
className="
text-sm
text-slate-500
"
>
Manage users & subscriptions
</p>


</div>


</div>



<div className="flex gap-3">


<div
className="
flex
items-center
gap-2

rounded-xl

bg-violet-50

px-4
py-3

text-sm
font-bold
text-violet-700
"
>

<Users className="h-4 w-4"/>

Users

</div>



<div
className="
flex
items-center
gap-2

rounded-xl

bg-amber-50

px-4
py-3

text-sm
font-bold
text-amber-700
"
>

<Crown className="h-4 w-4"/>

Pro Control

</div>


</div>


</div>

);

}