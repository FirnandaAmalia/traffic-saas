import {
  prisma,
} from "./prisma";


import {
  PLANS,
  type Plan,
} from "./plan";





export async function getUserPlan(
  userId:string
):Promise<Plan>{



  const subscription =
  await prisma.subscription.findUnique({

    where:{
      userId,
    },

    select:{
      plan:true,
    },

  });





  if(
    subscription?.plan === "PRO"
  ){

    return PLANS.PRO;

  }





  return PLANS.FREE;


}