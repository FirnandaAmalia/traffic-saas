import {
  Globe,
  Mail,
  MousePointerClick,
  Search,
  Share2,
  Smartphone,
} from "lucide-react";


import Widget from "../layout/widget";

import LiveBadge from "../metrics/live-badge";


import type {
  TrafficSourceMetric,
} from "@/lib/types/ga4";



interface Props {

  data: TrafficSourceMetric[];

}







const ICONS: Record<
string,
React.ElementType
> = {


"Organic Search":
Search,


Direct:
MousePointerClick,


Referral:
Share2,


"Organic Social":
Smartphone,


Email:
Mail,


};








const LABELS: Record<
string,
string
> = {


"Organic Search":
"Pencarian Organik",


Direct:
"Langsung",


Referral:
"Rujukan",


"Organic Social":
"Media Sosial Organik",


Email:
"Email",


};









export default function TrafficAcquisition({

data,

}:Props){



const total =

data.reduce(

(sum,item)=>

sum + item.sessions,

0

);





const max =

Math.max(

...data.map(

(item)=>

item.sessions

),

1

);







return (


<Widget

title="🚦 Akuisisi Trafik"

subtitle="Sumber kunjungan utama website"

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
"

>


<div

className="
h-full
flex-1
space-y-3
overflow-y-auto
p-4
pr-2
scrollbar-thin
scrollbar-thumb-slate-300
scrollbar-track-transparent
"

>

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

Belum ada data kunjungan


</div>



:


data.map(

(item)=>{


const Icon =

ICONS[item.channel]

??

Globe;





const label =

LABELS[item.channel]

??

item.channel;





const percent =

total === 0

?

0

:

(item.sessions / total) * 100;






const width =

(item.sessions / max) * 100;








return (


<div


key={item.channel}


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
items-center
gap-3
"

>




<div

className="
flex
h-8
w-8
items-center
justify-center
rounded-full
bg-blue-50
"

>


<Icon

className="
h-4
w-4
text-blue-600
"

/>


</div>







<div>


<p

className="
text-sm
font-semibold
text-slate-800
"

>

{label}


</p>





<p

className="
text-[11px]
text-slate-500
"

>

{
percent.toFixed(1)
}% dari total kunjungan


</p>





</div>





</div>









<div

className="
text-right
"

>


<div

className="
text-sm
font-bold
text-slate-900
"

>

{
item.sessions.toLocaleString(
"id-ID"
)
}


</div>





<div

className="
text-[10px]
text-slate-400
"

>

Sesi


</div>



</div>







</div>








<div

className="
mt-3
h-1.5
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






</div>


);


}


)



}




</div>



</div>



</Widget>


);


}