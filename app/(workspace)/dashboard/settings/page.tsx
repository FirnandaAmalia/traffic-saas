import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { getProjectForUser } from "@/lib/project-service";
import { Button } from "@/components/ui/button";

import WorkspaceForm from "./workspace-form";

import DeleteProjectDialog from "@/components/projects/delete-project-dialog";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SettingsPageProps {
  searchParams: Promise<{
    projectId?: string;
  }>;
}

export default async function SettingsPage({
  searchParams,
}: SettingsPageProps) {

  const { projectId } =
    await searchParams;


  if (!projectId) {
    notFound();
  }


  const session =
    await getServerSession(authOptions);


  if(
    !session?.user?.id
  ){
    notFound();
  }


  const project =
    await getProjectForUser(
      projectId,
      session.user.id
    );


  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl p-10 space-y-6">

      <h1 className="text-3xl font-bold">
        Workspace Settings
      </h1>

      {/* Workspace */}

      <Card>

        <CardHeader>

          <CardTitle>
            Workspace
          </CardTitle>

        </CardHeader>

        <CardContent>

          <WorkspaceForm
            projectId={project.id}
            projectName={project.projectName}
            domain={project.domain}
          />

        </CardContent>

      </Card>

      {/* Google Search Console */}

      <Card>

        <CardHeader className="flex flex-row items-center justify-between">

          <CardTitle>
            Google Search Console
          </CardTitle>

          <Button
            asChild
            variant="outline"
            size="sm"
          >
            <Link
              href={`/setup/gsc?projectId=${project.id}`}
            >
              Reconnect
            </Link>
          </Button>

        </CardHeader>

        <CardContent>

          <p className="text-sm text-slate-500">
            Connected Property
          </p>

          <p className="mt-1 break-all font-medium">
            {project.gscSiteUrl ?? "-"}
          </p>

        </CardContent>

      </Card>

      {/* Google Analytics 4 */}

      <Card>

        <CardHeader className="flex flex-row items-center justify-between">

          <CardTitle>
            Google Analytics 4
          </CardTitle>

          <Button
            asChild
            variant="outline"
            size="sm"
          >
            <Link
              href={`/setup/ga4?projectId=${project.id}`}
            >
              Reconnect
            </Link>
          </Button>

        </CardHeader>

        <CardContent>

          <p className="text-sm text-slate-500">
            Connected Property
          </p>

          <p className="mt-1 break-all font-medium">
            {project.ga4PropertyName ??
              project.ga4PropertyId ??
              "-"}
          </p>

        </CardContent>

      </Card>

      {/* Danger Zone */}

      <Card className="border-red-200">

        <CardHeader>

          <CardTitle className="text-red-600">
            Danger Zone
          </CardTitle>

        </CardHeader>

        <CardContent className="flex items-center justify-between">

          <div>

            <p className="font-medium">
              Delete Workspace
            </p>

            <p className="text-sm text-slate-500">
              Workspace beserta konfigurasi
              yang tersimpan akan dihapus
              permanen.
            </p>

          </div>

          <DeleteProjectDialog
  projectId={project.id}
  projectName={project.projectName}
/>

        </CardContent>

      </Card>

    </main>
  );
}