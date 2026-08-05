import KeywordTable from "@/components/keywords/keyword-table";

import {
  Search,
  TrendingUp,
  Target,
  MousePointerClick,
} from "lucide-react";


import {
  getTranslations,
} from "next-intl/server";


import {
  getServerSession,
} from "next-auth";


import {
  redirect,
} from "next/navigation";


import {
  authOptions,
} from "@/lib/auth";


import {
  resolveProjectForUser,
} from "@/lib/project-service";


import {
  getDashboardData,
} from "@/lib/dashboard-service";


import type {
  GSCRow,
} from "@/lib/types/gsc";


export default async function KeywordPage(){


const t =
await getTranslations("keywords");



const session =
await getServerSession(
  authOptions
);



if(
 !session?.user?.id ||
 !session.refreshToken
){
 redirect("/login");
}



const project =
await resolveProjectForUser({

userId:
session.user.id

});



if(!project){

return (

<div className="p-10">

Project belum tersedia

</div>

);

}



const dashboard =
await getDashboardData(

session.refreshToken,

project,

"28d"

);



const keywords:GSCRow[] =
dashboard.queries ?? [];



const totalKeywords =
keywords.length;



const top10Keywords =
keywords.filter(
(item)=>
(item.position ?? 0) <= 10
).length;



const averagePosition =
keywords.length
?
(
keywords.reduce(
(sum,item)=>
sum + (item.position ?? 0),
0
)
/ keywords.length
).toFixed(1)
:
"0";



const averageCTR =
keywords.length
?
(
keywords.reduce(
(sum,item)=>
sum + (item.ctr ?? 0),
0
)
/ keywords.length
*
100
).toFixed(1)
:
"0";




return (

<div

className="
space-y-6
"

>


<div>


<h1

className="
text-3xl
font-bold
"

>

{t("title")}

</h1>



<p

className="
mt-2
text-slate-500
"

>

{t("description")}

</p>


</div>





<div

className="
grid
gap-5
lg:grid-cols-4
"

>


<Card

icon={Search}

title={t("cards.total")}

value={
totalKeywords.toLocaleString("id-ID")
}

/>



<Card

icon={TrendingUp}

title={t("cards.ranking")}

value={
top10Keywords.toLocaleString("id-ID")
}

/>



<Card

icon={Target}

title={t("cards.visibility")}

value={
averagePosition
}

/>



<Card

icon={MousePointerClick}

title={t("cards.ctr")}

value={`${averageCTR}%`}

/>



</div>





<KeywordTable

keywords={keywords}

/>



</div>

);


}





function Card({

icon:Icon,

title,

value,

}:{

icon:React.ElementType;

title:string;

value:string;

}){


return (

<div

className="
rounded-2xl
border
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

className="
rounded-xl
bg-blue-50
p-3
text-blue-600
"

>


<Icon

className="
h-5
w-5
"

/>


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
text-3xl
font-black
"

>

{value}

</p>



</div>


</div>


</div>


);


}