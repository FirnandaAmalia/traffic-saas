import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";

export function contentDecayRule(
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
        position >= 8
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

  let score = 65;

  if (impressions > 100000)
    score += 10;

  if (Number(position) >= 10)
    score += 10;

  if (Number(ctr) < 1.5)
    score += 10;

  score = Math.min(score, 100);

  return [

    {

      id: "content-decay",

      priority: "medium",

      score,

      title:
        "Content Decay Detected",

      description:
        "Halaman masih mendapatkan impression tinggi, namun CTR dan posisi pencarian mulai menurun sehingga berpotensi kehilangan trafik organik.",

      recommendation:
        "Perbarui isi artikel dengan informasi terbaru, tambahkan FAQ, optimalkan heading, perbarui internal link, dan evaluasi search intent agar halaman kembali kompetitif.",

      impact:
        `Halaman masih memperoleh ${impressions.toLocaleString()} impression tetapi CTR hanya ${ctr}% dengan posisi rata-rata ${position}.`,

      category: "Content",

      icon: "📉",

    },

  ];

}