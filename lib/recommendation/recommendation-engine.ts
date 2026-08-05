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



function translate(
  locale:"id"|"en",
  id:string,
  en:string
){

  return locale === "en"
    ? en
    : id;

}




export interface RecommendationInput {


locale:
"id"
|
"en";


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



title?:string;


titleKey?:
| "landingPageGrowth"
| "ctrOptimization"
| "conversionTracking"
| "quickWin"
| "contentDecay"
| "mobileOptimization"
| "browserCompatibility"
| "countryOpportunity"
| "eventInsight"
| "seoMonitoring";



description?:string;

recommendation?:string;

impact?:string;



descriptionKey?:string;

recommendationKey?:string;

impactKey?:string;


descriptionValues?:Record<string,string|number>;

recommendationValues?:Record<string,string|number>;

impactValues?:Record<string,string|number>;



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
|"Medium"
|"Hard";


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
generateReason(
item,
data.locale
),



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








let finalRecommendations =
enhanced.sort(
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

)
.slice(0,10);









if(
finalRecommendations.length===0
){


finalRecommendations=[

{

id:"seo-monitoring",

priority:"medium",

score:70,

titleKey:"seoMonitoring",

description:

translate(
data.locale,
"AI belum menemukan masalah kritis.",
"AI has not detected any critical issues."
),

recommendation:

translate(
data.locale,
"Lanjutkan monitoring keyword, traffic, dan halaman utama secara berkala.",
"Continue monitoring keywords, traffic, and important pages regularly."
),

impact:

translate(
data.locale,
"Menjaga stabilitas performa organik.",
"Maintain organic performance stability."
),

category:"SEO",

icon:"search",

confidence:60,

businessValue:60,

reason:

translate(
data.locale,
"Data website belum menunjukkan peluang optimasi besar.",
"Website data does not show significant optimization opportunities yet."
)

}

];
}


return finalRecommendations;


}






function normalizePriority(
priority:unknown
):RecommendationPriority{


const value =
String(priority).toLowerCase();



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



if(data.pages.length>0){

score+=10;

}



if(data.queries.length>0){

score+=10;

}



if(data.topEvents.length>0){

score+=10;

}



if(item.priority==="high"){

score+=10;

}



if(item.priority==="critical"){

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

item:Recommendation,

locale:"id"|"en"

){



switch(item.category){



case "SEO":


return translate(
locale,
"AI menemukan peluang peningkatan visibilitas organik berdasarkan data pencarian.",
"AI found opportunities to improve organic visibility based on search data."
);



case "Content":


return translate(
locale,
"AI menemukan peluang pengembangan konten berdasarkan performa halaman.",
"AI found content growth opportunities based on page performance."
);



case "Conversion":


return translate(
locale,
"AI menemukan peluang peningkatan hasil bisnis melalui optimasi halaman.",
"AI found opportunities to improve business results through page optimization."
);



case "UX":


return translate(
locale,
"AI menemukan peluang peningkatan pengalaman pengguna.",
"AI found opportunities to improve user experience."
);



case "Analytics":


return translate(
locale,
"AI menemukan peluang peningkatan kualitas pengukuran data.",
"AI found opportunities to improve data measurement quality."
);



default:


return translate(
locale,
"AI menemukan peluang optimasi berdasarkan kombinasi data website.",
"AI found optimization opportunities based on combined website data."
);



}


}