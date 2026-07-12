import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

import { fetchGA4RawData } from "@/lib/google/ga4";
import { fetchGSCRawData } from "@/lib/google/gsc";

export async function POST(
  request: Request
) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.refreshToken) {
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
    } = await request.json();

    if (!projectId) {
      return Response.json(
        {
          success: false,
          error: "projectId is required",
        },
        {
          status: 400,
        }
      );
    }

    const project =
      await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

    if (!project) {
      return Response.json(
        {
          success: false,
          error: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    // ==================================
    // Pastikan project sudah terhubung
    // ==================================

    if (!project.gscSiteUrl) {
      return Response.json(
        {
          success: false,
          error:
            "Google Search Console belum terhubung.",
        },
        {
          status: 400,
        }
      );
    }

    if (!project.ga4PropertyId) {
      return Response.json(
        {
          success: false,
          error:
            "Google Analytics belum terhubung.",
        },
        {
          status: 400,
        }
      );
    }

    const refreshToken =
      session.refreshToken as string;

    // ==================================
    // Validasi akses Google
    // ==================================

    await fetchGSCRawData(
      refreshToken,
      project.gscSiteUrl
    );

    await fetchGA4RawData(
      refreshToken,
      project.ga4PropertyId
    );

    // ==================================
    // Update Last Sync
    // ==================================

    const updatedProject =
      await prisma.project.update({
        where: {
          id: project.id,
        },
        data: {
          lastSyncedAt:
            new Date(),
        },
      });

    return Response.json({
      success: true,
      projectId: updatedProject.id,
      lastSyncedAt:
        updatedProject.lastSyncedAt,
    });

  } catch (error) {

    console.error(
      "SYNC ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}