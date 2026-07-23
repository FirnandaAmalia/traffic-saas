import ChartTabs from "./chart-tabs";


interface ChartSectionProps {
  clicksHistory: {
    date: string;
    clicks: number;
    impressions: number;
  }[];

  usersHistory: {
    date: string;
    users: number;
    sessions: number;
  }[];

  clicks: number;
  impressions: number;
  users: number;
  sessions: number;

  rangeLabel: string;
}



export default function ChartSection({

  clicksHistory,
  usersHistory,
  clicks,
  impressions,
  users,
  sessions,
  rangeLabel,

}: ChartSectionProps) {


return (

<section
className="
flex
flex-col
"
>


{/* Header */}

<div
className="
mb-4
flex
items-start
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
Traffic Trend
</h2>


<p
className="
mt-1
text-sm
text-slate-500
"
>
Organic clicks & user growth • {rangeLabel}
</p>


</div>



<div
className="
rounded-full
border
border-slate-200
bg-slate-50
px-3
py-1
text-xs
font-medium
text-slate-600
"
>
{rangeLabel}
</div>


</div>




{/* Chart Container */}

<div
className="
h-[280px]
w-full
"
>


<ChartTabs

clicksHistory={clicksHistory}

usersHistory={usersHistory}

clicks={clicks}

impressions={impressions}

users={users}

sessions={sessions}

rangeLabel={rangeLabel}

/>


</div>


</section>


);

}