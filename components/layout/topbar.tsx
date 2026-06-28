"use client";

import {
  Bell,
  Search,
  RefreshCw,
  ChevronDown,
  Command,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-8 backdrop-blur-xl">

      {/* Left */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative w-[420px]">

          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            placeholder="Search projects, pages, reports..."
            className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-11 pr-16"
          />

          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-500">
            <Command className="h-3 w-3" />
            K
          </div>

        </div>

        {/* Workspace */}
        <Button
          variant="outline"
          className="h-11 rounded-xl"
        >
          Personal Workspace
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>

        {/* Project */}
        <Button
          variant="outline"
          className="h-11 rounded-xl"
        >
          YapLegal
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <Button
          variant="outline"
          className="h-11 rounded-xl"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Sync
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-11 w-11 rounded-xl"
        >
          <Bell className="h-4 w-4" />
        </Button>

        <button className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 transition hover:bg-slate-50">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 font-semibold text-white">
            F
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold">
              Firnanda
            </p>

            <p className="text-xs text-slate-500">
              Data Analyst
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-slate-400" />

        </button>

      </div>

    </header>
  );
}