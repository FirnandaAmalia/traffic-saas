"use client";


import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";





interface Props {

  open:boolean;

  onClose:()=>void;

}







export default function WorkspaceReady({

open,

onClose,

}:Props){





if(!open)

return null;







return (



<div

className="
fixed
inset-0
z-[99999]
flex
items-center
justify-center
bg-slate-950/50
backdrop-blur-md
px-4
"

>



<motion.div


initial={{

opacity:0,

scale:0.9,

y:20

}}



animate={{

opacity:1,

scale:1,

y:0

}}



transition={{

duration:0.35,

type:"spring"

}}



className="
relative
w-full
max-w-[420px]
rounded-[32px]
border
border-slate-100
bg-white
p-8
shadow-2xl
"

>







<div

className="
absolute
right-5
top-5
"

>

<Sparkles

className="
h-5
w-5
text-blue-500
"

/>

</div>








<div

className="
mx-auto
flex
h-20
w-20
items-center
justify-center
rounded-[28px]
bg-gradient-to-br
from-emerald-50
to-blue-50
"

>


<CheckCircle2

className="
h-12
w-12
text-emerald-500
"

/>


</div>








<h2

className="
mt-6
text-center
text-2xl
font-bold
tracking-tight
text-slate-900
"

>

Workspace SEO Anda Siap 🚀

</h2>






<p

className="
mt-3
text-center
text-sm
leading-6
text-slate-600
"

>

TrafficSaaS sudah siap membantu Anda
menganalisis performa website dan menemukan
peluang pertumbuhan SEO.

</p>









<div

className="
mt-6
space-y-3
rounded-2xl
bg-slate-50
p-4
"

>



<p

className="
mb-3
text-xs
font-bold
uppercase
tracking-wider
text-slate-700
"

>

Fitur siap digunakan

</p>





<div

className="
space-y-3
"

>



<div

className="
flex
items-center
gap-3
text-sm
text-slate-600
"

>

<CheckCircle2

className="
h-4
w-4
text-emerald-500
"

/>

Dashboard SEO Intelligence

</div>






<div

className="
flex
items-center
gap-3
text-sm
text-slate-600
"

>

<CheckCircle2

className="
h-4
w-4
text-emerald-500
"

/>

Traffic & Keyword Analytics

</div>






<div

className="
flex
items-center
gap-3
text-sm
text-slate-600
"

>

<CheckCircle2

className="
h-4
w-4
text-emerald-500
"

/>

AI SEO Recommendation

</div>






</div>


</div>









<button


onClick={onClose}



className="
mt-6
flex
w-full
items-center
justify-center
gap-2
rounded-2xl
bg-gradient-to-r
from-blue-600
to-indigo-600
py-3.5
text-sm
font-semibold
text-white
shadow-lg
shadow-blue-200
transition
hover:scale-[1.02]
hover:shadow-xl
"

>


Mulai Eksplorasi


<ArrowRight

className="
h-4
w-4
"

/>


</button>








<p

className="
mt-4
text-center
text-xs
text-slate-400
"

>

Anda dapat mengakses seluruh fitur kapan saja melalui sidebar.

</p>






</motion.div>






</div>


);


}