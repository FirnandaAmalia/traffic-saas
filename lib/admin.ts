import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


export async function requireAdmin() {


  const session =
    await getServerSession(
      authOptions
    );



  if (!session?.user?.email) {

    redirect(
      "/api/auth/signin"
    );

  }




  const user =
    await prisma.user.findUnique({

      where:{
        email:
          session.user.email,
      },

    });




  if (!user) {

    redirect("/");

  }




  if (user.role !== "ADMIN") {

    redirect("/");

  }



  return user;

}