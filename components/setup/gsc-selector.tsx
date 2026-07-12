"use client";

import { useRouter } from "next/navigation";

import type {
  GSCSite,
} from "@/lib/types/gsc";

interface GSCSelectorProps {
  projectId: string;
  sites: GSCSite[];
}

export default function GSCSelector({
  projectId,
  sites,
}: GSCSelectorProps) {
  const router =
    useRouter();

  async function connectSite(
    siteUrl: string
  ) {
    const res = await fetch(
      "/api/project/connect-gsc",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          projectId,
          gscSiteUrl: siteUrl,
        }),
      }
    );

    const data =
      await res.json();

    if (!data.success) {
      alert(data.error);
      return;
    }

    router.push(
      `/setup/ga4?projectId=${projectId}`
    );
  }

  return (
    <div className="space-y-4">
      {sites.map((site) => (
        <button
          key={site.siteUrl}
          onClick={() =>
            connectSite(
              site.siteUrl
            )
          }
          className="w-full rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-600 hover:shadow"
        >
          <div className="font-semibold">
            {site.siteUrl}
          </div>

          <div className="mt-1 text-sm text-slate-500">
            {site.permissionLevel}
          </div>
        </button>
      ))}
    </div>
  );
}