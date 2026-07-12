import type {
  AIInsight,
} from "../recommendation";

export interface ExecutiveReport {

  title: string;

  summary: string;

  conclusion: string;

  nextSteps: string[];

}

export function generateExecutiveReport(
  ai: AIInsight
): ExecutiveReport {

  const topThree =
    ai.recommendations
      .slice(0, 3)
      .map((r) => r.title);

  let summary =
    "";

  if (ai.health.score >= 90) {

    summary =
      "Website menunjukkan performa yang sangat baik berdasarkan analisis Google Search Console dan Google Analytics. Fokus utama adalah mempertahankan performa serta melakukan optimasi kecil untuk meningkatkan efisiensi.";

  } else if (
    ai.health.score >= 80
  ) {

    summary =
      "Website memiliki fondasi SEO dan Analytics yang baik. Masih terdapat beberapa peluang optimasi yang dapat meningkatkan traffic organik dan kualitas pengalaman pengguna.";

  } else {

    summary =
      "Website masih memiliki beberapa area prioritas yang perlu segera dioptimalkan untuk meningkatkan visibilitas pencarian, pengalaman pengguna, dan efektivitas strategi digital.";

  }

  return {

    title:

      "AI Executive Report",

    summary,

    conclusion:

      `Berdasarkan analisis AI, website memperoleh Health Score ${ai.health.score}/100 (${ai.health.grade}). Implementasi rekomendasi prioritas diperkirakan mampu meningkatkan performa organik, kualitas pengalaman pengguna, serta efektivitas strategi pemasaran digital.`,

    nextSteps:

      topThree,

  };

}