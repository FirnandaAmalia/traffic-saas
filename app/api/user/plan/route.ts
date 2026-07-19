import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";


export async function POST(
  req:Request
){

  try{


    const session =
      await getServerSession(
        authOptions
      );


    if(!session?.user?.email){

      return NextResponse.json(
        {
          error:"Unauthorized"
        },
        {
          status:401
        }
      );

    }



    const body =
      await req.json();



    const plan =
      body.plan;



    if(
      plan !== "FREE" &&
      plan !== "PRO"
    ){

      return NextResponse.json(
        {
          error:"Invalid plan"
        },
        {
          status:400
        }
      );

    }



    const user =
      await prisma.user.findUnique({

        where:{
          email:
          session.user.email
        }

      });



    if(!user){

      return NextResponse.json(
        {
          error:"User not found"
        },
        {
          status:404
        }
      );

    }




    const subscription =
      await prisma.subscription.upsert({

        where:{
          userId:user.id
        },


        update:{
          plan
        },


        create:{

          userId:user.id,

          plan

        }


      });



    return NextResponse.json({

      success:true,

      subscription

    });



  }catch(error){


    console.error(
      error
    );


    return NextResponse.json(
      {
        error:"Server error"
      },
      {
        status:500
      }
    );


  }

}