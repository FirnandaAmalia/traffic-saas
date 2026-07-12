import PerformanceSection from "../analytics/performance-section";
import CountrySection from "../analytics/country-section";
import TrafficAcquisition from "../analytics/traffic-acquisition";
import DeviceCategory from "../analytics/device-category";

import BrowserSection from "./browser-section";

import LandingPages from "../analytics/landing-pages";
import TopEvents from "../analytics/top-events";

import StatCard from "../metrics/stat-card";
import {
  PLANS,
  type Plan,
} from "@/lib/plan";

import {
  Users,
  Activity,
  FileText,
  Gauge,
} from "lucide-react";

import type { GSCRow } from "@/lib/types/gsc";

import type {
  CountryMetric,
  TrafficSourceMetric,
  DeviceCategoryMetric,
  LandingPageMetric,
  EventMetric,
  BrowserMetric,
} from "@/lib/types/ga4";

interface DashboardGridProps {
  plan: Plan;

  clicksHistory: any;
  usersHistory: any;

  clicks: number;
  impressions: number;

  previousClicks: number;
  previousImpressions: number;

  users: number;
  sessions: number;
  pageViews: number;
  engagementRate: number;

  rangeLabel: string;

  queries: GSCRow[];
  pages: GSCRow[];

  country: CountryMetric[];
  trafficAcquisition: TrafficSourceMetric[];
  deviceCategory: DeviceCategoryMetric[];
  browser: BrowserMetric[];
  landingPages: LandingPageMetric[];
  topEvents: EventMetric[];
}

export default function DashboardGrid({
  plan,
  clicksHistory,
  usersHistory,

  clicks,
  impressions,

  users,
  sessions,
  pageViews,
  engagementRate,

  rangeLabel,

  queries,
  pages,

  country,
  trafficAcquisition,
  deviceCategory,
  browser,
  landingPages,
  topEvents,
}: DashboardGridProps) {
  
  return (
    <div className="space-y-6">

      {/* KPI */}

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Users"
          value={users.toLocaleString()}
          icon={Users}
          iconColor="text-blue-600"
        />

        <StatCard
          title="Sessions"
          value={sessions.toLocaleString()}
          icon={Activity}
          iconColor="text-emerald-600"
        />

        <StatCard
          title="Page Views"
          value={pageViews.toLocaleString()}
          icon={FileText}
          iconColor="text-rose-600"
        />

        <StatCard
          title="Engagement Rate"
          value={`${(engagementRate * 100).toFixed(2)}%`}
          icon={Gauge}
          iconColor="text-amber-600"
        />

      </div>

  {/* PERFORMANCE */}

  <PerformanceSection
  clicksHistory={clicksHistory}
  usersHistory={usersHistory}
  clicks={clicks}
  impressions={impressions}
  users={users}
  sessions={sessions}
  rangeLabel={rangeLabel}
  queries={queries}
  pages={pages}
/>

  {/* ANALYTICS */}

  <div className="mt-6 grid grid-cols-12 gap-5 items-start">

    <div className="col-span-12 xl:col-span-8">

      <CountrySection
        country={country}
      />

    </div>

    <div className="col-span-12 xl:col-span-4">

      <div className="flex h-full flex-col gap-5">

        <div className="grid grid-cols-2 gap-5">

          <TrafficAcquisition
            data={trafficAcquisition}
          />

          <BrowserSection
            data={browser}
          />

        </div>

        <DeviceCategory
          data={deviceCategory}
        />

      </div>

    </div>

  </div>

  {/* BOTTOM */}

  <div className="mt-6 grid grid-cols-12 gap-5">

    <div className="col-span-12 xl:col-span-6">

      <LandingPages
        data={landingPages}
      />

    </div>

    <div className="col-span-12 xl:col-span-6">

      <TopEvents
        data={topEvents}
      />

    </div>

  </div>
</div>
  );
}