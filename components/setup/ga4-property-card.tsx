import {
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import type {
  GA4Property,
} from "@/lib/types/ga4";

type Props = {
  property: GA4Property;
};

export default function GA4PropertyCard({
  property,
}: Props) {
  return (
    <button className="group w-full rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all duration-200 hover:border-blue-300 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-2">

            <CheckCircle2 className="h-5 w-5 text-emerald-500" />

            <h3 className="text-lg font-semibold text-slate-900">
              {property.displayName}
            </h3>

          </div>

          <p className="mt-2 text-sm text-slate-500">
            {property.property}
          </p>

        </div>

        <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1" />

      </div>

    </button>
  );
}