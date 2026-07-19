"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function toggleUserPlan(
  userId: string
) {


  const subscription =
    await prisma.subscription.findUnique({

      where:{
        userId,
      },

    });



  const newPlan =
    subscription?.plan === "PRO"
      ? "FREE"
      : "PRO";




  await prisma.subscription.upsert({

    where:{
      userId,
    },


    update:{
      plan:newPlan,
    },


    create:{
      userId,
      plan:newPlan,
    },


  });



  revalidatePath("/admin");


}