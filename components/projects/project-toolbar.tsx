import {
  FolderKanban,
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";

interface ProjectToolbarProps {
  totalProjects?: number;
}

export default function ProjectToolbar({
  totalProjects = 0,
}: ProjectToolbarProps) {
  return (
    <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">

          <div className="relative w-full max-w-xl">

            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              placeholder="Search workspaces..."
              className="h-11 rounded-xl border-slate-200 pl-11 shadow-none focus-visible:ring-2"
            />

          </div>

          <div className="hidden items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 lg:flex">

            <FolderKanban className="h-4 w-4" />

            <span>
              {totalProjects} Workspace
              {totalProjects !== 1 ? "s" : ""}
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}