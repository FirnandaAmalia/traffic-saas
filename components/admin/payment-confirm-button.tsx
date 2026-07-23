"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  CheckCircle2,
} from "lucide-react";



export default function PaymentConfirmButton({

orderId,

}:{
orderId:string;

}){


const router =
useRouter();


const [loading,setLoading] =
useState(false);




async function confirm(){



const agree =
window.confirm(
"Konfirmasi pembayaran ini dan aktifkan paket PRO user?"
);



if(!agree)
return;





try{


setLoading(true);





const response =

await fetch(

"/api/payment/confirm",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

orderId

})

}

);






const data =
await response.json();






if(!response.ok || !data.success){


throw new Error(

data.error ??
"Gagal konfirmasi pembayaran"

);

}





router.refresh();





}

catch(error:any){


console.error(
"CONFIRM PAYMENT ERROR",
error
);



alert(
error.message ??
"Terjadi kesalahan"
);



}

finally{


setLoading(false);


}



}






return (


<button


onClick={confirm}


disabled={loading}


className="
inline-flex
items-center
gap-2
rounded-xl
bg-emerald-600
px-4
py-2
text-xs
font-bold
text-white
transition
hover:bg-emerald-700
disabled:cursor-not-allowed
disabled:opacity-50
"


>


<CheckCircle2
className="h-4 w-4"
/>



{

loading

?

"Memproses..."

:

"Confirm Payment"

}



</button>


);


}