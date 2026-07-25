import {
  NextResponse,
} from "next/server";


import {
  getServerSession,
} from "next-auth";


import {
  authOptions,
} from "@/lib/auth";


import {
  prisma,
} from "@/lib/prisma";


import {
  createPayment,
} from "@/lib/payment/payment-service";



export async function POST(
  request: Request
) {


  try {


    const session =
      await getServerSession(
        authOptions
      );



    if (!session?.user?.id) {

      return NextResponse.json(

        {
          error: "Unauthorized",
        },

        {
          status: 401,
        }

      );

    }




    const body =
      await request.json();



    const {
      plan = "PRO",
      billing = "MONTHLY",
    } = body;






    const subscription =
      await prisma.subscription.findUnique({

        where: {
          userId:
            session.user.id,
        },

      });






    if (
      subscription?.plan === "PRO"
    ) {


      return NextResponse.json(

        {
          error:
            "Anda sudah menggunakan paket PRO",
        },

        {
          status: 400,
        }

      );

    }







    /*
    |--------------------------------------------------------------------------
    | PRICE CONFIG
    |--------------------------------------------------------------------------
    */


    const prices = {


      MONTHLY: {

        amount: 299000,

        label: "PRO Monthly",

      },


      YEARLY: {

        amount: 2990000,

        label: "PRO Yearly",

      },


    };





    const selectedPrice =
      billing === "YEARLY"
        ? prices.YEARLY
        : prices.MONTHLY;








    const result =
      await createPayment({

        userId:
          session.user.id,


        amount:
          selectedPrice.amount,

      });









    return NextResponse.json({

      success: true,


      orderId:
        result.payment.orderId,


      redirectUrl:
        result.redirectUrl,


      payment:
        result.payment,


      plan,


      billing,


      amount:
        selectedPrice.amount,


      message:
        "Payment created successfully",

    });






  } catch (error: unknown) {



    console.error(

      "CREATE PAYMENT ERROR",

      error

    );




    return NextResponse.json(

      {

        error:
          error instanceof Error
            ? error.message
            : "Internal server error",

      },

      {

        status: 500,

      }

    );


  }


}