import {
  Globe,
  BarChart3,
  RefreshCw,
} from "lucide-react";

interface DashboardHeaderProps {
  projectName: string;
  gscSiteUrl: string;
  ga4PropertyId: string;
}

export default function DashboardHeader({
  projectName,
  gscSiteUrl,
  ga4PropertyId,
}: DashboardHeaderProps) {
  return (
    <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
            {projectName}
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Monitor your website performance using
            Google Search Console and Google
            Analytics 4.
          </p>

        </div>

        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-50">

          <RefreshCw className="h-4 w-4" />

          Sync Data

        </button>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">

          <Globe className="mt-0.5 h-5 w-5 text-blue-600" />

          <div>

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Google Search Console
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900 break-all">
              {gscSiteUrl}
            </p>

          </div>

        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">

          <BarChart3 className="mt-0.5 h-5 w-5 text-emerald-600" />

          <div>

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Google Analytics 4
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              {ga4PropertyId}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}