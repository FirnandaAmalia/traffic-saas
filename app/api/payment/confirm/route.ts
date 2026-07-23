import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { PaymentStatus, Plan } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },

        {
          status: 401,
        },
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Forbidden",
        },

        {
          status: 403,
        },
      );
    }

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

    if (payment.status !== PaymentStatus.PAYMENT_SUBMITTED) {
      return NextResponse.json(
        {
          error: "Payment belum disubmit user atau sudah diproses",
        },

        {
          status: 400,
        },
      );
    }

    await prisma.$transaction([
      prisma.payment.update({
        where: {
          id: payment.id,
        },

        data: {
          status: PaymentStatus.SUCCESS,
        },
      }),

      prisma.subscription.upsert({
        where: {
          userId: payment.userId,
        },

        update: {
          plan: Plan.PRO,
        },

        create: {
          userId: payment.userId,

          plan: Plan.PRO,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,

      message: "Payment confirmed successfully",
    });
  } catch (error: any) {
    console.error(
      "PAYMENT CONFIRM ERROR",

      error,
    );

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
