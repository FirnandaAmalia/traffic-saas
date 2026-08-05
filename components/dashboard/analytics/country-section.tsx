import CardShell from "../layout/card-shell";

import CountryMap from "./country-map";
import CountryTable from "./country-table";

import type {
  CountryMetric,
} from "@/lib/types/ga4";



interface CountrySectionProps {

  country: CountryMetric[];

  title:string;

  description:string;

  actionLabel:string;

}


export default function CountrySection({

country,

title,

description,

actionLabel,

}:CountrySectionProps){


return (

<CardShell


title={title}


description={description}


action={

<button

type="button"

className="
text-xs
font-medium
text-blue-600
transition
hover:text-blue-700
"

>

{actionLabel}

</button>

}



/* FIX HEIGHT */

className="
h-[420px]
overflow-hidden
"


contentClassName="
h-full
p-0
"


>


<div

className="
grid
h-full
min-h-0
grid-cols-[28%_72%]
"


>


{/* MAP */}

<div

className="
flex
min-h-0
items-center
justify-center
border-r
border-slate-100
bg-slate-50
px-3
"

>


<div

className="
h-[170px]
w-[170px]
"

>

<CountryMap

country={country}

/>

</div>


</div>





{/* COUNTRY LIST */}

<div

className="
min-h-0
overflow-hidden
"

>


<div

className="
h-full
overflow-y-auto
pr-1
scrollbar-thin
scrollbar-thumb-slate-300
scrollbar-track-transparent
"

>

<CountryTable

country={country}

/>

</div>


</div>


</div>


</CardShell>


);

}