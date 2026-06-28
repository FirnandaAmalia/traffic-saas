import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getSearchConsoleSites, } from "@/lib/google/gsc";

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
            "Not authenticated",
        },
        {
          status: 401,
        }
      );
    }

    const sites =
      await getSearchConsoleSites(
        session.refreshToken as string
      );

    return Response.json({
      success: true,
      sites,
    });

  } catch (error) {

    console.error(
      "GSC ERROR =",
      error
    );

    return Response.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}