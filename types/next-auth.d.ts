import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";


declare module "next-auth" {


  interface Session {

    accessToken?: string;

    refreshToken?: string;

    expiresAt?: number;

    error?: string;


    user: {
      id: string;
      role: "USER" | "ADMIN";
    } & DefaultSession["user"];

  }



  interface User {

    id: string;

    role: "USER" | "ADMIN";

  }


}



declare module "next-auth/jwt" {


  interface JWT extends DefaultJWT {


    userId?: string;

    role?: "USER" | "ADMIN";

    email?: string;


    access_token?: string;

    refresh_token?: string;

    expires_at?: number;

    error?: string;


  }


}


// WAJIB supaya file dianggap module
export {};