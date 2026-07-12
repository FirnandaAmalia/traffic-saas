import { prisma } from "./prisma";

import {
  PLANS,
  type Plan,
} from "./plan";

/**
 * Ambil plan user berdasarkan email.
 * Jika belum punya subscription,
 * otomatis dianggap FREE.
 */
export async function getCurrentPlan(
  email: string
): Promise<Plan> {
  const subscription =
    await prisma.subscription.findUnique({
      where: {
        userEmail: email,
      },
      select: {
        plan: true,
      },
    });

  return subscription?.plan ?? PLANS.FREE;
}

/**
 * Pastikan user memiliki subscription.
 * Dipanggil setelah login pertama
 * atau saat membuat project pertama.
 */
export async function ensureSubscription(
  email: string
) {
  return prisma.subscription.upsert({
    where: {
      userEmail: email,
    },

    update: {},

    create: {
      userEmail: email,
      plan: PLANS.FREE,
    },
  });
}

/**
 * Upgrade user ke Pro.
 * Nanti dipanggil setelah pembayaran berhasil.
 */
export async function upgradeToPro(
  email: string
) {
  return prisma.subscription.upsert({
    where: {
      userEmail: email,
    },

    update: {
      plan: PLANS.PRO,
    },

    create: {
      userEmail: email,
      plan: PLANS.PRO,
    },
  });
}

/**
 * Downgrade ke Free.
 */
export async function downgradeToFree(
  email: string
) {
  return prisma.subscription.update({
    where: {
      userEmail: email,
    },

    data: {
      plan: PLANS.FREE,
    },
  });
}

/**
 * Shortcut helper.
 */
export async function isProUser(
  email: string
) {
  const plan =
    await getCurrentPlan(email);

  return plan === PLANS.PRO;
}