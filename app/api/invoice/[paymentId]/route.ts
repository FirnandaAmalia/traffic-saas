import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import {
  getServerSession,
} from "next-auth";

import {
  authOptions,
} from "@/lib/auth";

import {
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";


export async function GET(

  request: Request,

  context: {
    params: Promise<{
      paymentId: string
    }>
  }

) {


try {


const session =
await getServerSession(
  authOptions
);



if(!session?.user?.id){

return NextResponse.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}





const {
paymentId
}
=
await context.params;





const payment =
await prisma.payment.findUnique({

where:{
id:paymentId
},

include:{
user:true
}

});






if(!payment){

return NextResponse.json(
{
error:"Payment tidak ditemukan"
},
{
status:404
}
);

}






if(payment.userId !== session.user.id){

return NextResponse.json(
{
error:"Forbidden"
},
{
status:403
}
);

}






// CREATE PDF

const pdfDoc =
await PDFDocument.create();


const page =
pdfDoc.addPage([
595.28,
841.89
]);


const font =
await pdfDoc.embedFont(
StandardFonts.Helvetica
);


const bold =
await pdfDoc.embedFont(
StandardFonts.HelveticaBold
);



const { width,height } =
page.getSize();


// ========================
// HEADER
// ========================


page.drawRectangle({

x:0,

y:height-140,

width,

height:140,

color:rgb(
0.08,
0.25,
0.65
)

});



page.drawText(
"TrafficSaaS",
{
x:50,
y:height-70,
size:28,
font:bold,
color:rgb(1,1,1)
}
);



page.drawText(
"SEO Intelligence Platform",
{
x:50,
y:height-95,
size:12,
font,
color:rgb(
0.85,
0.9,
1
)
}
);



page.drawText(
"INVOICE",
{
x:420,
y:height-75,
size:22,
font:bold,
color:rgb(1,1,1)
}
);



// ========================
// STATUS BADGE
// ========================


page.drawRectangle({

x:420,

y:height-120,

width:100,

height:25,

color:rgb(
0.1,
0.7,
0.35
)

});


page.drawText(
"PAID",
{
x:450,
y:height-113,
size:12,
font:bold,
color:rgb(1,1,1)
}

);




// ========================
// INVOICE INFO
// ========================


let y =
height-190;



function text(
label:string,
value:string
){


page.drawText(
label,
{
x:50,
y,
size:11,
font:bold,
color:rgb(
0.3,
0.3,
0.3
)
}
);



page.drawText(
value,
{
x:200,
y,
size:11,
font,
color:rgb(
0,
0,
0
)
}
);


y-=22;


}



text(
"Invoice Number",
`INV-${payment.orderId}`
);



text(
"Order ID",
payment.orderId
);



text(
"Date",
payment.createdAt.toLocaleDateString(
"id-ID"
)
);




// ========================
// CUSTOMER CARD
// ========================


y-=20;


page.drawRectangle({

x:50,

y:y-100,

width:495,

height:90,

color:rgb(
0.96,
0.97,
1
)

});



page.drawText(
"BILL TO",
{
x:70,
y:y-25,
size:11,
font:bold
}
);



page.drawText(
payment.user?.name ?? "-",
{
x:70,
y:y-50,
size:14,
font:bold
}
);



page.drawText(
payment.user?.email ?? "-",
{
x:70,
y:y-70,
size:11,
font
}
);





// ========================
// SUBSCRIPTION
// ========================


y-=150;



page.drawText(
"Subscription Detail",
{
x:50,
y,
size:16,
font:bold
}
);



y-=35;



page.drawText(
"TrafficSaaS PRO",
{
x:50,
y,
size:14,
font:bold
}
);



page.drawText(
"Monthly Subscription",
{
x:50,
y:y-20,
size:11,
font
}
);




// ========================
// TOTAL BOX
// ========================


page.drawRectangle({

x:50,

y:y-100,

width:495,

height:70,

color:rgb(
0.93,
0.96,
1
)

});



page.drawText(
"TOTAL PAYMENT",
{
x:70,
y:y-45,
size:12,
font:bold
}
);



page.drawText(
`Rp${payment.amount.toLocaleString("id-ID")}`,
{
x:350,
y:y-50,
size:20,
font:bold,
color:rgb(
0.05,
0.25,
0.7
)
}
);




// ========================
// FOOTER
// ========================


page.drawText(
"Thank you for subscribing to TrafficSaaS.",
{
x:150,
y:80,
size:11,
font
}
);



page.drawText(
"www.trafficsaas.com",
{
x:220,
y:60,
size:10,
font
}
);


const pdfBytes =
await pdfDoc.save();







return new NextResponse(
Buffer.from(pdfBytes),
{

headers:{

"Content-Type":
"application/pdf",


"Content-Disposition":
`attachment; filename="TrafficSaaS-Invoice-${payment.orderId}.pdf"`

}

}

);




}

catch(error){


console.error(
"PDF INVOICE ERROR",
error
);



return NextResponse.json(
{
error:
error instanceof Error
?
error.message
:
"Internal server error"
},
{
status:500
}
);


}


}