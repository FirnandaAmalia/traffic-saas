import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTopQueries } from "@/lib/google/gsc";

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
