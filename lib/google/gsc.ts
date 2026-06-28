import { google } from "googleapis";

import type {
  GSCSite,
  GSCRow,
} from "../types/gsc";

function getSearchConsoleClient(
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

  return google.searchconsole({
    version: "v1",
    auth,
  });
}

function formatDate(date: Date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDateRange() {
  const endDate = new Date();

  endDate.setDate(
    endDate.getDate() - 1
  );

  const startDate = new Date(
    endDate
  );

  startDate.setDate(
    startDate.getDate() - 27
  );

  return {
    startDate:
      formatDate(startDate),

    endDate:
      formatDate(endDate),
  };
}

export async function getSearchConsoleSites(
  refreshToken: string
): Promise<GSCSite[]> {

  const searchconsole =
    getSearchConsoleClient(
      refreshToken
    );

  const response =
    await searchconsole.sites.list();

  return (
    response.data.siteEntry ?? []
  ).map(
    (site): GSCSite => ({
      siteUrl:
        site.siteUrl ?? "",

      permissionLevel:
        site.permissionLevel ?? "",
    })
  );
}

export async function getSearchConsoleSummary(
  refreshToken: string,
  siteUrl: string
): Promise<{
  clicks: number;
  impressions: number;
}> {

  const searchconsole =
    getSearchConsoleClient(
      refreshToken
    );

  const {
    startDate,
    endDate,
  } = getDateRange();

  const response =
    await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["date"],
        rowLimit: 1000,
      },
    });

  const rows =
    response.data.rows ?? [];

  let clicks = 0;
  let impressions = 0;

  for (const row of rows) {
    clicks += row.clicks ?? 0;
    impressions +=
      row.impressions ?? 0;
  }

  return {
    clicks,
    impressions,
  };
}

export async function getTopQueries(
  refreshToken: string,
  siteUrl: string
): Promise<GSCRow[]> {

  const searchconsole =
    getSearchConsoleClient(
      refreshToken
    );

  const {
    startDate,
    endDate,
  } = getDateRange();

  const response =
    await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: [
          "query",
        ],
        rowLimit: 10,
      },
    });

  return response.data.rows ?? [];
}

export async function getTopPages(
  refreshToken: string,
  siteUrl: string
): Promise<GSCRow[]> {

  const searchconsole =
    getSearchConsoleClient(
      refreshToken
    );

  const {
    startDate,
    endDate,
  } = getDateRange();

  const response =
    await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: [
          "page",
        ],
        rowLimit: 20,
      },
    });

  return response.data.rows ?? [];
}

export async function getSearchConsoleHistory(
  refreshToken: string,
  siteUrl: string
): Promise<GSCRow[]> {

  const searchconsole =
    getSearchConsoleClient(
      refreshToken
    );

  const {
    startDate,
    endDate,
  } = getDateRange();

  const response =
    await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: [
          "date",
        ],
      },
    });

  return response.data.rows ?? [];
}

export async function fetchGSCRawData(
  refreshToken: string,
  siteUrl: string
) {

  const searchconsole =
    getSearchConsoleClient(
      refreshToken
    );

  const {
    startDate,
    endDate,
  } = getDateRange();

  const response =
    await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: [
          "date",
          "query",
          "page",
        ],
        rowLimit: 25000,
        dataState: "all",
      },
    });

  const rows =
    response.data.rows ?? [];

  const formatted =
    rows.map((row) => ({
      date:
        row.keys?.[0],

      query:
        row.keys?.[1],

      page:
        row.keys?.[2],

      clicks:
        row.clicks ?? 0,

      impressions:
        row.impressions ?? 0,

      ctr:
        row.ctr ?? 0,

      position:
        row.position ?? 0,
    }));

  console.log(
    "RAW GSC READY =",
    formatted.length
  );

  return formatted;
}