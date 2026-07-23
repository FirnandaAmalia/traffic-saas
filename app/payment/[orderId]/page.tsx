import { prisma } from "@/lib/prisma";

import PaymentClient from "./payment-client";


interface Props {

  params: Promise<{
    orderId:string;
  }>;

}




export default async function PaymentPage({

params

}:Props){



const {
orderId

} = await params;





const payment =

await prisma.payment.findUnique({

where:{
  orderId
}

});






if(!payment){


return (

<div
className="
flex
min-h-screen
items-center
justify-center
bg-slate-50
"

>


<div
className="
rounded-2xl
bg-white
p-8
shadow
text-center
"

>


<h1
className="
text-xl
font-bold
text-slate-900
"

>

Payment Tidak Ditemukan

</h1>



<p
className="
mt-2
text-sm
text-slate-500
"

>

Order pembayaran tidak valid atau sudah tidak tersedia.

</p>


</div>


</div>

);


}







return (

<PaymentClient

payment={

{

id:
payment.id,


orderId:
payment.orderId,


status:
payment.status,


amount:
payment.amount,


qrCodeUrl:
payment.qrCodeUrl,


}

}


/>

);


}