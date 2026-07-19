import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function PricingHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">

      <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-5 py-2 text-sm font-semibold text-violet-700 shadow-sm">

        <Sparkles className="h-4 w-4" />

        Pricing Plans

      </div>

      <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-900 lg:text-6xl">

        Scale Your SEO

        <span className="block bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">

          with AI

        </span>

      </h1>

      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-500">

        Connect Google Search Console and Google Analytics 4,
        monitor your SEO performance, and unlock AI-powered
        recommendations when you&apos;re ready to grow.

      </p>

      <div className="mt-10 flex justify-center">

        <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:scale-105">

          Compare Plans

          <ArrowRight className="h-4 w-4" />

        </button>

      </div>

    </div>
  );
}