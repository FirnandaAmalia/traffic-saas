import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST() {

const session =
await getServerSession(
authOptions
);


if(
!session?.user?.id
){

return NextResponse.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}


const result =
await createPayment({

userId:
session.user.id,

amount:
99000,

});


return NextResponse.json({

success:true,

token:
result.token,

redirectUrl:
result.redirectUrl,

orderId:
result.payment.orderId,

});

}