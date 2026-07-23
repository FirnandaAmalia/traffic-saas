import type {
  Recommendation,
} from "./recommendation-engine";



export interface PrioritizedRecommendation
extends Recommendation {

  roi:number;


  difficulty:
    | "Easy"
    | "Medium"
    | "Hard";


  estimatedDays:number;


  businessPriority:
    | "Urgent"
    | "Important"
    | "Opportunity";

}




export function prioritizeRecommendations(

recommendations:Recommendation[]

):PrioritizedRecommendation[] {



return recommendations.map((item)=>{


let roi = 3;

let difficulty:
"Easy" |
"Medium" |
"Hard"
=
"Medium";


let estimatedDays = 7;


let businessPriority:
"Urgent" |
"Important" |
"Opportunity"
=
"Opportunity";





switch(item.id){



case "quick-win":

roi = 5;

difficulty="Easy";

estimatedDays=2;

businessPriority="Urgent";

break;






case "high-impression-low-ctr":

roi=5;

difficulty="Easy";

estimatedDays=3;

businessPriority="Urgent";

break;







case "content-decay":

roi=4;

difficulty="Medium";

estimatedDays=14;

businessPriority="Important";

break;







case "organic-dependency":

roi=4;

difficulty="Hard";

estimatedDays=30;

businessPriority="Important";

break;







case "mobile-first":

roi=5;

difficulty="Medium";

estimatedDays=7;

businessPriority="Important";

break;







case "browser-compatibility":

roi=3;

difficulty="Easy";

estimatedDays=2;

businessPriority="Opportunity";

break;







case "landing-page":

roi=5;

difficulty="Medium";

estimatedDays=7;

businessPriority="Urgent";

break;







case "event-insight":

roi=3;

difficulty="Easy";

estimatedDays=1;

businessPriority="Opportunity";

break;







case "country-opportunity":

roi=3;

difficulty="Hard";

estimatedDays=30;

businessPriority="Opportunity";

break;



}





/*
|--------------------------------------------------------------------------
| AI Business Adjustment
|--------------------------------------------------------------------------
*/


if(item.priority==="critical"){

roi=Math.min(
roi+1,
5
);

businessPriority="Urgent";

}



if(item.priority==="high"){

roi=Math.min(
roi+1,
5
);

}




if(item.score>=90){

roi=Math.min(
roi+1,
5
);

}




return {

...item,

roi,

difficulty,

estimatedDays,

businessPriority,

};


})

.sort((a,b)=>{



/*
|--------------------------------------------------------------------------
| Priority Ranking
|--------------------------------------------------------------------------
*/


const priorityWeight={

critical:4,

high:3,

medium:2,

low:1,

};



if(
priorityWeight[b.priority]
!==
priorityWeight[a.priority]
){

return (

priorityWeight[b.priority]
-
priorityWeight[a.priority]

);

}





/*
|--------------------------------------------------------------------------
| ROI Ranking
|--------------------------------------------------------------------------
*/


if(b.roi!==a.roi){

return b.roi-a.roi;

}





/*
|--------------------------------------------------------------------------
| AI Score
|--------------------------------------------------------------------------
*/


return b.score-a.score;



});



}