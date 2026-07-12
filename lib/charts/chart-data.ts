import type { GSCRow } from "@/lib/types/gsc";
import type { GA4History } from "@/lib/types/ga4";

export interface ChartData {
  labels: string[];
  values: number[];
}

function parseDate(value: string): Date | null {
  if (!value) {
    return null;
  }

  value = value.trim();

  // ==========================================
  // GA4
  // 20260601
  // ==========================================

  if (/^\d{8}$/.test(value)) {
    const year = Number(value.substring(0, 4));
    const month = Number(value.substring(4, 6));
    const day = Number(value.substring(6, 8));

    return new Date(year, month - 1, day);
  }

  // ==========================================
  // GSC
  // 2026-06-01
  // ==========================================

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value
      .split("-")
      .map(Number);

    return new Date(year, month - 1, day);
  }

  // ==========================================
  // ISO
  // 2026-06-01T00:00:00Z
  // ==========================================

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

function formatLabel(value: string): string {
  const date = parseDate(value);

  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// ===========================================
// GSC Click Trend
// ===========================================

export function buildClicksChartData(
  history: GSCRow[]
): ChartData {
  return {
    labels: history.map((row) =>
      formatLabel(row.keys?.[0] ?? "")
    ),

    values: history.map(
      (row) => row.clicks ?? 0
    ),
  };
}

// ===========================================
// GSC Impression Trend
// ===========================================

export function buildImpressionsChartData(
  history: GSCRow[]
): ChartData {
  return {
    labels: history.map((row) =>
      formatLabel(row.keys?.[0] ?? "")
    ),

    values: history.map(
      (row) => row.impressions ?? 0
    ),
  };
}

// ===========================================
// GA4 Users Trend
// ===========================================

export function buildUsersChartData(
  history: GA4History[]
): ChartData {
  return {
    labels: history.map((row) =>
      formatLabel(
        row.dimensionValues?.[0]?.value ?? ""
      )
    ),

    values: history.map((row) =>
      Number(
        row.metricValues?.[0]?.value ?? 0
      )
    ),
  };
}

// ===========================================
// GA4 Sessions Trend
// ===========================================

export function buildSessionsChartData(
  history: GA4History[]
): ChartData {
  return {
    labels: history.map((row) =>
      formatLabel(
        row.dimensionValues?.[0]?.value ?? ""
      )
    ),

    values: history.map((row) =>
      Number(
        row.metricValues?.[1]?.value ?? 0
      )
    ),
  };
}