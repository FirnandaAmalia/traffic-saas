import { google } from "googleapis";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import type { OAuth2Client } from "google-auth-library";


export function createOAuthClient(
  refreshToken: string
) {

  if (!refreshToken) {

    throw new Error(
      "Google refresh token missing"
    );

  }


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
  auth: OAuth2Client
) {

  return google.searchconsole({

    version: "v1",

    auth,

  });

}



export function createGA4Client(
  auth: OAuth2Client
) {

  return new BetaAnalyticsDataClient({

    authClient: auth,

  });

}