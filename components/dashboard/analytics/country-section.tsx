"use client";

import CardShell from "../layout/card-shell";
import CountryMap from "./country-map";
import CountryTable from "./country-table";

import type {
  CountryMetric,
} from "@/lib/types/ga4";

interface CountrySectionProps {
  country: CountryMetric[];
}

export default function CountrySection({
  country,
}: CountrySectionProps) {
  return (
    <CardShell
      title="🌍 Active Users by Country"
      description="Top visitor locations"
      action={
        <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
          View All →
        </button>
      }
      className="h-[680px]"
      contentClassName="h-full p-0"
    >
      <div className="grid h-full grid-cols-[26%_74%]">

        {/* MAP */}

        <div className="flex items-center justify-center border-r border-slate-100 bg-slate-50 px-2">

          <div className="mx-auto h-[190px] w-[190px]">

            <CountryMap
              country={country}
            />

          </div>

        </div>

        {/* COUNTRY TABLE */}

        <div className="h-full overflow-hidden">

          <CountryTable
            country={country}
          />

        </div>

      </div>

    </CardShell>
  );
}