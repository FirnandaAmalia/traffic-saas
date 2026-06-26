import Link from "next/link";
import CreateProjectDialog
from "@/components/projects/create-project-dialog";
import { prisma } from "@/lib/prisma";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default async function ProjectsPage() {
  const projects =
    await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <main className="min-h-screen p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            My Projects
          </h1>

          <p className="text-muted-foreground">
            Kelola project Google Search Console & GA4
          </p>

        </div>

        <CreateProjectDialog />

      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {projects.map((project) => (

          <Card
  key={project.id}
  className="transition-all hover:shadow-lg"
>

            <CardHeader>

              <CardTitle>
                {project.projectName}
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                SEO Analytics Project
              </p>

            </CardHeader>

            <CardContent>

  <div className="space-y-4">

    <div>
      <div className="font-medium">
        Search Console
      </div>

      <div className="text-sm text-green-600">
        ✓ Connected
      </div>
    </div>

    <div>
      <div className="font-medium">
        Google Analytics 4
      </div>

      <div className="text-sm text-green-600">
        ✓ Connected
      </div>
    </div>

    <Button
      asChild
      className="w-full"
    >
      <Link
        href={`/dashboard?projectId=${project.id}`}
      >
        Open Dashboard
      </Link>
    </Button>

  </div>

</CardContent>

          </Card>

        ))}

      </div>

    </main>
  );
}