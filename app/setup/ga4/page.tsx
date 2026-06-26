import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getGA4Properties } from "@/lib/ga4-admin";

export default async function SetupGA4() {

  const session =
    await getServerSession(
      authOptions
    );

    console.log(session);

  if (!session?.accessToken) {
    return (
      <main className="p-10">
        Not authenticated
      </main>
    );
  }

  const data =
    await getGA4Properties(
      session.accessToken as string
    );

  return (
    <main className="p-10">
      <h1 className="mb-6 text-3xl font-bold">
        Pilih Property GA4
      </h1>

      {data.map(
        (account: any) => (
          <div
            key={account.account}
            className="mb-6"
          >
            <h2 className="font-bold">
              {account.displayName}
            </h2>

            {account.propertySummaries?.map(
              (property: any) => (
                <div
                  key={property.property}
                  className="mt-2 rounded border p-4"
                >
                  <div>
                    {property.displayName}
                  </div>

                  <div className="text-sm text-gray-500">
                    {property.property}
                  </div>
                </div>
              )
            )}
          </div>
        )
      )}
    </main>
  );
}