import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const projectCount = await prisma.project.count({
    where: {
      userEmail: session.user.email,
    },
  });

  return NextResponse.json({
    plan: "FREE",
    projectCount,
  });
}