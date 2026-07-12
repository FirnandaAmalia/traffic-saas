"use client";

import Parallax from "@/components/motion/parallax";

import Browser from "./browser";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

import KPI from "./kpi";
import TrafficChart from "./traffic-chart";
import TrafficSource from "./traffic-source";
import Countries from "./countries";
import AiCard from "./ai-card";

import FloatingSync from "./floating-sync";
import FloatingGrowth from "./floating-growth";

export default function HeroDashboard() {
  return (
    <Parallax className="relative">

      {/* Glow */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          rounded-[42px]

          bg-gradient-to-br

          from-violet-500/20
          via-sky-400/20
          to-cyan-400/20

          blur-3xl
        "
      />

      {/* Floating Cards */}

      <FloatingSync />

      <FloatingGrowth />

      {/* Browser */}

      <Browser>

        {/* Sidebar */}

        <Sidebar />

        {/* Content */}

        <main className="flex min-w-0 flex-1 flex-col">

          <Topbar />

          <div className="space-y-6 p-8">

            <KPI />

            <TrafficChart />

            <div className="grid gap-6 xl:grid-cols-2">

              <TrafficSource />

              <Countries />

            </div>

            <AiCard />

          </div>

        </main>

      </Browser>

    </Parallax>
  );
}