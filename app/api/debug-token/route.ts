import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session =
    await getServerSession(
      authOptions
    );

  return Response.json({
    accessToken:
      session?.accessToken,

    refreshToken:
      session?.refreshToken,

    user:
      session?.user,
  });
}