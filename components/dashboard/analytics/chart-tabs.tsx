"use client";

import { useMemo, useState } from "react";

import TrafficChart from "@/components/charts/TrafficChart";

interface ChartTabsProps {
  clicksHistory: {
    date: string;
    clicks: number;
    impressions: number;
  }[];

  usersHistory: {
    date: string;
    users: number;
    sessions: number;
  }[];

  clicks: number;
  impressions: number;
  users: number;
  sessions: number;

  rangeLabel: string;
}

const tabs = [
  { key: "clicks", label: "Clicks" },
  { key: "impressions", label: "Impressions" },
  { key: "users", label: "Users" },
  { key: "sessions", label: "Sessions" },
] as const;

type Tab = (typeof tabs)[number]["key"];

export default function ChartTabs({
  clicksHistory,
  usersHistory,
  rangeLabel,
}: ChartTabsProps) {
  const [activeTab, setActiveTab] =
    useState<Tab>("clicks");

  const chart = useMemo(() => {
    switch (activeTab) {
      case "clicks":
        return {
          title: "Organic Clicks",
          data: clicksHistory,
          dataKey: "clicks",
        };

      case "impressions":
        return {
          title: "Search Impressions",
          data: clicksHistory,
          dataKey: "impressions",
        };

      case "users":
        return {
          title: "Active Users",
          data: usersHistory,
          dataKey: "users",
        };

      case "sessions":
        return {
          title: "Sessions",
          data: usersHistory,
          dataKey: "sessions",
        };

      default:
        return {
          title: "Organic Clicks",
          data: clicksHistory,
          dataKey: "clicks",
        };
    }
  }, [activeTab, clicksHistory, usersHistory]);
  
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center border-b border-slate-100 px-4 py-3">

        <div className="inline-flex rounded-lg bg-slate-100 p-1">

          {tabs.map((tab) => (

            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>

          ))}

        </div>

      </div>

      <div className="flex-1 p-4">

        <TrafficChart
          title={chart.title}
          data={chart.data}
          dataKey={chart.dataKey}
          rangeLabel={rangeLabel}
        />

      </div>

    </div>
  );
}