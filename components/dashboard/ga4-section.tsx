import {
  Activity,
  FileText,
  Gauge,
  Users,
} from "lucide-react";

import MetricCard from "./metric-card";

interface GA4SectionProps {
  users: number;
  sessions: number;
  pageViews: number;
  engagementRate: number;
}

export default function GA4Section({
  users,
  sessions,
  pageViews,
  engagementRate,
}: GA4SectionProps) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">
        Google Analytics 4 📈
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Users"
          value={users.toLocaleString()}
          icon={Users}
        />

        <MetricCard
          title="Sessions"
          value={sessions.toLocaleString()}
          icon={Activity}
        />

        <MetricCard
          title="Page Views"
          value={pageViews.toLocaleString()}
          icon={FileText}
        />

        <MetricCard
          title="Engagement Rate"
          value={`${(engagementRate * 100).toFixed(2)}%`}
          icon={Gauge}
        />
      </div>
    </section>
  );
}