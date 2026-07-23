import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";


export function highImpressionLowCTRRule(
  data: RecommendationInput
): Recommendation[] {


  if (!data.pages.length) {
    return [];
  }



  const candidates = data.pages

    .filter((page)=>{


      const impressions =
        page.impressions ?? 0;


      const ctr =
        (page.ctr ?? 0) * 100;


      const position =
        page.position ?? 100;



      return (

        impressions >= 10000 &&

        ctr <= 3 &&

        position <= 15

      );


    })


    .sort(
      (a,b)=>
        (b.impressions ?? 0)
        -
        (a.impressions ?? 0)
    )

    .slice(0,5);





  if(!candidates.length){

    return [];

  }




  const totalImpressions =
    candidates.reduce(

      (sum,item)=>
        sum +
        (item.impressions ?? 0),

      0

    );





  const opportunities =
    candidates.map((page)=>{


      const currentCTR =
        (page.ctr ?? 0) * 100;


      const impressions =
        page.impressions ?? 0;



      const potentialClicks =
        Math.round(

          impressions *
          (
            0.05 -
            (page.ctr ?? 0)
          )

        );



      return {


        keyword:
          page.keys?.[0] ?? "-",


        impressions,


        ctr:
          currentCTR.toFixed(2),


        position:
          (
            page.position ?? 0
          )
          .toFixed(1),


        potentialClicks:
          Math.max(
            potentialClicks,
            0
          ),


      };


    });





  let score = 70;



  if(totalImpressions > 100000){

    score += 10;

  }


  if(candidates.length >= 3){

    score += 10;

  }


  if(
    candidates.some(
      item =>
      (item.position ?? 100) <= 5
    )
  ){

    score += 10;

  }



  score =
    Math.min(
      score,
      100
    );






  const estimatedClicks =
    opportunities.reduce(

      (sum,item)=>
        sum +
        item.potentialClicks,

      0

    );





  return [


    {


      id:
      "high-impression-low-ctr",


      priority:
      "high",


      score,



      title:
      "Peluang CTR Optimization",



      description:

      `Ditemukan ${candidates.length} halaman dengan impression tinggi namun CTR rendah. Halaman ini sudah mendapatkan visibilitas di Google tetapi belum maksimal menghasilkan klik.`,




      recommendation:

      "Prioritaskan optimasi halaman dengan impression terbesar. Perbaiki title tag, meta description, gunakan emotional trigger, tambahkan keyword modifier, serta sesuaikan konten dengan search intent pengguna.",





      impact:

      `Estimasi tambahan hingga ${estimatedClicks.toLocaleString("id-ID")} klik organik tanpa membuat halaman baru.`,





      category:
      "SEO",



      icon:
      "🎯",


    },


  ];


}