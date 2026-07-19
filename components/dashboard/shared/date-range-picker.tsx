"use client";

import { useTransition } from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  ChevronDown,
  Loader2,
  Lock,
  GitCompare,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  FEATURES,
  hasFeature,
} from "@/lib/features";

import {
  PLANS,
} from "@/lib/plan";

import { goToBilling } from "@/lib/upgrade";

const ranges = [
  {
    label: "Last 7 Days",
    value: "7d",
  },
  {
    label: "Last 28 Days",
    value: "28d",
  },
  {
    label: "Last 3 Months",
    value: "3m",
  },
  {
    label: "Last 6 Months",
    value: "6m",
  },
  {
    label: "Last 12 Months",
    value: "12m",
  },
];

export default function DateRangePicker() {
  const router = useRouter();

  const pathname = usePathname();

  const params = useSearchParams();

  const [isPending, startTransition] =
    useTransition();

  const current =
    params.get("range") ?? "28d";

  const currentLabel =
    ranges.find(
      (item) => item.value === current
    )?.label ?? "Last 28 Days";

  const plan = PLANS.PRO;

const canCompare = hasFeature(
  plan,
  FEATURES.COMPARE_DATE
);

  function changeRange(
    value: string
  ) {
    const next =
      new URLSearchParams(
        params.toString()
      );

    next.set("range", value);

    startTransition(() => {
      router.replace(
        `${pathname}?${next.toString()}`
      );
    });
  }

  return (
    <div className="flex items-center gap-3">

      {/* Date Range */}

      <div className="relative">

        <select
          value={current}
          onChange={(e) =>
            changeRange(e.target.value)
          }
          disabled={isPending}
          className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
        >
          {ranges.map((range) => (
            <option
              key={range.value}
              value={range.value}
            >
              {range.label}
            </option>
          ))}
        </select>

        <Button
          variant="outline"
          disabled={isPending}
          className="h-11 gap-2 rounded-xl"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              {currentLabel}
            </>
          )}
        </Button>

      </div>

      {/* Compare */}

{!canCompare && (
  <Button
    variant="outline"
    onClick={() => {
      goToBilling();
    }}
    className="
      border-violet-200
      text-violet-700
      hover:bg-violet-50
    "
  >
    <Lock className="mr-2 h-4 w-4" />
    Compare (Pro)
  </Button>
)}

    </div>
  );
}