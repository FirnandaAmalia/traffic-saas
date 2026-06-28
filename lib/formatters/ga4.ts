import { MONTH_MAP } from "@/lib/utils";
import type { GA4History } from "@/lib/types/ga4";

export function formatGA4History(
  history: GA4History[]
) {
  return history
    .map((item) => {
      const raw =
        item.dimensionValues?.[0]?.value || "";

      const month = raw.slice(4, 6);
      const day = raw.slice(6, 8);

      return {
        rawDate: raw,
        date: `${day} ${MONTH_MAP[month]}`,
        users: Number(
          item.metricValues?.[0]?.value || 0
        ),
        sessions: Number(
          item.metricValues?.[1]?.value || 0
        ),
      };
    })
    .sort(
      (a, b) =>
        Number(a.rawDate) -
        Number(b.rawDate)
    );
}