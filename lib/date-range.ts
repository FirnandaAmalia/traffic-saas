export type DateRange =
  | "7d"
  | "28d"
  | "3m"
  | "6m"
  | "12m";

export const DEFAULT_DATE_RANGE:DateRange = "28d";

interface DateRangeResult {
  startDate: string;
  endDate: string;
}

interface CompareDateRangeResult {
  currentStart: string;
  currentEnd: string;
  previousStart: string;
  previousEnd: string;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function firstDayOfMonth(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  );
}

// ======================================================
// Current Range
// ======================================================

export function getDateRange(
  range: DateRange = DEFAULT_DATE_RANGE
): DateRangeResult {

  const endDate = new Date();

  // Search Console & GA4 belum memiliki data hari ini
  endDate.setDate(
    endDate.getDate() - 1
  );

  const startDate =
    new Date(endDate);

  switch (range) {

    case "7d":
      startDate.setDate(
        endDate.getDate() - 6
      );
      break;

    case "28d":
      startDate.setDate(
        endDate.getDate() - 27
      );
      break;

    case "3m": {

      const first =
        firstDayOfMonth(endDate);

      first.setMonth(
        first.getMonth() - 2
      );

      startDate.setTime(
        first.getTime()
      );

      break;
    }

    case "6m": {

      const first =
        firstDayOfMonth(endDate);

      first.setMonth(
        first.getMonth() - 5
      );

      startDate.setTime(
        first.getTime()
      );

      break;
    }

    case "12m": {

      const first =
        firstDayOfMonth(endDate);

      first.setFullYear(
        first.getFullYear() - 1
      );

      first.setMonth(
        first.getMonth() + 1
      );

      startDate.setTime(
        first.getTime()
      );

      break;
    }

  }

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
}

// ======================================================
// Label
// ======================================================

export function getRangeLabel(
  range: DateRange
): string {

  switch (range) {

    case "7d":
      return "Last 7 Days";

    case "28d":
      return "Last 28 Days";

    case "3m":
      return "Last 3 Months";

    case "6m":
      return "Last 6 Months";

    case "12m":
      return "Last 12 Months";

    default:
      return "Last 28 Days";

  }

}

// ======================================================
// Compare Range
// ======================================================

export function getCompareDateRange(
  range: DateRange = DEFAULT_DATE_RANGE
): CompareDateRangeResult {

  const {
    startDate,
    endDate,
  } = getDateRange(range);

  const currentStart =
    new Date(startDate);

  const currentEnd =
    new Date(endDate);

  const previousEnd =
    new Date(currentStart);

  previousEnd.setDate(
    previousEnd.getDate() - 1
  );

  const previousStart =
    new Date(previousEnd);

  switch (range) {

    case "7d":
      previousStart.setDate(
        previousEnd.getDate() - 6
      );
      break;

    case "28d":
      previousStart.setDate(
        previousEnd.getDate() - 27
      );
      break;

    case "3m": {

      const first =
        firstDayOfMonth(previousEnd);

      first.setMonth(
        first.getMonth() - 2
      );

      previousStart.setTime(
        first.getTime()
      );

      break;
    }

    case "6m": {

      const first =
        firstDayOfMonth(previousEnd);

      first.setMonth(
        first.getMonth() - 5
      );

      previousStart.setTime(
        first.getTime()
      );

      break;
    }

    case "12m": {

      const first =
        firstDayOfMonth(previousEnd);

      first.setFullYear(
        first.getFullYear() - 1
      );

      first.setMonth(
        first.getMonth() + 1
      );

      previousStart.setTime(
        first.getTime()
      );

      break;
    }

  }

  return {
    currentStart: formatDate(currentStart),
    currentEnd: formatDate(currentEnd),
    previousStart: formatDate(previousStart),
    previousEnd: formatDate(previousEnd),
  };

}