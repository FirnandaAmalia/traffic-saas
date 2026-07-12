import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type MonthMap = Record<string, string>;

export const MONTH_MAP: MonthMap = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "Mei",
  "06": "Jun",
  "07": "Jul",
  "08": "Agu",
  "09": "Sep",
  "10": "Okt",
  "11": "Nov",
  "12": "Des",
};

export function calculateCTR(
  clicks: number,
  impressions: number
): string {
  if (impressions === 0) {
    return "0";
  }

  return (
    (clicks / impressions) * 100
  ).toFixed(2);
}

export function calculateGrowth(
  current: number,
  previous: number
) {
  if (previous === 0) {
    return {
      value: 100,
      direction: "up" as const,
    };
  }

  const percent =
    ((current - previous) / previous) * 100;

  return {
    value: Number(percent.toFixed(1)),
    direction:
      percent >= 0
        ? ("up" as const)
        : ("down" as const),
  };
}

export function formatPercentage(
  value: number
) {
  return `${Math.abs(value).toFixed(1)}%`;
}