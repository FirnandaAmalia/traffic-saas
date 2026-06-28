import {
  MousePointerClick,
  Eye,
  Percent,
} from "lucide-react";

import MetricCard from "./metric-card";

interface MetricGridProps {
  clicks: number;
  impressions: number;
  ctr: string;
}

export default function MetricGrid({
  clicks,
  impressions,
  ctr,
}: MetricGridProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      <MetricCard
        title="Total Clicks"
        value={clicks.toLocaleString()}
        icon={MousePointerClick}
        trend="+18.4%"
        description="Organic clicks from Google Search"
      />

      <MetricCard
        title="Total Impressions"
        value={impressions.toLocaleString()}
        icon={Eye}
        trend="+24.1%"
        description="Times your pages appeared in search"
      />

      <MetricCard
        title="Average CTR"
        value={`${ctr}%`}
        icon={Percent}
        trend="+2.3%"
        description="Average click-through rate"
      />

    </section>
  );
}