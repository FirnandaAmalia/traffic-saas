import {
  getServerSession,
} from "next-auth";

import {
  authOptions,
} from "@/lib/auth";


import {
  prisma,
} from "@/lib/prisma";


import {
  resolveProjectForUser,
} from "@/lib/project-service";

import Link from "next/link";

import {
  FileText,
  Download,
  ArrowLeft,
  FileSpreadsheet,
  FileJson,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PageProps {

  params: Promise<{
    id:string;
  }>;

}



export default async function ReportDetailPage({

params,

}:PageProps){



const session =
await getServerSession(
  authOptions
);



if(!session?.user?.id){

return null;

}




const {

id

} = await params;





const report =

await prisma.report.findUnique({

where:{
id,
},

include:{
project:true,
},

});






if(!report){

return (

<div>

Report not found

</div>

);

}






const project =

await resolveProjectForUser({

userId:
session.user.id,

projectId:
report.projectId,

});






if(!project){

return (

<div>

Unauthorized

</div>

);

}






const created =

new Date(
report.createdAt
)
.toLocaleDateString(

"id-ID",

{

day:"2-digit",

month:"long",

year:"numeric",

}

);







return (

<main
className="
space-y-8
"
>





<div>

<Link

href={`/dashboard/reports?projectId=${project.id}`}

className="
inline-flex
items-center
gap-2
text-sm
text-slate-500
hover:text-slate-900
"

>

<ArrowLeft
className="
h-4
w-4
"
/>

Kembali ke Daftar Laporan

</Link>


</div>







<Card

className="
rounded-3xl
border
shadow-sm
"

>


<CardHeader>


<div
className="
flex
items-center
gap-4
"
>


<div
className="
rounded-2xl
bg-blue-50
p-4
"
>

<FileText

className="
h-6
w-6
text-blue-600
"

/>

</div>




<div>

<CardTitle
className="
text-2xl
"
>

{report.title}

</CardTitle>



<p
className="
mt-1
text-sm
text-slate-500
"
>

Laporan Analisis SEO & Pertumbuhan Website

</p>


</div>


</div>


</CardHeader>

<CardContent
className="
space-y-6
"
>

<div
className="
grid
gap-4
md:grid-cols-2
"
>


<div
className="
rounded-2xl
border
p-5
"
>


<div
className="
flex
items-center
gap-2
text-sm
text-slate-500
"
>

<Sparkles
className="
h-4
w-4
"
/>

AI Report Status

</div>



<p
className="
mt-3
text-xl
font-bold
"
>

Ready

</p>


<p
className="
mt-2
text-sm
text-slate-500
"
>

Laporan telah dianalisis menggunakan SEO Intelligence Engine.

</p>


</div>





<div
className="
rounded-2xl
border
p-5
"
>


<div
className="
flex
items-center
gap-2
text-sm
text-slate-500
"
>

<TrendingUp
className="
h-4
w-4
"
/>

Report Type

</div>



<p
className="
mt-3
text-xl
font-bold
"
>

SEO Growth Intelligence

</p>


<p
className="
mt-2
text-sm
text-slate-500
"
>

Data Google Search Console + Google Analytics.

</p>


</div>


</div>

<div

className="
grid
gap-4
md:grid-cols-3
"

>

<div

className="
rounded-2xl
bg-slate-50
p-5
"

>


<p
className="
text-xs
uppercase
text-slate-500
"
>

Proyek

</p>


<p
className="
mt-2
font-semibold
"
>

{project.projectName}

</p>


</div>







<div

className="
rounded-2xl
bg-slate-50
p-5
"

>


<p
className="
text-xs
uppercase
text-slate-500
"
>

Periode Analisis

</p>


<p
className="
mt-2
font-semibold
"
>

{report.period}

</p>


</div>







<div

className="
rounded-2xl
bg-slate-50
p-5
"

>


<p
className="
text-xs
uppercase
text-slate-500
"
>

Tanggal Dibuat

</p>


<p
className="
mt-2
font-semibold
"
>

{created}

</p>


</div>



</div>

<div
className="
flex
flex-wrap
gap-3
"
>

<Button
asChild
className="rounded-xl"
>

<a

href={`/api/export/pdf?projectId=${project.id}&range=${report.period}`}

download

>

<Download
className="
mr-2
h-4
w-4
"
/>

Download PDF

</a>


</Button>

<Button
asChild
variant="outline"
className="rounded-xl"
>

<a

href={`/api/export/excel?projectId=${project.id}&range=${report.period}`}

download

>

<FileSpreadsheet
className="
mr-2
h-4
w-4
"
/>

Download Excel

</a>

</Button>

<Button
asChild
variant="outline"
className="rounded-xl"
>

<a

href={`/api/export/csv?projectId=${project.id}&range=${report.period}`}

download
>

<FileJson
className="
mr-2
h-4
w-4
"
/>

Download CSV

</a>
</Button>

</div>

</CardContent>


</Card>

</main>

);


}