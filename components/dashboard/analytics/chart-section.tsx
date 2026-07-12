import ChartTabs from "./chart-tabs";

interface ChartSectionProps {
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
}

export default function ChartSection({
  clicksHistory,
  usersHistory,
  clicks,
  impressions,
  users,
  sessions,
  rangeLabel,
}: ChartSectionProps) {
  return (
    <section className="flex h-full flex-col">

      {/* Header */}

      <div className="mb-3 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold text-slate-900">
            Performance Trend
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Organic clicks & user growth • {rangeLabel}
          </p>

        </div>

        <div className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
          {rangeLabel}
        </div>

      </div>

      {/* Chart */}

      <div className="flex-1">

        <ChartTabs
          clicksHistory={clicksHistory}
          usersHistory={usersHistory}
          clicks={clicks}
          impressions={impressions}
          users={users}
          sessions={sessions}
          rangeLabel={rangeLabel}
        />

      </div>

    </section>
  );
}