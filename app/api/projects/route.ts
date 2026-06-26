import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects =
    await prisma.project.findMany();

  return Response.json({
    success: true,
    projects,
  });
}