import { NextResponse } from "next/server";

import {
  prisma,
} from "@/lib/prisma";



export async function GET(

request: Request,

{
  params
}:{
  params: Promise<{
    orderId:string;
  }>
}

){


try{


const {
  orderId
} = await params;





if(!orderId){


return NextResponse.json(

{
error:"Order ID required"
},

{
status:400
}

);

}





const payment =

await prisma.payment.findUnique({

where:{
  orderId
},

select:{

status:true,

orderId:true,

}

});








if(!payment){


return NextResponse.json(

{
error:"Payment not found"
},

{
status:404
}

);

}




return NextResponse.json({

success:true,

status:
payment.status,


orderId:
payment.orderId,

});

}

catch(error:any){


console.error(

"PAYMENT STATUS ERROR",

error

);




return NextResponse.json(

{
success:false,

error:
error?.message ??
"Internal server error"

},

{
status:500
}

);


}


}