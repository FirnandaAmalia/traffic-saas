import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";

export function landingPageOptimizationRule(
  data: RecommendationInput
): Recommendation[] {

  if (!data.landingPages.length) {
    return [];
  }

  const page =
    [...data.landingPages]
      .sort(
        (a, b) =>
          b.sessions - a.sessions
      )[0];

  if (!page) {
    return [];
  }

  const totalSessions =
    data.landingPages.reduce(
      (sum, item) =>
        sum + item.sessions,
      0
    );

  const percent =
    (page.sessions /
      totalSessions) *
    100;

  let score = 70;

  if (percent >= 20)
    score += 10;

  if (percent >= 30)
    score += 10;

  if (percent >= 40)
    score += 10;

  score = Math.min(score, 100);

  return [

    {

      id: "landing-page",

      priority: "medium",

      score,

      title:
        "Landing Page Optimization",

      description:
        `Halaman "${page.page}" menyumbang ${percent.toFixed(
          1
        )}% dari seluruh landing page sessions.`,

      recommendation:
        "Optimalkan CTA, internal link, FAQ, schema markup, kecepatan halaman, serta tambahkan elemen konversi seperti formulir, tombol konsultasi, atau artikel terkait agar pengunjung lebih terdorong melakukan tindakan.",

      impact:
        "Peningkatan performa pada landing page utama dapat memberikan dampak langsung terhadap trafik organik, engagement, dan peluang konversi.",

      category: "Conversion",

      icon: "🚀",

    },

  ];

}