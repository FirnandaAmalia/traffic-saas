import { google } from "googleapis";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export function createOAuthClient(
  refreshToken: string
) {
  const auth =
    new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

  auth.setCredentials({
    refresh_token: refreshToken,
  });

  return auth;
}

export function createSearchConsoleClient(
  auth: any
) {
  return google.searchconsole({
    version: "v1",
    auth,
  });
}

export function createGA4Client(
  auth: any
) {
  return new BetaAnalyticsDataClient({
    authClient: auth,
  });
}