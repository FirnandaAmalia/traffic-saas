import type {
  LucideIcon,
} from "lucide-react";

import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

import CardShell from "../layout/card-shell";

import {
  calculateGrowth,
  formatPercentage,
} from "@/lib/utils";

interface StatCardProps {
  title: string;

  value: string | number;

  previousValue?: number;

  icon?: LucideIcon;

  subtitle?: string;

  iconColor?: string;
}

export default function StatCard({
  title,
  value,
  previousValue,
  icon: Icon,
  subtitle,
  iconColor = "text-blue-600",
}: StatCardProps) {
  const current =
    Number(String(value).replace("%", ""));

  const growth =
    previousValue !== undefined
      ? calculateGrowth(
          current,
          previousValue
        )
      : null;

  return (
    <CardShell
      contentClassName="space-y-3"
    >
      <div className="flex items-center justify-between">

        <span className="text-sm font-medium text-slate-500">
          {title}
        </span>

        {Icon && (
          <Icon
            className={`h-4 w-4 ${iconColor}`}
          />
        )}

      </div>

      <div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        )}

      </div>

      {growth && (
        <div className="flex items-center gap-2">

          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
              growth.direction === "up"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {growth.direction === "up" ? (
              <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="mr-1 h-3.5 w-3.5" />
            )}

            {formatPercentage(
              growth.value
            )}
          </span>

          <span className="text-xs text-slate-500">
            vs previous period
          </span>

        </div>
      )}
    </CardShell>
  );
}