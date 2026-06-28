import type { GSCRow } from "./gsc";
import type {
  GA4History,
  GA4Summary,
} from "./ga4";

export interface DashboardData {
  data: {
    clicks?: number;
    impressions?: number;
  };

  queries: GSCRow[];

  pages: GSCRow[];

  gscHistory: GSCRow[];

  ga4History: GA4History[];

  ga4: GA4Summary;
}