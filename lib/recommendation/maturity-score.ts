import type {
  RecommendationInput,
} from "./recommendation-engine";



export interface MaturityAssessment {


  overall:number;


  level:
    | "Beginner"
    | "Developing"
    | "Advanced"
    | "Leading";


  summary:string;


  dimensions:{


    seo:number;


    analytics:number;


    content:number;


    marketing:number;


    userExperience:number;


    dataDriven:number;


  };

}





function clamp(
value:number
){

return Math.max(
0,
Math.min(
100,
Math.round(value)
)
);

}







export function calculateMaturity(

data:RecommendationInput

):MaturityAssessment {



/*
|--------------------------------------------------------------------------
| SEO FOUNDATION
|--------------------------------------------------------------------------
*/


let seo = 40;



if(
data.impressions > 50000
)
seo += 15;



if(
data.impressions > 100000
)
seo += 15;



if(
data.ctr >= 3
)
seo += 15;



if(
data.position <=10
)
seo +=15;







/*
|--------------------------------------------------------------------------
| ANALYTICS CAPABILITY
|--------------------------------------------------------------------------
*/


let analytics = 40;



if(
data.topEvents.length >=3
)
analytics +=20;



if(
data.browser.length >=3
)
analytics +=15;



if(
data.country.length >=3
)
analytics +=25;







/*
|--------------------------------------------------------------------------
| CONTENT AUTHORITY
|--------------------------------------------------------------------------
*/


let content = 35;



if(
data.pages.length >=10
)
content +=25;



if(
data.pages.length >=50
)
content +=20;



if(
data.landingPages.length >=5
)
content +=20;







/*
|--------------------------------------------------------------------------
| MARKETING MATURITY
|--------------------------------------------------------------------------
*/


let marketing = 35;



if(
data.trafficAcquisition.length >=3
)
marketing +=25;



if(
data.trafficAcquisition.length >=5
)
marketing +=20;



if(
data.country.length >=5
)
marketing +=20;







/*
|--------------------------------------------------------------------------
| USER EXPERIENCE
|--------------------------------------------------------------------------
*/


let userExperience = 50;



if(
data.engagementRate >=0.5
)
userExperience +=25;



if(
data.engagementRate >=0.7
)
userExperience +=15;



if(
data.deviceCategory.length >=2
)
userExperience +=10;







/*
|--------------------------------------------------------------------------
| DATA DRIVEN CULTURE
|--------------------------------------------------------------------------
*/


let dataDriven = 40;



if(
data.topEvents.length >0
)
dataDriven +=15;



if(
data.landingPages.length >0
)
dataDriven +=15;



if(
data.browser.length >0
)
dataDriven +=15;



if(
data.trafficAcquisition.length >0
)
dataDriven +=15;








const dimensions = {


seo:clamp(seo),


analytics:clamp(analytics),


content:clamp(content),


marketing:clamp(marketing),


userExperience:clamp(userExperience),


dataDriven:clamp(dataDriven),


};








/*
|--------------------------------------------------------------------------
| Weighted Score
|--------------------------------------------------------------------------
*/


const overall = clamp(

(
dimensions.seo * 0.25 +

dimensions.content * 0.20 +

dimensions.userExperience * 0.20 +

dimensions.analytics * 0.15 +

dimensions.marketing * 0.10 +

dimensions.dataDriven * 0.10

)

);







let level:
MaturityAssessment["level"];


let summary:string;





if(overall >=90){

level="Leading";

summary=
"Website memiliki kematangan digital tinggi. Fokus utama adalah scaling traffic, conversion, dan competitive advantage.";

}


else if(overall >=80){


level="Advanced";

summary=
"Website sudah memiliki fondasi kuat. Optimasi berikutnya berfokus pada peningkatan performa dan peluang pertumbuhan.";

}


else if(overall >=65){


level="Developing";


summary=
"Website berada dalam tahap pengembangan. Beberapa area penting perlu diperkuat untuk mencapai pertumbuhan optimal.";

}


else{


level="Beginner";


summary=
"Website masih membutuhkan peningkatan fundamental pada SEO, konten, pengalaman pengguna, dan pengukuran data.";

}








return {


overall,


level,


summary,


dimensions,


};


}