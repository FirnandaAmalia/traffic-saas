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

      .map(
        (r) =>
          r.title ??
          r.titleKey ??
          "SEO Optimization Task"
      );




  let summary =
    "";



  if (
    ai.health.score >= 90
  ) {

    summary =
      "Website shows excellent performance based on Google Search Console and Google Analytics analysis. The main focus is maintaining performance and applying minor optimizations to improve efficiency.";

  } else if (
    ai.health.score >= 80
  ) {

    summary =
      "Website has a strong SEO and Analytics foundation. Several optimization opportunities remain to improve organic traffic and user experience quality.";

  } else {

    summary =
      "Website still has several priority areas that require optimization to improve search visibility, user experience, and digital strategy effectiveness.";

  }





  return {

    title:

      "AI Executive Report",



    summary,



    conclusion:

      `Based on AI analysis, the website achieved a Health Score of ${ai.health.score}/100 (${ai.health.grade}). Implementing priority recommendations is expected to improve organic performance, user experience quality, and digital marketing effectiveness.`,



    nextSteps:

      topThree,

  };

}