import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";

export function countryOpportunityRule(
  data: RecommendationInput
): Recommendation[] {

  if (!data.country.length) {
    return [];
  }

  const totalUsers =
    data.country.reduce(
      (sum, item) => sum + item.users,
      0
    );

  const topCountry =
    [...data.country]
      .sort(
        (a, b) =>
          b.users - a.users
      )[0];

  if (!topCountry) {
    return [];
  }

  const percent =
    (topCountry.users /
      totalUsers) *
    100;

  let score = 60;

  if (percent >= 40)
    score += 10;

  if (percent >= 60)
    score += 10;

  if (percent >= 80)
    score += 10;

  score = Math.min(score, 100);

  const localizedCountries = [
    "Indonesia",
    "Malaysia",
    "Singapore",
    "Australia",
    "United States",
    "India",
  ];

  const recommendation =
    localizedCountries.includes(
      topCountry.country
    )
      ? `Pertimbangkan membuat landing page, artikel, atau kampanye digital yang disesuaikan dengan audiens di ${topCountry.country}. Lokalisasi konten dapat meningkatkan relevansi pencarian dan engagement pengguna.`
      : "Evaluasi peluang pasar internasional melalui lokalisasi bahasa, strategi SEO regional, dan kampanye digital sesuai karakteristik pengguna.";

  return [

    {

      id: "country-opportunity",

      priority: "low",

      score,

      title:
        "Regional Growth Opportunity",

      description:
        `${percent.toFixed(
          1
        )}% pengguna berasal dari ${topCountry.country}. Negara ini merupakan pasar digital terbesar berdasarkan data pengunjung saat ini.`,

      recommendation,

      impact:
        "Strategi lokalisasi konten dan pemasaran berpotensi meningkatkan jangkauan organik, brand awareness, dan peluang konversi pada wilayah dengan permintaan tinggi.",

      category: "Marketing",

      icon: "🌍",

    },

  ];

}