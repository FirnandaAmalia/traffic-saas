import Link from "next/link";

import {
  BarChart3,
  CheckCircle2,
  Globe,
  Settings,
  AlertCircle,
} from "lucide-react";

import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

import { Button } from "@/components/ui/button";

import DateRangePicker from "../shared/date-range-picker";
import ExportDialog from "../export/export-dialog";
import SyncButton from "../shared/sync-button";

import type {
  DateRange,
} from "@/lib/date-range";


interface DashboardHeaderProps {

  projectId: string;

  projectName: string;

  range: DateRange;

  gscSiteUrl: string | null;

  ga4PropertyId: string | null;

  ga4PropertyName: string | null;

  lastSyncedAt: Date | null;

}



export default function DashboardHeader({

  projectId,

  projectName,

  range,

  gscSiteUrl,

  ga4PropertyId,

  ga4PropertyName,

  lastSyncedAt,

}: DashboardHeaderProps) {



const lastSyncLabel =
lastSyncedAt

?

formatDistanceToNow(
  lastSyncedAt,
  {
    addSuffix:true,
    locale:id,
  }
)

:

"Belum pernah";



const gscConnected =
Boolean(gscSiteUrl);


const ga4Connected =
Boolean(ga4PropertyId);


const workspaceReady =
gscConnected &&
ga4Connected;



return (

<header
className="
overflow-hidden
rounded-3xl
border
border-slate-200
bg-white
shadow-sm
"
>



<div
className="
flex
flex-col
gap-8
p-8
xl:flex-row
xl:items-start
xl:justify-between
"
>



{/* HEADER LEFT */}

<div
className="
max-w-3xl
"
>


<div
className="
inline-flex
items-center
rounded-full
bg-blue-50
px-3
py-1
text-xs
font-semibold
text-blue-700
"
>

Dashboard SEO Intelligence

</div>



<h1
className="
mt-4
text-4xl
font-bold
tracking-tight
text-slate-900
"
>

{projectName}

</h1>



<p
className="
mt-3
text-base
leading-7
text-slate-500
"
>

Pantau trafik organik, visibilitas pencarian,
dan performa Google Analytics dalam satu workspace.

</p>





<div
className="
mt-6
flex
flex-wrap
gap-3
"
>



<div
className={`
inline-flex
items-center
rounded-full
px-3
py-1
text-sm
font-medium

${
workspaceReady

?

"bg-emerald-50 text-emerald-700"

:

"bg-amber-50 text-amber-700"

}
`}
>


{
workspaceReady

?

<>

<CheckCircle2
className="
mr-2
h-4
w-4
"
/>

Workspace Siap Digunakan

</>


:

<>

<AlertCircle
className="
mr-2
h-4
w-4
"
/>

Perlu Konfigurasi

</>

}



</div>





<div
className="
inline-flex
items-center
rounded-full
bg-slate-100
px-3
py-1
text-sm
font-medium
text-slate-700
"
>

Sinkronisasi terakhir • {lastSyncLabel}

</div>



</div>



</div>







{/* ACTION AREA */}


<div
className="
flex
flex-wrap
items-center
gap-3
"
>


<DateRangePicker />



<ExportDialog

projectId={projectId}

projectName={projectName}

range={range}

/>



<SyncButton />





<Button

asChild

variant="outline"

>


<Link

href={`/dashboard/settings?projectId=${projectId}&range=${range}`}

>


<Settings
className="
mr-2
h-4
w-4
"
/>


Pengaturan


</Link>


</Button>



</div>


</div>








{/* CONNECTION INFO */}


<div
className="
grid
gap-px
border-t
border-slate-200
bg-slate-200
lg:grid-cols-3
"
>




{/* GSC */}


<div
className="
bg-white
p-6
"
>


<div
className="
flex
items-start
gap-4
"
>


<div
className="
rounded-xl
bg-blue-50
p-3
"
>

<Globe
className="
h-5
w-5
text-blue-600
"
/>

</div>



<div>


<p
className="
text-xs
font-semibold
uppercase
tracking-wider
text-slate-500
"
>

Google Search Console

</p>



<p
className="
mt-2
break-all
text-sm
font-medium
text-slate-900
"
>

{
gscSiteUrl
??

"Belum Terhubung"
}

</p>



</div>



</div>


</div>






{/* GA4 */}


<div
className="
bg-white
p-6
"
>


<div
className="
flex
items-start
gap-4
"
>


<div
className="
rounded-xl
bg-emerald-50
p-3
"
>


<BarChart3
className="
h-5
w-5
text-emerald-600
"
/>


</div>




<div>


<p
className="
text-xs
font-semibold
uppercase
tracking-wider
text-slate-500
"
>

Google Analytics 4

</p>




<p
className="
mt-2
break-all
text-sm
font-medium
text-slate-900
"
>


{
ga4PropertyName
??

ga4PropertyId
??

"Belum Terhubung"
}


</p>



</div>


</div>


</div>







{/* STATUS */}



<div
className="
bg-white
p-6
"
>


<p
className="
text-xs
font-semibold
uppercase
tracking-wider
text-slate-500
"
>

Status Workspace

</p>





<div
className={`
mt-3
inline-flex
items-center
rounded-full
px-3
py-1
text-sm
font-semibold

${
workspaceReady

?

"bg-emerald-50 text-emerald-700"

:

"bg-amber-50 text-amber-700"

}
`}
>


{
workspaceReady

?

<>

<CheckCircle2
className="
mr-2
h-4
w-4
"
/>

Terhubung & Siap

</>

:

<>

<AlertCircle
className="
mr-2
h-4
w-4
"
/>

Perlu Setup

</>

}



</div>




<p
className="
mt-3
text-sm
leading-6
text-slate-500
"
>


{
workspaceReady

?

"Google Search Console dan Google Analytics sudah terhubung dan siap digunakan untuk analisis data."

:

"Hubungkan Google Search Console dan Google Analytics untuk membuka seluruh fitur analitik SEO."

}


</p>



</div>





</div>



</header>


);


}