import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";



export function mobileFirstRule(
  data: RecommendationInput
): Recommendation[] {


  if(!data.deviceCategory.length){

    return [];

  }





  const totalUsers =

  data.deviceCategory.reduce(

    (sum,item)=>

      sum +
      (item.users ?? 0),

    0

  );





  if(totalUsers === 0){

    return [];

  }






  const mobile =

  data.deviceCategory.find(

    item =>

    item.device
    .toLowerCase()
    .includes("mobile")

  );





  if(!mobile){

    return [];

  }







  const mobilePercent =

  (

    mobile.users /
    totalUsers

  ) * 100;








  if(mobilePercent < 75){

    return [];

  }







  let score = 65;





  if(mobilePercent >= 80){

    score += 10;

  }



  if(mobilePercent >= 90){

    score += 10;

  }



  if(mobilePercent >= 95){

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



  if(mobilePercent >= 90){

    priority="high";

  }else{

    priority="medium";

  }








  const mobileUsers =

  mobile.users;







  return [


    {


      id:

      "mobile-first",




      priority,




      score,




      title:

      "Mobile First Optimization Opportunity",






      description:

      `${mobilePercent.toFixed(1)}% pengguna mengakses website melalui perangkat mobile. Mobile menjadi channel utama sehingga pengalaman pengguna pada layar kecil sangat menentukan performa website.`,






      recommendation:

      "Prioritaskan optimasi mobile experience melalui peningkatan Core Web Vitals, kecepatan loading, ukuran tombol CTA, navigasi sederhana, tampilan responsive, serta keterbacaan konten.",







      impact:

      `${mobileUsers.toLocaleString("id-ID")} pengguna berasal dari mobile. Optimasi mobile berpotensi meningkatkan engagement, retention, dan conversion rate.`,






      category:

      "UX",





      icon:

      "mobile",



    },


  ];


}