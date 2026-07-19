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
} from "next/navigation";

import Link from "next/link";

import {
  Button,
} from "@/components/ui/button";


interface PageProps {

  params:{
    id:string;
  };

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



  const report =
    await prisma.report.findUnique({

      where:{
        id:params.id,
      },

      include:{
        project:true,
      },

    });



  if(!report){
    notFound();
  }




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

    <main
      className="
      space-y-8
      "
    >



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
          SEO Intelligence Report Detail
        </p>

      </div>





      <div
        className="
        rounded-3xl
        border
        bg-white
        p-8
        shadow-sm
        "
      >


        <div
          className="
          grid
          gap-6
          md:grid-cols-2
          "
        >


          <div>

            <p
              className="
              text-sm
              text-slate-500
              "
            >
              Project
            </p>

            <p
              className="
              mt-1
              font-semibold
              "
            >
              {report.project.projectName}
            </p>

          </div>




          <div>

            <p
              className="
              text-sm
              text-slate-500
              "
            >
              Domain
            </p>

            <p
              className="
              mt-1
              font-semibold
              "
            >
              {report.project.domain ?? "-"}
            </p>

          </div>





          <div>

            <p
              className="
              text-sm
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




          <div>

            <p
              className="
              text-sm
              text-slate-500
              "
            >
              Generated
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
          mt-8
          flex
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

              Download PDF

            </a>


          </Button>




          <Button
            asChild
            variant="outline"
            className="
            rounded-xl
            "
          >

            <Link
              href={`/dashboard/reports?projectId=${report.projectId}`}
            >

              Back to Reports

            </Link>


          </Button>



        </div>



      </div>



    </main>

  );

}