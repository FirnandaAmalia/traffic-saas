import Link from "next/link";

import {
  ArrowRight,
  Globe,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProjectCardProps {
  project: {
    id: string;
    projectName: string;
  };
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <Card className="rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-500" />

          <CardTitle className="text-xl">
            {project.projectName}
          </CardTitle>
        </div>

        <p className="text-sm text-muted-foreground">
          Google Search Intelligence
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-3">

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Search Console
            </span>

            <div className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              Connected
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Google Analytics 4
            </span>

            <div className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              Connected
            </div>
          </div>

        </div>

        <Button
          asChild
          className="w-full"
        >
          <Link
            href={`/dashboard?projectId=${project.id}`}
            className="flex items-center justify-center gap-2"
          >
            Open Workspace

            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}