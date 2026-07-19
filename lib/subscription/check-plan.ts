import { prisma } from "@/lib/prisma";


export async function getUserPlan(
  userId:string
){

  const subscription =
    await prisma.subscription.findUnique({

      where:{
        userId
      }

    });


  return subscription?.plan ?? "FREE";

}