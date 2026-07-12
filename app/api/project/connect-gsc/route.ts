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
      gscSiteUrl,
    } = await req.json();

    if (
      !projectId ||
      !gscSiteUrl
    ) {
      return Response.json(
        {
          success: false,
          error:
            "projectId dan gscSiteUrl wajib diisi.",
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
          gscSiteUrl,
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
          "Gagal menghubungkan Google Search Console.",
      },
      {
        status: 500,
      }
    );
  }
}