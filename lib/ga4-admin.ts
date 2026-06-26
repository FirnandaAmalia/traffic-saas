import { google } from "googleapis";

export async function getGA4Properties(
  accessToken: string
) {
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
    response.data.accountSummaries || []
  );
}