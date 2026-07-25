import {
  generateGrowthOpportunity,
  GrowthOpportunity,
} from "./growth-opportunity";


export interface ExecutiveSummary {

overview:string;

seoHealth:
"Sangat Baik"
|
"Baik"
|
"Perlu Perhatian";


confidence:number;


trend:
"Growing"
|
"Stable"
|
"Declining";


keyWins:string[];

risks:string[];

opportunities:string[];

nextPriority:string;


keywordInsights:string[];

contentInsights:string[];

technicalInsights:string[];

actionPlan:string[];


growthOpportunities:GrowthOpportunity[];


trafficAnalysis:string;

keywordAnalysis:string;

contentAnalysis:string;

technicalAnalysis:string;

}

interface QueryData {
  query?: string;
  keyword?: string;
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

interface PageData {
  page?: string;
  path?: string;
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
  sessions?: number;
  users?: number;
}

interface LandingPageData {
  page?: string;
  path?: string;
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
  sessions?: number;
  users?: number;
  conversions?: number;
}

interface TrafficData {
  source?: string;
  users?: number;
  sessions?: number;
}

interface DeviceData {
  device?: string;
  users?: number;
}

interface CountryData {
  country?: string;
  users?: number;
}

interface BrowserData {
  browser?: string;
  users?: number;
}

interface ExecutiveSummaryInput {

clicks:number;

previousClicks:number;


impressions:number;

previousImpressions:number;


ctr:number;

previousCTR:number;


users:number;

previousUsers:number;


sessions:number;

previousSessions:number;


queries?: QueryData[];

pages?: PageData[];

landingPages?: LandingPageData[];

trafficAcquisition?: TrafficData[];

deviceCategory?: DeviceData[];

country?: CountryData[];

browser?: BrowserData[];

}

function growth(

current:number,

previous:number

){


if(previous === 0)
return 0;



return (

(
current -
previous
)

/

previous

)

*100;


}

function formatNumber(
value:number
){

return value.toLocaleString(
"id-ID"
);

}

export function generateExecutiveSummary({


clicks,

previousClicks,


impressions,

previousImpressions,


ctr,

previousCTR,


users,

previousUsers,


sessions,

previousSessions,

queries,

pages,

landingPages,

deviceCategory,

trafficAcquisition,

}:ExecutiveSummaryInput):ExecutiveSummary {





const clicksGrowth =
growth(
clicks,
previousClicks
);



const impressionGrowth =
growth(
impressions,
previousImpressions
);



const usersGrowth =
growth(
users,
previousUsers
);



const sessionGrowth =
growth(
sessions,
previousSessions
);

const growingSignals = [

clicksGrowth > 0,

impressionGrowth > 0,

ctr > previousCTR,

usersGrowth >0,

sessionGrowth >0,

].filter(Boolean).length;







let trend:
ExecutiveSummary["trend"];




if(growingSignals >=4)

trend="Growing";


else if(growingSignals <=1)

trend="Declining";


else

trend="Stable";








let score = 100;



if(clicksGrowth <0)
score -=20;


if(impressionGrowth <0)
score -=15;


if(ctr < previousCTR)
score -=15;


if(usersGrowth <0)
score -=25;


if(sessionGrowth <0)
score -=15;



score=Math.max(
40,
Math.min(
100,
score
)
);







let seoHealth:
ExecutiveSummary["seoHealth"];



if(score >=85)

seoHealth="Sangat Baik";


else if(score >=65)

seoHealth="Baik";


else

seoHealth="Perlu Perhatian";









let overview =

`Performa website pada periode ini menunjukkan kondisi ${
trend==="Growing"
?
"positif dengan peningkatan trafik dan visibilitas organik"
:
trend==="Declining"
?
"penurunan performa yang membutuhkan tindakan optimasi"
:
"stabil dengan peluang peningkatan lebih lanjut"
}.
`;





overview +=

`Organic traffic berubah sebesar ${
clicksGrowth.toFixed(1)
}%, impression ${
impressionGrowth.toFixed(1)
}%, pengguna ${
usersGrowth.toFixed(1)
}%, dan sesi ${
sessionGrowth.toFixed(1)
}%.`;

const keyWins:string[]=[];

const risks:string[]=[];

const opportunities:string[]=[];

const technicalInsights:string[]=[];

const actionPlan:string[]=[];

if(
impressions > previousImpressions
&&
ctr < previousCTR
){

technicalInsights.push(

"Website mendapatkan peningkatan visibilitas, tetapi rasio klik menurun. Fokus optimasi title tag dan meta description."

);


actionPlan.push(

"Optimalkan halaman dengan impression tinggi namun CTR rendah untuk mendapatkan tambahan trafik tanpa membuat konten baru."

);


}

if(clicksGrowth >0){

keyWins.push(
`Organic clicks meningkat ${clicksGrowth.toFixed(1)}% dibanding periode sebelumnya.`
);

}



if(impressionGrowth >0){

keyWins.push(
`Visibilitas pencarian meningkat dengan impression bertambah ${impressionGrowth.toFixed(1)}%.`
);

}



if(ctr > previousCTR){

keyWins.push(
"CTR meningkat yang menunjukkan peningkatan daya tarik hasil pencarian."
);

}








if(impressions > previousImpressions && ctr < previousCTR){


risks.push(
"Website mendapatkan banyak impression tetapi belum maksimal mengubahnya menjadi klik."
);



opportunities.push(
"Optimalkan title tag, meta description, dan rich snippet pada halaman dengan impression tinggi."
);


}

if(
clicksGrowth > 0
){

actionPlan.push(

`Pertahankan halaman yang menghasilkan trafik organik dan lakukan internal linking menuju halaman prioritas.`

);


}



if(
usersGrowth < 0
){

actionPlan.push(

"Evaluasi landing page utama karena penurunan pengguna dapat mengindikasikan masalah relevansi konten atau pengalaman pengguna."

);


}

if(clicks < previousClicks){


risks.push(
"Terdapat indikasi penurunan trafik organik."
);


opportunities.push(
"Lakukan content refresh pada halaman dengan performa menurun."
);


}








if(users < previousUsers){


risks.push(
"Jumlah pengguna mengalami penurunan dibanding periode sebelumnya."
);


opportunities.push(
"Evaluasi landing page dan pengalaman pengguna."
);


}








if(
opportunities.length===0
){


opportunities.push(

"Pertahankan strategi SEO saat ini dan fokus meningkatkan conversion."

);


}







const confidence =

Math.min(

98,

Math.max(

75,

80 +

(
impressions >0 ? 10 : 0

)

+

(
users >0 ? 5 : 0

)

)

);









let nextPriority =
"Pertahankan performa SEO dan lakukan optimasi berkelanjutan.";





if(risks.length >0){

nextPriority =
opportunities[0];

}

const performanceAnalysis:string[]=[];


const keywordInsights:string[]=[];


const contentInsights:string[]=[];


const recommendations:string[]=[];



/*
 PERFORMANCE ANALYSIS
*/


if(clicksGrowth > 0){

performanceAnalysis.push(

`Traffic organik meningkat ${clicksGrowth.toFixed(1)}% dibanding periode sebelumnya.`

);

}


if(impressionGrowth > 0){

performanceAnalysis.push(

`Visibilitas Google meningkat dengan impression bertambah ${impressionGrowth.toFixed(1)}%.`

);

}


if(usersGrowth > 0){

performanceAnalysis.push(

`Jumlah pengguna meningkat ${usersGrowth.toFixed(1)}% yang menunjukkan peningkatan jangkauan website.`

);

}





/*
 KEYWORD ANALYSIS
*/


const topQueries =
queries
?.slice(0,5)
?? [];



topQueries.forEach((item: QueryData)=>{


keywordInsights.push(

`${item.query ?? item.keyword} menghasilkan ${(
item.clicks ?? 0
).toLocaleString("id-ID")} klik dengan CTR ${
item.ctr ?? 0
}%.`

);


});






if(keywordInsights.length===0){

keywordInsights.push(

"Belum tersedia data keyword utama."

);

}







/*
 CONTENT ANALYSIS
*/


const topPages =
landingPages
?.slice(0,5)
||
pages
?.slice(0,5)
||
[];

topPages.forEach((item: LandingPageData | PageData)=>{


contentInsights.push(

`${item.page ?? item.path ?? "Halaman"} memberikan kontribusi trafik terbesar dengan ${
(
item.clicks ??
item.sessions ??
0
).toLocaleString("id-ID")
} kunjungan.`

);


});





if(contentInsights.length===0){

contentInsights.push(

"Belum tersedia analisis halaman terbaik."

);

}






/*
 RECOMMENDATION ENGINE
*/


if(
impressions > previousImpressions &&
ctr < previousCTR
){

recommendations.push(

"Optimalkan judul halaman dan meta description untuk meningkatkan CTR dari impression tinggi."

);

}



if(clicksGrowth > 0){

recommendations.push(

"Pertahankan halaman dengan trafik tinggi dan tambahkan internal linking menuju halaman strategis."

);

}



if(usersGrowth < 0){

recommendations.push(

"Evaluasi pengalaman pengguna pada landing page dengan trafik terbesar."

);

}

if(actionPlan.length===0){

actionPlan.push(

"Lanjutkan strategi SEO saat ini dan lakukan monitoring performa secara berkala."

);

}

const trafficAnalysis =

clicksGrowth > 0

?

`Traffic organik mengalami peningkatan ${clicksGrowth.toFixed(1)}%. 
Kenaikan ini menunjukkan visibilitas website di mesin pencari mulai membaik.`

:

`Traffic organik mengalami penurunan ${Math.abs(clicksGrowth).toFixed(1)}%. 
Perlu dilakukan evaluasi terhadap keyword dan halaman yang kehilangan performa.`;

const keywordAnalysis =

queries &&
queries.length > 0

?

`Website memiliki ${queries.length} keyword yang menghasilkan impression.
Prioritaskan keyword dengan impression tinggi namun CTR rendah untuk meningkatkan klik.`

:

"Data keyword belum tersedia.";

const contentAnalysis =

landingPages &&
landingPages.length > 0

?

`Terdapat ${landingPages.length} landing page utama yang berkontribusi terhadap trafik.
Lakukan optimasi internal linking dan content refresh secara berkala.`

:

"Tidak ditemukan data landing page.";

const technicalAnalysis =

deviceCategory &&
deviceCategory.length > 0

?

`Performa pengguna berasal dari beberapa perangkat.
Pastikan pengalaman mobile tetap optimal karena mayoritas trafik modern berasal dari mobile.`

:

"Belum tersedia analisis perangkat.";

const growthOpportunities =

generateGrowthOpportunity({

clicks,

previousClicks,

impressions,

previousImpressions,

ctr,

previousCTR,

users,

previousUsers,

queries: queries ?? [],

landingPages: landingPages ?? [],

});

return {


overview,


seoHealth,


confidence,


trend,


keyWins,


risks,


opportunities,


nextPriority,


keywordInsights,


contentInsights,


technicalInsights,


actionPlan,


growthOpportunities,


trafficAnalysis,


keywordAnalysis,


contentAnalysis,


technicalAnalysis,


};

}