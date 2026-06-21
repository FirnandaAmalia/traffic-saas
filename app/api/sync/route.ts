import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/route";

import { fetchGSCRawData } from "@/lib/gsc-client";

import { fetchGA4RawData } from "@/lib/ga4-client";

import {
  writeGSCToBigQuery,
  writeGA4ToBigQuery,
} from "@/lib/bigquery-writer";

export async function GET() {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.refreshToken) {
      return Response.json(
        {
          error:
            "No refresh token",
        },
        {
          status: 401,
        }
      );
    }

    const refreshToken =
      session.refreshToken as string;

    const tenantId =
      "yaplegal";

    const siteUrl =
      "sc-domain:yaplegal.id";

    const propertyId =
      "530690262";

    // GSC
    const gscRows =
      await fetchGSCRawData(
        refreshToken,
        siteUrl
      );

    const gscInserted =
      await writeGSCToBigQuery(
        tenantId,
        siteUrl,
        gscRows
      );

    // GA4
    const ga4Rows =
      await fetchGA4RawData(
        refreshToken,
        propertyId
      );

    const ga4Inserted =
      await writeGA4ToBigQuery(
        tenantId,
        ga4Rows
      );

    return Response.json({
      success: true,
      gscRows:
        gscInserted,
      ga4Rows:
        ga4Inserted,
    });

  } catch (error) {

    console.error(
      "SYNC ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        error:
          String(error),
      },
      {
        status: 500,
      }
    );
  }
}