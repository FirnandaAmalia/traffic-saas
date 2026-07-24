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



  /*
  |--------------------------------------------------------------------------
  | Authentication Check
  |--------------------------------------------------------------------------
  */


  if(!session?.user){

    redirect("/login");

  }



  /*
  |--------------------------------------------------------------------------
  | Admin Authorization
  |--------------------------------------------------------------------------
  */


  if(session.user.role !== "ADMIN"){

    redirect("/dashboard");

  }



  /*
  |--------------------------------------------------------------------------
  | Admin Workspace Layout
  |--------------------------------------------------------------------------
  */


  return (

    <div

      className="
        min-h-screen
        bg-slate-50
        text-slate-900
      "

    >


      <main>

        {children}

      </main>


    </div>

  );

}