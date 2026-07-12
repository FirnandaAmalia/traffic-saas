"use client";

import {
  Check,
  Lock,
} from "lucide-react";

type FeatureValue =
  | boolean
  | string;

type FeatureRow = {
  name: string;
  free: FeatureValue;
  pro: FeatureValue;
};

type FeatureSection = {
  title: string;
  items: FeatureRow[];
};

const sections: FeatureSection[] = [
  {
    title: "Dashboard",
    items: [
      { name: "Dashboard Overview", free: true, pro: true },
      { name: "KPI Cards", free: true, pro: true },
      { name: "Performance Trend", free: true, pro: true },
      { name: "Top Keywords", free: true, pro: true },
      { name: "Top Pages", free: true, pro: true },
      { name: "Landing Pages", free: true, pro: true },
      { name: "Top Events", free: true, pro: true },
      { name: "Traffic Acquisition", free: true, pro: true },
      { name: "Browser", free: true, pro: true },
      { name: "Device Category", free: true, pro: true },
      { name: "Active Users by Country", free: true, pro: true },
    ],
  },

  {
    title: "Google Integration",
    items: [
      {
        name: "Google Search Console",
        free: true,
        pro: true,
      },
      {
        name: "Google Analytics 4",
        free: true,
        pro: true,
      },
    ],
  },

  {
    title: "AI Features",
    items: [
      {
        name: "AI Executive Dashboard",
        free: false,
        pro: true,
      },
      {
        name: "AI Insights",
        free: false,
        pro: true,
      },
      {
        name: "AI Recommendation",
        free: false,
        pro: true,
      },
    ],
  },

  {
    title: "Analytics",
    items: [
      {
        name: "Compare Date Range",
        free: false,
        pro: true,
      },
    ],
  },

  {
    title: "Export",
    items: [
      {
        name: "CSV Export",
        free: true,
        pro: true,
      },
      {
        name: "PDF Export",
        free: false,
        pro: true,
      },
      {
        name: "Excel Export",
        free: false,
        pro: true,
      },
    ],
  },

  {
    title: "Workspace",
    items: [
      {
        name: "Workspace",
        free: "1",
        pro: "Unlimited",
      },
      {
        name: "Project",
        free: "1",
        pro: "Unlimited",
      },
    ],
  },
];

function Cell({
  value,
}: {
  value: FeatureValue;
}) {
  if (typeof value === "string") {
    return (
      <span className="font-semibold text-slate-700">
        {value}
      </span>
    );
  }

  return value ? (
    <Check className="mx-auto h-5 w-5 text-emerald-600" />
  ) : (
    <Lock className="mx-auto h-4 w-4 text-slate-400" />
  );
}

export default function FeatureMatrix() {
  return (
    <section className="mx-auto mt-28 w-full max-w-7xl">

      <div className="mb-14 text-center">

        <h2 className="text-5xl font-black tracking-tight text-slate-900">

          Compare Every Feature

        </h2>

        <p className="mt-4 text-lg text-slate-500">

          Everything included in every plan.

        </p>

      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">

        <table className="min-w-full border-collapse">

          <thead className="sticky top-0 z-20 bg-white/95 backdrop-blur">

            <tr className="border-b">

              <th className="w-[60%] px-8 py-6 text-left text-lg font-bold">

                Feature

              </th>

              <th className="w-[20%] px-6 text-center text-lg font-bold">

                Free

              </th>

              <th className="w-[20%] bg-violet-50 px-6 text-center text-lg font-bold text-violet-700">

                Pro

              </th>

            </tr>

          </thead>

          {sections.map((section) => (

            <tbody key={section.title}>

              <tr className="bg-slate-100">

                <td
                  colSpan={3}
                  className="px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-slate-600"
                >

                  {section.title}

                </td>

              </tr>

              {section.items.map((item) => (

                <tr
                  key={item.name}
                  className="border-t transition-colors hover:bg-slate-50"
                >

                  <td className="px-8 py-5 font-medium text-slate-700">

                    {item.name}

                  </td>

                  <td className="text-center">

                    <Cell value={item.free} />

                  </td>

                  <td className="bg-violet-50 text-center">

                    <Cell value={item.pro} />

                  </td>

                </tr>

              ))}

            </tbody>

          ))}

        </table>

      </div>

    </section>
  );
}