import { prisma } from "./prisma";

export async function getProject(
  projectId: string
) {
  return prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });
}