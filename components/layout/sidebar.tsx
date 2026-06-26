import Link from "next/link";

import {
  LayoutDashboard,
  FolderKanban,
  Search,
  BarChart3,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-800 bg-[#111827] text-white">

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-2xl font-bold">
          TrafficSaaS
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          SEO Analytics Platform
        </p>

      </div>

      <nav className="space-y-2 p-4">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800"
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/projects"
          className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800"
        >
          <FolderKanban size={18} />
          <span>Projects</span>
        </Link>

        <Link
          href="/setup/gsc"
          className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800"
        >
          <Search size={18} />
          <span>Connect GSC</span>
        </Link>

        <Link
          href="/setup/ga4"
          className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800"
        >
          <BarChart3 size={18} />
          <span>Connect GA4</span>
        </Link>

      </nav>

      <div className="mt-auto border-t border-slate-800 p-4">

        <div className="rounded-lg bg-slate-800 p-4">

          <p className="text-xs uppercase tracking-wide text-slate-400">
            Status
          </p>

          <p className="mt-1 text-sm font-semibold text-green-400">
            Development
          </p>

        </div>

      </div>

    </aside>
  );
}