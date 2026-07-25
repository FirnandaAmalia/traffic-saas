import {
  FileText,
} from "lucide-react";


import Widget from "../layout/widget";

import LiveBadge from "../metrics/live-badge";


import type {
  LandingPageMetric,
} from "@/lib/types/ga4";





interface LandingPagesProps {

  data: LandingPageMetric[];

}







export default function LandingPages({

data,

}:LandingPagesProps){






const total =

data.reduce(

(sum,item)=>

sum + item.sessions,

0

);






const max =

Math.max(

...data.map(

item => item.sessions

),

1

);

return (

<Widget

title="Top Landing Pages"

subtitle="Halaman website dengan trafik organik tertinggi"


badge={
<LiveBadge />
}


>



<div className="relative h-[360px]">





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

Belum tersedia data halaman tujuan


</div>



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

.map((item)=>{





const percent =

total === 0

?

0

:

(item.sessions / total) * 100;







const width =

(item.sessions / max) * 100;







const path =

item.page === "/"

?

"/"

:

item.page

.replace(

"(not set)",

"/"

)

.replace(

"https://yaplegal.id",

""

);







return (



<div


key={item.page}


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





<FileText

className="
h-4
w-4
shrink-0
text-blue-600
"

/>






<span

className="
truncate
text-sm
font-medium
text-slate-700
"

title={path}

>


{path}


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
item.sessions.toLocaleString(
"id-ID"
)
}


</p>


<p

className="
text-[10px]
text-slate-400
"

>

Sesi

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

Kontribusi trafik

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