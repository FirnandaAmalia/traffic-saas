import {
Sparkles,
Lock,
} from "lucide-react";


export function UpgradeCard({

title,
description,
featureList,

}:{

title:string;

description:string;

featureList:string[];

}){


return (

<div

className="
mx-auto
max-w-xl
rounded-3xl
border
bg-white
p-10
text-center
shadow-xl
"

>


<div

className="
mx-auto
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-gradient-to-br
from-violet-600
to-blue-600
text-white
"

>


<Lock/>

</div>



<h2

className="
mt-6
text-3xl
font-black
text-slate-900
"

>

{title}

</h2>



<p

className="
mt-3
text-slate-500
"

>

{description}

</p>



<div

className="
mt-6
space-y-3
text-left
"

>

{

featureList.map(
(item)=>(

<div

key={item}

className="
flex
items-center
gap-3
rounded-xl
bg-slate-50
p-3
text-sm
font-medium
"

>

<Sparkles
size={16}
className="text-violet-600"
/>

{item}

</div>

)

)

}


</div>




<a

href="/billing"

className="
mt-8
block
rounded-xl
bg-blue-600
py-3
font-bold
text-white
hover:bg-blue-700
"

>

Upgrade ke PRO

</a>




</div>

);


}