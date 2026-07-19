import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(
  request: Request
){

  const body = await request.json();

  const {
    orderId
  } = body;


  if(!orderId){
    return NextResponse.json(
      {
        error:"Order ID required"
      },
      {
        status:400
      }
    );
  }


  const payment =
    await prisma.payment.findUnique({
      where:{
        orderId
      }
    });


  if(!payment){
    return NextResponse.json(
      {
        error:"Payment not found"
      },
      {
        status:404
      }
    );
  }



  const updatedPayment =
    await prisma.payment.update({

      where:{
        id:payment.id
      },

      data:{
        status:"SUCCESS"
      }

    });



  await prisma.subscription.update({

    where:{
      userId:payment.userId
    },

    data:{
      plan:"PRO"
    }

  });



  return NextResponse.json({

    success:true,

    payment:
      updatedPayment,

    message:
      "Subscription upgraded"

  });


}