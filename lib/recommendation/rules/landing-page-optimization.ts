import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";



export function landingPageOptimizationRule(
  data: RecommendationInput
): Recommendation[] {



  if(!data.landingPages.length){

    return [];

  }






  const totalSessions =

  data.landingPages.reduce(

    (sum,item)=>

      sum +
      (item.sessions ?? 0),

    0

  );





  if(totalSessions === 0){

    return [];

  }








  const pages =

  [...data.landingPages]

  .sort(

    (a,b)=>

      b.sessions -
      a.sessions

  )

  .slice(0,5);







  const mainPage =
    pages[0];





  if(!mainPage){

    return [];

  }







  const mainPercentage =

  (

    mainPage.sessions /
    totalSessions

  ) * 100;







  let score = 65;





  if(mainPercentage >= 20){

    score += 10;

  }



  if(mainPercentage >= 35){

    score += 10;

  }



  if(pages.length >= 3){

    score += 10;

  }



  score =
  Math.min(
    score,
    100
  );







  const priority:

  "medium" |
  "high" =


  mainPercentage >= 40

  ?

  "high"

  :

  "medium";







  const importantPages =

  pages

  .slice(0,3)

  .map(

    page =>

    page.page

  )

  .join(", ");







  return [


    {


      id:

      "landing-page",





      priority,





      score,





      title:

      "Landing Page Growth Opportunity",





      description:

      `${pages.length} landing page utama menjadi pintu masuk terbesar website. Halaman "${mainPage.page}" menyumbang ${mainPercentage.toFixed(1)}% dari total landing session.`,






      recommendation:

      "Optimalkan halaman masuk utama dengan CTA yang jelas, struktur konten yang lebih meyakinkan, internal link strategis, FAQ schema, peningkatan kecepatan, dan elemen conversion seperti form atau tombol kontak.",






      impact:

      `Halaman prioritas: ${importantPages}. Perbaikan pada halaman ini dapat memberikan dampak langsung terhadap engagement dan peluang konversi karena menerima traffic terbesar.`,






      category:

      "Conversion",





      icon:

      "🚀",



    },


  ];


}