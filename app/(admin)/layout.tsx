import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {


  const session =
    await getServerSession(
      authOptions
    );


  if(!session?.user){

    redirect("/login");

  }


  if(session.user.role !== "ADMIN"){

    redirect("/dashboard");

  }



  return (

    <div className="
      min-h-screen
      bg-slate-950
      text-white
    ">

      <main>
        {children}
      </main>

    </div>

  );

}