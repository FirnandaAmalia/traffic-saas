import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { google } from "googleapis";

export async function GET() {
  try {
    const session =
      await getServerSession(authOptions);

    if (!session?.accessToken) {
      return Response.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    console.log(
  "ACCESS TOKEN:",
  session.accessToken
);

console.log(
  "REFRESH TOKEN:",
  session.refreshToken
);

    const auth = new google.auth.OAuth2();

auth.setCredentials({
  access_token:
    session.accessToken as string,
}); 

    const analyticsAdmin =
  google.analyticsadmin({
    version: "v1beta",
    auth,
  });

    const response =
      await analyticsAdmin.accountSummaries.list();

    return Response.json({
      success: true,
      data:
        response.data.accountSummaries || [],
    });
  } catch (error) {
    console.error(
      "GA4 PROPERTIES ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}

