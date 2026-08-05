import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { getLocale } from "next-intl/server";

export default async function AdminLayout({

  children,

}: {

  children: ReactNode;

}) {

const locale = await getLocale();
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

    redirect(`/${locale}/dashboard`);

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