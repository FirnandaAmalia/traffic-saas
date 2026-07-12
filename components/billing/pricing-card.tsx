"use client";

import { Crown, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import PricingFeature from "./pricing-feature";

import {
  PLANS,
  type Plan,
} from "@/lib/plan";

interface Props {
  plan: Plan;
  recommended?: boolean;
  yearly: boolean;
}

export default function PricingCard({
  plan,
  recommended = false,
  yearly,
}: Props) {
  const isFree =
    plan === PLANS.FREE;

  const monthlyPrice = 19;

  const yearlyPrice = 15;

  const price = isFree
    ? 0
    : yearly
    ? yearlyPrice
    : monthlyPrice;

  const title = isFree
    ? "Free"
    : "Pro";

  const subtitle = isFree
    ? "Perfect for getting started"
    : "Built for Agencies & Businesses";

  return (
    <div
      className={`
        group
        relative
        overflow-hidden

        rounded-3xl

        bg-white

        p-8

        transition-all
        duration-500

        hover:-translate-y-2

        ${
          recommended
            ? `
              border-2
              border-violet-500
              shadow-2xl
              shadow-violet-200/70
            `
            : `
              border
              border-slate-200
              hover:shadow-xl
            `
        }
      `}
    >
      {/* Glow */}

      {recommended && (
        <>
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-400/20 blur-[110px]" />

          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-[110px]" />
        </>
      )}

      {/* Content */}

      <div className="relative z-10">

        {/* Ribbon */}

        {recommended && (
          <div className="absolute right-0 top-0">

            <div className="rounded-bl-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2 text-xs font-bold tracking-wide text-white shadow-lg">

              ⭐ MOST POPULAR

            </div>

          </div>
        )}

        {/* Header */}

        <div className="flex items-center gap-4">

          {!isFree && (
            <div className="rounded-2xl bg-violet-100 p-3">

              <Crown className="h-6 w-6 text-violet-700" />

            </div>
          )}

          <div>

            <h2 className="text-3xl font-bold text-slate-900">

              {title}

            </h2>

            <p className="mt-1 text-slate-500">

              {subtitle}

            </p>

          </div>

        </div>

        {/* Price */}

        <div className="mt-10">

          <div className="flex items-end gap-2">

            <span className="text-6xl font-black">

              ${price}

            </span>

            {!isFree && (

              <span className="pb-2 text-lg text-slate-500">

                /month

              </span>

            )}

          </div>

          {!isFree && yearly && (

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">

              <Sparkles className="h-4 w-4" />

              Save 20% with yearly billing

            </div>

          )}

        </div>

        {/* CTA */}

        <Button
          className={
            recommended
              ? `
                mt-8
                w-full

                bg-gradient-to-r

                from-violet-600
                via-blue-600
                to-cyan-500

                text-white

                shadow-lg

                transition-all

                hover:scale-[1.03]
              `
              : "mt-8 w-full"
          }
          variant={
            isFree
              ? "outline"
              : "default"
          }
        >
          {isFree
            ? "Current Plan"
            : "Upgrade to Pro"}
        </Button>

        {/* Features */}

        <div className="mt-10 space-y-4">

          <PricingFeature available>
            Dashboard Overview
          </PricingFeature>

          <PricingFeature available>
            KPI Cards
          </PricingFeature>

          <PricingFeature available>
            Performance Trend
          </PricingFeature>

          <PricingFeature available>
            Top Keywords
          </PricingFeature>

          <PricingFeature available>
            Top Pages
          </PricingFeature>

          <PricingFeature available>
            Active Users by Country
          </PricingFeature>

          <PricingFeature available>
            Traffic Acquisition
          </PricingFeature>

          <PricingFeature available>
            Device Category
          </PricingFeature>

          <PricingFeature available>
            Browser
          </PricingFeature>

          <PricingFeature available>
            Landing Pages
          </PricingFeature>

          <PricingFeature available>
            Top Events
          </PricingFeature>

          <PricingFeature available>
            Google Search Console
          </PricingFeature>

          <PricingFeature available>
            Google Analytics 4
          </PricingFeature>

          <PricingFeature available>
            CSV Export
          </PricingFeature>

          <PricingFeature available>
            {isFree
              ? "1 Workspace"
              : "Unlimited Workspace"}
          </PricingFeature>

          <PricingFeature available>
            {isFree
              ? "1 Project"
              : "Unlimited Project"}
          </PricingFeature>

          <PricingFeature available={!isFree}>
            AI Executive Dashboard
          </PricingFeature>

          <PricingFeature available={!isFree}>
            AI Insights
          </PricingFeature>

          <PricingFeature available={!isFree}>
            AI Recommendation
          </PricingFeature>

          <PricingFeature available={!isFree}>
            Compare Date Range
          </PricingFeature>

          <PricingFeature available={!isFree}>
            PDF Export
          </PricingFeature>

          <PricingFeature available={!isFree}>
            Excel Export
          </PricingFeature>

        </div>

      </div>

    </div>
  );
}