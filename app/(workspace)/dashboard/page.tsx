import { getServerSession } from "next-auth";
import {
  redirect,
} from "next/navigation";

import { authOptions } from "@/lib/auth";

import DashboardHeader from "@/components/dashboard/layout/dashboard-header";
import DashboardGrid from "@/components/dashboard/layout/dashboard-grid";
import ExecutiveSummary from "@/components/dashboard/ai/executive-summary";

import {
  generateExecutiveSummary,
} from "@/lib/ai/executive-summary";

import {
  resolveProjectForUser,
} from "@/lib/project-service";

import {
  getCurrentPlan,
} from "@/lib/subscription";

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
  /*
  |--------------------------------------------------------------------------
  | Authentication
  |--------------------------------------------------------------------------
  */

  const session =
    await getServerSession(
      authOptions
    );

  if (
    !session?.user?.id ||
    !session.user.email
  ) {
    redirect("/login");
  }

  /*
  |--------------------------------------------------------------------------
  | Search Parameters
  |--------------------------------------------------------------------------
  */

  const {
    projectId,
    range = "28d",
  } = await searchParams;

  const requestedProjectId =
    projectId?.trim() || null;

  /*
  |--------------------------------------------------------------------------
  | Resolve Authorized Project
  |--------------------------------------------------------------------------
  */

  const project =
    await resolveProjectForUser({
      userId: session.user.id,
      projectId: requestedProjectId,
    });

  /*
  |--------------------------------------------------------------------------
  | Invalid Explicit Project
  |--------------------------------------------------------------------------
  |
  | projectId diberikan tetapi project tidak ditemukan
  | atau bukan milik user yang sedang login.
  |
  */

  if (
    requestedProjectId &&
    !project
  ) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Project tidak ditemukan
        </h1>

        <p className="mt-2 text-slate-500">
          Project tidak tersedia atau kamu tidak
          memiliki akses ke project tersebut.
        </p>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | User Has No Project
  |--------------------------------------------------------------------------
  */

  if (!project) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Belum ada project
        </h1>

        <p className="mt-2 text-slate-500">
          Buat project pertama untuk mulai
          melihat SEO analytics.
        </p>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Canonical Dashboard URL
  |--------------------------------------------------------------------------
  |
  | Saat user membuka /dashboard tanpa projectId,
  | resolver memilih project terbaru milik user.
  |
  | Setelah ditemukan, URL diarahkan ke project
  | tersebut agar seluruh navigasi memiliki konteks
  | project yang eksplisit.
  |
  */

  if (!requestedProjectId) {
    redirect(
      `/dashboard?projectId=${project.id}&range=${range}`
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Integration Setup
  |--------------------------------------------------------------------------
  */

  if (!project.gscSiteUrl) {
    redirect(
      `/setup/gsc?projectId=${project.id}`
    );
  }

  if (!project.ga4PropertyId) {
    redirect(
      `/setup/ga4?projectId=${project.id}`
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Google Credential
  |--------------------------------------------------------------------------
  |
  | Session user dan Google credential merupakan
  | dua kondisi yang berbeda.
  |
  */

  if (!session.refreshToken) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Google perlu dihubungkan kembali
        </h1>

        <p className="mt-2 text-slate-500">
          Sesi TrafficSaaS masih aktif, tetapi
          credential Google tidak tersedia.
          Silakan login ulang menggunakan Google.
        </p>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Subscription
  |--------------------------------------------------------------------------
  */

  const plan =
    await getCurrentPlan(
      session.user.email
    );

  /*
  |--------------------------------------------------------------------------
  | Dashboard Data
  |--------------------------------------------------------------------------
  */

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
    session.refreshToken,
    project,
    range
  );

  /*
  |--------------------------------------------------------------------------
  | Calculated Metrics
  |--------------------------------------------------------------------------
  */

  const clicks =
    data.clicks ?? 0;

  const impressions =
    data.impressions ?? 0;

  const ctr =
    Number(
      calculateCTR(
        clicks,
        impressions
      )
    );

  const previousCTR =
    Number(
      calculateCTR(
        data.previousClicks,
        data.previousImpressions
      )
    );

  /*
  |--------------------------------------------------------------------------
  | AI Executive Summary
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Chart Formatting
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="space-y-6">
      <DashboardHeader
        projectId={project.id}
        range={range}
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
        previousClicks={
          data.previousClicks
        }
        previousImpressions={
          data.previousImpressions
        }
        users={ga4.users}
        sessions={ga4.sessions}
        pageViews={ga4.pageViews}
        engagementRate={
          ga4.engagementRate
        }
        rangeLabel={rangeLabel}
        queries={queries}
        pages={pages}
        country={country}
        trafficAcquisition={
          trafficAcquisition
        }
        deviceCategory={
          deviceCategory
        }
        browser={browser}
        landingPages={landingPages}
        topEvents={topEvents}
      />
    </div>
  );
}