import { prisma } from "@/lib/prisma";

import type {
  Plan,
  User,
  Subscription,
} from "@prisma/client";

/*
|--------------------------------------------------------------------------
| Project Limits
|--------------------------------------------------------------------------
|
| null berarti unlimited.
|
*/

export const FREE_PROJECT_LIMIT = 1;

export type ProjectLimit =
  number | null;

export interface SubscriptionUsage {
  plan: Plan;
  projectCount: number;
  projectLimit: ProjectLimit;
  canCreateProject: boolean;
}

/*
|--------------------------------------------------------------------------
| Normalize Email
|--------------------------------------------------------------------------
*/

function normalizeEmail(
  email: string
): string {
  const normalizedEmail =
    email.trim();

  if (!normalizedEmail) {
    throw new Error(
      "Email user wajib tersedia."
    );
  }

  return normalizedEmail;
}

/*
|--------------------------------------------------------------------------
| Get Project Limit
|--------------------------------------------------------------------------
|
| FREE = maksimal 1 project
| PRO  = unlimited
|
*/

export function getProjectLimit(
  plan: Plan
): ProjectLimit {
  if (plan === "PRO") {
    return null;
  }

  return FREE_PROJECT_LIMIT;
}

/*
|--------------------------------------------------------------------------
| Ensure User Subscription Exists
|--------------------------------------------------------------------------
*/

export async function ensureSubscription(
  email: string,
  name?: string | null
): Promise<{
  user: User;
  subscription: Subscription;
}> {
  const normalizedEmail =
    normalizeEmail(email);

  let user =
    await prisma.user.findUnique({
      where: {
        email:
          normalizedEmail,
      },
    });

  /*
   * Biasanya user sudah dibuat PrismaAdapter.
   * Fallback ini dipertahankan agar fungsi tetap aman
   * ketika dipanggil dari flow selain NextAuth.
   */

  if (!user) {
    user =
      await prisma.user.create({
        data: {
          email:
            normalizedEmail,

          name:
            name?.trim() ||
            null,

          role:
            "USER",
        },
      });
  }

  /*
   * Upsert membuat proses ini idempotent:
   * subscription dibuat bila belum ada dan dibiarkan
   * tetap sama bila sudah tersedia.
   */

  const subscription =
    await prisma.subscription.upsert({
      where: {
        userId:
          user.id,
      },

      update: {},

      create: {
        userId:
          user.id,

        plan:
          "FREE",
      },
    });

  return {
    user,
    subscription,
  };
}

/*
|--------------------------------------------------------------------------
| Get Current User Plan
|--------------------------------------------------------------------------
*/

export async function getCurrentPlan(
  email: string
): Promise<Plan> {
  const normalizedEmail =
    normalizeEmail(email);

  const user =
    await prisma.user.findUnique({
      where: {
        email:
          normalizedEmail,
      },

      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

  return (
    user
      ?.subscription
      ?.plan ??
    "FREE"
  );
}

/*
|--------------------------------------------------------------------------
| Get Subscription Usage
|--------------------------------------------------------------------------
|
| Mengambil plan dan jumlah project dalam satu query.
|
*/

export async function getSubscriptionUsage(
  email: string
): Promise<SubscriptionUsage | null> {
  const normalizedEmail =
    normalizeEmail(email);

  const user =
    await prisma.user.findUnique({
      where: {
        email:
          normalizedEmail,
      },

      select: {
        subscription: {
          select: {
            plan: true,
          },
        },

        _count: {
          select: {
            projects: true,
          },
        },
      },
    });

  if (!user) {
    return null;
  }

  const plan =
    user.subscription?.plan ??
    "FREE";

  const projectCount =
    user._count.projects;

  const projectLimit =
    getProjectLimit(plan);

  const canCreateProject =
    projectLimit === null ||
    projectCount <
      projectLimit;

  return {
    plan,
    projectCount,
    projectLimit,
    canCreateProject,
  };
}

/*
|--------------------------------------------------------------------------
| Check Project Creation Permission
|--------------------------------------------------------------------------
*/

export async function canCreateProject(
  email: string
): Promise<boolean> {
  const usage =
    await getSubscriptionUsage(
      email
    );

  return (
    usage?.canCreateProject ??
    false
  );
}

/*
|--------------------------------------------------------------------------
| Check PRO Access
|--------------------------------------------------------------------------
*/

export async function isProUser(
  email:string
):Promise<boolean>{


const plan =
await getCurrentPlan(email);


return plan === "PRO";


}



/*
|--------------------------------------------------------------------------
| Require PRO Access
|--------------------------------------------------------------------------
|
| Digunakan untuk server page / API route
|
*/


export async function requirePro(
  email:string
){

const isPro =
await isProUser(email);



if(!isPro){

throw new Error(
"Fitur ini hanya tersedia untuk pengguna PRO."
);

}


return true;

}