import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request
) {
  try {
    const session =
      await getServerSession(authOptions);

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
      projectName,
      domain,
    } = await req.json();

    if (
      !projectId ||
      !projectName
    ) {
      return Response.json(
        {
          success: false,
          error:
            "projectId dan projectName wajib diisi.",
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
          projectName,
          domain:
            domain?.trim() || null,
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
          "Gagal memperbarui workspace.",
      },
      {
        status: 500,
      }
    );
  }
}