import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";

export function quickWinRule(
  data: RecommendationInput
): Recommendation[] {

  if (!data.pages.length) {
    return [];
  }

  /**
   * Cari halaman dengan:
   * - impression tinggi
   * - CTR bagus
   * - ranking belum masuk Top 3
   */

  const candidate = [...data.pages]

    .filter((page) => {

      const impressions =
        page.impressions ?? 0;

      const ctr =
        (page.ctr ?? 0) * 100;

      const position =
        page.position ?? 100;

      return (
        impressions >= 10000 &&
        ctr >= 2 &&
        position >= 4 &&
        position <= 10
      );

    })

    .sort(
      (a, b) =>
        (b.impressions ?? 0) -
        (a.impressions ?? 0)
    )[0];

  if (!candidate) {
    return [];
  }

  const page =
    candidate.keys?.[0] ?? "-";

  const impressions =
    candidate.impressions ?? 0;

  const ctr =
    ((candidate.ctr ?? 0) * 100)
      .toFixed(2);

  const position =
    (candidate.position ?? 0)
      .toFixed(1);

  /**
   * Opportunity Score
   */

  let score = 70;

  if (impressions > 100000)
    score += 10;

  if (Number(position) >= 7)
    score += 10;

  if (Number(ctr) >= 4)
    score += 10;

  score = Math.min(score, 100);

  /**
   * Estimasi tambahan click
   */

  const estimatedExtraClicks =
    Math.round(
      impressions * 0.03
    );

  return [

    {

      id: "quick-win",

      priority: "high",

      score,

      title:
        "Quick Win Opportunity",

      description:
        "Halaman ini memiliki impression tinggi dan CTR yang sudah cukup baik, tetapi posisinya masih berada di luar Top 3 Google.",

      recommendation:
        "Perbarui konten, tambahkan internal link, optimalkan heading, FAQ, schema markup, dan tingkatkan topical authority agar halaman berpeluang naik ke posisi yang lebih tinggi.",

      impact:
        `Potensi tambahan sekitar ${estimatedExtraClicks.toLocaleString()} klik apabila ranking meningkat.`,

      category: "SEO",

      icon: "growth",

    },

  ];

}