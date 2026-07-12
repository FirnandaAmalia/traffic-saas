import type {
  Recommendation,
} from "./recommendation-engine";

export interface HealthScore {

  score: number;

  grade: string;

  summary: string;

  breakdown: {

    seo: number;

    content: number;

    ux: number;

    performance: number;

    analytics: number;

    marketing: number;

  };

}

export function calculateHealthScore(
  recommendations: Recommendation[]
): HealthScore {

  const breakdown = {

    seo: 100,

    content: 100,

    ux: 100,

    performance: 100,

    analytics: 100,

    marketing: 100,

  };

  for (const item of recommendations) {

    let penalty = 0;

    switch (item.priority) {

      case "critical":
        penalty = 20;
        break;

      case "high":
        penalty = 12;
        break;

      case "medium":
        penalty = 8;
        break;

      case "low":
        penalty = 5;
        break;

    }

    switch (item.category) {

      case "SEO":
        breakdown.seo -= penalty;
        break;

      case "Content":
        breakdown.content -= penalty;
        break;

      case "UX":
        breakdown.ux -= penalty;
        break;

      case "Performance":
        breakdown.performance -= penalty;
        break;

      case "Analytics":
        breakdown.analytics -= penalty;
        break;

      case "Marketing":
        breakdown.marketing -= penalty;
        break;

      case "Conversion":

        breakdown.marketing -= Math.round(
          penalty / 2
        );

        breakdown.ux -= Math.round(
          penalty / 2
        );

        break;

    }

  }

  Object.keys(breakdown).forEach((key) => {

    const k =
      key as keyof typeof breakdown;

    breakdown[k] =
      Math.max(
        0,
        Math.min(
          100,
          breakdown[k]
        )
      );

  });

  const values =
    Object.values(breakdown);

  const score =
    Math.round(

      values.reduce(
        (a, b) => a + b,
        0
      ) /

      values.length

    );

  let grade = "F";

  if (score >= 95)
    grade = "A+";
  else if (score >= 90)
    grade = "A";
  else if (score >= 85)
    grade = "A-";
  else if (score >= 80)
    grade = "B+";
  else if (score >= 75)
    grade = "B";
  else if (score >= 70)
    grade = "C+";
  else if (score >= 60)
    grade = "C";
  else if (score >= 50)
    grade = "D";

  let summary =
    "";

  if (score >= 90)
    summary =
      "Website berada dalam kondisi sangat baik. Fokus pada optimasi kecil untuk mempertahankan performa.";

  else if (score >= 80)
    summary =
      "Website sudah memiliki performa yang baik, namun masih terdapat beberapa peluang peningkatan.";

  else if (score >= 70)
    summary =
      "Website memiliki beberapa area penting yang perlu segera dioptimalkan.";

  else
    summary =
      "Website memerlukan optimasi menyeluruh agar performa organik dan pengalaman pengguna meningkat.";

  return {

    score,

    grade,

    summary,

    breakdown,

  };

}