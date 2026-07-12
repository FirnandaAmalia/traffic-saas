import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";

export function organicDependencyRule(
  data: RecommendationInput
): Recommendation[] {

  if (!data.trafficAcquisition.length) {
    return [];
  }

  const totalSessions =
    data.trafficAcquisition.reduce(
      (sum, item) =>
        sum + item.sessions,
      0
    );

  const organic =
    data.trafficAcquisition.find(
      (item) =>
        item.channel ===
        "Organic Search"
    );

  if (!organic) {
    return [];
  }

  const organicPercent =
    (organic.sessions /
      totalSessions) *
    100;

  if (organicPercent < 70) {
    return [];
  }

  let score = 70;

  if (organicPercent >= 80)
    score += 10;

  if (organicPercent >= 90)
    score += 10;

  if (organicPercent >= 95)
    score += 10;

  score = Math.min(score, 100);

  return [

    {

      id: "organic-dependency",

      priority: "medium",

      score,

      title:
        "High Organic Traffic Dependency",

      description:
        `Sebanyak ${organicPercent.toFixed(
          1
        )}% sesi berasal dari Organic Search sehingga website memiliki ketergantungan tinggi terhadap mesin pencari.`,

      recommendation:
        "Diversifikasikan sumber trafik melalui Email Marketing, Media Sosial, Referral Partnership, Brand Campaign, dan Direct Traffic untuk mengurangi risiko apabila terjadi perubahan algoritma Google.",

      impact:
        "Diversifikasi channel akan meningkatkan stabilitas trafik jangka panjang dan mengurangi risiko kehilangan pengunjung akibat penurunan ranking organik.",

      category: "Marketing",

      icon: "🌱",

    },

  ];

}