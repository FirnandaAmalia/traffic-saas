import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";

export function eventInsightRule(
  data: RecommendationInput
): Recommendation[] {

  if (!data.topEvents.length) {
    return [];
  }

  const totalEvents =
    data.topEvents.reduce(
      (sum, item) => sum + item.count,
      0
    );

  const topEvent =
    [...data.topEvents]
      .sort(
        (a, b) =>
          b.count - a.count
      )[0];

  if (!topEvent) {
    return [];
  }

  const percent =
    (topEvent.count /
      totalEvents) * 100;

  let score = 65;

  if (percent >= 40)
    score += 10;

  if (percent >= 60)
    score += 10;

  if (percent >= 80)
    score += 10;

  score = Math.min(score, 100);

  return [

    {

      id: "event-insight",

      priority: "medium",

      score,

      title:
        "User Behavior Insight",

      description:
        `Event "${topEvent.event}" menyumbang ${percent.toFixed(
          1
        )}% dari seluruh aktivitas pengguna.`,

      recommendation:
        "Analisis apakah event ini benar-benar mencerminkan tujuan bisnis. Jika merupakan event utama seperti generate_lead, purchase, atau sign_up, pertahankan performanya. Jika didominasi event dasar seperti page_view atau session_start, pertimbangkan menambahkan event konversi yang lebih bermakna.",

      impact:
        "Pelacakan event yang lebih relevan membantu memahami perilaku pengguna serta meningkatkan kualitas analisis dan pengambilan keputusan.",

      category: "Analytics",

      icon: "📊",

    },

  ];

}