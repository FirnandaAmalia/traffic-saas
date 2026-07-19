import { prisma } from "@/lib/prisma";


export async function createPayment({

  userId,

  amount,

}:{

  userId:string;

  amount:number;

}){


  const orderId =
    `TRAFFIC-${Date.now()}`;



  const payment =
    await prisma.payment.create({

      data:{

        userId,

        orderId,

        amount,

        status:"PENDING",

        provider:"MANUAL",

      },

    });



  return {

    payment,

  };


}