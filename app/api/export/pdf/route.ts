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
  renderToBuffer,
} from "@react-pdf/renderer";

import {
  buildPDFDocument,
} from "@/lib/export/pdf-builder";

import type {
  DateRange,
} from "@/lib/date-range";

import {
  createReport,
} from "@/lib/report-service";

import {
  saveReportPDF,
} from "@/lib/report-storage";


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
        ? (
            rangeParam as DateRange
          )
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
    | Resolve User Project
    |--------------------------------------------------------------------------
    |
    | Project hanya bisa diakses
    | oleh pemilik project.
    |
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
    | Menggunakan data source yang sama
    | dengan dashboard.
    |
    | Dashboard:
    | range=7d
    |
    | Export:
    | range=7d
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
    | Generate PDF
    |--------------------------------------------------------------------------
    */


    const pdfBuffer =
      await renderToBuffer(

        buildPDFDocument(

          exportData.report

        )

      );



    /*
    |--------------------------------------------------------------------------
    | Save Report History
    |--------------------------------------------------------------------------
    |
    | Hanya satu kali createReport.
    | Sebelumnya terjadi duplicate record.
    |
    */


    try {


      const fileUrl =
        await saveReportPDF(
          Buffer.from(pdfBuffer)
        );


      await createReport({

  projectId:
    project.id,

  title:
    "SEO Intelligence Report",

  period:
    range,

  fileUrl,

  data:
    exportData.report,

});


    } catch(error) {


      /*
       * Gagal menyimpan history
       * tidak boleh menggagalkan
       * download PDF user.
       */


      console.error(

        "REPORT HISTORY ERROR:",

        error

      );

    }



    /*
    |--------------------------------------------------------------------------
    | Return PDF
    |--------------------------------------------------------------------------
    */


    return new Response(

      new Uint8Array(
        pdfBuffer
      ),

      {

        headers: {


          "Content-Type":

            "application/pdf",



          "Content-Disposition":

            `attachment; filename="${project.projectName}-SEO-Report.pdf"`,



          "Content-Length":

            String(
              pdfBuffer.length
            ),



          "Cache-Control":

            "no-store",

        },

      }

    );



  } catch(error) {


    console.error(

      "EXPORT PDF ERROR:",

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