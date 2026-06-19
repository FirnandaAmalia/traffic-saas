import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getGA4Summary } from "@/lib/ga4-client";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const data = await getGA4Summary(
    session.accessToken as string,
    "530690262"
  );

  return Response.json(data);
}
