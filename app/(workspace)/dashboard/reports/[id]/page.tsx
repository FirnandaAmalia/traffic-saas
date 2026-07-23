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
  notFound,
  redirect,
} from "next/navigation";


import ReportDetail from "@/components/reports/report-detail";




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






if(
!session?.user?.id
){

redirect("/login");

}







const {

id,

}=await params;







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

notFound();

}








/*
|--------------------------------------------------------------------------
| SECURITY CHECK
|--------------------------------------------------------------------------
|
| Pastikan report benar-benar milik user.
|
*/


if(
report.project.userId !== session.user.id
){

notFound();

}









return (


<div className="space-y-6">


<ReportDetail

report={report}

/>


</div>


);


}