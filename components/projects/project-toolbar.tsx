import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProjectToolbar() {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div className="relative w-full max-w-md">

        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <Input
          placeholder="Search workspace..."
          className="pl-10"
        />

      </div>

      <div className="flex items-center gap-3">

        <Button
          variant="outline"
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </Button>

      </div>

    </div>
  );
}