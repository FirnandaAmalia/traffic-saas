import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import { fetchGA4RawData } from "@/lib/google/ga4";
import { fetchGSCRawData } from "@/lib/google/gsc";


export async function POST(
  request: Request
) {

  try {

    /*
    |--------------------------------------------------------------------------
    | Authentication
    |--------------------------------------------------------------------------
    */

    const session =
      await getServerSession(
        authOptions
      );


    if (
      !session?.user?.id ||
      !session.refreshToken
    ) {

      return Response.json(
        {
          success:false,
          error:"Unauthorized",
        },
        {
          status:401,
        }
      );

    }


    /*
    |--------------------------------------------------------------------------
    | Parse Request
    |--------------------------------------------------------------------------
    */

    let body:
      {
        projectId?: string;
      };


    try {

      body =
        await request.json();

    } catch {

      return Response.json(
        {
          success:false,
          error:
            "Invalid JSON body",
        },
        {
          status:400,
        }
      );

    }


    const projectId =
      body.projectId?.trim();


    if (!projectId) {

      return Response.json(
        {
          success:false,
          error:
            "projectId is required",
        },
        {
          status:400,
        }
      );

    }


    /*
    |--------------------------------------------------------------------------
    | Verify Project Ownership
    |--------------------------------------------------------------------------
    */


    const project =
      await prisma.project.findFirst({

        where:{
          id:projectId,

          userId:
            session.user.id,
        },

      });


    if (!project) {

      return Response.json(
        {
          success:false,
          error:
            "Project not found",
        },
        {
          status:404,
        }
      );

    }


    /*
    |--------------------------------------------------------------------------
    | Validate Integration
    |--------------------------------------------------------------------------
    */


    if (
      !project.gscSiteUrl
    ) {

      return Response.json(
        {
          success:false,
          error:
            "Google Search Console belum terhubung.",
        },
        {
          status:400,
        }
      );

    }


    if (
      !project.ga4PropertyId
    ) {

      return Response.json(
        {
          success:false,
          error:
            "Google Analytics belum terhubung.",
        },
        {
          status:400,
        }
      );

    }


    const refreshToken =
      session.refreshToken;


    /*
    |--------------------------------------------------------------------------
    | Google Validation Sync
    |--------------------------------------------------------------------------
    |
    | GSC dan GA4 independen,
    | jalankan bersamaan.
    |
    */


    await Promise.all([

      fetchGSCRawData(
        refreshToken,
        project.gscSiteUrl
      ),


      fetchGA4RawData(
        refreshToken,
        project.ga4PropertyId
      ),

    ]);



    /*
    |--------------------------------------------------------------------------
    | Update Sync Timestamp
    |--------------------------------------------------------------------------
    */


    const updatedProject =
      await prisma.project.update({

        where:{
          id:
            project.id,
        },


        data:{
          lastSyncedAt:
            new Date(),
        },

      });



    return Response.json({

      success:true,

      projectId:
        updatedProject.id,


      lastSyncedAt:
        updatedProject.lastSyncedAt,

    });



  } catch(error) {


    console.error(
      "SYNC ERROR:",
      error
    );


    return Response.json(

      {
        success:false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },

      {
        status:500,
      }

    );

  }

}