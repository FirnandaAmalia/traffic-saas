"use client";


import Link from "next/link";


import {
  FileText,
  Download,
  Trash2,
  Sparkles,
  ArrowRight,
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





interface ReportCardProps {

  report:{

    id:string;

    projectId:string;

    title:string;

    period:string;

    createdAt:Date;

    fileUrl:string|null;

    seoScore?:number|null;

    seoStatus?:string|null;

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





const score =

report.seoScore ?? 0;





return (



<Card

className="
rounded-3xl
border
bg-white
shadow-sm
transition
hover:shadow-lg
"

>


<CardHeader>


<div

className="
flex
items-start
justify-between
gap-4
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


<CardTitle

className="
text-lg
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

SEO Intelligence Report

</p>



</div>



</div>






<div

className="
rounded-xl
bg-blue-50
px-3
py-2
text-center
"

>


<p

className="
text-xs
text-slate-500
"

>

SEO Score

</p>


<p

className="
text-xl
font-bold
text-blue-600
"

>

{score}

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
grid
grid-cols-2
gap-4
"

>



<div

className="
rounded-2xl
bg-slate-50
p-4
"

>


<p

className="
text-xs
uppercase
tracking-wide
text-slate-500
"

>

Period

</p>


<p

className="
mt-1
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
p-4
"

>


<p

className="
text-xs
uppercase
tracking-wide
text-slate-500
"

>

Created

</p>


<p

className="
mt-1
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
items-center
justify-between
rounded-2xl
border
p-4
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
bg-emerald-50
p-2
"

>

<Sparkles

className="
h-4
w-4
text-emerald-600
"

/>

</div>



<div>


<p

className="
text-sm
font-semibold
"

>

AI Analysis Ready

</p>


<p

className="
text-xs
text-slate-500
"

>

SEO insight generated automatically

</p>



</div>


</div>






<div

className="
flex
items-center
gap-1
text-sm
font-medium
text-emerald-600
"

>

<TrendingUp

className="
h-4
w-4
"

/>


Ready


</div>



</div>









<div

className="
flex
gap-3
"

>



<Link

href={`/dashboard/reports/${report.id}`}

className="
flex-1
"

>


<Button

className="
w-full
rounded-xl
"

>


View Report


<ArrowRight

className="
ml-2
h-4
w-4
"

/>


</Button>


</Link>








{

report.fileUrl &&

(

<Button

variant="outline"

className="
rounded-xl
"

asChild

>


<a

href={report.fileUrl}

download

>


<Download

className="
h-4
w-4
"

/>


</a>


</Button>


)

}







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