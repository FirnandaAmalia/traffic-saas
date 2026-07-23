import { prisma } from "@/lib/prisma";


export async function hasProAccess(
  userId:string
){

const subscription =
await prisma.subscription.findUnique({

where:{
userId
},

select:{
plan:true
}

});


return (
subscription?.plan === "PRO"
);

}




export async function requirePro(
userId:string
){

const allowed =
await hasProAccess(userId);


if(!allowed){

throw new Error(
"PRO_REQUIRED"
);

}


return true;

}