import NextAuth, {
  DefaultSession,
} from "next-auth";

import {
  DefaultJWT
} from "next-auth/jwt";


declare module "next-auth" {


  interface Session {

    user: {

      id: string;

      role:
      | "ADMIN"
      | "USER";

      plan:
      | "FREE"
      | "PRO";


    } & DefaultSession["user"];


    accessToken?: string;

    refreshToken?: string;

    expiresAt?: number;

    error?: string;


  }



  interface User {

    id:string;

    role:
    | "ADMIN"
    | "USER";

  }

}




declare module "next-auth/jwt" {


 interface JWT extends DefaultJWT {


   userId?:string;


   role?:
   | "ADMIN"
   | "USER";


   access_token?:string;


   refresh_token?:string;


   expires_at?:number;


   error?:string;


 }


}