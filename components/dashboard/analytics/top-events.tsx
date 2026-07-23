import {
  Activity,
} from "lucide-react";


import Widget from "../layout/widget";

import LiveBadge from "../metrics/live-badge";


import type {
  EventMetric,
} from "@/lib/types/ga4";





interface TopEventsProps {

  data: EventMetric[];

}





function formatNumber(
  value:number
){


if(value >= 1_000_000){

return `${(
value / 1_000_000
).toFixed(1)} Jt`;

}



if(value >= 1_000){

return `${(
value / 1_000
).toFixed(1)} Rb`;

}



return value.toLocaleString(
"id-ID"
);


}






const COLORS = [

"#2563eb",

"#10b981",

"#8b5cf6",

"#f59e0b",

"#ef4444",

];








export default function TopEvents({

data,

}:TopEventsProps){





const total =

data.reduce(

(sum,item)=>

sum + item.count,

0

);






const max =

Math.max(

...data.map(

item=>item.count

),

1

);







return (



<Widget


title="⚡ Event Teratas"


subtitle="Event GA4 yang paling sering terjadi"


badge={
<LiveBadge />
}


>





<div

className="
relative
h-[360px]
"

>






{/* TOP FADE */}


<div

className="
pointer-events-none
absolute
left-0
right-0
top-0
z-10
h-6
bg-gradient-to-b
from-white
to-transparent
"

/>








{

data.length === 0


?


(



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


Belum ada data event


</div>



)



:

(






<div

className="
h-full
overflow-y-auto
space-y-4
pr-2
scrollbar-thin
scrollbar-thumb-slate-300
"

>


{


data

.slice(0,5)

.map((item,index)=>{






const percent =

total === 0

?

0

:

(item.count / total) * 100;








const width =

(item.count / max) * 100;







return (



<div


key={item.event}


className="
rounded-xl
p-2
transition-all
duration-200
hover:bg-slate-50
hover:shadow-sm
"

>







<div

className="
mb-2
flex
items-center
justify-between
gap-3
"

>







<div

className="
flex
min-w-0
items-center
gap-2
"

>





<Activity

className="
h-4
w-4
shrink-0
"

style={{

color:

COLORS[
index %
COLORS.length
]

}}

/>







<span

className="
truncate
text-sm
font-medium
text-slate-700
"

>

{

item.event

}


</span>







</div>







<div

className="
text-right
"

>


<p

className="
text-sm
font-semibold
text-slate-900
"

>


{

formatNumber(
item.count
)

}


</p>


<p

className="
text-[10px]
text-slate-400
"

>

Jumlah


</p>


</div>








</div>









<div

className="
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
transition-all
duration-500
"

style={{

width:
`${width}%`,

backgroundColor:

COLORS[
index %
COLORS.length
]

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

Kontribusi event

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





)

}









{/* BOTTOM FADE */}


<div

className="
pointer-events-none
absolute
bottom-0
left-0
right-0
z-10
h-8
bg-gradient-to-t
from-white
to-transparent
"

/>






</div>





</Widget>



);


}