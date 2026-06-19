import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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

    if (account) {

      token.access_token =
        account.access_token;

      token.refresh_token =
        account.refresh_token;

      token.expires_at =
        account.expires_at;
    }

    return token;
  },

  async session({ session, token }: any) {

    session.accessToken =
      token.access_token;

    session.refreshToken =
      token.refresh_token;

    return session;
  },
},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };