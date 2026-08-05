import type {
  Recommendation,
} from "./recommendation-engine";



export interface HealthScore {


  score:number;


  grade:string;


  status:
    | "excellent"
    | "good"
    | "optimization"
    | "critical";


  summary:
    | "excellent"
    | "good"
    | "optimization"
    | "critical";



  breakdown:{

    seo:number;

    content:number;

    ux:number;

    performance:number;

    analytics:number;

    marketing:number;

  };


}







export function calculateHealthScore(

recommendations:Recommendation[]

):HealthScore {



const breakdown = {


seo:100,

content:100,

ux:100,

performance:100,

analytics:100,

marketing:100,


};








for(
const item of recommendations
){



let penalty = 0;




switch(item.priority){


case "critical":

penalty = 25;

break;



case "high":

penalty = 15;

break;



case "medium":

penalty = 8;

break;



case "low":

penalty = 4;

break;


}







if(item.score >=90){

penalty += 5;

}

else if(item.score >=80){

penalty += 2;

}








/*
 Mapping berdasarkan titleKey
*/


switch(item.titleKey){



case "quickWin":

case "ctrOptimization":

  breakdown.seo -= penalty;

break;




case "contentDecay":

  breakdown.content -= penalty;

break;




case "landingPageGrowth":

case "conversionTracking":

  breakdown.ux -= Math.ceil(
    penalty / 2
  );

  breakdown.marketing -= Math.ceil(
    penalty / 2
  );

break;




case "mobileOptimization":

  breakdown.performance -= penalty;

  breakdown.ux -= Math.ceil(
    penalty / 2
  );

break;




case "browserCompatibility":

  breakdown.performance -= penalty;

break;




case "countryOpportunity":

  breakdown.marketing -= penalty;

break;




case "eventInsight":

  breakdown.analytics -= penalty;

break;



default:

  breakdown.seo -= Math.ceil(
    penalty / 2
  );

break;



}





}









Object.keys(
breakdown
)
.forEach((key)=>{


const k =
key as keyof typeof breakdown;


breakdown[k] =
Math.max(
0,
Math.min(
100,
breakdown[k]
)
);


});









const values =
Object.values(
breakdown
);






let score =
Math.round(

values.reduce(
(a,b)=>a+b,
0
)

/

values.length

);








if(
recommendations.length >=8
){

score -=10;

}

else if(
recommendations.length >=5
){

score -=5;

}








score =
Math.max(
0,
Math.min(
100,
score
)
);









let grade = "F";


let status:
HealthScore["status"];


let summary:
HealthScore["summary"];









if(score>=95){

grade="A+";

status="excellent";

summary="excellent";


}

else if(score>=90){

grade="A";

status="excellent";

summary="excellent";


}

else if(score>=85){

grade="A-";

status="good";

summary="good";


}

else if(score>=80){

grade="B+";

status="good";

summary="good";


}

else if(score>=70){

grade="B";

status="optimization";

summary="optimization";


}

else if(score>=60){

grade="C";

status="optimization";

summary="optimization";


}

else if(score>=50){

grade="D";

status="critical";

summary="critical";


}

else{

grade="F";

status="critical";

summary="critical";


}









return {


score,


grade,


status,


summary,


breakdown,


};


}