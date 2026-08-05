import type { NextAuthOptions } from "next-auth";

import type { JWT } from "next-auth/jwt";

import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "@/lib/prisma";
import { ensureSubscription } from "@/lib/subscription";

/*
|--------------------------------------------------------------------------
| Google Refresh Response
|--------------------------------------------------------------------------
*/

interface GoogleRefreshResponse {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  token_type?: string;
  scope?: string;
  error?: string;
  error_description?: string;
}

/*
|--------------------------------------------------------------------------
| Per-User Refresh Locks
|--------------------------------------------------------------------------
|
| Jangan menggunakan satu Promise global untuk semua user.
| Setiap user memiliki refresh lock sendiri agar token
| antar-user tidak tercampur saat request berjalan bersamaan.
|
*/

const refreshPromises = new Map<string, Promise<JWT>>();

function getTokenUserId(token: JWT): string | null {
  if (typeof token.userId === "string" && token.userId.trim()) {
    return token.userId;
  }

  if (typeof token.sub === "string" && token.sub.trim()) {
    return token.sub;
  }

  return null;
}

/*
|--------------------------------------------------------------------------
| Synchronize Google Account Token
|--------------------------------------------------------------------------
*/

async function synchronizeGoogleAccount({
  userId,
  accessToken,
  refreshToken,
  expiresAt,
}: {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}) {
  try {
    await prisma.account.updateMany({
      where: {
        userId,
        provider: "google",
      },

      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: expiresAt,
      },
    });
  } catch (error) {
    /*
     * Kegagalan sinkronisasi database tidak boleh
     * membatalkan access token yang sudah berhasil
     * diperbarui oleh Google.
     */

    console.error("GOOGLE_ACCOUNT_TOKEN_SYNC_FAILED", {
      userId,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Execute Google Token Refresh
|--------------------------------------------------------------------------
*/

async function executeTokenRefresh(token: JWT): Promise<JWT> {
  const refreshToken =
    typeof token.refresh_token === "string" ? token.refresh_token : "";

  if (!refreshToken) {
    return {
      ...token,
      error: "NoRefreshToken",
    };
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;

  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("GOOGLE_OAUTH_CONFIGURATION_MISSING");

    return {
      ...token,
      error: "OAuthConfigurationError",
    };
  }

  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },

      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),

      cache: "no-store",
    });

    const refreshed = (await response.json()) as GoogleRefreshResponse;

    if (!response.ok || !refreshed.access_token || !refreshed.expires_in) {
      console.error("GOOGLE_TOKEN_REFRESH_FAILED", {
        status: response.status,
        code: refreshed.error ?? "unknown_error",
        description:
          refreshed.error_description ?? "Google did not return a valid token.",
      });

      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }

    const expiresAt = Math.floor(Date.now() / 1000) + refreshed.expires_in;

    const nextRefreshToken = refreshed.refresh_token ?? refreshToken;

    const userId = getTokenUserId(token);

    if (userId) {
      await synchronizeGoogleAccount({
        userId,
        accessToken: refreshed.access_token,
        refreshToken: nextRefreshToken,
        expiresAt,
      });
    }

    return {
      ...token,

      access_token: refreshed.access_token,

      expires_at: expiresAt,

      refresh_token: nextRefreshToken,

      error: undefined,
    };
  } catch (error) {
    console.error("GOOGLE_TOKEN_REFRESH_REQUEST_FAILED", {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

/*
|--------------------------------------------------------------------------
| Refresh Google Token
|--------------------------------------------------------------------------
*/

async function refreshAccessToken(token: JWT): Promise<JWT> {
  const userId = getTokenUserId(token);

  /*
   * Token tanpa user ID tetap dapat di-refresh,
   * tetapi tidak menggunakan shared lock.
   */

  if (!userId) {
    return executeTokenRefresh(token);
  }

  const existingPromise = refreshPromises.get(userId);

  if (existingPromise) {
    return existingPromise;
  }

  const refreshPromise = executeTokenRefresh(token).finally(() => {
    refreshPromises.delete(userId);
  });

  refreshPromises.set(userId, refreshPromise);

  return refreshPromise;
}

/*
|--------------------------------------------------------------------------
| NextAuth Configuration
|--------------------------------------------------------------------------
*/

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  /*
   * Wajib false.
   * Debug NextAuth dapat mencetak detail OAuth
   * yang sensitif ke terminal.
   */
  debug: false,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      authorization: {
        params: {
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/webmasters.readonly",
            "https://www.googleapis.com/auth/analytics.readonly",
          ].join(" "),
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },



  callbacks: {


    async jwt({ token, account, user }) {

      if (account && user) {

        token.userId = user.id;

        token.email = user.email ?? undefined;

        token.access_token =
          account.access_token ?? token.access_token;

        token.expires_at =
          account.expires_at ?? token.expires_at;


        let refreshToken =
          account.refresh_token ??
          (
            typeof token.refresh_token === "string"
              ? token.refresh_token
              : undefined
          );


        if (!refreshToken) {

          const storedAccount =
            await prisma.account.findUnique({

              where: {

                provider_providerAccountId: {

                  provider: account.provider,

                  providerAccountId:
                    account.providerAccountId,

                },

              },

              select:{
                refresh_token:true,
              },

            });


          refreshToken =
            storedAccount?.refresh_token ??
            undefined;

        }


        if(refreshToken){
          token.refresh_token = refreshToken;
        }



        const dbUser =
          await prisma.user.findUnique({

            where:{
              id:user.id,
            },

            select:{
              role:true,
            },

          });



        token.role =
          dbUser?.role ?? "USER";



        if(user.email){

          await ensureSubscription(
            user.email,
            user.name
          );

        }


        return token;

      }



      if(!token.userId && token.sub){

        token.userId = token.sub;

      }



      const expiresAt =
        Number(token.expires_at ?? 0);



      if(
        expiresAt > 0 &&
        Date.now() <
        (expiresAt - 60) * 1000
      ){

        return token;

      }



      if(
        typeof token.refresh_token === "string" &&
        token.refresh_token
      ){

        return refreshAccessToken(token);

      }



      return {
        ...token,
        error:"NoRefreshToken",
      };


    },




    async session({session,token}){


      if(session.user){

        const userId =
          getTokenUserId(token);



        session.user.id =
          userId ?? "";



        session.user.role =
          token.role === "ADMIN"
          ? "ADMIN"
          : "USER";



        if(userId){

          const subscription =
            await prisma.subscription.findUnique({

              where:{
                userId,
              },

              select:{
                plan:true,
              },

            });


          session.user.plan =
            subscription?.plan ?? "FREE";

        }

      }



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



async redirect({ url, baseUrl }) {

  if (url.startsWith(baseUrl)) {
    return url;
  }

  return `${baseUrl}/id/dashboard`;

},


  },
};