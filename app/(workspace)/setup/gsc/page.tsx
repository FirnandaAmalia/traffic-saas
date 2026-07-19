import { getServerSession } from "next-auth";
import {
  redirect,
} from "next/navigation";

import GSCSelector from "@/components/setup/gsc-selector";

import type {
  GSCSite,
} from "@/lib/types/gsc";

import { authOptions } from "@/lib/auth";

import {
  getSearchConsoleSites,
} from "@/lib/google/gsc";

import {
  resolveProjectForUser,
} from "@/lib/project-service";

interface SetupGSCProps {
  searchParams: Promise<{
    projectId?: string;
  }>;
}

export default async function SetupGSC({
  searchParams,
}: SetupGSCProps) {
  /*
  |--------------------------------------------------------------------------
  | Authentication
  |--------------------------------------------------------------------------
  */

  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.user?.id) {
    redirect("/login");
  }

  /*
  |--------------------------------------------------------------------------
  | Search Parameters
  |--------------------------------------------------------------------------
  */

  const {
    projectId,
  } = await searchParams;

  const requestedProjectId =
    projectId?.trim() || null;

  /*
  |--------------------------------------------------------------------------
  | Resolve Authorized Project
  |--------------------------------------------------------------------------
  */

  const project =
    await resolveProjectForUser({
      userId: session.user.id,
      projectId: requestedProjectId,
    });

  /*
  |--------------------------------------------------------------------------
  | Invalid Explicit Project
  |--------------------------------------------------------------------------
  */

  if (
    requestedProjectId &&
    !project
  ) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Project tidak ditemukan
        </h1>

        <p className="mt-2 text-slate-500">
          Project tidak tersedia atau kamu tidak
          memiliki akses ke project tersebut.
        </p>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | User Has No Project
  |--------------------------------------------------------------------------
  */

  if (!project) {
    redirect("/projects");
  }

  /*
  |--------------------------------------------------------------------------
  | Canonical Setup URL
  |--------------------------------------------------------------------------
  */

  if (!requestedProjectId) {
    redirect(
      `/setup/gsc?projectId=${project.id}`
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Google Credential
  |--------------------------------------------------------------------------
  */

  if (!session.refreshToken) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Google perlu dihubungkan kembali
        </h1>

        <p className="mt-2 text-slate-500">
          Sesi TrafficSaaS masih aktif, tetapi
          credential Google tidak tersedia.
          Silakan login kembali menggunakan Google.
        </p>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Fetch Search Console Sites
  |--------------------------------------------------------------------------
  */

  let sites: GSCSite[] = [];

  try {
    sites =
      await getSearchConsoleSites(
        session.refreshToken
      );
  } catch (error) {
    console.error(
      "GSC SITES ERROR:",
      error
    );

    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Gagal mengambil Search Console
        </h1>

        <p className="mt-2 text-slate-500">
          TrafficSaaS tidak dapat mengambil daftar
          property Google Search Console.
        </p>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Supported Permissions
  |--------------------------------------------------------------------------
  */

  const availableSites =
    sites.filter(
      (site) =>
        site.permissionLevel ===
          "siteOwner" ||
        site.permissionLevel ===
          "siteFullUser"
    );

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

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

      {availableSites.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="font-semibold">
            Property Search Console tidak ditemukan
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Akun Google ini belum mempunyai property
            dengan akses Owner atau Full User.
          </p>
        </div>
      ) : (
        <GSCSelector
          projectId={project.id}
          sites={availableSites}
        />
      )}
    </main>
  );
}