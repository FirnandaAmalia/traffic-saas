import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import {
  getGA4Properties,
} from "@/lib/ga4-admin";


export async function GET() {
  try {

    const session =
      await getServerSession(
        authOptions
      );


    if (!session?.accessToken &&
        !session?.refreshToken) {

      return Response.json(
        {
          success:false,
          error:
            "Not authenticated",
        },
        {
          status:401,
        }
      );

    }


    const data =
      await getGA4Properties(
        typeof session.accessToken === "string"
          ? session.accessToken
          : undefined,

        typeof session.refreshToken === "string"
          ? session.refreshToken
          : undefined
      );


    return Response.json({

      success:true,

      data,

    });


  } catch(error) {


    console.error(
      "GA4 PROPERTIES ERROR:",
      error instanceof Error
        ? error.message
        : error
    );


    return Response.json(

      {
        success:false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },

      {
        status:500,
      }

    );

  }
}