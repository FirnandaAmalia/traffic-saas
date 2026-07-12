import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import {
  FEATURES,
  hasFeature,
} from "@/lib/features";

import {
  PLANS,
} from "@/lib/plan";

export async function POST(
  req: Request
) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.user?.email) {
      return Response.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await req.json();

    if (!body.projectName) {
      return Response.json(
        {
          success: false,
          error:
            "Project name wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const plan = PLANS.FREE;

const canCreateUnlimited = hasFeature(
  plan,
  FEATURES.UNLIMITED_PROJECT
);

if (!canCreateUnlimited) {

  const totalProjects =
    await prisma.project.count({
      where: {
        userEmail:
          session.user.email,
      },
    });

  if (totalProjects >= 1) {
    return Response.json(
      {
        success: false,
        code: "FREE_PLAN_LIMIT",
        error:
          "Free Plan hanya mendukung 1 Project. Upgrade ke Pro untuk membuat project tanpa batas.",
      },
      {
        status: 403,
      }
    );
  }
}

    const project =
      await prisma.project.create({
        data: {
          userEmail:
            session.user.email,

          projectName:
            body.projectName,

          domain:
            body.domain ?? null,

          gscSiteUrl: null,

          ga4PropertyId: null,
        },
      });

    return Response.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(
      "CREATE PROJECT ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        error:
          "Gagal membuat project.",
      },
      {
        status: 500,
      }
    );
  }
}