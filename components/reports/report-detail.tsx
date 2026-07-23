"use client";


import {
  Download,
  FileText,
  Sparkles,
  TrendingUp,
  Globe,
  CalendarDays,
  BarChart3,
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

seoScore?:number|null;

seoStatus?:string|null;


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

month:"long",

year:"numeric",

}

);





const score =

report.seoScore ?? 0;







return (



<div

className="
space-y-8
"

>









{/* HEADER */}



<div

className="
rounded-3xl
border
bg-white
p-8
"

>



<div

className="
flex
items-start
justify-between
gap-5
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
h-7
w-7
text-blue-600
"

/>


</div>






<div>


<h1

className="
text-3xl
font-bold
"

>

{report.title}

</h1>


<p

className="
mt-2
text-slate-500
"

>

SEO Intelligence Report powered by AI analysis engine

</p>


</div>



</div>







<div

className="
rounded-2xl
bg-blue-50
px-6
py-4
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
text-4xl
font-black
text-blue-600
"

>

{score}

</p>


</div>




</div>


</div>









{/* META GRID */}



<div

className="
grid
gap-5
md:grid-cols-4
"

>



<div

className="
rounded-3xl
border
bg-white
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


<Globe

className="
h-4
w-4
"

/>


Project


</div>


<p

className="
mt-3
font-bold
"

>

{report.project.projectName}

</p>


</div>







<div

className="
rounded-3xl
border
bg-white
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


<CalendarDays

className="
h-4
w-4
"

/>


Period


</div>


<p

className="
mt-3
font-bold
"

>

{report.period}

</p>


</div>







<div

className="
rounded-3xl
border
bg-white
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


<FileText

className="
h-4
w-4
"

/>


Generated


</div>


<p

className="
mt-3
font-bold
"

>

{created}

</p>


</div>







<div

className="
rounded-3xl
border
bg-white
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


Status


</div>


<p

className="
mt-3
font-bold
text-emerald-600
"

>

{report.seoStatus ?? "Ready"}

</p>


</div>





</div>









{/* AI INSIGHT PREVIEW */}



<div

className="
rounded-3xl
border
bg-gradient-to-br
from-indigo-50
to-white
p-8
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
bg-indigo-600
p-3
"

>


<Sparkles

className="
h-5
w-5
text-white
"

/>


</div>





<div>


<h3

className="
text-xl
font-bold
"

>

AI Executive Summary

</h3>


<p

className="
text-sm
text-slate-500
"

>

Automatic SEO analysis and recommendations

</p>


</div>



</div>






<p

className="
mt-5
text-slate-600
"

>

Your report is ready. AI will analyze traffic trends, keyword opportunities, technical issues, and growth recommendations.

</p>



</div>









{/* EXPORT */}



<div

className="
rounded-3xl
border
bg-white
p-6
"

>


<div

className="
flex
items-center
gap-3
mb-5
"

>


<BarChart3

className="
h-5
w-5
text-blue-600
"

/>


<h3

className="
font-bold
"

>

Export Center

</h3>


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





<Button

variant="outline"

className="
rounded-xl
"

>


Download Excel


</Button>




<Button

variant="outline"

className="
rounded-xl
"

>


Download CSV


</Button>



</div>


</div>








</div>


);


}