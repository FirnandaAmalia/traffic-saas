import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";



export function browserCompatibilityRule(
  data: RecommendationInput
): Recommendation[] {


  if(!data.browser.length){

    return [];

  }




  const totalUsers =

  data.browser.reduce(

    (sum,item)=>

      sum +
      (item.users ?? 0),

    0

  );





  if(totalUsers === 0){

    return [];

  }







  const browsers =

  [...data.browser]

  .sort(

    (a,b)=>

      b.users -
      a.users

  );






  const dominant =
    browsers[0];





  if(!dominant){

    return [];

  }







  const percent =

  (

    dominant.users /
    totalUsers

  ) * 100;







  if(percent < 50){

    return [];

  }








  let score = 60;





  if(percent >= 70){

    score += 10;

  }



  if(percent >= 85){

    score += 15;

  }



  if(totalUsers >= 100000){

    score += 10;

  }



  score =
  Math.min(
    score,
    100
  );








  const otherBrowsers =

  browsers

  .slice(1,4)

  .map(

    item =>

    `${item.browser} (${item.users.toLocaleString("id-ID")})`

  )

  .join(", ");








  const priority:

  "low" |

  "medium" |

  "high" =


  percent >= 85

  ?

  "medium"

  :

  "low";








  return [


    {


      id:

      "browser-compatibility",




      priority,




      score,




      title:

      "Browser Experience Priority",





      description:

      `${dominant.browser} digunakan oleh ${percent.toFixed(1)}% pengguna (${dominant.users.toLocaleString("id-ID")} user). Browser ini menjadi prioritas utama untuk validasi kualitas tampilan dan performa website.`,






      recommendation:

      `Pastikan testing utama dilakukan pada ${dominant.browser}. Validasi juga browser alternatif seperti ${otherBrowsers || "Safari, Firefox, dan Edge"} untuk menjaga pengalaman pengguna tetap konsisten.`,






      impact:

      "Pengujian berdasarkan browser mayoritas membantu mengurangi potensi tampilan rusak, error JavaScript, dan masalah kompatibilitas yang dapat menurunkan kepuasan pengguna.",





      category:

      "Performance",





      icon:

      "🌐",



    },


  ];


}