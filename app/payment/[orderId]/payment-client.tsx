"use client";

import {
  useState,
  useEffect,
} from "react";

import {
  Clock,
  ShieldCheck,
  CreditCard,
  CheckCircle,
  Loader2,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import { useLocale } from "next-intl";

interface PaymentData {

  id: string;

  orderId: string;

  status:
  | "PENDING"
  | "WAITING_PAYMENT"
  | "PAYMENT_SUBMITTED"
  | "SUCCESS"
  | "FAILED"
  | "EXPIRED";

  amount: number;

  qrCodeUrl?: string | null;

}




export default function PaymentClient({
  payment,
}: {
  payment: PaymentData;
}) {


const locale = useLocale();
const [loading,setLoading] =
useState(false);



const [submitted,setSubmitted] =
useState(
  payment.status === "PAYMENT_SUBMITTED" ||
  payment.status === "SUCCESS"
);



const [status,setStatus] =
useState(payment.status);

const router =
useRouter();

/*
|--------------------------------------------------------------------------
| AUTO CHECK PAYMENT STATUS
|--------------------------------------------------------------------------
*/

useEffect(()=>{


if(status !== "PAYMENT_SUBMITTED"){
  return;
}



const interval = setInterval(async()=>{


try{


const response =
await fetch(
`/api/payment/status/${payment.orderId}`,
{
cache:"no-store",
}
);



const data =
await response.json();




if(
response.ok &&
data.status === "SUCCESS"
){


clearInterval(interval);



setSubmitted(true);

setStatus("SUCCESS");



setTimeout(()=>{

window.location.href =
`/${locale}/dashboard`;


},2000);



}



}
catch(error){

console.error(
"PAYMENT STATUS CHECK ERROR",
error
);

}



},3000);




return ()=>{

clearInterval(interval);

};


},[
status,
payment.orderId
]);

/*
|--------------------------------------------------------------------------
| USER SUBMIT PAYMENT
|--------------------------------------------------------------------------
*/


async function submitPayment(){



try{


setLoading(true);



const response =
await fetch(

"/api/payment/submit",

{

method:"POST",

headers:{
"Content-Type":
"application/json",
},


body:JSON.stringify({

orderId:
payment.orderId,

}),

}

);




const data =
await response.json()
.catch(()=>null);





if(
!response.ok
){

throw new Error(

data?.error ??
"Payment submit failed"

);

}




setSubmitted(true);


setStatus(
"PAYMENT_SUBMITTED"
);



}
catch(error){



console.error(
"SUBMIT PAYMENT ERROR",
error
);



alert(

error instanceof Error
?
error.message
:
"Gagal mengirim pembayaran"

);



}
finally{


setLoading(false);


}



}





return (

<div
className="
min-h-screen
flex
items-center
justify-center
bg-slate-50
px-5
"
>


<div
className="
w-full
max-w-md
rounded-3xl
bg-white
p-8
shadow-xl
border
border-slate-200
"
>



{/* HEADER */}


<div
className="
text-center
"
>


<div
className="
mx-auto
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-gradient-to-br
from-violet-600
to-blue-600
text-white
"
>

<CreditCard />

</div>



<h1
className="
mt-5
text-3xl
font-black
text-slate-900
"
>

TrafficSaaS PRO

</h1>



<p
className="
mt-2
text-sm
text-slate-500
"
>

Aktifkan fitur AI SEO premium

</p>


</div>





{/* ORDER DETAIL */}


<div
className="
mt-8
rounded-xl
bg-slate-50
p-4
"
>


<p
className="
text-xs
text-slate-500
"
>

Order ID

</p>



<p
className="
mt-1
font-mono
text-sm
font-semibold
"
>

{payment.orderId}

</p>


</div>





{/* PAYMENT METHOD */}


{
!submitted &&

<div
className="
mt-6
rounded-2xl
border
p-5
text-center
"
>


<h2
className="
font-bold
text-lg
"
>

Metode Pembayaran

</h2>



<p
className="
mt-2
text-sm
text-slate-500
"
>

Scan QRIS menggunakan
mobile banking atau e-wallet

</p>



{
payment.qrCodeUrl &&

<img

src={payment.qrCodeUrl}

alt="QRIS Payment"

className="
mx-auto
mt-5
h-64
w-64
rounded-xl
border
bg-white
p-3
"

/>

}





<div
className="
mt-5
"
>


<p
className="
text-sm
text-slate-500
"
>

Total Pembayaran

</p>



<p
className="
text-3xl
font-black
"
>

Rp
{
payment.amount.toLocaleString(
"id-ID"
)
}

</p>


</div>


</div>

}





{/* WAITING STATUS */}


{
submitted &&
status !== "SUCCESS" &&

<div
className="
mt-6
rounded-2xl
bg-yellow-50
p-6
text-center
"
>


<Clock
className="
mx-auto
text-yellow-600
"
/>



<h3
className="
mt-3
font-bold
text-yellow-700
"
>

Menunggu Konfirmasi Admin

</h3>



<p
className="
mt-2
text-sm
text-yellow-600
"
>

Pembayaran berhasil dikirim.
Admin sedang melakukan verifikasi.

</p>


</div>

}






{/* SUCCESS */}


{
status === "SUCCESS" &&

<div
className="
mt-6
rounded-2xl
bg-emerald-50
p-6
text-center
text-emerald-700
"
>


<CheckCircle
className="
mx-auto
mb-2
"
/>



<h3
className="
font-bold
"
>

Pembayaran Berhasil

</h3>



<p
className="
mt-2
text-sm
"
>

Paket PRO sedang diaktifkan.
Anda akan diarahkan ke dashboard.

</p>


</div>

}







{/* SUBMIT BUTTON */}


{
!submitted &&

<button

onClick={submitPayment}

disabled={loading}

className="
mt-6
flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-violet-600
py-3
font-bold
text-white
hover:bg-violet-700
disabled:opacity-50
"

>

{
loading

?

<>

<Loader2
className="
h-4
w-4
animate-spin
"
/>

Mengirim...

</>


:

"Saya Sudah Bayar"

}


</button>

}







<div
className="
mt-6
flex
justify-center
items-center
gap-2
text-xs
text-slate-400
"
>

<ShieldCheck size={14}/>

Pembayaran aman melalui QRIS

</div>




</div>


</div>

);


}