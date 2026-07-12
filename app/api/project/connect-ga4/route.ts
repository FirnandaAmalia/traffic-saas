import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

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

    const {
      projectId,
      ga4PropertyId,
      ga4PropertyName,
    } = await req.json();

    if (
      !projectId ||
      !ga4PropertyId ||
      !ga4PropertyName
    ) {
      return Response.json(
        {
          success: false,
          error:
            "projectId, ga4PropertyId, dan ga4PropertyName wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const project =
      await prisma.project.update({
        where: {
          id: projectId,
        },

        data: {
          ga4PropertyId,
          ga4PropertyName,
        },
      });

    return Response.json({
      success: true,
      project,
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        success: false,
        error:
          "Gagal menghubungkan Google Analytics.",
      },
      {
        status: 500,
      }
    );
  }
}