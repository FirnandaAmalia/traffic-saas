"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function updateUserPlan(
  userId: string,
  plan: "FREE" | "PRO"
) {

  await prisma.subscription.upsert({

    where:{
      userId,
    },

    update:{
      plan,
    },

    create:{
      userId,
      plan,
    },

  });


  revalidatePath("/admin");

}