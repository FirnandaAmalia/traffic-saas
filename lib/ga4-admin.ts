import { google } from "googleapis";

import type {
  GA4Account,
  GA4Property,
} from "./types/ga4";

export async function getGA4Properties(
  accessToken: string
): Promise<GA4Account[]> {

  const auth =
    new google.auth.OAuth2();

  auth.setCredentials({
    access_token: accessToken,
  });

  const analyticsAdmin =
    google.analyticsadmin({
      version: "v1beta",
      auth,
    });

  const response =
    await analyticsAdmin.accountSummaries.list();

  return (
    response.data.accountSummaries ?? []
  ).map(
    (account): GA4Account => ({

      account:
        account.account ?? "",

      displayName:
        account.displayName ?? "",

      propertySummaries:
        (
          account.propertySummaries ?? []
        ).map(
          (property): GA4Property => ({

            property:
              property.property ?? "",

            displayName:
              property.displayName ?? "",

          })
        ),

    })
  );
}