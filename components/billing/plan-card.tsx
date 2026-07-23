"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Check,
  Crown,
} from "lucide-react";


interface Props {

  title: string;

  price: string;

  period: string;

  description: string;

  features: string[];

  active?: boolean;

}



export default function PlanCard({

  title,

  price,

  period,

  description,

  features,

  active = false,

}: Props) {



const router = useRouter();


const [loading,setLoading] =
useState(false);




async function upgrade(){


if(!active){

return;

}



try{


setLoading(true);



const response =
await fetch(

"/api/payment/create",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

plan:"PRO",

billing:"MONTHLY"

})

}

);




const data =
await response.json();



console.log(
"CREATE PAYMENT RESPONSE:",
data
);





if(!response.ok){

throw new Error(

data.error ??
"Gagal membuat pembayaran"

);

}




const orderId =

data.orderId ??

data.payment?.orderId;





if(!orderId){

throw new Error(

"Order ID tidak ditemukan"

);

}





router.push(

`/payment/${orderId}`

);



router.refresh();





}

catch(error){


console.error(
"PAYMENT ERROR:",
error
);



alert(

error instanceof Error

?

error.message

:

"Gagal membuat pembayaran"

);



}

finally{


setLoading(false);


}


}





return (

<div

className={`

rounded-3xl

border

bg-white

p-7

shadow-sm

transition

hover:shadow-lg


${

active

?

"border-blue-500 ring-2 ring-blue-100"

:

"border-slate-200"

}

`}

>



<div

className="
flex
items-center
justify-between
"

>


<h3

className="
text-lg
font-bold
"

>

{title}

</h3>





{

active &&

<div

className="
flex
items-center
gap-1
rounded-full
bg-slate-900
px-3
py-1
text-xs
font-bold
text-white
"

>

<Crown size={12}/>

POPULAR

</div>

}



</div>







<div

className="
mt-5
flex
items-end
gap-2
"

>


<h2

className="
text-4xl
font-black
"

>

{price}

</h2>



<span

className="
text-sm
text-slate-500
"

>

{period}

</span>



</div>







<p

className="
mt-4
text-sm
text-slate-500
"

>

{description}

</p>








<div

className="
mt-6
space-y-3
"

>


{

features.map(item=>(


<div

key={item}

className="
flex
items-center
gap-3
text-sm
text-slate-700
"

>


<div

className="
rounded-full
bg-green-100
p-1
"

>

<Check

size={13}

className="
text-green-600
"

/>


</div>



{item}



</div>


))

}



</div>









<button


onClick={upgrade}


disabled={!active || loading}


className={`

mt-8

w-full

rounded-xl

py-3

font-semibold

transition


${

active

?

"bg-blue-600 text-white hover:bg-blue-700"

:

"border border-slate-200 text-slate-400 cursor-not-allowed"

}


disabled:opacity-50

`

}


>



{

loading

?

"Membuat pembayaran..."

:

active

?

"Upgrade ke PRO"

:

"Mulai Gratis"

}



</button>





</div>


);


}