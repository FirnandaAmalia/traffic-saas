import ProjectCard from "./project-card";

interface ProjectGridProps {
  projects: {
    id: string;
    projectName:string;
    domain:string | null;
    gscSiteUrl: string | null;
    ga4PropertyId: string | null;
    createdAt: Date;
    lastSyncedAt: Date | null;
  }[];
}

export default function ProjectGrid({
  projects,
}: ProjectGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}