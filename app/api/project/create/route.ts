import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const project = await prisma.project.create({
      data: {
        userEmail: body.userEmail,
        projectName: body.projectName,
        gscSiteUrl: body.gscSiteUrl,
        ga4PropertyId: body.ga4PropertyId,
      },
    });

    return Response.json({
      success: true,
      project,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}