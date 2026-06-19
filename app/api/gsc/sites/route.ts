import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getSearchConsoleSites } from "@/lib/gsc-client";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    console.log("SESSION =", JSON.stringify(session, null, 2));

    if (!session?.accessToken) {
      return Response.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const sites = await getSearchConsoleSites(
      session.accessToken as string
    );

    return Response.json(sites);
  } catch (error) {
    console.error("GSC ERROR =", error);

    return Response.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}