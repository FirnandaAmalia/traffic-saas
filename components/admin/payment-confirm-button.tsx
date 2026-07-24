"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  CheckCircle2,
  Loader2,
} from "lucide-react";



interface Props {
  orderId: string;
}



export default function PaymentConfirmButton({
  orderId,
}: Props) {


  const router =
    useRouter();


  const [loading, setLoading] =
    useState(false);



  async function confirmPayment() {


    const agree =
      window.confirm(
        "Konfirmasi pembayaran ini dan aktifkan paket PRO user?"
      );


    if (!agree) {
      return;
    }



    try {


      setLoading(true);



      const response =
        await fetch(
          "/api/payment/confirm",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              orderId,
            }),
          }
        );



      const data =
        await response.json()
        .catch(() => null);



      if (
        !response.ok ||
        !data?.success
      ) {

        throw new Error(
          data?.error ??
          "Gagal melakukan konfirmasi pembayaran"
        );

      }




      alert(
        "Pembayaran berhasil dikonfirmasi. Paket PRO user telah aktif."
      );



      router.refresh();



    } catch(error) {


      console.error(
        "CONFIRM PAYMENT ERROR:",
        error
      );



      alert(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat konfirmasi pembayaran"
      );



    } finally {


      setLoading(false);


    }


  }




  return (

    <button

      onClick={confirmPayment}

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


      {
        loading

        ?

        (
          <>
            <Loader2
              className="
              h-4
              w-4
              animate-spin
              "
            />

            Memproses...
          </>
        )


        :

        (
          <>
            <CheckCircle2
              className="
              h-4
              w-4
              "
            />

            Confirm Payment
          </>
        )

      }


    </button>

  );

}