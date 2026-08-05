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
      sum + (item.sessions ?? 0),
    0
  );


  if(totalSessions === 0){
    return [];
  }


  const pages =
  [...data.landingPages]
  .sort(
    (a,b)=>
      b.sessions - a.sessions
  )
  .slice(0,5);



  const mainPage = pages[0];


  if(!mainPage){
    return [];
  }



  const percentage =
  (
    mainPage.sessions /
    totalSessions
  ) * 100;



  let score = 65;


  if(percentage >=20){
    score +=10;
  }


  if(percentage >=35){
    score +=10;
  }


  if(pages.length >=3){
    score +=10;
  }


  score = Math.min(score,100);



  return [

    {

      id:"landing-page",

      titleKey:"landingPageGrowth",

      priority:
      percentage >=40
      ?
      "high"
      :
      "medium",


      score,


      descriptionKey:
      "landingPage.description",


      descriptionValues:{
        pages:pages.length,
        page:mainPage.page,
        percentage:percentage.toFixed(1)
      },


      recommendationKey:
      "landingPage.recommendation",


      impactKey:
      "landingPage.impact",


      impactValues:{
        pages:
        pages
        .slice(0,3)
        .map(x=>x.page)
        .join(", ")
      },


      category:"Conversion",


      icon:"growth"

    }

  ];

}