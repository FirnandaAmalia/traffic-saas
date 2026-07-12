"use client";

import { useRouter } from "next/navigation";

import type {
  GA4Account,
  GA4Property,
} from "@/lib/types/ga4";

interface GA4SelectorProps {
  projectId: string;
  accounts: GA4Account[];
}

export default function GA4Selector({
  projectId,
  accounts,
}: GA4SelectorProps) {
  const router = useRouter();

  async function connectProperty(
    property: GA4Property
  ) {
    const res = await fetch(
      "/api/project/connect-ga4",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          projectId,

          ga4PropertyId:
            property.property.replace(
              "properties/",
              ""
            ),

          ga4PropertyName:
            property.displayName,
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
      `/dashboard?projectId=${projectId}`
    );
  }

  return (
    <div className="space-y-8">
      {accounts.map((account) => (
        <div
          key={account.account}
        >
          <h2 className="mb-3 text-lg font-semibold">
            {account.displayName}
          </h2>

          <div className="space-y-3">
            {account.propertySummaries?.map(
              (property: GA4Property) => (
                <button
                  key={property.property}
                  onClick={() =>
                    connectProperty(
                      property
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:border-blue-600 hover:shadow"
                >
                  <div className="font-medium">
                    {property.displayName}
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    {property.property}
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}