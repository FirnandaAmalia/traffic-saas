import { prisma } from "@/lib/prisma";
import { generatePaymentQR } from "./qrcode";

import {
  PaymentStatus,
  PaymentProvider,
} from "@prisma/client";


interface CreatePaymentInput {
  userId: string;
  amount: number;
}


export async function createPayment({
  userId,
  amount,
}: CreatePaymentInput) {


  const orderId =
    `TRAFFIC-${Date.now()}`;


  const qrCodeUrl =
    await generatePaymentQR({
      orderId,
      amount,
    });



  const payment =
    await prisma.payment.create({

      data: {

        userId,

        orderId,

        amount,


        status:
          PaymentStatus.WAITING_PAYMENT,


        provider:
          PaymentProvider.MANUAL,


        qrCodeUrl,

      },

    });



  return {

    payment,

    redirectUrl:
      `/payment/${payment.orderId}`,

  };

}