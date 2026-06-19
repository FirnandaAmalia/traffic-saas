import { NextResponse } from "next/server";
import { bigquery } from "@/lib/bigquery-writer";

export async function GET() {
  try {
    const [datasets] =
      await bigquery.getDatasets();

    return NextResponse.json({
      success: true,
      datasets: datasets.map(
        (d) => d.id
      ),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}