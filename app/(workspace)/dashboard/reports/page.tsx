import Link from "next/link";

import {
  getServerSession,
} from "next-auth";

import {
  redirect,
} from "next/navigation";


import {
  authOptions,
} from "@/lib/auth";


import {
  resolveProjectForUser,
} from "@/lib/project-service";


import {
  prisma,
} from "@/lib/prisma";


import {
  FileText,
  Sparkles,
  Plus,
} from "lucide-react";


import {
  Button,
} from "@/components/ui/button";


import {
  Card,
  CardContent,
} from "@/components/ui/card";


import ReportCard from "@/components/reports/report-card";

interface PageProps {

  searchParams: Promise<{

    projectId?: string;

  }>;

}







export default async function ReportsPage({

searchParams,

}:PageProps){



const session =

await getServerSession(

authOptions

);




if(
!session?.user?.id
){

redirect("/login");

}





const {

projectId,

}=await searchParams;





const project =

await resolveProjectForUser({

userId:

session.user.id,

projectId,

});





if(!project){

return (

<div className="p-10 space-y-4">


<h1 className="text-2xl font-bold">

Belum Ada Project

</h1>


<p className="text-slate-500">

Tambahkan website terlebih dahulu untuk membuat laporan SEO.

</p>


<Link href="/projects">

<Button>

Buat Project

</Button>

</Link>


</div>

);

}







const reports =

await prisma.report.findMany({

where:{

projectId:

project.id,

},

orderBy:{

createdAt:

"desc",

},

});









return (


<div className="space-y-8">







{/* HEADER */}


<div className="flex items-center justify-between">


<div>


<h1 className="text-3xl font-bold">

SEO Reports

</h1>


<p className="mt-2 text-slate-500">

Monitor SEO performance, AI insights, and website growth.

</p>


</div>






<Button

className="rounded-xl"

>

<Plus

className="mr-2 h-4 w-4"

/>


Generate Report


</Button>




</div>









{/* PROJECT SUMMARY */}


<Card

className="
rounded-3xl
border
bg-gradient-to-br
from-blue-50
to-white
"

>


<CardContent

className="
p-6
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
bg-blue-600
p-4
"

>

<FileText

className="
h-6
w-6
text-white
"

/>

</div>





<div>


<p className="text-sm text-slate-500">

Current Project

</p>


<h2 className="text-xl font-bold">

{project.projectName}

</h2>


<p className="text-sm text-slate-500">

{project.gscSiteUrl}

</p>


</div>



</div>


</CardContent>


</Card>









{/* REPORT LIST */}



{

reports.length === 0

?

(

<Card

className="
rounded-3xl
"

>


<CardContent

className="
p-12
text-center
"

>


<Sparkles

className="
mx-auto
h-10
w-10
text-blue-600
"

/>


<h3 className="mt-5 text-xl font-bold">

Belum Ada Laporan

</h3>


<p className="mt-2 text-slate-500">

Generate laporan SEO pertama untuk mendapatkan insight otomatis.

</p>


</CardContent>


</Card>

)


:


(



<div

className="
grid
gap-6
lg:grid-cols-2
"

>


{

reports.map((report)=>(


<ReportCard

key={report.id}

report={report}

/>

))


}


</div>


)


}




</div>


);


}