import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { getProject } from "@/lib/project-service";
import { buildExportReport } from "@/lib/export/export-service";

import {
  renderToBuffer,
} from "@react-pdf/renderer";

import {
  buildPDFDocument,
} from "@/lib/export/pdf-builder";

export async function GET(
  request: NextRequest
) {
  try {
    const projectId =
      request.nextUrl.searchParams.get(
        "projectId"
      );

    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing projectId",
        },
        {
          status: 400,
        }
      );
    }

    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.refreshToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const project =
      await getProject(projectId);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    const exportData =
      await buildExportReport({
        refreshToken:
          session.refreshToken,

        project,

        range: "28d",
      });

    const buffer =
      await renderToBuffer(
        buildPDFDocument(
          exportData.report
        )
      );

    return new Response(
      new Uint8Array(buffer),
      {
        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename="${project.projectName}-SEO-Report.pdf"`,

          "Cache-Control":
            "no-store",
        },
      }
    );

  } catch (error) {

    console.error(
      "EXPORT PDF ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}