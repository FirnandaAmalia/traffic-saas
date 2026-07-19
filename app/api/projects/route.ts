import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import {
  FEATURES,
  hasFeature,
} from "@/lib/features";



export async function POST(
  req: Request
) {

  try {


    const session =
      await getServerSession(
        authOptions
      );



    if (!session?.user?.email) {

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



    const user =
      await prisma.user.findUnique({

        where:{
          email:
            session.user.email,
        },

      });



    if(!user){

      return Response.json(
        {
          success:false,
          error:"User tidak ditemukan.",
        },
        {
          status:404,
        }
      );

    }




    const body =
      await req.json();



    if(!body.projectName){

      return Response.json(
        {
          success:false,
          error:"Project name wajib diisi.",
        },
        {
          status:400,
        }
      );

    }





    // Ambil subscription user

    const subscription =
      await prisma.subscription.findUnique({

        where:{
          userId:user.id,
        },

      });




    const plan =
      subscription?.plan ?? "FREE";





    const canCreateUnlimited =
      hasFeature(
        plan,
        FEATURES.UNLIMITED_PROJECT
      );





    // FREE PLAN LIMIT

    if(!canCreateUnlimited){


      const totalProjects =
        await prisma.project.count({

          where:{
            userId:user.id,
          },

        });



      if(totalProjects >= 1){

        return Response.json(
          {
            success:false,

            code:"FREE_PLAN_LIMIT",

            error:
            "Free Plan hanya mendukung 1 Project. Upgrade ke Pro untuk membuat project tanpa batas.",
          },
          {
            status:403,
          }
        );

      }


    }





    // CREATE PROJECT

    const project =
      await prisma.project.create({

        data:{


          userId:
            user.id,


          projectName:
            body.projectName,


          domain:
            body.domain ?? null,


          gscSiteUrl:
            null,


          ga4PropertyId:
            null,


        },

      });






    return Response.json({

      success:true,

      project,

    });




  } catch(error){


    console.error(
      "CREATE PROJECT ERROR:",
      error
    );



    return Response.json(
      {
        success:false,
        error:"Gagal membuat project.",
      },
      {
        status:500,
      }
    );


  }

}