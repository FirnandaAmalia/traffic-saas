import {
  TrendingUp,
  Search,
  Users,
  MousePointerClick,
} from "lucide-react";


interface Props {

  clicks:number;

  impressions:number;

  users:number;

}



export default function GrowthOverview({

clicks,

impressions,

users,

}:Props){



const ctr =
impressions
?
((clicks / impressions) * 100)
:
0;



const score =
Math.min(
100,
Math.round(
(
ctr * 20
)
+
(
users / 100
)
)
);



const scoreLabel =
score >= 80
?
"Sangat Baik"
:
score >= 60
?
"Baik"
:
score >= 40
?
"Perlu Optimasi"
:
"Rendah";



return (

<section

className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
"

>


{/* HEADER */}

<div

className="
mb-6
flex
items-center
justify-between
"

>


<div>


<h2

className="
text-lg
font-bold
text-slate-900
"

>

Ringkasan Pertumbuhan

</h2>



<p

className="
text-sm
text-slate-500
"

>

Ringkasan performa website berdasarkan data Google

</p>


</div>



<div

className="
rounded-xl
bg-blue-50
px-3
py-2
text-xs
font-semibold
text-blue-600
"

>

28 Hari Terakhir

</div>



</div>






<div

className="
grid
gap-5
lg:grid-cols-4
"

>





{/* SCORE */}

<Card

icon={
<TrendingUp
className="h-5 w-5 text-blue-600"
/>
}

color="blue"

title="Skor Pertumbuhan"

value={score.toString()}

description={scoreLabel}

/>





{/* CLICKS */}


<Card

icon={
<MousePointerClick
className="h-5 w-5 text-emerald-600"
/>
}

color="emerald"

title="Klik Organik"

value={
clicks.toLocaleString("id-ID")
}

description="Klik dari Google Search Console"

/>







{/* IMPRESSIONS */}


<Card

icon={
<Search
className="h-5 w-5 text-violet-600"
/>
}

color="violet"

title="Tayangan Pencarian"

value={
impressions.toLocaleString("id-ID")
}

description="Kemunculan website di Google"

/>








{/* USERS */}


<Card

icon={
<Users
className="h-5 w-5 text-orange-600"
/>
}

color="orange"

title="Pengguna Aktif"

value={
users.toLocaleString("id-ID")
}

description="Pengunjung website"

/>



</div>



</section>


);

}





function Card({

icon,

title,

value,

description,

color,

}:{

icon:React.ReactNode;

title:string;

value:string;

description:string;

color:
"blue"
|
"emerald"
|
"violet"
|
"orange";

}){



const colors = {

blue:
"bg-blue-50",

emerald:
"bg-emerald-50",

violet:
"bg-violet-50",

orange:
"bg-orange-50",

};



return (

<div

className="
rounded-2xl
border
border-slate-200
bg-white
p-5
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

className={`
rounded-xl
p-3
${colors[color]}
`}

>

{icon}

</div>



<div>


<p

className="
text-sm
text-slate-500
"

>

{title}

</p>



<p

className="
mt-1
text-3xl
font-black
tracking-tight
text-slate-900
"

>

{value}

</p>



</div>



</div>



<p

className="
mt-4
text-xs
text-slate-500
"

>

{description}

</p>



</div>

);

}