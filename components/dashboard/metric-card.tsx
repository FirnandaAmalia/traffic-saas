import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;

  trend?: string;
  trendPositive?: boolean;
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendPositive = true,
}: MetricCardProps) {
  return (
    <Card className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <CardContent className="p-6">

        <div className="flex items-start justify-between">

          <div className="space-y-4">

            <div>

              <p className="text-sm font-medium text-slate-500">
                {title}
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                {value}
              </h2>

            </div>

            {description && (
              <p className="text-sm text-slate-500">
                {description}
              </p>
            )}

          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 transition group-hover:bg-blue-100">

            <Icon className="h-7 w-7 text-blue-600" />

          </div>

        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">

          <div
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              trendPositive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />

            {trend ?? "+12.8%"}
          </div>

          <span className="text-xs text-slate-400">
            Last 28 days
          </span>

        </div>

      </CardContent>

    </Card>
  );
}