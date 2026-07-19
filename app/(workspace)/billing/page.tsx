import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getCurrentPlan } from "@/lib/subscription";

import BillingClient from "./billing-client";


export default async function BillingPage() {


  const session =
    await getServerSession(
      authOptions
    );


  if(!session?.user?.email){

    return null;

  }



  const currentPlan =
    await getCurrentPlan(
      session.user.email
    );



  return (

    <BillingClient
      currentPlan={currentPlan}
    />

  );

}