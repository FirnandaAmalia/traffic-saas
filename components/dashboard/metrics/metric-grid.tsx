import {
  Eye,
  MousePointerClick,
  Percent,
} from "lucide-react";

import StatCard from "./stat-card";

import {
  calculateCTR,
} from "@/lib/utils";

interface MetricGridProps {
  clicks: number;
  previousClicks: number;

  impressions: number;
  previousImpressions: number;

  periodLabel?: string;
}

export default function MetricGrid({
  clicks,
  previousClicks,

  impressions,
  previousImpressions,
}: MetricGridProps) {
  const ctr = Number(
    calculateCTR(
      clicks,
      impressions
    )
  );

  const previousCTR = Number(
    calculateCTR(
      previousClicks,
      previousImpressions
    )
  );

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      <StatCard
        title="Total Clicks"
        value={clicks.toLocaleString()}
        previousValue={previousClicks}
        icon={MousePointerClick}
        iconColor="text-blue-600"
        subtitle="Organic Search"
      />

      <StatCard
        title="Impressions"
        value={impressions.toLocaleString()}
        previousValue={previousImpressions}
        icon={Eye}
        iconColor="text-violet-600"
        subtitle="Search Visibility"
      />

      <StatCard
        title="Average CTR"
        value={`${ctr}%`}
        previousValue={previousCTR}
        icon={Percent}
        iconColor="text-emerald-600"
        subtitle="Click Through Rate"
      />

    </section>
  );
}