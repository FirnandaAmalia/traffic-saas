import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";

export function mobileFirstRule(
  data: RecommendationInput
): Recommendation[] {

  if (!data.deviceCategory.length) {
    return [];
  }

  const totalUsers =
    data.deviceCategory.reduce(
      (sum, item) => sum + item.users,
      0
    );

  const mobile =
    data.deviceCategory.find(
      (item) =>
        item.device.toLowerCase() ===
        "mobile"
    );

  if (!mobile) {
    return [];
  }

  const mobilePercent =
    (mobile.users / totalUsers) * 100;

  if (mobilePercent < 70) {
    return [];
  }

  let score = 70;

  if (mobilePercent >= 80)
    score += 10;

  if (mobilePercent >= 90)
    score += 10;

  if (mobilePercent >= 95)
    score += 10;

  score = Math.min(score, 100);

  return [

    {

      id: "mobile-first",

      priority: "medium",

      score,

      title:
        "Mobile First Opportunity",

      description:
        `Sebanyak ${mobilePercent.toFixed(
          1
        )}% pengguna mengakses website melalui perangkat mobile.`,

      recommendation:
        "Prioritaskan optimasi tampilan mobile seperti Core Web Vitals, ukuran tombol, kecepatan loading, navigasi, keterbacaan teks, dan pengalaman pengguna pada layar kecil.",

      impact:
        "Optimalisasi mobile berpotensi meningkatkan engagement, menurunkan bounce rate, serta meningkatkan konversi pengguna.",

      category: "UX",

      icon: "📱",

    },

  ];

}