import type {
  Recommendation,
  RecommendationInput,
} from "../recommendation-engine";



const BUSINESS_EVENTS = [

  "purchase",

  "generate_lead",

  "lead",

  "sign_up",

  "signup",

  "contact",

  "submit_form",

  "begin_checkout",

  "add_to_cart",

];



const SYSTEM_EVENTS = [

  "page_view",

  "session_start",

  "first_visit",

  "scroll",

  "user_engagement",

];





export function eventInsightRule(
  data: RecommendationInput
): Recommendation[] {



  if(!data.topEvents.length){

    return [];

  }





  const totalEvents =

  data.topEvents.reduce(

    (sum,item)=>

      sum +
      (item.count ?? 0),

    0

  );





  if(totalEvents === 0){

    return [];

  }






  const sortedEvents =

  [...data.topEvents]

  .sort(

    (a,b)=>

      b.count -
      a.count

  );





  const topEvent =
    sortedEvents[0];






  if(!topEvent){

    return [];

  }







  const businessEvents =

  data.topEvents.filter(

    item =>

    BUSINESS_EVENTS.includes(

      item.event.toLowerCase()

    )

  );







  const businessEventTotal =

  businessEvents.reduce(

    (sum,item)=>

      sum +
      item.count,

    0

  );






  const businessPercentage =

  (

    businessEventTotal /
    totalEvents

  ) * 100;








  const topPercentage =

  (

    topEvent.count /
    totalEvents

  ) * 100;







  let score = 60;





  if(businessEventTotal > 0){

    score += 10;

  }



  if(businessPercentage < 1){

    score += 15;

  }



  if(

    SYSTEM_EVENTS.includes(

      topEvent.event.toLowerCase()

    )

  ){

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


  businessPercentage < 1

  ?

  "high"

  :

  "medium";









  return [


    {


      id:

      "event-insight",





      priority,





      score,





      title:

      "Conversion Tracking Opportunity",






      description:

      `Event "${topEvent.event}" menjadi aktivitas terbesar (${topPercentage.toFixed(1)}% dari seluruh event), namun kontribusi event bisnis hanya ${businessPercentage.toFixed(2)}%.`,







      recommendation:

      "Pastikan event bisnis seperti generate_lead, purchase, sign_up, atau contact sudah terpasang dengan benar. Gunakan conversion event untuk mengukur keberhasilan website, bukan hanya jumlah kunjungan.",







      impact:

      businessEventTotal > 0

      ?

      `Website memiliki ${businessEventTotal.toLocaleString("id-ID")} aktivitas yang berkaitan dengan tujuan bisnis.`

      :

      "Penambahan conversion tracking dapat membantu mengukur apakah trafik website benar-benar menghasilkan nilai bisnis.",






      category:

      "Analytics",






      icon:

      "📊",



    },


  ];


}