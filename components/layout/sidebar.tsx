import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import {
  LayoutDashboard,
  FolderKanban,
  Search,
  BarChart3,
  Zap,
  ChevronDown,
  HardDrive,
  ArrowUpRight,
} from "lucide-react";

import SidebarUser from "./sidebar-user";

export default async function Sidebar() {
  const session = await getServerSession(authOptions);

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">

      {/* Brand */}

      <div className="border-b border-slate-200 px-6 py-8">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">

            <Zap className="h-5 w-5 text-white" />

          </div>

          <div>

            <h1 className="text-xl font-bold tracking-tight">
              TrafficSaaS
            </h1>

            <p className="text-xs text-slate-500">
              SEO Intelligence Platform
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6">

        {/* Workspace */}

        <div className="mb-8">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Workspace
          </p>

          <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-900">
                  Personal Workspace
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  2 Projects
                </p>

              </div>

              <ChevronDown className="h-4 w-4 text-slate-400" />

            </div>

          </div>

          <div className="space-y-1">

            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              <LayoutDashboard className="h-5 w-5" />

              Dashboard
            </Link>

            <Link
              href="/projects"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <FolderKanban className="h-5 w-5" />

              Workspace
            </Link>

          </div>

        </div>

        {/* Integrations */}

        <div>

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Integrations
          </p>

          <div className="space-y-1">

            <Link
              href="/setup/gsc"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <Search className="h-5 w-5" />

              Search Console
            </Link>

            <Link
              href="/setup/ga4"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <BarChart3 className="h-5 w-5" />

              Google Analytics
            </Link>

          </div>

        </div>

        {/* Push Bottom */}

        <div className="mt-auto space-y-4 pt-6">

          {/* Storage */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

            <div className="mb-4 flex items-center gap-2">

              <HardDrive className="h-5 w-5 text-slate-600" />

              <span className="text-sm font-semibold">
                Storage
              </span>

            </div>

            <div className="mb-2 h-2 overflow-hidden rounded-full bg-slate-200">

              <div className="h-full w-[9%] rounded-full bg-blue-600" />

            </div>

            <div className="flex justify-between text-xs text-slate-500">

              <span>92 MB / 1 GB</span>

              <span>9%</span>

            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50">

              Upgrade Plan

              <ArrowUpRight className="h-4 w-4" />

            </button>

          </div>

          {/* User */}

          <SidebarUser
            name={session?.user?.name}
            email={session?.user?.email}
            image={session?.user?.image}
          />

        </div>

      </div>

    </aside>
  );
}