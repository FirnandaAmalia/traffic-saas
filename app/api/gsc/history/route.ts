import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getSearchConsoleHistory, } from "@/lib/google/gsc";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const data = await getSearchConsoleHistory(
    session.accessToken as string,
    "sc-domain:yaplegal.id"
  );

  return Response.json(data);
}