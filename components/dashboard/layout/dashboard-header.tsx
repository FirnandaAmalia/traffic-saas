import Link from "next/link";

import {
  BarChart3,
  CheckCircle2,
  Globe,
  Settings,
  AlertCircle,
} from "lucide-react";

import {
  formatDistanceToNow,
} from "date-fns";

import {
  id as idLocale,
} from "date-fns/locale";

import { Button } from "@/components/ui/button";

import DateRangePicker from "../shared/date-range-picker";
import ExportDialog from "../export/export-dialog";
import SyncButton from "../shared/sync-button";

import type { DateRange } from "@/lib/date-range";

import {
  getTranslations,
  getLocale,
} from "next-intl/server";



interface DashboardHeaderProps {

  projectId: string;

  projectName: string;

  range: DateRange;

  gscSiteUrl: string | null;

  ga4PropertyId: string | null;

  ga4PropertyName: string | null;

  lastSyncedAt: Date | null;

}





export default async function DashboardHeader({

  projectId,

  projectName,

  range,

  gscSiteUrl,

  ga4PropertyId,

  ga4PropertyName,

  lastSyncedAt,

}: DashboardHeaderProps) {


const locale =
await getLocale();



const t =
await getTranslations(
"dashboard"
);



const lastSyncLabel =
lastSyncedAt

?

formatDistanceToNow(
  lastSyncedAt,
  {
    addSuffix:true,
    locale:
      locale === "id"
      ? idLocale
      : undefined,
  }
)

:

t("sync.never");





const workspaceReady =
Boolean(gscSiteUrl)
&&
Boolean(ga4PropertyId);






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

{t("title")}

</div>





<h1
className="
mt-4
text-4xl
font-black
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

{t("description")}

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

{t("workspace.ready")}

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

{t("workspace.configuration")}

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

{t("sync.last")} • {lastSyncLabel}

</div>



</div>


</div>







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

href={`/${locale}/dashboard/settings?projectId=${projectId}&range=${range}`}

>


<Settings
className="
mr-2
h-4
w-4
"
/>


{t("actions.settings")}


</Link>


</Button>



</div>



</div>









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

{t("integration.gsc")}

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
gscSiteUrl ??
t("integration.notConnected")
}

</p>


</div>


</div>


</div>









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

{t("integration.ga4")}

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
ga4PropertyName ??
ga4PropertyId ??
t("integration.notConnected")
}

</p>


</div>


</div>


</div>








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

{t("integration.status")}

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

{t("workspace.connected")}

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

{t("workspace.setup")}

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

t("status.connectedDescription")

:

t("status.setupDescription")

}


</p>



</div>



</div>



</header>


);

}