import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import DashboardHeader from "@/components/dashboard/dashboard-header";
import MetricGrid from "@/components/dashboard/metric-grid";
import GA4Section from "@/components/dashboard/ga4-section";
import DataTable from "@/components/dashboard/data-table";
import ChartSection from "@/components/dashboard/chart-section";

import {
  getProject,
} from "@/lib/project-service";

import {
  getDashboardData,
} from "@/lib/dashboard-service";

import {
  formatGSCHistory,
} from "@/lib/formatters/gsc";

import {
  formatGA4History,
} from "@/lib/formatters/ga4";

import {
  calculateCTR,
} from "@/lib/utils";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{
    projectId?: string;
  }>;
}) {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.refreshToken) {
    return (
      <main className="p-10">
        <h1>
          Silakan login terlebih dahulu
        </h1>
      </main>
    );
  }

  const { projectId } =
    await searchParams;

  if (!projectId) {
    return (
      <main className="p-10">
        <h1>
          Project tidak ditemukan
        </h1>
      </main>
    );
  }

  const project =
    await getProject(projectId);

  if (!project) {
    return (
      <main className="p-10">
        <h1>
          Project tidak ditemukan
        </h1>
      </main>
    );
  }

  const refreshToken =
    session.refreshToken as string;

  const {
    data,
    queries,
    pages,
    ga4,
    gscHistory,
    ga4History,
  } = await getDashboardData(
    refreshToken,
    project
  );

  const clicksHistory =
    formatGSCHistory(
      gscHistory
    );

  const usersHistory =
    formatGA4History(
      ga4History
    );

  const clicks =
    data.clicks ?? 0;

  const impressions =
    data.impressions ?? 0;

  const ctr =
    calculateCTR(
      clicks,
      impressions
    );

  return (
    <div className="space-y-8">

      <DashboardHeader
        projectName={
          project.projectName
        }
        gscSiteUrl={
          project.gscSiteUrl
        }
        ga4PropertyId={
          project.ga4PropertyId
        }
      />

      <MetricGrid
        clicks={clicks}
        impressions={impressions}
        ctr={ctr}
      />

      <section>
        <ChartSection
  clicksHistory={clicksHistory}
  usersHistory={usersHistory}
  clicks={clicks}
  impressions={impressions}
  users={ga4.users}
  sessions={ga4.sessions}
/>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">

        <DataTable
  title="Top Pages 📄"
  rows={pages}
  renderLabel={(row) => {
    const path =
      row.keys?.[0]
        ?.replace(
          "https://yaplegal.id",
          ""
        ) ?? "";

    return (
      <span
        className="block max-w-[420px] truncate"
        title={path}
      >
        {path}
      </span>
    );
  }}
/>

        <DataTable
          title="Top Pages 📄"
          rows={pages}
          renderLabel={(row) =>
            row.keys?.[0]
              ?.replace(
                "https://yaplegal.id",
                ""
              )
              .slice(0, 50)
          }
        />

      </div>

      <GA4Section
        users={ga4.users}
        sessions={ga4.sessions}
        pageViews={
          ga4.pageViews
        }
        engagementRate={
          ga4.engagementRate
        }
      />

    </div>
  );
}