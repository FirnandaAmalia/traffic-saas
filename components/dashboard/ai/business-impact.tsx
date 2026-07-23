"use client";

import {
  TrendingUp,
  Users,
  DollarSign,
  CalendarClock,
  Star,
  Rocket,
  Target,
  Info,
} from "lucide-react";

import type { BusinessImpact } from "@/lib/recommendation/business-impact";

interface Props {
  business: BusinessImpact;
}

function Stars({ value }: { value: number }) {
  const stars = Math.round(value / 20);

  return (
    <div className="flex gap-1">
      {Array.from({
        length: 5,
      }).map((_, i) => (
        <Star
          key={i}
          size={18}
          className={
            i < stars ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
          }
        />
      ))}
    </div>
  );
}

function StatCard({
  icon,

  title,

  value,

  description,
}: {
  icon: React.ReactNode;

  title: string;

  value: React.ReactNode;

  description: string;
}) {
  return (
    <div
      className="
rounded-3xl
border
border-slate-200
bg-white
p-6
shadow-sm
transition
hover:shadow-md
"
    >
      <div
        className="
flex
items-center
gap-3
"
      >
        <div
          className="
rounded-2xl
bg-blue-50
p-3
text-blue-600
"
        >
          {icon}
        </div>

        <div>
          <p
            className="
text-sm
text-slate-500
"
          >
            {title}
          </p>

          <h3
            className="
mt-1
text-3xl
font-black
text-slate-900
"
          >
            {value}
          </h3>
        </div>
      </div>

      <p
        className="
mt-4
text-xs
leading-5
text-slate-500
"
      >
        {description}
      </p>
    </div>
  );
}

export default function BusinessImpactCard({ business }: Props) {
  return (
    <section className="space-y-6">
      {/* HEADER */}

      <div
        className="
flex
items-center
justify-between
"
      >
        <div>
          <div
            className="
flex
items-center
gap-2
"
          >
            <Rocket className="text-indigo-600" />

            <h2
              className="
text-2xl
font-bold
"
            >
              Business Growth Forecast
            </h2>
          </div>

          <p
            className="
mt-2
text-slate-500
"
          >
            Estimasi dampak bisnis berdasarkan peluang optimasi SEO dan data
            analytics.
          </p>
        </div>

        <div
          className="
rounded-full
bg-indigo-50
px-4
py-2
text-sm
font-semibold
text-indigo-700
"
        >
          Priority:
          {business.businessPriority}
        </div>
      </div>

      {/* AI DISCLAIMER */}

      <div
        className="
flex
items-center
gap-2
rounded-2xl
border
border-blue-100
bg-blue-50
p-4
text-sm
text-blue-700
"
      >
        <Info size={18} />

        <span>
          Angka berikut adalah estimasi peluang berdasarkan data website saat
          ini, bukan hasil pasti.
        </span>
      </div>

      {/* KPI */}

      <div
        className="
grid
gap-5
md:grid-cols-2
xl:grid-cols-5
"
      >
        <StatCard
          icon={<TrendingUp size={22} />}
          title="Traffic Potential"
          value={"+" + business.potentialClicks.toLocaleString("id-ID")}
          description="Estimasi tambahan klik organik jika rekomendasi SEO diterapkan."
        />

        <StatCard
          icon={<Users size={22} />}
          title="User Growth"
          value={"+" + business.potentialUsers.toLocaleString("id-ID")}
          description="Estimasi tambahan pengguna dari peningkatan visibilitas website."
        />

        <StatCard
          icon={<DollarSign size={22} />}
          title="Conversion Impact"
          value={"+" + business.potentialConversion + "%"}
          description="Estimasi peluang peningkatan conversion melalui optimasi."
        />

        <StatCard
          icon={<CalendarClock size={22} />}
          title="Implementation"
          value={business.estimatedWeeks + " Weeks"}
          description="Perkiraan waktu implementasi seluruh action plan."
        />

        <StatCard
          icon={<Target size={22} />}
          title="ROI Score"
          value={<Stars value={business.roiScore} />}
          description="Prioritas return berdasarkan impact dan effort."
        />
      </div>

      {/* INSIGHT */}

      <div
        className="
grid
gap-5
lg:grid-cols-2
"
      >
        <div
          className="
rounded-3xl
bg-gradient-to-br
from-indigo-50
to-blue-50
p-6
"
        >
          <div
            className="
flex
items-center
gap-2
font-semibold
"
          >
            <TrendingUp size={18} />
            Traffic Opportunity
          </div>

          <p
            className="
mt-4
text-2xl
font-black
text-indigo-700
"
          >
            {business.trafficGrowth}
          </p>

          <p
            className="
mt-3
text-sm
leading-6
text-slate-600
"
          >
            Website memiliki peluang peningkatan trafik organik berdasarkan
            sinyal keyword, impression, dan peluang optimasi yang ditemukan AI.
          </p>
        </div>

        <div
          className="
rounded-3xl
bg-gradient-to-br
from-emerald-50
to-green-50
p-6
"
        >
          <div
            className="
flex
items-center
gap-2
font-semibold
"
          >
            <Target size={18} />
            Revenue Opportunity
          </div>

          <p
            className="
mt-4
text-lg
font-bold
text-emerald-700
"
          >
            {business.revenueOpportunity}
          </p>

          <p
            className="
mt-3
text-sm
leading-6
text-slate-600
"
          >
            Prioritaskan rekomendasi dengan impact bisnis terbesar untuk
            meningkatkan peluang pertumbuhan.
          </p>
        </div>
      </div>
    </section>
  );
}
