import type { DashboardData } from "@/lib/types/dashboard";
import type { GSCRow } from "@/lib/types/gsc";

import type { ExecutiveSummary } from "@/lib/ai/executive-summary";

import type {
  ReportData,
  ReportMetric,
  SEOInsight,
  SEOActionPlan,
  SEOHealthScore,
  OpportunityScore,
  KeywordOpportunity,
  ContentOpportunity,
  TrafficDiagnosis,
  BusinessImpact,
} from "./report-types";

import {
  getDateRange,
  getRangeLabel,
  type DateRange,
} from "@/lib/date-range";

/*
|--------------------------------------------------------------------------
| Growth Calculator
|--------------------------------------------------------------------------
*/

function calculateGrowth(
  current:number,
  previous:number
):number|null {


  if(previous === 0){

    return null;

  }

  return Number(
    (
      ((current - previous) / previous)
      *
      100

    ).toFixed(1)
  );

}

/*
|--------------------------------------------------------------------------
| Metric Builder
|--------------------------------------------------------------------------
*/

function metric(
  title:string,
  value:number,
  previousValue:number
):ReportMetric {


  return {

    title,

    value,

    previousValue,

    change:
      calculateGrowth(
        value,
        previousValue
      ),

  };

}

/*
|--------------------------------------------------------------------------
| SEO Health Score
|--------------------------------------------------------------------------
*/

function buildSEOHealthScore(
  dashboard:DashboardData
):SEOHealthScore {

  const trafficGrowth =
    calculateGrowth(
      dashboard.data.clicks,
      dashboard.data.previousClicks
    ) ?? 0;

  const visibilityGrowth =
    calculateGrowth(
      dashboard.data.impressions,
      dashboard.data.previousImpressions
    ) ?? 0;

  const engagementGrowth =
    calculateGrowth(
      dashboard.data.engagementRate,
      dashboard.data.previousEngagementRate
    ) ?? 0;

  /*
  |--------------------------------------------------------------------------
  | Traffic Score
  |--------------------------------------------------------------------------
  */

  const trafficScore =
    Math.max(
      0,
      Math.min(
        100,
        70 + trafficGrowth
      )
    );

  /*
  |--------------------------------------------------------------------------
  | Visibility Score
  |--------------------------------------------------------------------------
  */

  const visibilityScore =
    Math.max(
      0,
      Math.min(
        100,
        70 + visibilityGrowth / 2
      )
    );

  /*
  |--------------------------------------------------------------------------
  | Content Score
  |--------------------------------------------------------------------------
  */


  const contentScore =
    Math.min(
      100,
      60 +
      Math.min(
        dashboard.pages.length,
        40
      )
    );

  /*
  |--------------------------------------------------------------------------
  | Engagement Score
  |--------------------------------------------------------------------------
  */


  const engagementScore =
    Math.max(
      50,
      Math.min(
        100,
        70 + engagementGrowth
      )
    );

  const score =
    Math.round(
      (
        trafficScore +
        visibilityScore +
        contentScore +
        engagementScore

      )
      /
      4
    );

  const status =

    score >= 85

      ?
      "Excellent"

      :

    score >=70

      ?
      "Healthy"

      :

    score >=50

      ?
      "Needs Optimization"

      :

      "Critical";

  return {


    score,


    status,


    trafficScore:
      Math.round(
        trafficScore
      ),



    visibilityScore:
      Math.round(
        visibilityScore
      ),



    contentScore:
      Math.round(
        contentScore
      ),



    engagementScore:
      Math.round(
        engagementScore
      ),


  };


}

/*
|--------------------------------------------------------------------------
| Business Impact Generator
|--------------------------------------------------------------------------
*/

function generateBusinessImpact(
 dashboard:DashboardData
):string {


const trafficDecline =
dashboard.data.clicks <
dashboard.data.previousClicks;



if(trafficDecline){

return (

"Penurunan traffic organik berpotensi mengurangi jumlah pengunjung berkualitas dari mesin pencari. Prioritas utama adalah memulihkan halaman dan keyword yang mengalami penurunan performa."

);

}



return (

"Performa organic search menunjukkan kontribusi positif terhadap akuisisi pengguna. Fokus berikutnya adalah memperbesar cakupan keyword dan meningkatkan peluang konversi."

);


}

/*
|--------------------------------------------------------------------------
| SEO Wins Generator
|--------------------------------------------------------------------------
*/

function generateSEOWins(
 dashboard:DashboardData
):string[]{

 const wins:string[]=[];

 if(
 dashboard.data.impressions > 0
 ){

 wins.push(

 "Website masih memiliki visibility pada Google Search melalui jumlah impression yang tersedia."

 );

 }

 if(
 dashboard.pages.length > 10
 ){

 wins.push(

 "Website memiliki aset halaman yang cukup untuk dikembangkan menjadi topical authority."

 );

 }

 if(
 dashboard.data.engagementRate > 50
 ){

 wins.push(

 "Pengguna menunjukkan tingkat engagement yang baik terhadap konten website."

 );

 }



 return wins;


}

/*
|--------------------------------------------------------------------------
| Executive Recommendation
|--------------------------------------------------------------------------
*/


function generateExecutiveRecommendation(
 dashboard:DashboardData
):string {


 const trafficDecline =
 dashboard.data.clicks <
 dashboard.data.previousClicks;



 if(trafficDecline){


 return (

 "Dalam 30 hari ke depan, prioritas utama adalah memulihkan traffic organik melalui audit halaman yang kehilangan performa, optimasi CTR, dan refresh konten yang mengalami penurunan ranking."

 );


 }

 return (

 "Dalam 30 hari ke depan, strategi dapat diarahkan pada ekspansi keyword, pengembangan konten baru, dan peningkatan konversi dari traffic yang sudah tersedia."

 );


}

/*
|--------------------------------------------------------------------------
| AI SEO Insight Engine
|--------------------------------------------------------------------------
*/

function generateSEOInsights(
 dashboard:DashboardData
):SEOInsight[] {


const insights:SEOInsight[] = [];



const clickGrowth =
calculateGrowth(
 dashboard.data.clicks,
 dashboard.data.previousClicks
)
?? 0;



const ctr =

dashboard.data.impressions === 0

?

0

:

(
 dashboard.data.clicks /
 dashboard.data.impressions
)
*
100;




/*
|--------------------------------------------------------------------------
| Traffic Decline
|--------------------------------------------------------------------------
*/


if(
clickGrowth < 0
){


insights.push({

title:
"Organic Traffic Decline",


description:

`Traffic organik mengalami penurunan sebesar ${Math.abs(clickGrowth)}% dibanding periode sebelumnya. Kondisi ini menunjukkan adanya halaman atau keyword yang kehilangan performa.`,



priority:
"HIGH",



impact:

"Penurunan traffic dapat mengurangi jumlah pengunjung potensial dan peluang konversi dari channel organik.",



recommendation:

"Audit halaman dengan penurunan klik terbesar, evaluasi keyword yang turun posisi, dan lakukan content refresh."


});


}





/*
|--------------------------------------------------------------------------
| CTR Opportunity
|--------------------------------------------------------------------------
*/


if(
ctr < 5 &&
dashboard.data.impressions > 0
){


insights.push({

title:
"Search CTR Optimization Opportunity",



description:

`Website memperoleh ${dashboard.data.impressions.toLocaleString()} impression dengan CTR ${ctr.toFixed(2)}%. Visibility sudah tersedia namun belum maksimal menghasilkan klik.`,



priority:
"HIGH",



impact:

"Peningkatan CTR dapat meningkatkan traffic tanpa harus menambah jumlah konten baru.",



recommendation:

"Optimalkan title tag, meta description, structured data, dan relevansi search intent."

});


}





/*
|--------------------------------------------------------------------------
| Content Opportunity
|--------------------------------------------------------------------------
*/


if(
dashboard.pages.length > 10
){


insights.push({

title:
"Content Growth Opportunity",


description:

`Website memiliki ${dashboard.pages.length} halaman yang dapat dikembangkan menjadi sumber traffic jangka panjang.`,



priority:
"MEDIUM",



impact:

"Penguatan struktur konten dapat meningkatkan topical authority dan peluang ranking keyword terkait.",



recommendation:

"Bangun internal linking, update artikel lama, dan buat konten pendukung berdasarkan keyword opportunity."


});

}

return insights;


}

/*
|--------------------------------------------------------------------------
| SEO Action Plan
|--------------------------------------------------------------------------
*/

function generateActionPlan(
 dashboard:DashboardData
):SEOActionPlan[] {


const plans:SEOActionPlan[] = [];



const trafficDecline =
dashboard.data.clicks <
dashboard.data.previousClicks;



const ctr =

dashboard.data.impressions === 0

?

0

:

(
dashboard.data.clicks /
dashboard.data.impressions
)
*
100;



const engagementDecline =

dashboard.data.engagementRate <
dashboard.data.previousEngagementRate;



/*
|--------------------------------------------------------------------------
| Traffic
|--------------------------------------------------------------------------
*/


if(trafficDecline){


plans.push({

period:
"Priority 1",

objective:
"Recover Organic Traffic",

reason:
"Traffic organik mengalami penurunan dibanding periode sebelumnya.",

tasks:[

"Identifikasi halaman dengan kehilangan klik terbesar.",

"Analisis keyword yang mengalami penurunan posisi.",

"Lakukan refresh konten pada halaman dengan peluang recovery tertinggi."

]

});


}
else {


plans.push({

period:
"Priority 1",

objective:
"Scale Organic Growth",

reason:
"Traffic organik menunjukkan performa positif sehingga peluang ekspansi perlu diprioritaskan.",

tasks:[

"Analisis keyword dengan pertumbuhan tertinggi.",

"Kembangkan halaman dengan performa terbaik.",

"Perluas cakupan keyword."

]

});


}





/*
|--------------------------------------------------------------------------
| CTR
|--------------------------------------------------------------------------
*/


if(ctr < 5){


plans.push({

period:
"Priority 2",

objective:
"Improve Search CTR",

reason:
"Website memiliki visibility tetapi belum maksimal menghasilkan klik.",

tasks:[

"Optimasi title tag.",

"Perbaiki meta description.",

"Sesuaikan konten dengan search intent."

]

});


}





/*
|--------------------------------------------------------------------------
| Content
|--------------------------------------------------------------------------
*/


if(
dashboard.pages.length > 10
){


plans.push({

period:
"Priority 3",

objective:
"Expand Content Authority",

reason:
"Website memiliki aset halaman yang dapat dikembangkan.",

tasks:[

"Bangun topical cluster.",

"Tambahkan internal linking.",

"Kembangkan konten berdasarkan keyword opportunity."

]

});


}





/*
|--------------------------------------------------------------------------
| Engagement
|--------------------------------------------------------------------------
*/


if(engagementDecline){


plans.push({

period:
"Priority 4",

objective:
"Improve User Engagement",

reason:
"Interaksi pengguna mengalami penurunan dibanding periode sebelumnya.",

tasks:[

"Evaluasi landing page utama.",

"Perbaiki struktur konten.",

"Optimasi user journey."

]

});


}



return plans;


}

interface BuildReportOptions {

projectName:string;

website:string;

period:DateRange;

dashboard:DashboardData;

summary:ExecutiveSummary;

}

export function buildReport({

projectName,

website,

period,

dashboard,

summary,

}:BuildReportOptions):ReportData {

const dateRange =
getDateRange(period);

const keywordOpportunities =
generateKeywordOpportunities(
  dashboard
);


console.log(
  "FINAL KEYWORD REPORT =",
  keywordOpportunities.length
);

return {


projectName,


website,

generatedAt:
new Date(),


businessImpact:
generateBusinessRisk(
 dashboard
),
period:{

label:
getRangeLabel(period),


startDate:
dateRange.startDate,


endDate:
dateRange.endDate,


},

summary:{


seoHealth:
summary.seoHealth,


confidence:
summary.confidence,


overview:
summary.overview,



businessCondition:

dashboard.data.clicks <
dashboard.data.previousClicks

?

"Traffic organik mengalami penurunan dibanding periode sebelumnya."

:

"Website menunjukkan pertumbuhan traffic organik.",



mainRisk:

dashboard.data.clicks <
dashboard.data.previousClicks

?

"Penurunan traffic organik dapat mengurangi peluang akuisisi pengguna."

:

"Risiko utama adalah mempertahankan pertumbuhan secara konsisten.",



mainOpportunity:

dashboard.data.impressions >
dashboard.data.clicks * 20

?

"Meningkatkan CTR dari keyword dengan impression tinggi."

:

"Memperluas cakupan keyword dan konten.",



seoWins:
generateSEOWins(
 dashboard
),



executiveRecommendation:
generateExecutiveRecommendation(
 dashboard
),



opportunities:
summary.opportunities,



recommendations:
[
"Prioritaskan halaman dengan impression tinggi tetapi CTR rendah.",

"Perbarui konten yang mengalami penurunan performa organik.",

"Bangun cluster konten untuk meningkatkan topical authority.",
],


},

seoHealthScore:
buildSEOHealthScore(
dashboard
),

aiInsights:
generateSEOInsights(
 dashboard
),

trafficDiagnosis:
generateTrafficDiagnosis(
dashboard
),


keywordOpportunities,

contentOpportunities:
generateContentOpportunities(
dashboard
),



actionPlan:
generateActionPlan(
 dashboard
),


opportunities:
generateOpportunities(
 dashboard
),

metrics:{


clicks:
metric(
"Clicks",
dashboard.data.clicks,
dashboard.data.previousClicks
),


impressions:
metric(
"Impressions",
dashboard.data.impressions,
dashboard.data.previousImpressions
),


users:
metric(
"Users",
dashboard.data.users,
dashboard.data.previousUsers
),


sessions:
metric(
"Sessions",
dashboard.data.sessions,
dashboard.data.previousSessions
),


pageViews:
metric(
"Page Views",
dashboard.data.pageViews,
dashboard.data.previousPageViews
),


engagementRate:
metric(
"Engagement Rate",
dashboard.data.engagementRate,
dashboard.data.previousEngagementRate
),


},


topQueries:
dashboard.queries,

topPages:
dashboard.pages,

gscHistory:
dashboard.gscHistory,

ga4History:
dashboard.ga4History,

country:
dashboard.country,

trafficAcquisition:
dashboard.trafficAcquisition,

deviceCategory:
dashboard.deviceCategory,

browser:
dashboard.browser,

landingPages:
dashboard.landingPages,

topEvents:
dashboard.topEvents,

gscRawData:
transformGSCRawData(
  dashboard.gscRawData
),
};

}

/*
|--------------------------------------------------------------------------
| SEO Opportunity Generator
|--------------------------------------------------------------------------
*/

function normalizeKeyword(
  item: {
    keys?: string[];
    query?: string;
    keyword?: string;
  }
): string {

  return (
    item.keys?.[0]
    ??
    item.query
    ??
    item.keyword
    ??
    ""
  )
  .toString()
  .trim();

}

function classifyKeyword(
 keyword:string
):
"SAFE"
|
"COMMERCIAL"
|
"INFORMATIONAL"
|
"SENSITIVE"
{

const text =
keyword.toLowerCase();



const sensitiveKeywords = [
"bokep",
"porno",
"porn",
"sex",
"xxx",
"nude",
"jav",
"adult",
"18+",
"erotic",
];


if(
 sensitiveKeywords.some(
 word =>
 text.includes(word)
 )
){

 return "SENSITIVE";

}



const commercialKeywords = [
"buy",
"price",
"harga",
"jual",
"order",
"service",
"jasa",
"promo",
"discount",
"review",
"terbaik",
"murah",
];


if(
 commercialKeywords.some(
 word =>
 text.includes(word)
 )
){

 return "COMMERCIAL";

}



const informationalKeywords = [
"cara",
"apa",
"kenapa",
"tutorial",
"guide",
"pengertian",
"contoh",
];


if(
 informationalKeywords.some(
 word =>
 text.includes(word)
 )
){

 return "INFORMATIONAL";

}



return "SAFE";

}

function classifyIntent(
 keyword:string
):
"TRANSACTIONAL"
|
"INFORMATIONAL"
|
"NAVIGATIONAL"
|
"UNKNOWN"
{


const text =
keyword.toLowerCase();



const transactional = [

"harga",
"beli",
"jual",
"promo",
"diskon",
"murah",
"order",
"service",
"jasa",

];



if(
transactional.some(
word =>
text.includes(word)
)
){

return "TRANSACTIONAL";

}



const informational=[

"cara",
"apa",
"kenapa",
"mengapa",
"tutorial",
"panduan",
"pengertian",

];



if(
informational.some(
word =>
text.includes(word)
)
){

return "INFORMATIONAL";

}



const navigational=[

"login",
"website",
"alamat",
"kontak",
"official",

];

if(
navigational.some(
word =>
text.includes(word)
)
){

return "NAVIGATIONAL";

}

return "UNKNOWN";

}

function calculateBusinessValue(
 intent:
 "TRANSACTIONAL"
 |
 "INFORMATIONAL"
 |
 "NAVIGATIONAL"
 |
 "UNKNOWN",

 opportunity:
"HIGH"
|
"MEDIUM"
|
"LOW"

):

"HIGH"
|
"MEDIUM"
|
"LOW"
{


if(
intent==="TRANSACTIONAL"
&&
opportunity==="HIGH"
){

return "HIGH";

}



if(
intent==="INFORMATIONAL"
){

return "MEDIUM";

}



if(
opportunity==="HIGH"
){

return "MEDIUM";

}



return "LOW";


}

function transformGSCRawData(
 rows:GSCRow[]
){


return rows.map(row=>({

date:"",

query:
row.keys?.[0] ?? "",

page:
row.keys?.[1] ?? "",

clicks:
row.clicks ?? 0,

impressions:
row.impressions ?? 0,

ctr:
Number(
(
(row.ctr ?? 0)*100
).toFixed(2)
),

position:
Number(
(row.position ?? 0)
.toFixed(2)
),

}));

}

/*
|--------------------------------------------------------------------------
| Content Opportunity Generator
|--------------------------------------------------------------------------
*/

function generateContentOpportunities(
  dashboard:DashboardData
):ContentOpportunity[] {


  return dashboard.pages

  .sort(
    (a,b)=>
      (b.impressions ?? 0)
      -
      (a.impressions ?? 0)
  )

  .slice(0,10)

  .map(page=>{


    const clicks =
      page.clicks ?? 0;


    const impressions =
      page.impressions ?? 0;



    const ctr =

      impressions === 0

      ?

      0

      :

      (
        clicks /
        impressions
      )
      *
      100;



    const score =


      impressions > 100000

      ?

      90


      :

      impressions > 10000

      ?

      70


      :

      40;



    const priority =


      score >= 80

      ?

      "HIGH"


      :

      score >=50

      ?

      "MEDIUM"


      :

      "LOW";



    const issue =


      ctr < 2

      ?

      "Impression tinggi tetapi CTR rendah."

      :

      "Halaman memiliki visibility namun membutuhkan penguatan authority.";



    const impact =


      ctr < 2

      ?

      "Optimasi CTR berpotensi meningkatkan traffic tanpa membuat halaman baru."

      :

      "Penguatan halaman dapat meningkatkan ranking keyword terkait.";



    const recommendation =


      ctr < 2

      ?

      "Optimasi title tag, meta description, dan search intent."

      :

      "Tambahkan internal linking dan buat konten pendukung.";



    return {


      page:
        page.keys?.[0] ?? "-",


      clicks,


      impressions,


      ctr:
        Number(
          ctr.toFixed(2)
        ),


      score,


      issue,


      impact,


      recommendation,


      priority,


    };


  });


}

function generateOpportunities(
 dashboard:DashboardData
):OpportunityScore[] {


const opportunities:OpportunityScore[] = [];



if(
 dashboard.data.impressions >
 dashboard.data.clicks * 20
){

opportunities.push({

score:90,

title:
"CTR Growth Opportunity",

description:
"Website mendapatkan banyak impression dari Google Search namun sebagian besar belum berubah menjadi klik.",


impact:
"Meningkatkan CTR dapat menambah traffic organik tanpa perlu membuat banyak konten baru.",


priority:
"HIGH",


recommendation:
"Optimasi title tag, meta description, rich result, dan pencocokan search intent."

});


}




if(
 dashboard.pages.length > 10
){

opportunities.push({

score:75,

title:
"Content Authority Expansion",


description:
"Website memiliki aset konten yang dapat dikembangkan menjadi cluster topik yang lebih kuat.",


impact:
"Meningkatkan topical authority dan peluang ranking pada keyword terkait.",


priority:
"MEDIUM",


recommendation:
"Tambahkan internal linking, buat konten pendukung, dan update artikel lama."

});


}




if(
 dashboard.data.clicks <
 dashboard.data.previousClicks
){

opportunities.push({

score:85,


title:
"Organic Traffic Recovery",


description:
"Terjadi penurunan klik organik dibandingkan periode sebelumnya.",


impact:
"Traffic potensial dan peluang konversi dapat menurun apabila tidak segera diperbaiki.",


priority:
"HIGH",


recommendation:
"Audit halaman yang kehilangan klik, evaluasi keyword turun, dan lakukan content refresh."

});


}



return opportunities;

}

function generateKeywordOpportunities(
  dashboard:DashboardData
):KeywordOpportunity[] {


  const keywordRows =
    dashboard.queries.filter(
      item =>
        Boolean(
          normalizeKeyword(item)
        )
    );


  return keywordRows

  .sort(
    (a,b)=>
      (b.impressions ?? 0)
      -
      (a.impressions ?? 0)
  )

  .slice(0,100)

  .map(item=>{


    const keyword =
      normalizeKeyword(item);



    const clicks =
      item.clicks ?? 0;



    const impressions =
      item.impressions ?? 0;



    const ctr =
      impressions === 0
      ?
      0
      :
      (
        clicks /
        impressions
      )
      *
      100;



    /*
    |--------------------------------------------------------------------------
    | Opportunity Score
    |--------------------------------------------------------------------------
    */


    const ctrScore =

      ctr < 2
      ?
      40

      :

      ctr < 5
      ?
      25

      :
      10;



    const visibilityScore =

      impressions > 100000

      ?
      30

      :

      impressions > 10000

      ?
      20

      :
      10;



    const trafficScore =

      clicks > 1000

      ?
      30

      :

      clicks > 100

      ?
      20

      :
      10;



    const baseScore =
      ctrScore +
      visibilityScore +
      trafficScore;



    const category =
      classifyKeyword(
        keyword
      );



    const intent =
      classifyIntent(
        keyword
      );



    const adjustedScore =

      category === "COMMERCIAL"

      ?

      Math.min(
        100,
        baseScore + 15
      )

      :

      baseScore;



    const opportunity =

      adjustedScore >= 70

      ?
      "HIGH"

      :

      adjustedScore >=45

      ?
      "MEDIUM"

      :
      "LOW";



    const businessValue =
      calculateBusinessValue(
        intent,
        opportunity
      );



    const displayKeyword =

      category === "SENSITIVE"

      ?

      "Restricted Search Query"

      :

      keyword;



    const visibilityStatus =

      category === "SENSITIVE"

      ?

      "HIDDEN"

      :

      "VISIBLE";



    const reason =


      ctr < 2

      ?

      "Keyword memiliki impression tinggi tetapi belum menghasilkan klik optimal."

      :

      impressions > 10000

      ?

      "Keyword memiliki peluang traffic karena memperoleh exposure tinggi."

      :

      "Keyword memiliki performa stabil dan perlu dipertahankan.";



    const recommendation =


      opportunity === "HIGH"

      ?

      "Optimasi title, meta description, search intent, dan landing page."

      :

      opportunity === "MEDIUM"

      ?

      "Perkuat internal linking dan buat konten pendukung."

      :

      "Monitor posisi keyword dan pertahankan performa.";



    return {


      keyword,


      displayKeyword,


      clicks,


      impressions,


      ctr:
        Number(
          ctr.toFixed(2)
        ),


      score:
        adjustedScore,


      category,


      visibilityStatus,


      intent,


      businessValue,


      reason,


      recommendation,


      opportunity,


    };


  });


}

function generateTrafficDiagnosis(
dashboard:DashboardData
):TrafficDiagnosis {


const decline =
dashboard.data.clicks <
dashboard.data.previousClicks;



return {


situation:
decline
?
"Website mengalami penurunan traffic organik dibanding periode sebelumnya."
:
"Website menunjukkan pertumbuhan traffic organik.",



strengths:[

dashboard.data.impressions >
0
?
"Website masih memiliki visibility pada Google Search."
:
"Data visibility belum tersedia."

],



weaknesses:

decline
?
[
"Klik organik mengalami penurunan.",
"Beberapa keyword berpotensi kehilangan posisi."
]
:
[],



focus:

decline
?
[
"Recovery halaman dengan penurunan terbesar.",
"Optimasi keyword dengan impression tinggi."
]
:
[
"Scale halaman dengan performa terbaik.",
"Perluas keyword coverage."
]

};


}

function generateBusinessRisk(
dashboard:DashboardData
):BusinessImpact {


const decline =
dashboard.data.clicks <
dashboard.data.previousClicks;


if(decline){

return {

level:"HIGH",

summary:
"Organic traffic mengalami penurunan yang dapat mempengaruhi acquisition channel.",


risks:[

"Penurunan jumlah visitor potensial",

"Penurunan peluang lead dari organic search",

"Keyword kehilangan momentum ranking"

],


opportunities:[

"Recovery keyword dengan impression tinggi",

"Optimasi halaman dengan potensi traffic terbesar"

],


expectedOutcome:

"Pemulihan traffic organik dan peningkatan peluang konversi dari search engine."

};
}

return {

level:"LOW",

summary:
"Performa organic search stabil.",

risks:[

"Perlu menjaga konsistensi content growth"

],


opportunities:[

"Memperluas keyword coverage",

"Meningkatkan conversion dari organic traffic"

],


expectedOutcome:

"Meningkatkan kontribusi organic search terhadap pertumbuhan website."

};


}