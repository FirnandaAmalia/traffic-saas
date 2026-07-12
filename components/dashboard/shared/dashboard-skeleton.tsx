import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <Skeleton className="h-4 w-24" />

        <Skeleton className="mt-4 h-10 w-80" />

        <Skeleton className="mt-4 h-4 w-[520px]" />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">

          <Skeleton className="h-28 rounded-2xl" />

          <Skeleton className="h-28 rounded-2xl" />

          <Skeleton className="h-28 rounded-2xl" />

        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Skeleton className="h-36 rounded-3xl" />

        <Skeleton className="h-36 rounded-3xl" />

        <Skeleton className="h-36 rounded-3xl" />

        <Skeleton className="h-36 rounded-3xl" />

      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">

        <Skeleton className="h-96 rounded-3xl" />

        <Skeleton className="h-96 rounded-3xl" />

      </div>

      {/* Tables */}
      <div className="grid gap-6 xl:grid-cols-2">

        <Skeleton className="h-[420px] rounded-3xl" />

        <Skeleton className="h-[420px] rounded-3xl" />

      </div>

      {/* GA4 */}
      <Skeleton className="h-64 rounded-3xl" />

    </div>
  );
}