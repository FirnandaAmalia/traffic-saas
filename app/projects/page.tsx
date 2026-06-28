import CreateProjectDialog from "@/components/projects/create-project-dialog";
import PageHeader from "@/components/projects/page-header";
import ProjectGrid from "@/components/projects/project-grid";
import ProjectToolbar from "@/components/projects/project-toolbar";
import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
  <>
    <PageHeader
      title="Workspace"
      description="Manage all your SEO workspaces."
    >
      <CreateProjectDialog />
    </PageHeader>

    <ProjectToolbar />

    <ProjectGrid
      projects={projects}
    />
  </>
);
}