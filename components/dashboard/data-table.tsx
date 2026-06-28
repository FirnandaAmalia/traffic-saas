import { ChevronRight } from "lucide-react";

import type { GSCRow } from "@/lib/types/gsc";

interface DataTableProps {
  title: string;
  rows: GSCRow[];
  renderLabel: (row: GSCRow) => React.ReactNode;
}

export default function DataTable({
  title,
  rows,
  renderLabel,
}: DataTableProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

        <div>

          <h2 className="text-xl font-bold tracking-tight">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Top performing results
          </p>

        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-blue-600 transition hover:text-blue-700">

          View All

          <ChevronRight className="h-4 w-4" />

        </button>

      </div>

      <div className="max-h-[620px] overflow-y-auto">

        <table className="w-full">

          <tbody>

            {rows.map((row, index) => (

              <tr
                key={row.keys?.[0]}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >

                <td className="w-14 py-4 pl-6">

                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-700"
                        : index === 1
                        ? "bg-slate-200 text-slate-700"
                        : index === 2
                        ? "bg-orange-100 text-orange-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    #{index + 1}
                  </div>

                </td>

                <td className="py-4">

                  <p className="line-clamp-1 text-sm font-medium text-slate-900">

                    {renderLabel(row)}

                  </p>

                </td>

                <td className="py-4 pr-6 text-right">

                  <p className="text-sm font-semibold text-slate-900">

                    {Number(
                      row.clicks ?? 0
                    ).toLocaleString()}

                  </p>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}