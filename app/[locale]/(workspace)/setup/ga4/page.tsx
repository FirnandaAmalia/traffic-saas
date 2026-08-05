import type {
  ComponentProps,
} from "react";

import {
  getServerSession,
} from "next-auth";

import {
  redirect,
} from "next/navigation";

import GA4Selector from "@/components/setup/ga4-selector";

import {
  authOptions,
} from "@/lib/auth";

import {
  getGA4Properties,
} from "@/lib/ga4-admin";

import {
  resolveProjectForUser,
} from "@/lib/project-service";

import { getLocale } from "next-intl/server";

type GA4Accounts =
  ComponentProps<
    typeof GA4Selector
  >["accounts"];

type GA4Account =
  GA4Accounts[number];

type GA4PropertySummary =
  NonNullable<
    GA4Account["propertySummaries"]
  >[number];

type RawGA4Accounts =
  Awaited<
    ReturnType<
      typeof getGA4Properties
    >
  >;

type RawGA4Account =
  RawGA4Accounts[number];

type RawGA4PropertySummary =
  NonNullable<
    RawGA4Account["propertySummaries"]
  >[number];

interface SetupGA4Props {
  searchParams: Promise<{
    projectId?: string;
  }>;
}

/*
|--------------------------------------------------------------------------
| Normalize GA4 Property
|--------------------------------------------------------------------------
*/

function normalizePropertySummary(
  property: RawGA4PropertySummary
): GA4PropertySummary | null {
  if (!property.property) {
    return null;
  }

  return {
    property:
      property.property,

    displayName:
      property.displayName ??
      property.property,
  };
}

/*
|--------------------------------------------------------------------------
| Normalize GA4 Account
|--------------------------------------------------------------------------
*/

function normalizeAccount(
  account: RawGA4Account
): GA4Account | null {
  if (!account.account) {
    return null;
  }

  const propertySummaries = (
    account.propertySummaries ?? []
  )
    .map(
      normalizePropertySummary
    )
    .filter(
      (
        property
      ): property is GA4PropertySummary =>
        property !== null
    );

  return {
    account:
      account.account,

    displayName:
      account.displayName ??
      account.account,

    propertySummaries,
  };
}

export default async function SetupGA4({
  searchParams,
}: SetupGA4Props) {
  /*
  |--------------------------------------------------------------------------
  | Authentication
  |--------------------------------------------------------------------------
  */

  const session =
    await getServerSession(
      authOptions
    );

  const locale = await getLocale();

if (!session?.user?.id) {
  redirect(`/${locale}/login`);
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
      userId:
        session.user.id,

      projectId:
        requestedProjectId,
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
          Project tidak tersedia atau kamu
          tidak memiliki akses ke project
          tersebut.
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
    redirect(`/${locale}/projects`);
  }

  /*
|--------------------------------------------------------------------------
| Canonical Setup URL
|--------------------------------------------------------------------------
*/

if (!requestedProjectId) {
  redirect(
    `/${locale}/setup/ga4?projectId=${project.id}`
  );
}

  /*
  |--------------------------------------------------------------------------
  | Google Credential
  |--------------------------------------------------------------------------
  */

  const accessToken =
  typeof session.accessToken === "string"
    ? session.accessToken
    : undefined;

const refreshToken =
  typeof session.refreshToken === "string"
    ? session.refreshToken
    : undefined;

if (
  !accessToken &&
  !refreshToken
) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Google perlu dihubungkan kembali
        </h1>

        <p className="mt-2 text-slate-500">
          Sesi TrafficSaaS masih aktif,
          tetapi akses Google Analytics
          tidak tersedia.
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Silakan login kembali menggunakan
          akun Google yang memiliki akses GA4.
        </p>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Fetch GA4 Properties
  |--------------------------------------------------------------------------
  */

  let accounts: GA4Accounts = [];

  try {
    const rawAccounts =
  await getGA4Properties(
    accessToken,
    refreshToken
  );

    accounts =
      rawAccounts
        .map(
          normalizeAccount
        )
        .filter(
          (
            account
          ): account is GA4Account =>
            account !== null
        );
  } catch (error) {
    console.error(
      "GA4 PROPERTY ERROR:",
      error
    );

    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Gagal mengambil data GA4
        </h1>

        <p className="mt-3 text-slate-500">
          TrafficSaaS tidak dapat mengambil
          daftar property Google Analytics 4.
        </p>

        <p className="mt-2 text-sm text-red-500">
          Pastikan akun Google memiliki akses
          ke property GA4.
        </p>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Count Available Properties
  |--------------------------------------------------------------------------
  */

  const totalProperties =
    accounts.reduce(
      (
        total,
        account
      ) =>
        total +
        (
          account
            .propertySummaries
            ?.length ?? 0
        ),
      0
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
          Connect Google Analytics 4
        </h1>

        <p className="mt-2 text-slate-500">
          Pilih Property GA4 yang ingin
          dihubungkan ke project ini.
        </p>
      </div>

      {totalProperties === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="font-semibold">
            Tidak ada property GA4 ditemukan
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Akun Google ini belum memiliki
            akses ke property Google
            Analytics 4.
          </p>
        </div>
      ) : (
        <GA4Selector
          projectId={project.id}
          accounts={accounts}
        />
      )}
    </main>
  );
}