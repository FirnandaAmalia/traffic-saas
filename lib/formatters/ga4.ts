import type { GA4History } from "@/lib/types/ga4";

import {
  getDateRange,
  type DateRange,
} from "@/lib/date-range";

export function formatGA4History(
  history: GA4History[],
  range: DateRange
) {
  const {
    startDate,
    endDate,
  } = getDateRange(range);

  // Simpan data asli ke Map
  const dataMap = new Map<
    string,
    {
      users: number;
      sessions: number;
    }
  >();

  history.forEach((item) => {
    const raw =
      item.dimensionValues?.[0]?.value ?? "";

    if (!raw) return;

    const iso =
      `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;

    dataMap.set(iso, {
      users: Number(
        item.metricValues?.[0]?.value ?? 0
      ),
      sessions: Number(
        item.metricValues?.[1]?.value ?? 0
      ),
    });
  });

  const result: {
    date: string;
    users: number;
    sessions: number;
  }[] = [];

  const current = new Date(startDate);
  const last = new Date(endDate);

  while (current <= last) {
    const iso =
      current.toISOString().split("T")[0];

    const existing =
      dataMap.get(iso);

    result.push({
      date: iso,
      users: existing?.users ?? 0,
      sessions: existing?.sessions ?? 0,
    });

    current.setDate(
      current.getDate() + 1
    );
  }

  return result;
}