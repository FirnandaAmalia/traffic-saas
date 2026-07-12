import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSearchConsoleSummary, } from "@/lib/google/gsc";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return Response.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const summary = await getSearchConsoleSummary(
    session.accessToken as string,
    "sc-domain:yaplegal.id"
  );

  return Response.json(summary);
}
