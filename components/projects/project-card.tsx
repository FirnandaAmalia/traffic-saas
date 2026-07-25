"use client";

import Link from "next/link";

import {
  Globe,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DeleteProjectDialog from "./delete-project-dialog";


interface ProjectCardProps {

  project: {

    id: string;

    projectName: string;

    domain: string | null;

    gscSiteUrl: string | null;

    ga4PropertyId: string | null;

    createdAt: Date;

    lastSyncedAt: Date | null;

  };

}



export default function ProjectCard({

  project,

}: ProjectCardProps) {



  const gscConnected =
    !!project.gscSiteUrl;


  const ga4Connected =
    !!project.ga4PropertyId;


  const isActive =
    gscConnected &&
    ga4Connected;



  const lastSync =

    project.lastSyncedAt

      ? new Date(
          project.lastSyncedAt
        ).toLocaleDateString(
          "id-ID",
          {
            day:"2-digit",
            month:"short",
            year:"numeric",
          }
        )

      : "Not synced";



  return (

    <Card

      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-2xl
      "

    >


      <CardHeader className="space-y-3">


        <div className="flex items-center gap-3">


          <div className="rounded-xl bg-blue-50 p-2">

            <Globe
              className="
                h-5
                w-5
                text-blue-600
              "
            />

          </div>



          <div>


            <CardTitle className="text-xl">

              {project.projectName}

            </CardTitle>



            <p className="mt-1 text-sm text-slate-500">

              {project.domain ?? "No domain connected"}

            </p>


          </div>


        </div>


      </CardHeader>





      <CardContent className="space-y-6">



        <div className="space-y-4">


          <div className="flex items-center justify-between">


            <span className="text-sm font-medium">

              Search Console

            </span>


            {
              gscConnected

              ?

              <div className="
                flex
                items-center
                gap-1
                text-sm
                font-medium
                text-emerald-600
              ">

                <CheckCircle2 className="h-4 w-4"/>

                Connected

              </div>


              :

              <div className="
                flex
                items-center
                gap-1
                text-sm
                font-medium
                text-red-500
              ">

                <XCircle className="h-4 w-4"/>

                Not Connected

              </div>

            }


          </div>





          <div className="flex items-center justify-between">


            <span className="text-sm font-medium">

              Google Analytics 4

            </span>


            {
              ga4Connected

              ?

              <div className="
                flex
                items-center
                gap-1
                text-sm
                font-medium
                text-emerald-600
              ">

                <CheckCircle2 className="h-4 w-4"/>

                Connected

              </div>


              :

              <div className="
                flex
                items-center
                gap-1
                text-sm
                font-medium
                text-red-500
              ">

                <XCircle className="h-4 w-4"/>

                Not Connected

              </div>

            }


          </div>


        </div>






        <div className="
          grid
          grid-cols-2
          gap-4
          rounded-2xl
          bg-slate-50
          p-4
        ">


          <div>


            <p className="
              text-xs
              uppercase
              tracking-wide
              text-slate-500
            ">

              Status

            </p>



            <p
              className={`
                mt-1
                font-semibold
                ${
                  isActive
                  ? "text-emerald-600"
                  : "text-amber-600"
                }
              `}
            >

              {
                isActive
                ? "Active"
                : "Setup Required"
              }

            </p>


          </div>





          <div>


            <p className="
              text-xs
              uppercase
              tracking-wide
              text-slate-500
            ">

              Last Sync

            </p>



            <p className="
              mt-1
              font-semibold
              text-slate-900
            ">

              {lastSync}

            </p>


          </div>


        </div>






        {/* ACTION BUTTONS */}

        <div className="
          grid
          grid-cols-3
          gap-3
        ">


          <Button

            asChild

            className="
              h-11
              rounded-xl
              bg-slate-900
              text-xs
              hover:bg-slate-800
            "

          >

            <Link
              href={`/dashboard?projectId=${project.id}`}
            >

              Workspace

            </Link>


          </Button>





          <Button

            asChild

            variant="outline"

            className="
              h-11
              rounded-xl
              text-xs
            "

          >

          </Button>





          <Button

            asChild

            variant="outline"

            className="
              h-11
              rounded-xl
              text-xs
            "

          >

            <Link

              href={`/dashboard/settings?projectId=${project.id}`}

            >

              Settings

            </Link>


          </Button>


        </div>







        <div className="mt-3">


          <DeleteProjectDialog

            projectId={project.id}

            projectName={project.projectName}

          />


        </div>



      </CardContent>


    </Card>

  );

}