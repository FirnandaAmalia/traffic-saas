"use client";

import type {
  CountryMetric,
} from "@/lib/types/ga4";

interface CountryTableProps {
  country: CountryMetric[];
}

const FLAGS: Record<string, string> = {
  Indonesia: "🇮🇩",
  Canada: "🇨🇦",
  Singapore: "🇸🇬",
  Malaysia: "🇲🇾",
  Netherlands: "🇳🇱",
  "United States": "🇺🇸",
  France: "🇫🇷",
  Japan: "🇯🇵",
  Australia: "🇦🇺",
  Taiwan: "🇹🇼",
  Russia: "🇷🇺",
  India: "🇮🇳",
  Germany: "🇩🇪",
  China: "🇨🇳",
  Thailand: "🇹🇭",
  Vietnam: "🇻🇳",
  Philippines: "🇵🇭",
};

export default function CountryTable({
  country,
}: CountryTableProps) {

  const totalUsers = country.reduce(
    (sum, item) => sum + item.users,
    0
  );

  const maxUsers = Math.max(
    ...country.map((item) => item.users),
    1
  );

  return (

    <div className="flex h-full flex-col">

      {/* Header */}

      <div className="mb-3">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-slate-400">
              TOP COUNTRIES
            </p>

            <h3 className="mt-1 text-base font-bold text-slate-900">
              Active Users
            </h3>

          </div>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
            {country.length} Countries
          </span>

        </div>

      </div>

      {/* Scroll */}

      <div
        className="
          flex-1
          overflow-y-auto
          pr-2
          space-y-2

          scrollbar-thin
          scrollbar-thumb-slate-300
          scrollbar-track-transparent
        "
      >

        {country.map((item, index) => {

          const percent =
            totalUsers === 0
              ? 0
              : (item.users / totalUsers) * 100;

          const width =
            (item.users / maxUsers) * 100;

          return (

            <div
              key={item.country}
              className="
                rounded-xl
                border
                border-slate-100

                bg-white

                p-2.5

                transition

                hover:border-blue-100
                hover:bg-slate-50
              "
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center

                      rounded-full

                      bg-blue-50

                      text-xs
                      font-bold

                      text-blue-600
                    "
                  >
                    {index + 1}
                  </div>

                  <div>

                    <div className="flex items-center gap-2">

                      <span className="text-base">
                        {FLAGS[item.country] ?? "🌍"}
                      </span>

                      <span className="text-sm font-semibold text-slate-800">
                        {item.country}
                      </span>

                    </div>

                    <div className="text-[11px] text-slate-500">
                      {percent.toFixed(1)}% of users
                    </div>

                  </div>

                </div>

                <div className="text-right">

                  <div className="text-sm font-bold text-slate-900">
                    {item.users.toLocaleString()}
                  </div>

                  <div className="text-[10px] text-slate-400">
                    Active Users
                  </div>

                </div>

              </div>

              <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="
                    h-full

                    rounded-full

                    bg-gradient-to-r

                    from-sky-400
                    via-blue-500
                    to-indigo-600

                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${width}%`,
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}