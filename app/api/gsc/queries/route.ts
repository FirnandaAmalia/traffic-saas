import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getTopQueries } from "@/lib/gsc-client";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return Response.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const data = await getTopQueries(
    session.accessToken as string,
    "sc-domain:yaplegal.id"
  );

  return Response.json(data);
}
