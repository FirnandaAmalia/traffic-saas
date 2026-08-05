import type {
  PrioritizedRecommendation,
} from "./prioritizer";

import type {
  RecommendationInput,
} from "./recommendation-engine";


export interface BusinessImpact {

  potentialClicks:number;

  potentialUsers:number;

  potentialConversion:number;

  estimatedWeeks:number;

  roiScore:number;


  trafficGrowth:
    | "Very High"
    | "High"
    | "Moderate"
    | "Low";


  revenueOpportunity:
    | "High Revenue Potential"
    | "Moderate Growth Opportunity"
    | "Incremental Improvement";


  businessPriority:
    | "High"
    | "Medium"
    | "Low";

}



interface BusinessImpactInput {

  recommendations:
    PrioritizedRecommendation[];

  data:
    RecommendationInput;

}



export function calculateBusinessImpact({

recommendations,

data,

}:BusinessImpactInput):BusinessImpact {



const clicks =
data.clicks ?? 0;


const impressions =
data.impressions ?? 0;


const users =
data.users ?? 0;


const ctr =
data.ctr ?? 0;


const engagementRate =
data.engagementRate ?? 0;




/*
 Traffic Opportunity
*/


const opportunities =
data.queries.filter(
(item)=>{

const position =
item.position ?? 999;


const impression =
item.impressions ?? 0;


return (
position >= 4 &&
position <= 20 &&
impression >= 50
);

});



let potentialClicks = 0;



for(
const keyword of opportunities
){


const position =
keyword.position ?? 999;


const keywordCTR =
keyword.ctr ?? 0;


const keywordImpression =
keyword.impressions ?? 0;



let targetCTR = 0.03;


if(position <= 10){

targetCTR = 0.05;

}


if(position <= 5){

targetCTR = 0.07;

}



const ctrGap =
Math.max(
0,
targetCTR - keywordCTR
);



const multiplier =
position >=4 && position <=10
? 1.2
: position > 10
? 0.8
: 1;



potentialClicks +=
keywordImpression *
ctrGap *
multiplier;


}




if(
potentialClicks === 0 &&
impressions > 0
){


const targetCTR =
ctr < 0.02
? 0.035
: ctr * 1.3;



potentialClicks =
impressions *
Math.max(
0,
targetCTR - ctr
) *
0.3;


}



potentialClicks =
Math.round(
Math.max(
0,
potentialClicks
)
);





/*
 User Opportunity
*/


const userRatio =
clicks > 0 && users > 0
? users / clicks
: 0.7;



const potentialUsers =
Math.round(
potentialClicks * userRatio
);





/*
 Conversion Impact
*/


let conversion = 2;



if(
engagementRate >= 0.6
){

conversion += 3;

}
else if(
engagementRate >= 0.4
){

conversion += 2;

}



if(
data.topEvents.length > 0
){

conversion += 2;

}



if(
data.landingPages.length > 0
){

conversion += 2;

}

if(
recommendations.some(
(item)=>
item.titleKey === "conversionTracking"
)
){

conversion += 3;

}



conversion =
Math.min(
12,
conversion
);






/*
 ROI Score
*/


let impactScore = 0;

let effortScore = 0;



for(
const item of recommendations
){


impactScore +=
item.roi ?? 3;



effortScore +=
item.difficulty === "Easy"
? 1
: item.difficulty === "Medium"
? 2
: 3;


}



let roiScore = 50;



if(
recommendations.length > 0
){


roiScore +=
(
impactScore /
recommendations.length
) * 8;


roiScore -=
effortScore * 1.5;


}



roiScore =
Math.round(
Math.min(
100,
Math.max(
0,
roiScore
)
)
);







/*
 Implementation
*/


const totalDays =
recommendations.reduce(
(total,item)=>
total +
(item.estimatedDays ?? 7),

0
);



const estimatedWeeks =
Math.max(
1,
Math.ceil(
totalDays / 14
)
);






/*
 Traffic Growth
*/


let trafficGrowth:
BusinessImpact["trafficGrowth"];



if(
potentialClicks >= 30000
){

trafficGrowth =
"Very High";

}
else if(
potentialClicks >= 10000
){

trafficGrowth =
"High";

}
else if(
potentialClicks >= 3000
){

trafficGrowth =
"Moderate";

}
else{

trafficGrowth =
"Low";

}







/*
 Revenue Opportunity
*/


let revenueOpportunity:
BusinessImpact["revenueOpportunity"];



if(
conversion >= 9
){

revenueOpportunity =
"High Revenue Potential";

}
else if(
conversion >= 5
){

revenueOpportunity =
"Moderate Growth Opportunity";

}
else{

revenueOpportunity =
"Incremental Improvement";

}







/*
 Business Priority
*/


let businessPriority:
BusinessImpact["businessPriority"];



const hasCritical =
recommendations.some(
(item)=>
item.priority === "critical"
);



if(
hasCritical ||
roiScore >= 80 ||
potentialClicks >= 10000
){

businessPriority =
"High";

}
else if(
roiScore >= 60 ||
potentialClicks >= 3000
){

businessPriority =
"Medium";

}
else{

businessPriority =
"Low";

}





return {

potentialClicks,

potentialUsers,

potentialConversion:
conversion,

estimatedWeeks,

roiScore,

trafficGrowth,

revenueOpportunity,

businessPriority,

};


}