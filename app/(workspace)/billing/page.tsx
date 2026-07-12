"use client";

import { useState } from "react";

import PricingHeader from "@/components/billing/pricing-header";
import PricingCard from "@/components/billing/pricing-card";
import PricingFAQ from "@/components/billing/pricing-faq";
import PricingToggle from "@/components/billing/pricing-toggle";
import PricingComparison from "@/components/billing/pricing-comparison";
import FeatureMatrix from "@/components/billing/feature-matrix";

import { PLANS } from "@/lib/plan";
import WhyUpgrade from "@/components/billing/why-upgrade";

export default function BillingPage() {
  const [yearly, setYearly] =
    useState(false);

  return (
    <main className="relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-220px] top-[-160px] h-[520px] w-[520px] rounded-full bg-violet-500/20 blur-[140px]" />
        <div className="absolute right-[-180px] top-40 h-[460px] w-[460px] rounded-full bg-sky-500/20 blur-[140px]" />
        <div className="absolute left-1/2 top-[420px] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-cyan-300/20 blur-[120px]" />
        </div>

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-300/30 blur-[120px]" />

        <div className="absolute right-0 top-40 h-[420px] w-[420px] rounded-full bg-sky-300/30 blur-[120px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">

        <PricingHeader />

        <PricingToggle
          yearly={yearly}
          onChange={setYearly}
        />

        {/* Pricing Cards */}

        <div className="mt-20 grid gap-10 lg:grid-cols-2">

          <PricingCard
            plan={PLANS.FREE}
            yearly={yearly}
          />

          <PricingCard
            plan={PLANS.PRO}
            recommended
            yearly={yearly}
          />

        </div>

        {/* Comparison */}

        <PricingComparison />

        {/* Feature Matrix */}

        <FeatureMatrix />

        {/* FAQ */}

        <PricingFAQ />

      </div>

    </main>
  );
}