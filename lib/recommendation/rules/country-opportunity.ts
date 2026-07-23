import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";



export function countryOpportunityRule(
  data: RecommendationInput
): Recommendation[] {



  if(!data.country.length){

    return [];

  }






  const countries =

  [...data.country]

  .sort(

    (a,b)=>

      b.users -
      a.users

  );







  const totalUsers =

  countries.reduce(

    (sum,item)=>

      sum +
      (item.users ?? 0),

    0

  );





  if(totalUsers === 0){

    return [];

  }







  const mainCountry =
    countries[0];





  const secondaryCountries =

  countries

  .slice(1,4)

  .filter(

    item =>

    (

      item.users /
      totalUsers

    ) * 100 >= 5

  );







  const mainPercent =

  (

    mainCountry.users /
    totalUsers

  ) * 100;







  let score = 60;





  if(secondaryCountries.length){

    score += 15;

  }



  if(mainPercent >= 90){

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







  const opportunityCountries =

  secondaryCountries

  .map(

    item =>

    `${item.country} (${(

      item.users /
      totalUsers *

      100

    ).toFixed(1)}%)`

  )

  .join(", ");









  const priority:

  "low" |
  "medium" =


  secondaryCountries.length

  ?

  "medium"

  :

  "low";








  return [


    {


      id:

      "country-opportunity",





      priority,





      score,





      title:

      "Regional Growth Opportunity",





      description:

      `${mainCountry.country} menjadi sumber pengguna terbesar dengan kontribusi ${mainPercent.toFixed(1)}%. AI menemukan peluang tambahan dari wilayah lain yang mulai menunjukkan trafik.`,






      recommendation:

      secondaryCountries.length

      ?

      `Pertimbangkan strategi SEO regional untuk ${opportunityCountries}. Gunakan landing page multibahasa, konten lokal, dan keyword khusus wilayah untuk meningkatkan relevansi.`

      :

      "Bangun strategi internasional secara bertahap melalui konten multibahasa, hreflang, dan kampanye digital regional.",






      impact:

      secondaryCountries.length

      ?

      `Wilayah potensial ditemukan: ${opportunityCountries}. Perluasan market dapat meningkatkan organic reach dan peluang konversi.`

      :

      "Optimasi geografis dapat membantu menemukan sumber trafik baru di luar market utama.",






      category:

      "Marketing",





      icon:

      "🌍",



    },


  ];


}