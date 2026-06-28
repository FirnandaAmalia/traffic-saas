import { MONTH_MAP } from "@/lib/utils";
import type { GSCRow } from "@/lib/types/gsc";

export function formatGSCHistory(
  history: GSCRow[]
) {
  return history.map((item) => {
    const raw = item.keys?.[0] || "";

    const parts = raw.split("-");

    const month = parts[1];
    const day = parts[2];

    return {
      date: `${day} ${MONTH_MAP[month]}`,
      clicks: Number(item.clicks || 0),
      impressions: Number(item.impressions || 0),
    };
  });
}