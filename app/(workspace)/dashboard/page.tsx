import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import DashboardHeader from "@/components/dashboard/layout/dashboard-header";
import DashboardGrid from "@/components/dashboard/layout/dashboard-grid";
import ExecutiveSummary from "@/components/dashboard/ai/executive-summary";
import {
  generateExecutiveSummary,
} from "@/lib/ai/executive-summary";

import {
  getProject,
} from "@/lib/project-service";

import { getCurrentPlan } from "@/lib/subscription";

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

import {
  getRangeLabel,
  type DateRange,
} from "@/lib/date-range";

interface DashboardPageProps {
  searchParams: Promise<{
    projectId?: string;
    range?: DateRange;
  }>;
}

export default async function Dashboard({
  searchParams,
}: DashboardPageProps) {

  const session =
  await getServerSession(authOptions);

if (
  !session?.refreshToken ||
  !session.user?.email
) {
  return (
    <main className="p-10">
      <h1>Silakan login terlebih dahulu</h1>
    </main>
  );
}

const plan =
  await getCurrentPlan(
    session.user.email
  );

const {
  projectId,
  range = "28d",
} = await searchParams;

  if (!projectId) {
    return (
      <main className="p-10">
        <h1>Project tidak ditemukan</h1>
      </main>
    );
  }

  const project =
    await getProject(projectId);

  if (!project) {
    return (
      <main className="p-10">
        <h1>Project tidak ditemukan</h1>
      </main>
    );
  }

  if (!project.gscSiteUrl) {
    redirect(`/setup/gsc?projectId=${project.id}`);
  }

  if (!project.ga4PropertyId) {
    redirect(`/setup/ga4?projectId=${project.id}`);
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

    country,
    trafficAcquisition,
    deviceCategory,
    landingPages,
    topEvents,
    browser,

  } = await getDashboardData(
    refreshToken,
    project,
    range
  );

  const clicks =
    data.clicks ?? 0;

  const impressions =
    data.impressions ?? 0;

  const ctr = Number(
    calculateCTR(
      clicks,
      impressions
    )
  );

  const previousCTR = Number(
    calculateCTR(
      data.previousClicks,
      data.previousImpressions
    )
  );

  const executiveSummary =
    generateExecutiveSummary({

      clicks,
      previousClicks:
        data.previousClicks,

      impressions,
      previousImpressions:
        data.previousImpressions,

      ctr,
      previousCTR,

      users:
        ga4.users,

      previousUsers:
        ga4.previousUsers,

      sessions:
        ga4.sessions,

      previousSessions:
        ga4.previousSessions,

    });

  const clicksHistory =
    formatGSCHistory(
      gscHistory
    );

  const usersHistory =
    formatGA4History(
      ga4History,
      range
    );

  const rangeLabel =
    getRangeLabel(range);

  return (
  <div className="space-y-6">

    <DashboardHeader
      projectId={project.id}
      projectName={project.projectName}
      gscSiteUrl={project.gscSiteUrl}
      ga4PropertyId={project.ga4PropertyId}
      ga4PropertyName={project.ga4PropertyName}
      lastSyncedAt={project.lastSyncedAt}
    />

    <ExecutiveSummary
  plan={plan}
  summary={executiveSummary}
/>

<DashboardGrid
  plan={plan}
  clicksHistory={clicksHistory}
  usersHistory={usersHistory}

  clicks={clicks}
  impressions={impressions}

  previousClicks={data.previousClicks}
  previousImpressions={data.previousImpressions}

  users={ga4.users}
  sessions={ga4.sessions}
  pageViews={ga4.pageViews}
  engagementRate={ga4.engagementRate}

  rangeLabel={rangeLabel}

  queries={queries}
  pages={pages}

  country={country}
  trafficAcquisition={trafficAcquisition}
  deviceCategory={deviceCategory}
  browser={browser}
  landingPages={landingPages}
  topEvents={topEvents}
/>

  </div>
);

}