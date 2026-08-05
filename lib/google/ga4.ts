import type {
  CountryMetric,
  TrafficSourceMetric,
  DeviceCategoryMetric,
  LandingPageMetric,
  EventMetric,
  BrowserMetric,
  OperatingSystemMetric,
} from "@/lib/types/ga4";

import type { BetaAnalyticsDataClient } from "@google-analytics/data";

import {
  createOAuthClient,
  createGA4Client,
} from "./client";

import {
  getDateRange,
  getCompareDateRange,
  type DateRange,
} from "@/lib/date-range";

function getAnalytics(
  refreshToken: string
): BetaAnalyticsDataClient {
  const auth =
    createOAuthClient(refreshToken);

  return createGA4Client(auth);
}

// ======================================================
// SUMMARY
// ======================================================

export async function getGA4SummaryWithClient(
  analytics: BetaAnalyticsDataClient,
  propertyId: string,
  range: DateRange = "28d"
) {

const {
 currentStart,
 currentEnd,
 previousStart,
 previousEnd,
} = getCompareDateRange(range);


const [
 currentResponse,
 previousResponse,
] = await Promise.all([

 analytics.runReport({
   property:
   `properties/${propertyId}`,

   dateRanges:[
    {
      startDate:currentStart,
      endDate:currentEnd,
    }
   ],

   metrics:[
    {name:"activeUsers"},
    {name:"sessions"},
    {name:"screenPageViews"},
    {name:"engagementRate"},
   ],
 }),


 analytics.runReport({
   property:
   `properties/${propertyId}`,

   dateRanges:[
    {
      startDate:previousStart,
      endDate:previousEnd,
    }
   ],

   metrics:[
    {name:"activeUsers"},
    {name:"sessions"},
    {name:"screenPageViews"},
    {name:"engagementRate"},
   ],
 }),

]);


console.log(
"===== GA4 CURRENT ====="
);

console.log(
JSON.stringify(
 currentResponse[0],
 null,
 2
)
);


console.log(
"===== GA4 PREVIOUS ====="
);

console.log(
JSON.stringify(
 previousResponse[0],
 null,
 2
)
);


const current =
currentResponse[0];


const previous =
previousResponse[0];

return {
  users: Number(
    current.rows?.[0]?.metricValues?.[0]?.value ?? 0
  ),

  sessions: Number(
    current.rows?.[0]?.metricValues?.[1]?.value ?? 0
  ),

  pageViews: Number(
    current.rows?.[0]?.metricValues?.[2]?.value ?? 0
  ),

  engagementRate: Number(
    current.rows?.[0]?.metricValues?.[3]?.value ?? 0
  ),

  previousUsers: Number(
    previous.rows?.[0]?.metricValues?.[0]?.value ?? 0
  ),

  previousSessions: Number(
    previous.rows?.[0]?.metricValues?.[1]?.value ?? 0
  ),

  previousPageViews: Number(
    previous.rows?.[0]?.metricValues?.[2]?.value ?? 0
  ),

  previousEngagementRate: Number(
    previous.rows?.[0]?.metricValues?.[3]?.value ?? 0
  ),
};

}

export async function getGA4Summary(
  refreshToken: string,
  propertyId: string,
  range: DateRange = "28d"
) {
  return getGA4SummaryWithClient(
    getAnalytics(refreshToken),
    propertyId,
    range
  );
}

// ======================================================
// HISTORY
// ======================================================

export async function getGA4HistoryWithClient(
  analytics: BetaAnalyticsDataClient,
  propertyId: string,
  range: DateRange = "28d"
) {
  const {
    startDate,
    endDate,
  } = getDateRange(range);

  console.log("REQUEST =", {
    propertyId,
    range,
    startDate,
    endDate,
  });

  const request = {
    property: `properties/${propertyId}`,

    dateRanges: [
      {
        startDate,
        endDate,
      },
    ],

    dimensions: [
      {
        name: "date",
      },
    ],

    metrics: [
      {
        name: "activeUsers",
      },
      {
        name: "sessions",
      },
    ],

    orderBys: [
      {
        dimension: {
          dimensionName: "date",
        },
      },
    ],

    keepEmptyRows: true,

    limit: 10000,
  };

  const [response] =
  await analytics.runReport(request);

console.log("========== GA4 REQUEST ==========");
console.log({
  range,
  startDate,
  endDate,
});

console.log("ROW COUNT =", response.rowCount);

console.log("FIRST 15");

console.table(
  (response.rows ?? [])
    .slice(0, 15)
    .map((row) => ({
      date:
        row.dimensionValues?.[0]?.value,
      users:
        row.metricValues?.[0]?.value,
      sessions:
        row.metricValues?.[1]?.value,
    }))
);

console.log("LAST 15");

console.table(
  (response.rows ?? [])
    .slice(-15)
    .map((row) => ({
      date:
        row.dimensionValues?.[0]?.value,
      users:
        row.metricValues?.[0]?.value,
      sessions:
        row.metricValues?.[1]?.value,
    }))
);

  console.dir(response.metadata, {
    depth: null,
  });

  return response.rows ?? [];
}

export async function getGA4History(
  refreshToken: string,
  propertyId: string,
  range: DateRange = "28d"
) {
  return getGA4HistoryWithClient(
    getAnalytics(refreshToken),
    propertyId,
    range
  );
}

// ======================================================
// RAW EXPORT
// ======================================================

export async function fetchGA4RawData(
  refreshToken: string,
  propertyId: string,
  range: DateRange = "28d"
) {
  const analytics =
    getAnalytics(refreshToken);

  const {
    startDate,
    endDate,
  } = getDateRange(range);

  const [response] =
    await analytics.runReport({
      property: `properties/${propertyId}`,

      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],

      dimensions: [
        {
          name: "date",
        },
      ],

      metrics: [
        {
          name: "sessions",
        },
      ],

      keepEmptyRows: true,

      limit: 10000,
    });

  return (
    response.rows ?? []
  ).map((row) => ({
    date:
      row.dimensionValues?.[0]?.value,

    sessions: Number(
      row.metricValues?.[0]?.value ?? 0
    ),
  }));
}

  // ======================================================
// ACTIVE USERS BY COUNTRY
// ======================================================

export async function getActiveUsersByCountryWithClient(
  analytics: BetaAnalyticsDataClient,
  propertyId: string,
  range: DateRange = "28d"
): Promise<CountryMetric[]> { 
  const {
    startDate,
    endDate,
  } = getDateRange(range);

  const [response] =
    await analytics.runReport({
      property: `properties/${propertyId}`,

      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],

      dimensions: [
        {
          name: "country",
        },
      ],

      metrics: [
        {
          name: "activeUsers",
        },
      ],

      orderBys: [
        {
          metric: {
            metricName: "activeUsers",
          },
          desc: true,
        },
      ],

      limit: 10,
    });

  return (
  response.rows ?? []
).map(
  (row): CountryMetric => ({
    country:
      row.dimensionValues?.[0]?.value ??
      "Unknown",

    users: Number(
      row.metricValues?.[0]?.value ?? 0
    ),
  })
);
}

// ======================================================
// TRAFFIC ACQUISITION
// ======================================================

export async function getTrafficAcquisitionWithClient(
  analytics: BetaAnalyticsDataClient,
  propertyId: string,
  range: DateRange = "28d"
): Promise<TrafficSourceMetric[]> {

  const {
    startDate,
    endDate,
  } = getDateRange(range);

  const [response] =
    await analytics.runReport({
      property: `properties/${propertyId}`,

      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],

      dimensions: [
        {
          name: "sessionDefaultChannelGroup",
        },
      ],

      metrics: [
        {
          name: "sessions",
        },
      ],

      orderBys: [
        {
          metric: {
            metricName: "sessions",
          },
          desc: true,
        },
      ],

      limit: 10,
    });

  return (
    response.rows ?? []
  ).map(
    (row): TrafficSourceMetric => ({
      channel:
        row.dimensionValues?.[0]?.value ??
        "Unknown",

      sessions: Number(
        row.metricValues?.[0]?.value ?? 0
      ),
    })
  );
}

export async function getTrafficAcquisition(
  refreshToken: string,
  propertyId: string,
  range: DateRange = "28d"
) {
  return getTrafficAcquisitionWithClient(
    getAnalytics(refreshToken),
    propertyId,
    range
  );
}

// ======================================================
// DEVICE CATEGORY
// ======================================================

export async function getDeviceCategoryWithClient(
  analytics: BetaAnalyticsDataClient,
  propertyId: string,
  range: DateRange = "28d"
): Promise<DeviceCategoryMetric[]> {

  const {
    startDate,
    endDate,
  } = getDateRange(range);

  const [response] =
    await analytics.runReport({
      property: `properties/${propertyId}`,

      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],

      dimensions: [
        {
          name: "deviceCategory",
        },
      ],

      metrics: [
        {
          name: "activeUsers",
        },
      ],

      orderBys: [
        {
          metric: {
            metricName: "activeUsers",
          },
          desc: true,
        },
      ],

      limit: 10,
    });

  return (
    response.rows ?? []
  ).map(
    (row): DeviceCategoryMetric => ({
      device:
        row.dimensionValues?.[0]?.value ??
        "Unknown",

      users: Number(
        row.metricValues?.[0]?.value ?? 0
      ),
    })
  );
}

// ======================================================
// TOP LANDING PAGES
// ======================================================

export async function getLandingPagesWithClient(
  analytics: BetaAnalyticsDataClient,
  propertyId: string,
  range: DateRange = "28d"
): Promise<LandingPageMetric[]> {

  const {
    startDate,
    endDate,
  } = getDateRange(range);

  const [response] =
    await analytics.runReport({
      property: `properties/${propertyId}`,

      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],

      dimensions: [
        {
          name: "landingPagePlusQueryString",
        },
      ],

      metrics: [
        {
          name: "sessions",
        },
      ],

      orderBys: [
        {
          metric: {
            metricName: "sessions",
          },
          desc: true,
        },
      ],

      limit: 10,
    });

  return (
    response.rows ?? []
  ).map(
    (row): LandingPageMetric => ({
      page:
        row.dimensionValues?.[0]?.value ??
        "/",

      sessions: Number(
        row.metricValues?.[0]?.value ?? 0
      ),
    })
  );
}

// ======================================================
// TOP EVENTS
// ======================================================

export async function getTopEventsWithClient(
  analytics: BetaAnalyticsDataClient,
  propertyId: string,
  range: DateRange = "28d"
): Promise<EventMetric[]> {

  const {
    startDate,
    endDate,
  } = getDateRange(range);

  const [response] =
    await analytics.runReport({

      property: `properties/${propertyId}`,

      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],

      dimensions: [
        {
          name: "eventName",
        },
      ],

      metrics: [
        {
          name: "eventCount",
        },
      ],

      orderBys: [
        {
          metric: {
            metricName: "eventCount",
          },
          desc: true,
        },
      ],

      limit: 10,
    });

  return (
    response.rows ?? []
  ).map(
    (row): EventMetric => ({

      event:
        row.dimensionValues?.[0]?.value ??
        "Unknown",

      count: Number(
        row.metricValues?.[0]?.value ?? 0
      ),

    })
  );
}

export async function testNewVsReturning(
  refreshToken: string,
  propertyId: string
) {
  const analytics = getAnalytics(refreshToken);

  const [response] = await analytics.runReport({
    property: `properties/${propertyId}`,

    dateRanges: [
      {
        startDate: "28daysAgo",
        endDate: "today",
      },
    ],

    metrics: [
      {
        name: "activeUsers",
      },
    ],
  });

  console.log(response.rows);
}

// ======================================================
// BROWSER
// ======================================================

export async function getBrowserWithClient(
  analytics: BetaAnalyticsDataClient,
  propertyId: string,
  range: DateRange = "28d"
): Promise<BrowserMetric[]> {

  const {
    startDate,
    endDate,
  } = getDateRange(range);

  const [response] =
    await analytics.runReport({

      property: `properties/${propertyId}`,

      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],

      dimensions: [
        {
          name: "browser",
        },
      ],

      metrics: [
        {
          name: "activeUsers",
        },
      ],

      orderBys: [
        {
          metric: {
            metricName: "activeUsers",
          },
          desc: true,
        },
      ],

      limit: 10,

    });

  return (
    response.rows ?? []
  ).map(
    (row): BrowserMetric => ({

      browser:
        row.dimensionValues?.[0]?.value ??
        "Unknown",

      users: Number(
        row.metricValues?.[0]?.value ?? 0
      ),

    })
  );
}

// ======================================================
// OPERATING SYSTEM
// ======================================================

export async function getOperatingSystemWithClient(
  analytics: BetaAnalyticsDataClient,
  propertyId: string,
  range: DateRange = "28d"
): Promise<OperatingSystemMetric[]> {

  const {
    startDate,
    endDate,
  } = getDateRange(range);

  const [response] =
    await analytics.runReport({

      property: `properties/${propertyId}`,

      dateRanges: [
        {
          startDate,
          endDate,
        },
      ],

      dimensions: [
        {
          name: "operatingSystem",
        },
      ],

      metrics: [
        {
          name: "activeUsers",
        },
      ],

      orderBys: [
        {
          metric: {
            metricName: "activeUsers",
          },
          desc: true,
        },
      ],

      limit: 10,

    });

  return (
    response.rows ?? []
  ).map(
    (row): OperatingSystemMetric => ({

      os:
        row.dimensionValues?.[0]?.value ??
        "Unknown",

      users: Number(
        row.metricValues?.[0]?.value ?? 0
      ),

    })
  );
}
