"use client";

import {
  Joyride,
  STATUS,
} from "react-joyride";

import type {
  Step,
} from "react-joyride";

import { motion } from "framer-motion";

import {
  BarChart3,
  Target,
  Bot,
  Search,
  TrendingUp,
  Folder,
  Activity,
  BriefcaseBusiness,
} from "lucide-react";

interface Props {
  run:boolean;
  onFinish:()=>void;
}

function PremiumTourCard({

step,
category,
icon,
title,
subtitle,
description,
insights,
benefit,

}:{

step:string;

category:string;

icon:keyof typeof TOUR_ICONS;

title:string;

subtitle:string;

description:string;

insights:string[];

benefit:string;

}){


const Icon = TOUR_ICONS[icon];


return (

<div
className="
w-[360px]
rounded-[28px]
"
>

{/* HEADER */}

<div
className="
flex
justify-center
"
>

<div
className="
flex
flex-col
items-center
gap-2
text-center
"
>
<div
className="
flex
h-9
w-9
items-center
justify-center
rounded-xl
bg-gradient-to-br
from-blue-600
to-indigo-600
text-xs
font-bold
text-white
shadow-lg
shadow-blue-200
"
>

{step}

</div>



<div>

<p
className="
text-[10px]
font-bold
uppercase
tracking-widest
text-blue-600
"
>

{category}

</p>


<p
className="
text-xs
text-slate-400
"
>

TrafficSaaS Intelligence

</p>


</div>


</div>




</div>


{/* ICON */}

<motion.div
initial={{
scale:0.5,
opacity:0,
rotate:-15
}}

animate={{
scale:1,
opacity:1,
rotate:0
}}

transition={{
duration:0.45,
type:"spring"
}}

className="
mt-6
mx-auto
flex
h-20
w-20
items-center
justify-center
rounded-3xl
bg-gradient-to-br
from-blue-50
via-white
to-indigo-100
shadow-inner
"
>

<Icon
className="
h-10
w-10
text-blue-600
"
/>

</motion.div>

{/* TITLE */}

<h2
className="
mt-5
text-xl
font-bold
tracking-tight
text-slate-900
"
>

{title}

</h2>


<p
className="
mt-1
text-sm
font-medium
text-blue-600
"
>

{subtitle}

</p>





{/* DESCRIPTION */}

<p
className="
mt-4
text-sm
leading-6
text-slate-600
"
>

{description}

</p>





{/* INSIGHT */}

<div
className="
mt-5
rounded-[22px]
border
border-slate-100
bg-slate-50
p-4
"
>


<div
className="
mb-3
flex
items-center
gap-2
"
>

<div
className="
h-2
w-2
rounded-full
bg-emerald-500
"
/>


<p
className="
text-xs
font-bold
text-slate-700
"
>

Key Insights

</p>


</div>




<div
className="
space-y-2
"
>

{
insights.map((item)=>(


<div
key={item}
className="
flex
items-center
gap-2
text-xs
text-slate-600
"
>

<span
className="
text-emerald-500
"
>
✓
</span>

{item}


</div>


))
}


</div>


</div>






{/* PREMIUM VALUE */}

<div
className="
mt-4
rounded-[22px]
bg-gradient-to-r
from-blue-600
to-indigo-600
p-4
text-white
shadow-lg
shadow-blue-200
"
>


<p
className="
text-[10px]
font-bold
uppercase
tracking-wider
text-blue-100
"
>

Business Impact

</p>



<p
className="
mt-1
text-xs
leading-5
"
>

{benefit}

</p>


</div>





</div>

);


}

const TOUR_ICONS = {
  analytics: BarChart3,
  target: Target,
  ai: Bot,
  search: Search,
  growth: TrendingUp,
  folder: Folder,
  performance: Activity,
  project: BriefcaseBusiness,
};

const steps: Step[] = [

{
target: ".tour-dashboard",
placement: "right",

content: (

<PremiumTourCard

step="01"

category="DASHBOARD UTAMA"

icon="analytics"

title="Dashboard SEO Intelligence"

subtitle="Pusat kendali pertumbuhan website Anda"

description="
Halaman utama TrafficSaaS untuk melihat kondisi
SEO website secara menyeluruh dalam satu tampilan.
"

insights={[

"Ringkasan performa SEO",

"Visibilitas website",

"Perkembangan pertumbuhan"

]}

benefit="
Membantu mengambil keputusan berdasarkan data
SEO yang nyata.
"

/>

)

},



{
target: ".tour-analytics",

placement:"right",

content:(

<PremiumTourCard

step="02"

category="ANALISIS TRAFFIC"

icon="growth"

title="Traffic Analytics"

subtitle="Pahami perjalanan pengunjung website"

description="
Analisis perkembangan traffic dan bagaimana
pengunjung menemukan serta menggunakan website Anda.
"

insights={[

"Tren pertumbuhan traffic",

"Sumber pengunjung",

"Perbandingan performa"

]}

benefit="
Mengetahui sumber traffic terbaik untuk meningkatkan
pertumbuhan website.
"

/>

)

},




{
target: ".tour-keywords",

placement:"right",

content:(

<PremiumTourCard

step="03"

category="KECERDASAN SEO"

icon="target"

title="Keyword Intelligence"

subtitle="Temukan peluang ranking Google"

description="
Pantau keyword yang membawa pengunjung dan
temukan peluang baru untuk meningkatkan posisi pencarian.
"

insights={[

"Keyword terbaik",

"Posisi ranking",

"Peluang optimasi"

]}

benefit="
Membantu menemukan peluang SEO sebelum kompetitor.
"

/>

)

},




{
target: ".tour-ai",

placement:"right",

content:(

<PremiumTourCard

step="04"

category="AI POWERED"

icon="ai"

title="AI SEO Consultant"

subtitle="Asisten strategi SEO berbasis AI"

description="
AI menganalisis data website dan memberikan
rekomendasi optimasi yang dapat diterapkan.
"

insights={[

"Rekomendasi SEO",

"Prioritas perbaikan",

"Strategi pertumbuhan"

]}

benefit="
Menghemat waktu analisis dan membantu membuat
keputusan lebih cepat.
"

/>

)

},




{
target: ".tour-gsc",

placement:"right",

content:(

<PremiumTourCard

step="05"

category="DATA GOOGLE"

icon="search"

title="Google Search Console"

subtitle="Pahami performa website di Google"

description="
Hubungkan data pencarian Google untuk mengetahui
bagaimana pengguna menemukan website Anda.
"

insights={[

"Keyword pencarian",

"Jumlah klik",

"Impression dan CTR"

]}

benefit="
Mengetahui apa yang dicari pengguna melalui Google.
"

/>

)

},




{
target: ".tour-ga4",

placement:"right",

content:(

<PremiumTourCard

step="06"

category="ANALISIS PENGUNJUNG"

icon="performance"

title="Google Analytics 4"

subtitle="Pahami perilaku pengguna"

description="
Pelajari aktivitas pengunjung setelah masuk
ke website Anda.
"

insights={[

"Jumlah pengguna",

"Sumber traffic",

"Perilaku pengunjung"

]}

benefit="
Membantu mengoptimalkan website berdasarkan
perilaku pengguna sebenarnya.
"

/>

)

},




{
target: ".tour-projects",

placement:"right",

content:(

<PremiumTourCard

step="07"

category="WORKSPACE"

icon="project"

title="SEO Workspace"

subtitle="Kelola semua website dalam satu tempat"

description="
Atur seluruh project website dan pantau performanya
dalam workspace yang terstruktur.
"

insights={[

"Multi project website",

"Data SEO terorganisir",

"Dashboard terpisah"

]}

benefit="
Cocok untuk bisnis, marketer, dan agency yang
mengelola banyak website.
"

/>

)

},

];

export default function DashboardTour({

run,

onFinish,

}:Props){


return (
<Joyride

steps={steps}

run={run}

continuous

onEvent={(event: {
  status?: string;
})=>{

if(
event.status === STATUS.FINISHED ||
event.status === STATUS.SKIPPED
){

localStorage.setItem(
"traffic-saas-tour-completed",
"true"
);

onFinish();

}

}}



/>

)

}