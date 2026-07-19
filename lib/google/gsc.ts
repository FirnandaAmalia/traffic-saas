import type { searchconsole_v1 } from "googleapis";

import {
  createOAuthClient,
  createSearchConsoleClient,
} from "./client";

import type {
  GSCSite,
  GSCRow,
} from "../types/gsc";

import {
  getDateRange,
  getCompareDateRange,
  DEFAULT_DATE_RANGE,
  type DateRange,
} from "@/lib/date-range";

function getSearchConsole(
  refreshToken: string
): searchconsole_v1.Searchconsole {
  const auth =
    createOAuthClient(refreshToken);

  return createSearchConsoleClient(auth);
}

// ======================================================
// Sites
// ======================================================

export async function getSearchConsoleSites(
  refreshToken: string
): Promise<GSCSite[]> {
  const searchconsole =
    getSearchConsole(refreshToken);

  const response =
    await searchconsole.sites.list();

  return (response.data.siteEntry ?? []).map(
    (site): GSCSite => ({
      siteUrl: site.siteUrl ?? "",
      permissionLevel:
        site.permissionLevel ?? "",
    })
  );
}

// ======================================================
// Summary
// ======================================================

export async function getSearchConsoleSummaryWithClient(
  searchconsole: searchconsole_v1.Searchconsole,
  siteUrl: string,
  range: DateRange = "28d"
) {
  const {
    currentStart,
    currentEnd,
    previousStart,
    previousEnd,
  } = getCompareDateRange(range);

  console.log(
    "SITE URL =",
    JSON.stringify(siteUrl)
  );

  const [currentResponse, previousResponse] =
    await Promise.all([
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: currentStart,
          endDate: currentEnd,
          dimensions: ["date"],
          rowLimit: 1000,
        },
      }),

      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: previousStart,
          endDate: previousEnd,
          dimensions: ["date"],
          rowLimit: 1000,
        },
      }),
    ]);

  const currentRows =
    currentResponse.data.rows ?? [];

  const previousRows =
    previousResponse.data.rows ?? [];

  const currentClicks =
    currentRows.reduce(
      (sum, row) =>
        sum + (row.clicks ?? 0),
      0
    );

  const currentImpressions =
    currentRows.reduce(
      (sum, row) =>
        sum + (row.impressions ?? 0),
      0
    );

  const previousClicks =
    previousRows.reduce(
      (sum, row) =>
        sum + (row.clicks ?? 0),
      0
    );

  const previousImpressions =
    previousRows.reduce(
      (sum, row) =>
        sum + (row.impressions ?? 0),
      0
    );

  return {
    clicks: currentClicks,
    impressions: currentImpressions,
    previousClicks,
    previousImpressions,
  };
}

export async function getSearchConsoleSummary(
  refreshToken: string,
  siteUrl: string,
  range: DateRange = "28d"
) {
  return getSearchConsoleSummaryWithClient(
    getSearchConsole(refreshToken),
    siteUrl,
    range
  );
}

// ======================================================
// Top Queries
// ======================================================

export async function getTopQueriesWithClient(
  searchconsole: searchconsole_v1.Searchconsole,
  siteUrl: string,
  range: DateRange = "28d"
): Promise<GSCRow[]> {

  const {
    startDate,
    endDate,
  } = getDateRange(range);


  const response =
    await searchconsole.searchanalytics.query({

      siteUrl,

      requestBody: {

        startDate,

        endDate,

        dimensions:[
          "query",
          "page"
        ],

        rowLimit:100,

        dataState:"all",

      },

    });



console.log(
  "========== GSC QUERY =========="
);


console.log({

  siteUrl,

  startDate,

  endDate,

  rowCount:
    response.data.rows?.length ?? 0,

});



console.table(

  (response.data.rows ?? [])

  .slice(0,10)

  .map(row => ({

    query:
      row.keys?.[0],

    clicks:
      row.clicks,

    impressions:
      row.impressions,

    ctr:
      row.ctr,

    position:
      row.position,

  }))

);



console.log(
  "==============================="
);



return (

(response.data.rows ?? [])

.map(

(row):GSCRow => ({

keys:
row.keys ?? [],


clicks:
row.clicks ?? 0,


impressions:
row.impressions ?? 0,


ctr:
row.ctr ?? 0,


position:
row.position ?? 0,


})

)

);

}

export async function getTopQueries(
  refreshToken: string,
  siteUrl: string,
  range: DateRange = "28d"
) {
  return getTopQueriesWithClient(
    getSearchConsole(refreshToken),
    siteUrl,
    range
  );
}

// ======================================================
// Top Pages
// ======================================================

export async function getTopPagesWithClient(
  searchconsole: searchconsole_v1.Searchconsole,
  siteUrl: string,
  range: DateRange = "28d"
): Promise<GSCRow[]> {
  const {
    startDate,
    endDate,
  } = getDateRange(range);

  const response =
    await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["page"],
        rowLimit: 20,
      },
    });

  return (response.data.rows ?? []) as GSCRow[];
}

export async function getTopPages(
  refreshToken: string,
  siteUrl: string,
  range: DateRange = "28d"
) {
  return getTopPagesWithClient(
    getSearchConsole(refreshToken),
    siteUrl,
    range
  );
}

// ======================================================
// History
// ======================================================

export async function getSearchConsoleHistoryWithClient(
  searchconsole: searchconsole_v1.Searchconsole,
  siteUrl: string,
  range: DateRange = "28d"
): Promise<GSCRow[]> {
  const { startDate, endDate } =
    getDateRange(range);

  const response =
    await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["date"],
        rowLimit: 1000,
        dataState: "all",
      },
    });

  const rows =
    response.data.rows ?? [];

  console.log("========== GSC RAW ==========");
  console.log("Start :", startDate);
  console.log("End   :", endDate);
  console.log("Length:", rows.length);

  rows.forEach((row, index) => {
    console.log(index, {
      keys: row.keys,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    });
  });

  console.log("=============================");

  return rows.filter(
  (row) =>
    row.keys?.[0] &&
    row.clicks !== undefined &&
    row.impressions !== undefined
) as GSCRow[];
}

export async function getSearchConsoleHistory(
  refreshToken: string,
  siteUrl: string,
  range: DateRange = "28d"
) {
  return getSearchConsoleHistoryWithClient(
    getSearchConsole(refreshToken),
    siteUrl,
    range
  );
}

// ======================================================
// Raw Export
// ======================================================

export async function fetchGSCRawDataWithClient(
  searchconsole: searchconsole_v1.Searchconsole,
  siteUrl: string,
  range: DateRange = "28d"
) {

  const {
    startDate,
    endDate,
  } = getDateRange(range);


  const response =
    await searchconsole.searchanalytics.query({

      siteUrl,

      requestBody: {

        startDate,

        endDate,

        dimensions:[
          "date",
          "query",
          "page"
        ],

        rowLimit:25000,

        dataState:"all",

      },

    });



  const rows =
    response.data.rows ?? [];



  return rows.map(
    (row)=>({

      date:
        row.keys?.[0] ?? "",


      query:
        row.keys?.[1] ?? "",


      page:
        row.keys?.[2] ?? "",


      clicks:
        row.clicks ?? 0,


      impressions:
        row.impressions ?? 0,


      ctr:
        Number(
          (
            (row.ctr ?? 0) * 100
          )
          .toFixed(2)
        ),


      position:
        Number(
          (row.position ?? 0)
          .toFixed(2)
        ),


    })
  );

}

// ======================================================
// Legacy Wrapper
// ======================================================

export async function fetchGSCRawData(
  refreshToken:string,
  siteUrl:string,
  range:DateRange = DEFAULT_DATE_RANGE
){


  const auth =
    createOAuthClient(
      refreshToken
    );


  const searchconsole =
    createSearchConsoleClient(
      auth
    );


  return fetchGSCRawDataWithClient(
    searchconsole,
    siteUrl,
    range
  );


}