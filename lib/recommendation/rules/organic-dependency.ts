import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";



export function organicDependencyRule(
  data: RecommendationInput
): Recommendation[] {


  if(!data.trafficAcquisition.length){

    return [];

  }




  const totalSessions =

  data.trafficAcquisition.reduce(

    (sum,item)=>

      sum +
      (item.sessions ?? 0),

    0

  );





  if(totalSessions === 0){

    return [];

  }






  const organic =

  data.trafficAcquisition.find(

    item =>

    item.channel ===
    "Organic Search"

  );





  if(!organic){

    return [];

  }







  const organicPercent =

  (

    organic.sessions /
    totalSessions

  ) * 100;








  if(organicPercent < 75){

    return [];

  }








  const otherChannels =

  data.trafficAcquisition

  .filter(

    item =>

    item.channel !==
    "Organic Search"

  )

  .sort(

    (a,b)=>

    a.sessions -
    b.sessions

  )

  .slice(0,3)

  .map(

    item =>

    `${item.channel} (${item.sessions.toLocaleString("id-ID")} sesi)`

  )

  .join(", ");









  let score = 65;





  if(organicPercent >= 85){

    score += 10;

  }



  if(organicPercent >= 95){

    score += 15;

  }



  if(totalSessions >= 100000){

    score += 10;

  }



  score =
  Math.min(
    score,
    100
  );







  let priority:
  "medium" |
  "high";



  if(

    organicPercent >= 90 &&
    totalSessions >= 100000

  ){

    priority="high";

  }else{

    priority="medium";

  }









  return [


    {


      id:

      "organic-dependency",




      priority,




      score,




      title:

      "High Organic Traffic Dependency",






      description:

      `Organic Search menyumbang ${organicPercent.toFixed(1)}% dari total traffic website. Website memiliki peluang pertumbuhan tinggi dari SEO, namun masih bergantung pada satu sumber traffic utama.`,






      recommendation:

      "Bangun channel traffic tambahan melalui content distribution, social media, email marketing, referral partnership, dan brand awareness campaign agar pertumbuhan lebih stabil.",







      impact:

      `Dari total ${totalSessions.toLocaleString("id-ID")} sesi, sekitar ${(organic.sessions).toLocaleString("id-ID")} sesi berasal dari Organic Search. Channel dengan kontribusi terendah: ${otherChannels || "-"}.`,






      category:

      "Marketing",





      icon:

      "organic",



    },


  ];


}