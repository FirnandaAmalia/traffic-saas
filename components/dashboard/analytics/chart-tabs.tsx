"use client";
import {
  useMemo,
  useState,
} from "react";


import {
  MousePointerClick,
  Search,
  Users,
  Activity,
} from "lucide-react";


import TrafficChart from "@/components/charts/TrafficChart";



interface ChartTabsProps {


  clicksHistory: {

    date:string;

    clicks:number;

    impressions:number;

  }[];



  usersHistory:{

    date:string;

    users:number;

    sessions:number;

  }[];




  clicks:number;

  impressions:number;

  users:number;

  sessions:number;



  rangeLabel:string;


}





const tabs = [

{
  key:"clicks",
  label:"Klik",
},


{
  key:"impressions",
  label:"Tayangan",
},


{
  key:"users",
  label:"Pengguna",
},


{
  key:"sessions",
  label:"Sesi",
},


] as const;



type Tab =
(typeof tabs)[number]["key"];








export default function ChartTabs({

clicksHistory,

usersHistory,

clicks,

impressions,

users,

sessions,

rangeLabel,

}:ChartTabsProps){



const [
activeTab,
setActiveTab
]=
useState<Tab>("clicks");








const chart =

useMemo(()=>{


switch(activeTab){


case "clicks":

return {

title:
"Klik Organik",

data:
clicksHistory,

dataKey:
"clicks",

};



case "impressions":

return {

title:
"Tayangan Pencarian",

data:
clicksHistory,

dataKey:
"impressions",

};



case "users":

return {

title:
"Pengguna Aktif",

data:
usersHistory,

dataKey:
"users",

};



case "sessions":

return {

title:
"Sesi Pengunjung",

data:
usersHistory,

dataKey:
"sessions",

};



default:

return {

title:
"Klik Organik",

data:
clicksHistory,

dataKey:
"clicks",

};


}



},[
activeTab,
clicksHistory,
usersHistory
]);









const metrics = [

{

label:
"Klik Organik",

value:
clicks,

icon:
MousePointerClick,

},



{

label:
"Tayangan Pencarian",

value:
impressions,

icon:
Search,

},



{

label:
"Pengguna Aktif",

value:
users,

icon:
Users,

},



{

label:
"Sesi Pengunjung",

value:
sessions,

icon:
Activity,

},


];









return (

<div

className="
flex
flex-col
overflow-hidden
rounded-2xl
border
border-slate-200
bg-white
shadow-sm
"

>

{/* RINGKASAN METRIK */}

<div

className="
grid
grid-cols-4
gap-3
border-b
border-slate-100
p-4

"

>

{

metrics.map((item)=>(


<div

key={item.label}

className="
rounded-xl
bg-slate-50
p-3
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
bg-white
p-2
shadow-sm
"

>


<item.icon

className="
h-4
w-4
text-slate-600
"

/>


</div>




<div>


<p

className="
text-xs
text-slate-500
"

>

{item.label}

</p>




<p

className="
text-xl
font-bold
text-slate-900
"

>

{
item.value.toLocaleString(
"id-ID"
)
}

</p>



</div>


</div>


</div>


))


}



</div>







{/* HEADER CHART */}


<div

className="
flex
flex-col
gap-4
border-b
border-slate-100
px-4
py-3
lg:flex-row
lg:items-center
lg:justify-between
"

>


<div>


<h3

className="
font-semibold
text-slate-900
"

>

{chart.title}

</h3>



<p

className="
text-sm
text-slate-500
"

>

Perkembangan performa • {rangeLabel}

</p>



</div>







<div

className="
inline-flex
rounded-xl
bg-slate-100
p-1
"

>


{

tabs.map((tab)=>(


<button


key={tab.key}


onClick={()=>
setActiveTab(tab.key)
}


className={`

rounded-lg

px-3

py-1.5

text-sm

font-medium

transition


${
activeTab === tab.key

?

"bg-white text-slate-900 shadow-sm"

:

"text-slate-500 hover:text-slate-900"

}

`}


>


{tab.label}



</button>


))


}



</div>



</div>








{/* CHART */}

<div

className="
h-[260px]
p-4
"

>


<TrafficChart

title={chart.title}

data={chart.data}

dataKey={chart.dataKey}

rangeLabel={rangeLabel}

/>


</div>





</div>


);


}