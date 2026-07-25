import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";


export async function POST(
  req: Request
){

  const session =
    await getServerSession(authOptions);


  if(
    !session?.user?.id ||
    session.user.role !== "ADMIN"
  ){

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


  const {
    userId,
    plan
  } = body;



  if(
    !userId ||
    !["FREE","PRO"].includes(plan)
  ){

    return NextResponse.json(
      {
        error:"Invalid data"
      },
      {
        status:400
      }
    );

  }



  await prisma.subscription.upsert({

    where:{
      userId
    },


    update:{
      plan
    },


    create:{
      userId,
      plan
    }

  });



  return NextResponse.json({

    success:true

  });


}
