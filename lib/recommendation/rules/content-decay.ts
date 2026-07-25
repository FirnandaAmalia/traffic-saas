import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";



export function contentDecayRule(
  data: RecommendationInput
): Recommendation[] {



  if(!data.pages.length){

    return [];

  }




  const candidates = data.pages

  .filter((page)=>{


    const impressions =
      page.impressions ?? 0;


    const position =
      page.position ?? 100;


    const ctr =
      (page.ctr ?? 0) * 100;



    return (

      impressions >= 20000 &&

      position >= 8 &&

      ctr <= 3

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

    (total,page)=>

      total +

      (page.impressions ?? 0),

    0

  );






  const affectedPages =
    candidates.length;






  let score = 60;



  if(totalImpressions > 100000){

    score += 10;

  }



  if(affectedPages >= 3){

    score += 10;

  }



  if(

    candidates.some(

      page =>
      (page.position ?? 100) >= 15

    )

  ){

    score += 10;

  }



  score =
    Math.min(
      score,
      100
    );






  const examples =

  candidates

  .slice(0,3)

  .map(

    page =>

    page.keys?.[0] ?? "-"

  )

  .join(", ");







  return [


    {


      id:

      "content-decay",



      priority:

      "medium",



      score,




      title:

      "Content Performance Declining",




      description:

      `AI menemukan ${affectedPages} halaman yang menunjukkan tanda penurunan performa organik. Halaman masih memiliki visibility di Google, namun mulai kehilangan potensi trafik.`,





      recommendation:

      "Lakukan content refresh dengan memperbarui informasi lama, memperbaiki struktur heading, menambahkan insight terbaru, memperkuat internal linking, dan mengevaluasi kembali search intent.",





      impact:

      `Halaman terdampak memiliki total ${totalImpressions.toLocaleString("id-ID")} impression. Prioritas review: ${examples}.`,




      category:

      "Content",



      icon:

      "decline",



    },


  ];

}