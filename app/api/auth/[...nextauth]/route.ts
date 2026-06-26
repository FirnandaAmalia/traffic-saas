import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id:
            process.env.GOOGLE_CLIENT_ID!,
          client_secret:
            process.env.GOOGLE_CLIENT_SECRET!,
          grant_type: "refresh_token",
          refresh_token:
            token.refresh_token,
        }),
      }
    );

    const refreshed = await response.json();

    if (!response.ok) {
      throw refreshed;
    }

    return {
      ...token,
      access_token: refreshed.access_token,
      expires_at:
        Math.floor(Date.now() / 1000) +
        refreshed.expires_in,
      refresh_token:
        refreshed.refresh_token ??
        token.refresh_token,
    };
  } catch (error) {
    console.error(
      "Refresh Access Token Error:",
      error
    );

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
  clientId:
    process.env.GOOGLE_CLIENT_ID!,

  clientSecret:
    process.env.GOOGLE_CLIENT_SECRET!,

  authorization: {
    params: {
      prompt: "consent",

      access_type: "offline",

      response_type: "code",

      scope:
        "openid email profile https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly",
    },
  },
})  ],

  callbacks: {
  async jwt({ token, account }: any) {

  // Login pertama
  if (account) {

    token.access_token =
      account.access_token;

    token.refresh_token =
      account.refresh_token;

    token.expires_at =
      account.expires_at;

    return token;
  }

  // Access token masih valid
  if (
  token.expires_at &&
  Date.now() < token.expires_at * 1000
) {
  return token;
}

  console.log("Refreshing Google Access Token...");

  // Access token expired
  return await refreshAccessToken(token);
},

  async session({ session, token }: any) {

  session.accessToken =
    token.access_token;

  session.refreshToken =
    token.refresh_token;

  session.expiresAt =
    token.expires_at;

  session.error =
    token.error;

  return session;
},

},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

