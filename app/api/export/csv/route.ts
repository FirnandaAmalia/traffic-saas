import {
  NextRequest,
  NextResponse,
} from "next/server";


import {
  getServerSession,
} from "next-auth";


import {
  authOptions,
} from "@/lib/auth";


import {
  resolveProjectForUser,
} from "@/lib/project-service";


import {
  buildExportReport,
} from "@/lib/export/export-service";


import {
  buildCSV,
} from "@/lib/export/csv-builder";


import type {
  DateRange,
} from "@/lib/date-range";



const VALID_RANGES: DateRange[] = [
  "7d",
  "28d",
  "3m",
  "6m",
  "12m",
];




export async function GET(
  request: NextRequest
) {

  try {


    /*
    |--------------------------------------------------------------------------
    | Request Parameters
    |--------------------------------------------------------------------------
    */


    const projectId =
      request.nextUrl.searchParams.get(
        "projectId"
      );


    const rangeParam =
      request.nextUrl.searchParams.get(
        "range"
      );



    const range: DateRange =
      VALID_RANGES.includes(
        rangeParam as DateRange
      )
        ? rangeParam as DateRange
        : "28d";



    if (!projectId) {

      return NextResponse.json(
        {
          success:false,
          error:
            "Missing projectId",
        },
        {
          status:400,
        }
      );

    }




    /*
    |--------------------------------------------------------------------------
    | Authentication
    |--------------------------------------------------------------------------
    */


    const session =
      await getServerSession(
        authOptions
      );



    if (
      !session?.user?.id ||
      !session.refreshToken
    ) {

      return NextResponse.json(
        {
          success:false,
          error:
            "Unauthorized",
        },
        {
          status:401,
        }
      );

    }




    /*
    |--------------------------------------------------------------------------
    | Resolve Project Ownership
    |--------------------------------------------------------------------------
    */


    const project =
      await resolveProjectForUser({

        userId:
          session.user.id,

        projectId,

      });



    if (!project) {


      return NextResponse.json(
        {
          success:false,

          error:
            "Project not found",
        },
        {
          status:404,
        }
      );

    }




    /*
    |--------------------------------------------------------------------------
    | Build Export Data
    |--------------------------------------------------------------------------
    |
    | Menggunakan service yang sama dengan:
    |
    | Dashboard
    | PDF Export
    |
    | agar range dan data selalu konsisten.
    |
    */


    const exportData =
      await buildExportReport({

        refreshToken:
          session.refreshToken,


        project,


        range,

      });

/*
|--------------------------------------------------------------------------
| Generate CSV
|--------------------------------------------------------------------------
*/

console.log(
  "CSV REPORT DATA",
  {
    project:
      exportData.report.projectName,

    keywords:
      exportData.report.keywordOpportunities.length,

    pages:
      exportData.report.contentOpportunities.length,
  }
);


const csv =
  buildCSV(
    exportData.report
  );

    /*
    |--------------------------------------------------------------------------
    | Response File
    |--------------------------------------------------------------------------
    */


    return new Response(

      csv,

      {

        headers: {

          "Content-Type":
            "text/csv; charset=utf-8",


          "Content-Disposition":
            `attachment; filename="${project.projectName}-SEO-Report.csv"`,



          "Cache-Control":
            "no-store",

        },

      }

    );



  } catch(error) {


    console.error(
      "EXPORT CSV ERROR:",
      error
    );



    return NextResponse.json(

      {
        success:false,

        error:

          error instanceof Error

            ? error.message

            : "Internal Server Error",
      },

      {
        status:500,
      }

    );

  }

}