import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import {
  getSubscriptionUsage,
} from "@/lib/subscription";

import CreateProjectDialog from "@/components/projects/create-project-dialog";
import FreePlanBanner from "@/components/projects/free-plan-banner";
import PageHeader from "@/components/projects/page-header";
import ProjectGrid from "@/components/projects/project-grid";
import ProjectToolbar from "@/components/projects/project-toolbar";


export default async function ProjectsPage() {


  const session =
    await getServerSession(authOptions);


  if (!session?.user?.email) {
    return null;
  }



  const user =
    await prisma.user.findUnique({

      where:{
        email:
          session.user.email,
      },

    });



  if(!user){
    return null;
  }



  const subscriptionUsage =
    await getSubscriptionUsage(
      session.user.email
    );


  const plan =
    subscriptionUsage?.plan ?? "FREE";



  const projects =
    await prisma.project.findMany({

      where:{
        userId:user.id,
      },

      orderBy:{
        createdAt:"desc",
      },

    });



  const connectedServices =
    projects.reduce(
      (total, project)=>{

        if(project.gscSiteUrl){
          total++;
        }

        if(project.ga4PropertyId){
          total++;
        }

        return total;

      },
      0
    );




  const workspaceStatus =
    projects.length === 0
      ? {

          title:"Belum Ada Workspace",

          description:
            "Buat proyek pertama untuk mulai memantau SEO.",

          color:
            "text-slate-500",

        }


      : connectedServices === 0

      ? {

          title:"Perlu Pengaturan",

          description:
            "Hubungkan Google Search Console dan Google Analytics 4.",

          color:
            "text-amber-600",

        }


      : connectedServices >= projects.length * 2

      ? {

          title:"Sehat",

          description:
            "Semua integrasi berhasil terhubung.",

          color:
            "text-emerald-600",

        }


      : {

          title:"Pengaturan Sebagian",

          description:
            "Beberapa integrasi belum lengkap.",

          color:
            "text-amber-600",

        };




  const syncStatus =
    projects.length === 0

      ? {

          title:"Belum Pernah",

          description:
            "Belum ada sinkronisasi data.",

        }


      : {

          title:"Hari Ini",

          description:
            "Data berhasil disinkronkan.",

        };




return (

<main className="space-y-8">


<PageHeader

title="Workspace"

description="Kelola seluruh workspace SEO Anda."

>


<CreateProjectDialog

plan={plan}

projectCount={
projects.length
}

/>


</PageHeader>




{
plan === "FREE" && subscriptionUsage && (

<FreePlanBanner

usedProjects={
subscriptionUsage.projectCount
}

maxProjects={
subscriptionUsage.projectLimit ?? 1
}

/>

)

}






<section className="grid gap-6 md:grid-cols-4">



<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
">


<p className="text-sm text-slate-500">

Total Proyek

</p>


<h2 className="
mt-3
text-4xl
font-bold
tracking-tight
">

{projects.length}

</h2>


</div>








<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
">


<p className="text-sm text-slate-500">

Layanan Terhubung

</p>


<h2 className="
mt-3
text-4xl
font-bold
tracking-tight
">

{connectedServices}

</h2>


<p className="
mt-2
text-xs
text-slate-500
">

Google Search Console & Google Analytics 4

</p>


</div>









<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
">


<p className="text-sm text-slate-500">

Status Workspace

</p>



<h2
className={`
mt-3
text-xl
font-semibold
${workspaceStatus.color}
`}
>

{workspaceStatus.title}

</h2>



<p className="
mt-2
text-xs
text-slate-500
">

{workspaceStatus.description}

</p>


</div>









<div className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
">


<p className="text-sm text-slate-500">

Sinkronisasi Terakhir

</p>


<h2 className="
mt-3
text-xl
font-semibold
">

{syncStatus.title}

</h2>


<p className="
mt-2
text-xs
text-slate-500
">

{syncStatus.description}

</p>


</div>





</section>







<ProjectToolbar

totalProjects={
projects.length
}

/>





<div className="project-grid">


<ProjectGrid

projects={projects}

/>


</div>




</main>

);


}