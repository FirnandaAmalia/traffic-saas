"use client";

import {
  TrendingUp,
  Search,
  Users,
  MousePointerClick,
} from "lucide-react";

import { useTranslations } from "next-intl";


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


const t = useTranslations("dashboard");



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

t("score.excellent")

:

score >= 60

?

t("score.good")

:

score >= 40

?

t("score.optimize")

:

t("score.low");





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

t("aiConsultant.growth.title")

</h2>



<p

className="
text-sm
text-slate-500
"

>

{t("growth.subtitle")}

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

{t("range.28d")}

</div>



</div>








<div

className="
grid
gap-5
lg:grid-cols-4
"

>



<Card

icon={
<TrendingUp
className="
h-5
w-5
text-blue-600
"
/>
}

color="blue"

title={t("metrics.growthScore")}

value={score.toString()}

description={scoreLabel}

/>







<Card

icon={
<MousePointerClick
className="
h-5
w-5
text-emerald-600
"
/>
}

color="emerald"

title={t("metrics.clicks")}

value={
clicks.toLocaleString()
}

description={
t("metrics.clicksDescription")
}

/>








<Card

icon={
<Search
className="
h-5
w-5
text-violet-600
"
/>
}

color="violet"

title={
t("metrics.impressions")
}

value={
impressions.toLocaleString()
}

description={
t("metrics.impressionsDescription")
}

/>








<Card

icon={
<Users
className="
h-5
w-5
text-orange-600
"
/>
}

color="orange"

title={
t("metrics.users")
}

value={
users.toLocaleString()
}

description={
t("metrics.usersDescription")
}

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