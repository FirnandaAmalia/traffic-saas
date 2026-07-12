import { getServerSession } from "next-auth";
import GA4Selector from "@/components/setup/ga4-selector";

import { authOptions } from "@/lib/auth";

import {
  getGA4Properties,
} from "@/lib/ga4-admin";

import type {
  GA4Account,
  GA4Property,
} from "@/lib/types/ga4";

interface SetupGA4Props {
  searchParams: Promise<{
    projectId?: string;
  }>;
}

export default async function SetupGA4({
  searchParams,
}: SetupGA4Props) {

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

  if (!session?.accessToken) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Not authenticated
        </h1>
      </main>
    );
  }

  const data =
    await getGA4Properties(
      session.accessToken as string
    );

  return (
    <main className="mx-auto max-w-5xl p-10">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Connect Google Analytics 4
        </h1>

        <p className="mt-2 text-slate-500">
          Pilih Property GA4 yang ingin
          dihubungkan ke project ini.
        </p>

      </div>

      <GA4Selector
  projectId={projectId}
  accounts={data}
/>

    </main>
  );
}