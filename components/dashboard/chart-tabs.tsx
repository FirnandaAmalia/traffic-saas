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
  clicks,
  impressions,
  users,
  sessions,
}: ChartTabsProps) {
  const [activeTab, setActiveTab] =
    useState<Tab>("clicks");

  const chart = useMemo(() => {
    switch (activeTab) {
      case "clicks":
        return {
          title: "Clicks Trend",
          data: clicksHistory,
          dataKey: "clicks",
        };

      case "impressions":
        return {
          title: "Impressions Trend",
          data: clicksHistory,
          dataKey: "impressions",
        };

      case "users":
        return {
          title: "Users Trend",
          data: usersHistory,
          dataKey: "users",
        };

      case "sessions":
        return {
          title: "Sessions Trend",
          data: usersHistory,
          dataKey: "sessions",
        };

      default:
        return {
          title: "Clicks Trend",
          data: clicksHistory,
          dataKey: "clicks",
        };
    }
  }, [activeTab, clicksHistory, usersHistory]);

  return (
    <>
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {tabs.map((tab) => {
          let value = 0;

          switch (tab.key) {
            case "clicks":
              value = clicks;
              break;
            case "impressions":
              value = impressions;
              break;
            case "users":
              value = users;
              break;
            case "sessions":
              value = sessions;
              break;
          }

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-2xl border p-5 text-left transition-all ${
                activeTab === tab.key
                  ? "border-blue-600 bg-blue-50 shadow"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <p className="text-sm text-slate-500">
                {tab.label}
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {value.toLocaleString()}
              </h3>
            </button>
          );
        })}
      </div>

      <TrafficChart
        title={chart.title}
        data={chart.data}
        dataKey={chart.dataKey}
      />
    </>
  );
}