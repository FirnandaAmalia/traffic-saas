import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const { projectId } = await req.json();

    if (!projectId) {
      return Response.json(
        {
          success: false,
          error: "Project ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Failed to delete project.",
      },
      {
        status: 500,
      }
    );
  }
}