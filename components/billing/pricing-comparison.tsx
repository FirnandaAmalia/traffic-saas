import {
  Check,
  Lock,
} from "lucide-react";

const rows = [
  {
    feature: "Dashboard Overview",
    free: true,
    pro: true,
  },
  {
    feature: "Performance Trend",
    free: true,
    pro: true,
  },
  {
    feature: "Top Keywords",
    free: true,
    pro: true,
  },
  {
    feature: "Top Pages",
    free: true,
    pro: true,
  },
  {
    feature: "Landing Pages",
    free: true,
    pro: true,
  },
  {
    feature: "Top Events",
    free: true,
    pro: true,
  },
  {
    feature: "Google Search Console",
    free: true,
    pro: true,
  },
  {
    feature: "Google Analytics 4",
    free: true,
    pro: true,
  },
  {
    feature: "CSV Export",
    free: true,
    pro: true,
  },
  {
    feature: "PDF Export",
    free: false,
    pro: true,
  },
  {
    feature: "Excel Export",
    free: false,
    pro: true,
  },
  {
    feature: "AI Executive Dashboard",
    free: false,
    pro: true,
  },
  {
    feature: "AI Insights",
    free: false,
    pro: true,
  },
  {
    feature: "AI Recommendation",
    free: false,
    pro: true,
  },
  {
    feature: "Compare Date Range",
    free: false,
    pro: true,
  },
  {
    feature: "Workspace",
    free: "1",
    pro: "Unlimited",
  },
  {
    feature: "Projects",
    free: "1",
    pro: "Unlimited",
  },
];

export default function PricingComparison() {
  return (
    <section className="mt-24">

      <div className="mb-10 text-center">

        <h2 className="text-4xl font-bold">

          Compare Plans

        </h2>

        <p className="mt-3 text-slate-500">

          Everything included in each plan.

        </p>

      </div>

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-8 py-5 text-left">

                Feature

              </th>

              <th className="w-40 px-6 py-5 text-center">

                Free

              </th>

              <th className="w-40 bg-violet-50 px-6 py-5 text-center text-violet-700">

                Pro

              </th>

            </tr>

          </thead>

          <tbody>

            {rows.map((row) => (

              <tr
                key={row.feature}
                className="border-t"
              >

                <td className="px-8 py-5 font-medium">

                  {row.feature}

                </td>

                <td className="text-center">

                  {typeof row.free ===
                  "boolean" ? (

                    row.free ? (
                      <Check className="mx-auto h-5 w-5 text-emerald-600" />
                    ) : (
                      <Lock className="mx-auto h-4 w-4 text-slate-400" />
                    )

                  ) : (

                    row.free

                  )}

                </td>

                <td className="bg-violet-50 text-center">

                  {typeof row.pro ===
                  "boolean" ? (

                    row.pro ? (
                      <Check className="mx-auto h-5 w-5 text-violet-600" />
                    ) : (
                      <Lock className="mx-auto h-4 w-4 text-slate-400" />
                    )

                  ) : (

                    row.pro

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}