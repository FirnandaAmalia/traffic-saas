import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";

export function highImpressionLowCTRRule(
  data: RecommendationInput
): Recommendation[] {

  if (!data.pages.length) {
    return [];
  }

  const candidate = [...data.pages]

    .filter((page) => {

      const impressions =
        page.impressions ?? 0;

      const ctr =
        (page.ctr ?? 0) * 100;

      const position =
        page.position ?? 100;

      return (
        impressions >= 50000 &&
        ctr <= 2 &&
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
    (
      (candidate.ctr ?? 0) * 100
    ).toFixed(2);

  const position =
    (
      candidate.position ?? 0
    ).toFixed(1);

  let score = 75;

  if (impressions > 100000)
    score += 10;

  if (Number(ctr) < 1)
    score += 10;

  if (Number(position) <= 5)
    score += 5;

  score = Math.min(score, 100);

  const estimatedExtraClicks =
    Math.round(
      impressions * 0.02
    );

  return [

    {

      id: "high-impression-low-ctr",

      priority: "high",

      score,

      title:
        "High Impression, Low CTR",

      description:
        `Halaman "${page}" memperoleh impression yang tinggi tetapi rasio klik masih rendah. Ini menunjukkan halaman sering muncul di Google, namun kurang menarik perhatian pengguna.`,

      recommendation:
        "Optimalkan title tag agar lebih menarik, perbarui meta description, tambahkan structured data (FAQ/Breadcrumb), gunakan angka atau tahun terbaru pada judul, dan pastikan search intent sesuai dengan kebutuhan pengguna.",

      impact:
        `Potensi tambahan sekitar ${estimatedExtraClicks.toLocaleString()} klik apabila CTR meningkat tanpa perlu menaikkan posisi ranking.`,

      category: "SEO",

      icon: "🎯",

    },

  ];

}