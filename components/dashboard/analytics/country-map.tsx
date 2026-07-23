"use client";
import { useMemo } from "react";
import { Chart } from "react-google-charts";

import type {
  CountryMetric,
} from "@/lib/types/ga4";

interface CountryMapProps {
  country: CountryMetric[];
}

export default function CountryMap({
  country,
}: CountryMapProps) {
  const chartData = useMemo(() => {
    return [
      ["Country", "Users"],
      ...country.map((item) => [
        item.country,
        item.users,
      ]),
    ];
  }, [country]);

  const options = {
    backgroundColor: "transparent",

    resolution: "countries",

    displayMode: "regions",

    datalessRegionColor: "#f8fafc",

    defaultColor: "#dbeafe",

    keepAspectRatio: true,

    enableRegionInteractivity: true,

    legend: "none",

    tooltip: {
      trigger: "focus",
      isHtml: true,
      textStyle: {
        color: "#0f172a",
        fontSize: 12,
      },
    },

    colorAxis: {
      colors: [
        "#dbeafe",
        "#93c5fd",
        "#3b82f6",
        "#1d4ed8",
      ],
    },

    magnifyingGlass: {
      enable: false,
    },
  };

  return (
    <div className="flex h-[250px] w-full items-center justify-center">
      <Chart
        chartType="GeoChart"
        chartVersion="current"
        width="100%"
        height="250px"
        data={chartData}
        options={options}
        mapsApiKey={
          process.env
            .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        }
        loader={
          <div className="flex h-[250px] w-full items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">
            Loading map...
          </div>
        }
      />
    </div>
  );
}