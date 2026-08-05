"use client";

import {
  Globe,
  Smartphone,
} from "lucide-react";


import Widget from "./widget";

import LiveBadge from "../metrics/live-badge";


import type {
  BrowserMetric,
} from "@/lib/types/ga4";





interface BrowserSectionProps {

  data: BrowserMetric[];
  title:string;

}

const BROWSER_ICONS = {

  Chrome: Globe,

  Safari: Globe,

  Edge: Globe,

  Firefox: Globe,

  Opera: Globe,

  "Samsung Internet": Smartphone,

  Android: Smartphone,

  SafariWebview: Smartphone,

};


export default function BrowserSection({

data,

title,

}:BrowserSectionProps){





const total =

data.reduce(

(sum,item)=>

sum + item.users,

0

);







const max =

Math.max(

...data.map(

(item)=>

item.users

),

1

);







return (



<Widget


title={title}


subtitle="Most used browsers from Google Analytics 4"


badge={
<LiveBadge />
}


className="
h-[420px]
"


>







<div

className="
flex
h-full
flex-col
overflow-hidden
"

>









{

data.length === 0 ?



<div

className="
flex
h-full
items-center
justify-center
text-sm
text-slate-500
"

>

No browser data available

</div>







:







<div


className="
h-full
flex-1
space-y-3
overflow-y-auto
p-4
pr-3
scrollbar-thin
scrollbar-thumb-slate-300
scrollbar-track-transparent
"

>








{

data.map((item)=>{





const Icon =

BROWSER_ICONS[
item.browser as keyof typeof BROWSER_ICONS
]

??

Globe;








const percent =

total === 0

?

0

:

(item.users / total) * 100;









const width =

(item.users / max) * 100;







return (



<div


key={item.browser}


className="
rounded-xl
border
border-slate-100
bg-white
p-3
transition
hover:border-blue-100
hover:bg-slate-50
"

>









<div

className="
flex
items-center
justify-between
"

>









<div

className="
flex
min-w-0
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
rounded-lg
bg-slate-100
text-slate-600
"

>

<Icon

className="
h-5
w-5
"

/>

</div>








<span

className="
truncate
text-sm
font-semibold
text-slate-700
"

>

{item.browser}

</span>







</div>









<div

className="
flex
items-center
gap-2
"

>

<Globe

className="
h-4
w-4
text-blue-600
"

/>





<span

className="
text-sm
font-bold
text-slate-900
"

>

{

item.users.toLocaleString(
"id-ID"
)

}

</span>





</div>







</div>









<div

className="
mt-3
h-2
overflow-hidden
rounded-full
bg-slate-100
"

>


<div


className="
h-full
rounded-full
bg-blue-600
transition-all
duration-500
"


style={{

width:

`${width}%`

}}


/>



</div>









<div

className="
mt-1
flex
justify-between
text-xs
text-slate-500
"

>


<span>

Active Users

</span>




<span>

{

percent.toFixed(1)

}%

</span>




</div>









</div>



);


})



}





</div>







}



</div>







</Widget>



);


}