"use client";


import {
  FileText,
  Download,
  Trash2,
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


interface ReportCardProps {

  report:{
    id:string;
    projectId:string;
    title:string;
    period:string;
    createdAt:Date;
    fileUrl:string|null;
  };

}

export default function ReportCard({
  report,
}:ReportCardProps){



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
gap-3
"
>

<div
className="
rounded-xl
bg-blue-50
p-3
"
>

<FileText
className="
h-5
w-5
text-blue-600
"
/>

</div>


<div>

<CardTitle>
{report.title}
</CardTitle>


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


</CardHeader>





<CardContent
className="
space-y-5
"
>


<div
className="
rounded-xl
bg-slate-50
p-4
"
>


<p
className="
text-xs
text-slate-500
"
>
Period
</p>


<p
className="
font-semibold
"
>
{report.period}
</p>



<p
className="
mt-3
text-xs
text-slate-500
"
>
Generated
</p>


<p
className="
font-semibold
"
>
{created}
</p>



</div>





<div
className="
flex
gap-3
"
>


<Button
className="
flex-1
rounded-xl
"
asChild
>

<a
href={report.fileUrl ?? "#"}
download
>

<Download
className="
mr-2
h-4
w-4
"
/>

Download

</a>


</Button>





<Button
variant="outline"
className="
rounded-xl
"
>


<Trash2
className="
h-4
w-4
"
/>


</Button>



</div>



</CardContent>


</Card>


);


}