import type { NextAuthOptions } from "next-auth";
import type {
  Account,
  Session,
} from "next-auth";

import type { JWT } from "next-auth/jwt";

import GoogleProvider from "next-auth/providers/google";

import { ensureSubscription } from "@/lib/subscription";


// ======================================================
// Shared Refresh Promise
// ======================================================

let refreshPromise: Promise<JWT> | null = null;


// ======================================================
// Refresh Google Access Token
// ======================================================

async function refreshAccessToken(
  token: JWT
): Promise<JWT> {

  if (!token.refresh_token) {

    console.error(
      "❌ Refresh Token not found."
    );

    return {
      ...token,
      error: "NoRefreshToken",
    };

  }


  if (refreshPromise) {

    console.info(
      "⏳ Waiting for ongoing token refresh..."
    );

    return refreshPromise;

  }


  refreshPromise = (async () => {

    try {

      console.info(
        "🔄 Refreshing Google Access Token..."
      );


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

            grant_type:
              "refresh_token",

            refresh_token:
              token.refresh_token as string,

          }),

        }
      );


      if (!response.ok) {

        throw await response.text();

      }


      const refreshed =
        await response.json();


      console.info(
        "✅ Google Access Token Refreshed"
      );


      return {

        ...token,

        access_token:
          refreshed.access_token,


        expires_at:
          Math.floor(Date.now() / 1000) +
          refreshed.expires_in,


        refresh_token:
          refreshed.refresh_token ??
          token.refresh_token,


        error: undefined,

      };


    } catch (error) {


      console.error(
        "❌ Refresh Access Token Error:",
        error
      );


      return {

        ...token,

        refresh_token:
          token.refresh_token,


        error:
          "RefreshAccessTokenError",

      };


    } finally {

      refreshPromise = null;

    }


  })();


  return refreshPromise;

}



// ======================================================
// NextAuth Configuration
// ======================================================

export const authOptions: NextAuthOptions = {


  providers: [

    GoogleProvider({

      clientId:
        process.env.GOOGLE_CLIENT_ID!,


      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET!,


      authorization: {

        params: {

          prompt:
            "consent",

          access_type:
            "offline",

          response_type:
            "code",


          scope:
            "openid email profile https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly",

        },

      },

    }),

  ],



  callbacks: {


    async jwt({
  token,
  account,
}: {
  token: JWT;
  account: Account | null;
}) {



      if (account) {


        console.info(
          "✅ Google Login Success"
        );


        if (token.email) {

          await ensureSubscription(
            token.email
          );

        }


        return {

          ...token,


          access_token:
            account.access_token,


          expires_at:
            account.expires_at,


          refresh_token:
            account.refresh_token ??
            token.refresh_token,


          error: undefined,

        };

      }




      if (

        token.expires_at &&

        Date.now() <
        token.expires_at * 1000

      ) {

        return token;

      }



      console.info(
        "🔄 Access Token Expired"
      );



      return await refreshAccessToken(
        token
      );


    },




    async session({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}) {



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