import ChartSection from "./chart-section";
import DataTable from "./data-table";

import type { GSCRow } from "@/lib/types/gsc";


interface PerformanceSectionProps {

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

  queries: GSCRow[];

  pages: GSCRow[];

  siteUrl?: string | null;

}

export default function PerformanceSection({

  clicksHistory,
  usersHistory,
  clicks,
  impressions,
  users,
  sessions,
  rangeLabel,
  queries,
  pages,
  siteUrl,

}:PerformanceSectionProps){


return (

<section className="space-y-4">


{/* TRAFFIC TREND */}

<div
className="
rounded-2xl
border
border-slate-200
bg-white
p-4
shadow-sm
"
>


<ChartSection

clicksHistory={clicksHistory}

usersHistory={usersHistory}

clicks={clicks}

impressions={impressions}

users={users}

sessions={sessions}

rangeLabel={rangeLabel}

/>


</div>





{/* SEO TABLE */}

<div

className="
grid
gap-4
lg:grid-cols-2
"


>


<div

className="
rounded-2xl
border
border-slate-200
bg-white
p-4
shadow-sm
"

>


<DataTable

title="Kata Kunci Teratas "

rows={queries}

renderLabel={(row)=>
row.keys?.[0] ?? "-"
}

/>


</div>





<div

className="
rounded-2xl
border
border-slate-200
bg-white
p-4
shadow-sm
"

>


<DataTable

title="Halaman Terbaik"

rows={pages}

renderLabel={(row)=>{

const url =
row.keys?.[0] ?? "";


let path=url;


if(siteUrl){

path=url.replace(
siteUrl,
""
);

}


return (

<span

className="
block
truncate
"

title={url}

>

{path || "/"}

</span>

);

}}

/>


</div>


</div>


</section>

);

}