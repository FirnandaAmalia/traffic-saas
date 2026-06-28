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
}

export default function ChartSection({
  clicksHistory,
  usersHistory,
  clicks,
  impressions,
  users,
  sessions,
}: ChartSectionProps) {
  return (
    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Performance Trends
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Monitor organic traffic and user engagement over the last 28 days.
        </p>

      </div>

      <ChartTabs
        clicksHistory={clicksHistory}
        usersHistory={usersHistory}
        clicks={clicks}
        impressions={impressions}
        users={users}
        sessions={sessions}
      />

    </section>
  );
}