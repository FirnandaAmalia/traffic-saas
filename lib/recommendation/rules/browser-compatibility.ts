import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";

export function browserCompatibilityRule(
  data: RecommendationInput
): Recommendation[] {

  if (!data.browser.length) {
    return [];
  }

  const totalUsers =
    data.browser.reduce(
      (sum, item) => sum + item.users,
      0
    );

  const dominant =
    [...data.browser]
      .sort(
        (a, b) =>
          b.users - a.users
      )[0];

  if (!dominant) {
    return [];
  }

  const percent =
    (dominant.users / totalUsers) * 100;

  if (percent < 50) {
    return [];
  }

  let score = 65;

  if (percent >= 70)
    score += 10;

  if (percent >= 80)
    score += 10;

  if (percent >= 90)
    score += 10;

  score = Math.min(score, 100);

  return [

    {

      id: "browser-compatibility",

      priority: "low",

      score,

      title:
        "Browser Compatibility Priority",

      description:
        `${percent.toFixed(
          1
        )}% pengguna menggunakan ${dominant.browser}. Browser tersebut sebaiknya menjadi prioritas utama dalam proses pengujian kualitas aplikasi.`,

      recommendation:
        `Lakukan pengujian rutin pada ${dominant.browser}, kemudian validasi kompatibilitas di browser lain seperti Safari, Firefox, Edge, dan Opera agar pengalaman pengguna tetap konsisten.`,

      impact:
        "Prioritas pengujian berdasarkan browser yang paling banyak digunakan dapat mengurangi bug pada pengguna mayoritas serta meningkatkan kepuasan pengguna.",

      category: "Performance",

      icon: "🌐",

    },

  ];

}