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



  // Ambil user berdasarkan email session

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

        userId:
          user.id,

      },


      orderBy:{

        createdAt:
          "desc",

      },

    });

    const connectedServices =
  projects.reduce(
    (total, project) => {

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



  return (

    <main className="space-y-8">


      <PageHeader

        title="Workspace"

        description="Manage all your SEO workspaces."

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

            Total Projects

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

            Connected Services

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

            Google Search Console & GA4

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

            Workspace Status

          </p>



          <h2 className="
            mt-3
            text-xl
            font-semibold
            text-emerald-600
          ">

            Healthy

          </h2>



          <p className="
            mt-2
            text-xs
            text-slate-500
          ">

            All integrations connected

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

            Last Sync

          </p>



          <h2 className="
            mt-3
            text-xl
            font-semibold
          ">

            Today

          </h2>



          <p className="
            mt-2
            text-xs
            text-slate-500
          ">

            Data synchronized successfully

          </p>


        </div>


      </section>





      <ProjectToolbar

        totalProjects={
          projects.length
        }

      />





      <ProjectGrid

        projects={
          projects
        }

      />



    </main>

  );

}