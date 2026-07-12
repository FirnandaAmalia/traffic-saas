import { getServerSession } from "next-auth";
import GSCSelector from "@/components/setup/gsc-selector";

import type {
  GSCSite,
} from "@/lib/types/gsc";

import { authOptions } from "@/lib/auth";

import {
  getSearchConsoleSites,
} from "@/lib/google/gsc";

interface SetupGSCProps {
  searchParams: Promise<{
    projectId?: string;
  }>;
}

export default async function SetupGSC({
  searchParams,
}: SetupGSCProps) {

  const {
    projectId,
  } = await searchParams;

  if (!projectId) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Project tidak ditemukan.
        </h1>

        <p className="mt-2 text-slate-500">
          Silakan kembali ke halaman Projects.
        </p>
      </main>
    );
  }

  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.refreshToken) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Not authenticated
        </h1>
      </main>
    );
  }

  const sites =
    await getSearchConsoleSites(
      session.refreshToken as string
    );

    const availableSites = sites.filter(
  (site) =>
    site.permissionLevel === "siteFullUser"
);

  return (
    <main className="mx-auto max-w-5xl p-10">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Connect Google Search Console
        </h1>

        <p className="mt-2 text-slate-500">
          Pilih property Google Search Console
          yang ingin dihubungkan ke project ini.
        </p>

      </div>
      

      <GSCSelector
  projectId={projectId}
  sites={availableSites}
/>

    </main>
  );
}