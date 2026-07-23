"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";


import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


import type {
  Payload,
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";



type ChartData = {

  date:string;

  [key:string]:
  string | number;

};



interface TrafficChartProps {

  title:string;

  data:ChartData[];

  dataKey:string;

  rangeLabel:string;

}





function parseDate(
  value:string
){

  if(!value)
    return null;



  if(
    /^\d{4}-\d{2}-\d{2}$/.test(value)
  ){

    const [
      year,
      month,
      day
    ] =
    value
    .split("-")
    .map(Number);



    return new Date(
      year,
      month - 1,
      day
    );

  }



  if(
    /^\d{8}$/.test(value)
  ){

    return new Date(
      Number(value.slice(0,4)),
      Number(value.slice(4,6))-1,
      Number(value.slice(6,8))
    );

  }



  return null;

}





function formatNumber(
  value:number
){


  if(value >= 1000000){

    return `${(
      value / 1000000
    ).toFixed(1)} jt`;

  }



  if(value >= 1000){

    return `${(
      value / 1000
    ).toFixed(1)} rb`;

  }



  return value.toLocaleString(
    "id-ID"
  );

}







function translateRange(
  range:string
){

  const map:Record<string,string> = {

    "Last 7 Days":
    "7 Hari Terakhir",

    "Last 28 Days":
    "28 Hari Terakhir",

    "Last 3 Months":
    "3 Bulan Terakhir",

    "Last 6 Months":
    "6 Bulan Terakhir",

    "Last 12 Months":
    "12 Bulan Terakhir",

  };


  return (
    map[range]
    ??
    range
  );

}







export default function TrafficChart({

  title,

  data,

  dataKey,

  rangeLabel,

}:TrafficChartProps){



const [
  mounted,
  setMounted
]=
useState(false);




useEffect(()=>{


const frame =
requestAnimationFrame(
()=>setMounted(true)
);



return ()=>{

cancelAnimationFrame(frame);

};



},[]);






const chartId =
`gradient-${dataKey}`;






const total =

useMemo(()=>{


return data.reduce(

(sum,item)=>

sum +
Number(
item[dataKey] ?? 0
),

0

);



},[
data,
dataKey
]);








const xTicks =

useMemo(()=>{


if(!data.length)

return [];



const step =
Math.ceil(
data.length / 6
);



return data

.filter(
(_,index)=>
index % step === 0
)

.map(
(item)=>
item.date
);



},[
data
]);










function formatDate(
value:string
){


const date =
parseDate(value);



if(!date)

return value;



return date.toLocaleDateString(
"id-ID",
{
day:"2-digit",
month:"short"
}
);


}









function tooltipLabel(

_:unknown,

payload?:
readonly Payload<ValueType,NameType>[]

){



const raw =
payload?.[0]?.payload?.date;



if(!raw)

return "";



const date =
parseDate(
String(raw)
);



if(!date)

return String(raw);



return date.toLocaleDateString(

"id-ID",

{

day:"2-digit",

month:"long",

year:"numeric"

}

);



}








return (

<div
className="
flex
flex-col
"
>





<div
className="
mb-5
flex
items-center
justify-between
"
>


<div>


<p
className="
text-xs
font-semibold
uppercase
tracking-wide
text-slate-500
"
>

{title}

</p>



<div
className="
mt-1
flex
items-center
gap-3
"
>


<h2
className="
text-3xl
font-black
text-slate-900
"
>

{
formatNumber(total)
}

</h2>




<span
className="
rounded-full
bg-blue-50
px-3
py-1
text-xs
font-semibold
text-blue-600
"
>

{
translateRange(
rangeLabel
)
}

</span>



</div>



</div>



</div>








<div
className="
h-[360px]
w-full
"
>


{

!mounted ?


<div
className="
h-full
animate-pulse
rounded-2xl
bg-slate-100
"
/>


:


<ResponsiveContainer

width="100%"

height="100%"

>



<AreaChart

data={data}

margin={{

top:10,

right:20,

left:0,

bottom:0

}}

>



<defs>


<linearGradient

id={chartId}

x1="0"

y1="0"

x2="0"

y2="1"

>


<stop

offset="0%"

stopColor="#2563eb"

stopOpacity={0.25}

/>


<stop

offset="100%"

stopColor="#2563eb"

stopOpacity={0}

/>


</linearGradient>


</defs>






<CartesianGrid

vertical={false}

stroke="#e2e8f0"

strokeDasharray="4 4"

/>







<XAxis

dataKey="date"

ticks={xTicks}

tickFormatter={formatDate}

axisLine={false}

tickLine={false}

/>








<YAxis

axisLine={false}

tickLine={false}

tickFormatter={formatNumber}

/>








<Tooltip


labelFormatter={
tooltipLabel
}


formatter={(value)=>[

formatNumber(
Number(value)
),

title

]}



contentStyle={{

borderRadius:16,

border:"none",

boxShadow:
"0 15px 35px rgba(15,23,42,.15)"

}}


/>








<Area

type="monotone"

dataKey={dataKey}

stroke="#2563eb"

strokeWidth={3}

fill={`url(#${chartId})`}

animationDuration={800}

dot={false}

activeDot={{

r:6,

strokeWidth:3

}}

/>






</AreaChart>



</ResponsiveContainer>


}



</div>




</div>


);


}