import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "googleapis";
import type {
  GA4Account,
  GA4Property,
} from "../types/ga4";

function getAnalyticsClient(
  refreshToken: string
) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  auth.setCredentials({
    refresh_token: refreshToken,
  });

  return new BetaAnalyticsDataClient({
  authClient: auth,
});
}

export async function getGA4Summary(
  refreshToken: string,
  propertyId: string
) {
  const analyticsData =
    getAnalyticsClient(refreshToken);

  const [response] =
    await analyticsData.runReport({
      property: `properties/${propertyId}`,

      dateRanges: [
  {
    startDate: "28daysAgo",
    endDate: "yesterday",
  },
],

      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "engagementRate" },
      ],
    });

  return {
    users: Number(
      response.rows?.[0]?.metricValues?.[0]?.value || 0
    ),

    sessions: Number(
      response.rows?.[0]?.metricValues?.[1]?.value || 0
    ),

    pageViews: Number(
      response.rows?.[0]?.metricValues?.[2]?.value || 0
    ),

    engagementRate: Number(
      response.rows?.[0]?.metricValues?.[3]?.value || 0
    ),
  };
}

export async function getGA4History(
  refreshToken: string,
  propertyId: string
) {
  const analyticsData =
    getAnalyticsClient(refreshToken);

  const [response] =
  await analyticsData.runReport({
    property: `properties/${propertyId}`,

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

    dateRanges: [
      {
        startDate: "28daysAgo",
        endDate: "yesterday",
      },
    ],

    orderBys: [
      {
        dimension: {
          dimensionName: "date",
        },
      },
    ],
  });

  return response.rows || [];
}

export async function fetchGA4RawData(
  refreshToken: string,
  propertyId: string
) {


  const analyticsData =
    getAnalyticsClient(
      refreshToken
    );


  const [response] =
    await analyticsData.runReport(
      {

        property:
          `properties/${propertyId}`,

        dateRanges: [
          {

            startDate:
              "28daysAgo",

            endDate:
              "yesterday",

          },
        ],


        dimensions: [

          {
            name:
              "date",
          },

          {
            name:
              "pagePath",
          },

          {
            name:
              "deviceCategory",
          },

        ],


        metrics: [

          {
            name:
              "sessions",
          },

          {
            name:
              "engagementRate",
          },

          {
            name:
              "screenPageViews",
          },

          {
            name:
              "bounceRate",
          },

        ],


        limit:
          10000,

      }
    );


  const rows =
    response.rows || [];


  const formatted =
    rows.map(
      (row) => ({


        date:
          row.dimensionValues?.[0]?.value,


        pagePath:
          row.dimensionValues?.[1]?.value,


        deviceCategory:
          row.dimensionValues?.[2]?.value,


        sessions:
          Number(
            row.metricValues?.[0]?.value || 0
          ),


        engagementRate:
          Number(
            row.metricValues?.[1]?.value || 0
          ),


        pageViews:
          Number(
            row.metricValues?.[2]?.value || 0
          ),


        bounceRate:
          Number(
            row.metricValues?.[3]?.value || 0
          ),


      })
    );


  console.log(
    "RAW GA4 READY =",
    formatted.length
  );


  return formatted;

}