import { prisma } from "@/lib/prisma";
import PaymentClient from "./payment-client";


interface Props {
  params: Promise<{
    orderId:string;
  }>;
}


export default async function PaymentPage({
  params,
}: Props) {


  try {

    const {
      orderId
    } = await params;


    console.log(
      "PAYMENT ORDER ID:",
      orderId
    );


    const payment =
      await prisma.payment.findUnique({

        where:{
          orderId
        }

      });


    console.log(
      "PAYMENT DATA:",
      payment
    );



    if(!payment){

      return (

        <div className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-slate-50
        ">

          <div className="
            rounded-2xl
            bg-white
            p-8
            shadow
            text-center
          ">

            <h1 className="
              text-xl
              font-bold
            ">
              Payment Tidak Ditemukan
            </h1>


            <p className="
              mt-2
              text-sm
              text-slate-500
            ">
              Order pembayaran tidak tersedia.
            </p>

          </div>

        </div>

      );

    }



    return (

      <PaymentClient

        payment={{

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

        }}

      />

    );



  } catch(error){


    console.error(
      "PAYMENT PAGE ERROR:",
      error
    );


    return (

      <div className="
        flex
        min-h-screen
        items-center
        justify-center
      ">

        <div>

          <h1 className="
            text-xl
            font-bold
          ">
            Payment Error
          </h1>

          <p>
            Terjadi kesalahan server.
          </p>

        </div>


      </div>

    );


  }

}