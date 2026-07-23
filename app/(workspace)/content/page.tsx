import {
  RefreshCcw,
  TrendingDown,
  FileText,
  Sparkles,
} from "lucide-react";


export default function ContentPage(){

return (

<div className="
p-8
space-y-8
">


{/* HEADER */}

<div>

<h1 className="
text-3xl
font-black
text-slate-900
">

Content Refresh Center

</h1>


<p className="
mt-2
text-slate-500
">

Identifikasi halaman yang mengalami penurunan performa dan dapatkan rekomendasi optimasi konten berbasis data SEO.

</p>

</div>





{/* KPI */}

<div className="
grid
gap-4
md:grid-cols-3
">


<Card
icon={<FileText/>}
title="Pages Need Attention"
value="12"
/>


<Card
icon={<TrendingDown/>}
title="Traffic Lost"
value="-18%"
/>


<Card
icon={<RefreshCcw/>}
title="Last Update"
value="45 Days Ago"
/>


</div>





{/* CONTENT ANALYSIS */}

<section className="
rounded-3xl
border
bg-white
p-6
">


<div className="
flex
items-center
gap-2
">

<RefreshCcw
className="text-orange-500"
/>


<h2 className="
font-bold
text-lg
">

Content Opportunities

</h2>


</div>





<div className="
mt-5
space-y-4
">


<ContentCard
page="/services"
change="-35%"
action="Update keyword dan meta description"
/>


<ContentCard
page="/blog/seo-guide"
change="-22%"
action="Tambahkan informasi terbaru dan FAQ"
/>


<ContentCard
page="/pricing"
change="-15%"
action="Optimalkan CTA dan conversion element"
/>


</div>



</section>







{/* AI INSIGHT */}

<section className="
rounded-3xl
border
bg-gradient-to-r
from-indigo-50
to-blue-50
p-6
">


<div className="
flex
gap-3
items-start
">


<Sparkles
className="
text-indigo-600
"
/>


<div>

<h3 className="
font-bold
">

AI Recommendation

</h3>


<p className="
mt-2
text-sm
text-slate-600
">

Halaman dengan penurunan klik membutuhkan pembaruan konten agar tetap relevan terhadap perubahan pencarian Google.

</p>


</div>


</div>


</section>




</div>


);

}





function Card({
icon,
title,
value
}:{
icon:React.ReactNode;
title:string;
value:string;
}){

return (

<div className="
rounded-2xl
border
bg-white
p-5
">


<div className="
flex
justify-between
">

<div className="
text-blue-600
">

{icon}

</div>


</div>


<p className="
mt-4
text-sm
text-slate-500
">

{title}

</p>


<h3 className="
mt-1
text-3xl
font-black
">

{value}

</h3>


</div>

)

}







function ContentCard({
page,
change,
action
}:{
page:string;
change:string;
action:string;
}){

return (

<div className="
rounded-2xl
border
p-4
flex
items-center
justify-between
">


<div>

<p className="
font-bold
">

{page}

</p>


<p className="
text-sm
text-slate-500
">

{action}

</p>


</div>



<span className="
rounded-full
bg-red-50
px-3
py-1
text-xs
font-bold
text-red-600
">

{change}

</span>



</div>

)

}