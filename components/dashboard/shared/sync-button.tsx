"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Loader2,
  RefreshCw,
} from "lucide-react";

export default function SyncButton() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const projectId =
    searchParams.get("projectId");

  const [loading, setLoading] =
    useState(false);

  async function handleSync() {
  if (!projectId) return;

  try {
    setLoading(true);

    const response = await fetch(
      "/api/sync",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          projectId,
        }),
      }
    );
    router.refresh();
    toast.success(
      "Data synchronized successfully.");

    const data =
      await response.json();

    if (
      !response.ok ||
      !data.success
    ) {
      throw new Error(
        data.error ??
          "Sync gagal."
      );
    }

    router.refresh();
  } catch (error) {
    console.error(error);

    toast.error("Failed to synchronize data.");
  } finally {
    setLoading(false);
  }
}

  return (
    <button
      onClick={handleSync}
      disabled={loading}
      className="
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        py-2
        text-sm
        font-medium
        transition
        hover:bg-slate-50
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <RefreshCw className="h-4 w-4" />
      )}

      {loading
        ? "Syncing..."
        : "Sync"}
    </button>
  );
}