"use client";

import { Badge } from "@/components/ui/badge";

interface Props {
  yearly: boolean;
  onChange: (value: boolean) => void;
}

export default function PricingToggle({
  yearly,
  onChange,
}: Props) {
  return (
    <div className="mt-10 flex justify-center">

      <div className="flex items-center rounded-2xl border bg-white p-1 shadow-sm">

        <button
          onClick={() => onChange(false)}
          className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
            !yearly
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Monthly
        </button>

        <button
          onClick={() => onChange(true)}
          className={`ml-1 flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition ${
            yearly
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Yearly

          <Badge className="bg-emerald-500 text-white">

            Save 20%

          </Badge>

        </button>

      </div>

    </div>
  );
}