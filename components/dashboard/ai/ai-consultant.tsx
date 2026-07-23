// components/dashboard/ai/ai-consultant.tsx

import {
  Sparkles,
  Brain,
  TrendingUp,
  FileSearch,
  Lightbulb,
  Target,
  ShieldCheck,
} from "lucide-react";

import type { AIContext } from "@/lib/ai/context-builder";

interface Props {
  context: AIContext;
}

export default function AIConsultant({ context }: Props) {
  const topOpportunity = context.growthOpportunities?.[0];

  const priorities =
    context.recommendations.length > 0
      ? context.recommendations.slice(0, 3)
      : context.growthOpportunities.slice(0, 3).map((item) => ({
          title: item.title,

          priority: item.priority,

          recommendation: item.action,

          impact: item.impact,

          reason: item.reason,
        }));

  return (
    <section
      className="
rounded-3xl
border
border-blue-200
bg-gradient-to-br
from-blue-50
via-white
to-indigo-50
p-6
shadow-sm
space-y-6
"
    >
      {/* HEADER */}

      <div
        className="
flex
items-center
gap-3
"
      >
        <div
          className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-blue-600
shadow
"
        >
          <Sparkles className="text-white" />
        </div>

        <div>
          <h1
            className="
text-xl
font-bold
text-slate-900
"
          >
            AI SEO Consultant
          </h1>

          <p
            className="
text-sm
text-slate-500
"
          >
            Analisis SEO, growth opportunity, dan business impact berbasis data
          </p>
        </div>
      </div>

      {/* KPI */}

      <div
        className="
grid
gap-4
md:grid-cols-3
"
      >
        <Card
          icon={<Brain />}
          title="SEO Intelligence"
          text={`
Health Score ${context.websiteHealth.score}/100
(${context.websiteHealth.grade})
`}
        />

        <Card
          icon={<TrendingUp />}
          title="Growth Forecast"
          text={`
+${context.business.clicks}
klik potensial dan
+${context.business.users}
user
`}
        />

        <Card
          icon={<FileSearch />}
          title="AI Analysis"
          text={`
${priorities.length}
prioritas ditemukan
berdasarkan data
`}
        />
      </div>

      {/* TOP OPPORTUNITY */}

      {topOpportunity && (
        <div
          className="
rounded-2xl
border
bg-white
p-5
"
        >
          <div
            className="
flex
items-center
gap-2
"
          >
            <Lightbulb className="text-yellow-500" />

            <h3 className="font-bold">Peluang Pertumbuhan Terbesar</h3>
          </div>

          <h4
            className="
mt-3
text-lg
font-semibold
"
          >
            {topOpportunity.title}
          </h4>

          <p
            className="
mt-2
text-sm
text-slate-600
"
          >
            {topOpportunity.estimatedImpact}
          </p>

          <div
            className="
mt-4
flex
flex-wrap
gap-3
"
          >
            <Badge>{topOpportunity.type}</Badge>

            <Badge>Impact {topOpportunity.impact}</Badge>

            <Badge>Confidence {topOpportunity.confidence}%</Badge>
          </div>
        </div>
      )}

      {/* PRIORITY + CONFIDENCE */}

      <div
        className="
grid
gap-4
md:grid-cols-2
"
      >
        {/* PRIORITY */}

        <div
          className="
rounded-2xl
border
bg-white
p-5
"
        >
          <div
            className="
flex
items-center
gap-2
"
          >
            <Target className="text-blue-600" />

            <h3 className="font-bold">Prioritas AI</h3>
          </div>

          <div
            className="
mt-4
space-y-3
"
          >
            {priorities.length > 0 ? (
              priorities.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="
rounded-xl
bg-slate-50
p-3
"
                >
                  <p
                    className="
font-medium
"
                  >
                    {index + 1}. {item.title}
                  </p>

                  <p
                    className="
mt-1
text-xs
text-slate-500
"
                  >
                    Priority: {item.priority}
                  </p>
                </div>
              ))
            ) : (
              <p
                className="
text-sm
text-slate-500
"
              >
                Belum ditemukan prioritas berdasarkan data terbaru.
              </p>
            )}
          </div>
        </div>

        {/* CONFIDENCE */}

        <div
          className="
rounded-2xl
border
bg-white
p-5
"
        >
          <div
            className="
flex
items-center
gap-2
"
          >
            <ShieldCheck className="text-green-600" />

            <h3 className="font-bold">AI Confidence</h3>
          </div>

          <p
            className="
mt-3
text-4xl
font-bold
text-slate-900
"
          >
            {context.confidence?.score ?? topOpportunity?.confidence ?? "-"}%
          </p>

          <p
            className="
mt-1
font-medium
text-sm
text-green-600
"
          >
            {context.confidence?.level ?? "Analisis berdasarkan data tersedia"}
          </p>

          <div
            className="
mt-3
space-y-1
"
          >
            {context.confidence?.explanation?.length ? (
              context.confidence.explanation.slice(0, 3).map((item, index) => (
                <p
                  key={index}
                  className="
text-xs
text-slate-500
"
                >
                  • {item}
                </p>
              ))
            ) : (
              <p
                className="
text-xs
text-slate-500
"
              >
                AI menggunakan kombinasi data SEO dan analytics website.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  icon,

  title,

  text,
}: {
  icon: React.ReactNode;

  title: string;

  text: string;
}) {
  return (
    <div
      className="
rounded-2xl
border
bg-white
p-5
"
    >
      <div
        className="
text-blue-600
"
      >
        {icon}
      </div>

      <h3
        className="
mt-3
font-bold
"
      >
        {title}
      </h3>

      <p
        className="
mt-1
text-sm
text-slate-500
"
      >
        {text}
      </p>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
rounded-full
bg-blue-100
px-3
py-1
text-xs
font-medium
text-blue-700
"
    >
      {children}
    </span>
  );
}
