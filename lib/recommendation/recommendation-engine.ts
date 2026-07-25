import type { GSCRow } from "@/lib/types/gsc";

import type {
  CountryMetric,
  TrafficSourceMetric,
  DeviceCategoryMetric,
  LandingPageMetric,
  EventMetric,
  BrowserMetric,
} from "@/lib/types/ga4";


import { quickWinRule } from "./rules/quick-win";
import { contentDecayRule } from "./rules/content-decay";
import { highImpressionLowCTRRule } from "./rules/high-impression-low-ctr";
import { organicDependencyRule } from "./rules/organic-dependency";
import { mobileFirstRule } from "./rules/mobile-first";
import { browserCompatibilityRule } from "./rules/browser-compatibility";
import { landingPageOptimizationRule } from "./rules/landing-page-optimization";
import { eventInsightRule } from "./rules/event-insight";
import { countryOpportunityRule } from "./rules/country-opportunity";




export interface RecommendationInput {

clicks:number;

impressions:number;

ctr:number;

position:number;


previousClicks:number;

previousImpressions:number;

previousCTR:number;

previousUsers:number;

previousSessions:number;



queries:GSCRow[];

pages:GSCRow[];



users:number;

sessions:number;

pageViews:number;

engagementRate:number;



country:CountryMetric[];

trafficAcquisition:TrafficSourceMetric[];

deviceCategory:DeviceCategoryMetric[];

landingPages:LandingPageMetric[];

topEvents:EventMetric[];

browser:BrowserMetric[];

}





export type RecommendationPriority =
"critical"
|
"high"
|
"medium"
|
"low";






export interface Recommendation {


id:string;


priority:RecommendationPriority;


score:number;


title:string;


description:string;


recommendation:string;


impact:string;


category:
| "SEO"
| "Content"
| "UX"
| "Performance"
| "Conversion"
| "Marketing"
| "Analytics";


icon:string;


confidence?:number;


businessValue?:number;


reason?:string;


roi?:number;


difficulty?:
"Easy"
|
"Medium"
|
"Hard";


estimatedDays?:number;


}



export function generateRecommendations(
data:RecommendationInput
):Recommendation[]{



const recommendations:Recommendation[]=[];




const rules=[

quickWinRule,

highImpressionLowCTRRule,

contentDecayRule,

organicDependencyRule,

mobileFirstRule,

browserCompatibilityRule,

landingPageOptimizationRule,

eventInsightRule,

countryOpportunityRule,

];





for(const rule of rules){


try{


const result = rule(data);


recommendations.push(
...result
);


}

catch(error){

console.error(
"AI rule failed:",
error
);

}


}









// REMOVE DUPLICATE


const unique = Array.from(

new Map(

recommendations.map(
item=>[
item.id,
item
]
)

).values()

);









// ENHANCE SCORE


const enhanced = unique.map(item=>{


const confidence =
calculateConfidence(
item,
data
);



const businessValue =
calculateBusinessValue(
item
);



return {


...item,


priority:
normalizePriority(
item.priority
),



confidence,


businessValue,


reason:
generateReason(item),



score:

Math.min(

100,

Math.round(

item.score *0.5

+

confidence *0.25

+

businessValue *0.25

)

)


};



});









let finalRecommendations: Recommendation[] = enhanced.sort(
(a,b)=>{


const priorityWeight={

critical:4,

high:3,

medium:2,

low:1,

};



const priority =
priorityWeight[b.priority]
-
priorityWeight[a.priority];



if(priority!==0)

return priority;




return (
(b.score ??0)
-
(a.score ??0)
);


}

).slice(0,10);









/*
|--------------------------------------------------------------------------
| AI FALLBACK
|--------------------------------------------------------------------------
*/


if(
finalRecommendations.length===0
){


finalRecommendations = [
{
id:"seo-monitoring",

priority:"medium",

score:70,

title:"Monitoring performa SEO website",

description:
"AI belum menemukan masalah kritis.",

recommendation:
"Lanjutkan monitoring keyword, traffic, dan halaman utama secara berkala.",

impact:
"Menjaga stabilitas performa organik.",

category:"SEO",

icon:"search",

confidence:60,

businessValue:60,

reason:
"Data website belum menunjukkan peluang optimasi besar."

}
];

}





return finalRecommendations;


}

function normalizePriority(
  priority: unknown
): RecommendationPriority {

  const value = String(priority).toLowerCase();


  switch(value){

    case "critical":
      return "critical";


    case "high":
      return "high";


    case "medium":
      return "medium";


    case "low":
      return "low";


    default:
      return "medium";

  }

}

function calculateConfidence(

item:Recommendation,

data:RecommendationInput

){


let score=50;



if(
data.pages.length>0
){

score+=10;

}



if(
data.queries.length>0
){

score+=10;

}



if(
data.topEvents.length>0
){

score+=10;

}



if(
item.priority==="high"
){

score+=10;

}



if(
item.priority==="critical"
){

score+=15;

}



return Math.min(
95,
score
);


}









function calculateBusinessValue(

item:Recommendation

){


const values={


Conversion:90,

SEO:80,

Content:75,

Marketing:70,

UX:65,

Performance:65,

Analytics:60,


};



return values[item.category] ?? 50;


}









function generateReason(

item:Recommendation

){


switch(item.category){


case "SEO":

return "AI menemukan peluang peningkatan visibilitas organik berdasarkan data pencarian.";


case "Content":

return "AI menemukan peluang pengembangan konten berdasarkan performa halaman.";


case "Conversion":

return "AI menemukan peluang peningkatan hasil bisnis melalui optimasi halaman.";


case "UX":

return "AI menemukan peluang peningkatan pengalaman pengguna.";


case "Analytics":

return "AI menemukan peluang peningkatan kualitas pengukuran data.";


default:

return "AI menemukan peluang optimasi berdasarkan kombinasi data website.";


}


}