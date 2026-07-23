import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

import { PaymentStatus } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        {
          error: "Order ID required",
        },

        {
          status: 400,
        },
      );
    }

    const payment = await prisma.payment.findUnique({
      where: {
        orderId,
      },
    });

    if (!payment) {
      return NextResponse.json(
        {
          error: "Payment not found",
        },

        {
          status: 404,
        },
      );
    }

    if (payment.status !== PaymentStatus.WAITING_PAYMENT) {
      return NextResponse.json(
        {
          error: "Payment already submitted or processed",
        },

        {
          status: 400,
        },
      );
    }

    await prisma.payment.update({
      where: {
        orderId,
      },

      data: {
        status: PaymentStatus.PAYMENT_SUBMITTED,
      },
    });


    return NextResponse.json({
      success: true,

      message: "Payment submitted. Waiting admin confirmation.",
    });
  } catch (error: any) {
    console.error("PAYMENT SUBMIT ERROR", error);

    return NextResponse.json(
      {
        error: error?.message ?? "Internal server error",
      },

      {
        status: 500,
      },
    );
  }
}
