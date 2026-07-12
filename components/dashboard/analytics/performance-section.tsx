import ChartSection from "./chart-section";
import DataTable from "./data-table";

import type { GSCRow } from "@/lib/types/gsc";

import LockedFeature from "@/components/billing/locked-feature";

interface PerformanceSectionProps {
  clicksHistory: {
    date: string;
    clicks: number;
    impressions: number;
  }[];

  usersHistory: {
    date: string;
    users: number;
    sessions: number;
  }[];

  clicks: number;
  impressions: number;
  users: number;
  sessions: number;

  rangeLabel: string;

  queries: GSCRow[];
  pages: GSCRow[];
}

export default function PerformanceSection({
  clicksHistory,
  usersHistory,
  clicks,
  impressions,
  users,
  sessions,
  rangeLabel,
  queries,
  pages,
}: PerformanceSectionProps) {
  return (
    <section className="space-y-5">

      {/* Performance Trend */}

      <ChartSection
        clicksHistory={clicksHistory}
        usersHistory={usersHistory}
        clicks={clicks}
        impressions={impressions}
        users={users}
        sessions={sessions}
        rangeLabel={rangeLabel}
      />

      {/* Tables */}

      <div className="grid gap-5 lg:grid-cols-2">

        <DataTable
          title="Top Keywords 🔥"
          rows={queries}
          renderLabel={(row) => row.keys?.[0]}
        />

        <DataTable
          title="Top Pages 📄"
          rows={pages}
          renderLabel={(row) => {
            const path =
              row.keys?.[0]?.replace(
                "https://yaplegal.id",
                ""
              ) ?? "";

            return (
              <span
                className="block truncate"
                title={path}
              >
                {path}
              </span>
            );
          }}
        />
        

      </div>

    </section>
  );
}