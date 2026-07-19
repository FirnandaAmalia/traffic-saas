import {
  Download,
  FileText,
} from "lucide-react";


import {
  Button,
} from "@/components/ui/button";


interface ReportDetailProps {

  report:{
    id:string;
    projectId:string;
    title:string;
    period:string;
    createdAt:Date;

    project:{
      projectName:string;
      domain:string|null;
    };

  };

}



export default function ReportDetail({

report,

}:ReportDetailProps){


const created =
new Date(
report.createdAt
)
.toLocaleDateString(
"id-ID",
{
day:"2-digit",
month:"short",
year:"numeric",
}
);



return (

<div
className="
rounded-3xl
border
bg-white
p-8
space-y-8
"
>


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

<h2
className="
text-2xl
font-bold
"
>

{report.title}

</h2>


<p
className="
text-sm
text-slate-500
"
>

SEO Intelligence Report

</p>


</div>


</div>





<div
className="
grid
md:grid-cols-3
gap-5
"
>


<div
className="
rounded-2xl
bg-slate-50
p-5
"
>

<p className="text-xs text-slate-500">

Project

</p>

<p className="font-semibold mt-2">

{report.project.projectName}

</p>

</div>




<div
className="
rounded-2xl
bg-slate-50
p-5
"
>

<p className="text-xs text-slate-500">

Period

</p>

<p className="font-semibold mt-2">

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

<p className="text-xs text-slate-500">

Generated

</p>

<p className="font-semibold mt-2">

{created}

</p>

</div>


</div>





<Button
asChild
className="
rounded-xl
"
>

<a
href={`/api/export/pdf?projectId=${report.projectId}&range=${report.period}`}
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


</div>

);

}