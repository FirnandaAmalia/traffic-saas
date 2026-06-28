import { getServerSession } from "next-auth";
import type { GSCSite } from "@/lib/types/gsc";

import { authOptions }
from "@/app/api/auth/[...nextauth]/route";

import {
  getSearchConsoleSites,
} from "@/lib/google/gsc";

export default async function SetupGSC() {

  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.refreshToken) {
    return (
      <main className="p-10">
        <h1>Not authenticated</h1>
      </main>
    );
  }

  const sites =
  await getSearchConsoleSites(
    session.refreshToken as string
  );

  return (
    <main className="p-10">
      <h1 className="mb-6 text-3xl font-bold">
        Pilih Property Google Search Console
      </h1>

      <div className="space-y-4">
  {sites.map((site: GSCSite) => (
    <div
      key={site.siteUrl}
      className="rounded-lg border p-4"
    >
      <div className="font-medium">
        {site.siteUrl}
      </div>

      <div className="text-sm text-gray-500">
        {site.permissionLevel}
      </div>
    </div>
  ))}
</div>
    </main>
  );
}