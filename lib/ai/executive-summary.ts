import {
  generateGrowthOpportunity,
  GrowthOpportunity,
} from "./growth-opportunity";


export interface ExecutiveSummary {

  overview:string;

  seoHealth:
  | "Sangat Baik"
  | "Baik"
  | "Perlu Perhatian"
  | "Excellent"
  | "Good"
  | "Needs Attention";


  confidence:number;

  trend:
  | "Growing"
  | "Stable"
  | "Declining";


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

query?:string;

keyword?:string;

clicks?:number;

impressions?:number;

ctr?:number;

position?:number;

}



interface PageData {

page?:string;

path?:string;

clicks?:number;

impressions?:number;

sessions?:number;

users?:number;

}



interface LandingPageData extends PageData {

conversions?:number;

}



interface DeviceData {

device?:string;

users?:number;

}



interface ExecutiveSummaryInput {

locale:"id"|"en";

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

queries?:QueryData[];

pages?:PageData[];

landingPages?:LandingPageData[];

deviceCategory?:DeviceData[];

}





function growth(
current:number,
previous:number
){

if(previous===0)
return 0;


return (
(current-previous)
/
previous
)
*100;

}




export function generateExecutiveSummary({

locale,

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

}:ExecutiveSummaryInput):ExecutiveSummary {



const clicksGrowth =
growth(clicks,previousClicks);


const impressionGrowth =
growth(impressions,previousImpressions);


const usersGrowth =
growth(users,previousUsers);


const sessionGrowth =
growth(sessions,previousSessions);




const growingSignals = [

clicksGrowth > 0,

impressionGrowth > 0,

ctr > previousCTR,

usersGrowth > 0,

sessionGrowth > 0,

]
.filter(Boolean)
.length;



let trend:
ExecutiveSummary["trend"];


if(growingSignals>=4)

trend="Growing";

else if(growingSignals<=1)

trend="Declining";

else

trend="Stable";




let score=100;


if(clicksGrowth<0)
score-=20;


if(impressionGrowth<0)
score-=15;


if(ctr<previousCTR)
score-=15;


if(usersGrowth<0)
score-=25;


if(sessionGrowth<0)
score-=15;



score=Math.max(
40,
Math.min(100,score)
);





let seoHealth:
ExecutiveSummary["seoHealth"];



if(locale==="en"){


if(score>=85)

seoHealth="Excellent";

else if(score>=65)

seoHealth="Good";

else

seoHealth="Needs Attention";


}else{


if(score>=85)

seoHealth="Sangat Baik";

else if(score>=65)

seoHealth="Baik";

else

seoHealth="Perlu Perhatian";


}






const overview =
locale==="en"

?

`Website performance during this period shows ${
trend==="Growing"
?
"positive improvement in organic traffic and visibility"
:
trend==="Declining"
?
"a performance decline requiring optimization actions"
:
"a stable condition with further improvement opportunities"
}.

Organic traffic changed by ${clicksGrowth.toFixed(1)}%, impressions ${impressionGrowth.toFixed(1)}%, users ${usersGrowth.toFixed(1)}%, and sessions ${sessionGrowth.toFixed(1)}%.`

:

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

Organic traffic berubah sebesar ${clicksGrowth.toFixed(1)}%, impression ${impressionGrowth.toFixed(1)}%, pengguna ${usersGrowth.toFixed(1)}%, dan sesi ${sessionGrowth.toFixed(1)}%.`;





const keyWins:string[]=[];

const risks:string[]=[];

const opportunities:string[]=[];

const technicalInsights:string[]=[];

const actionPlan:string[]=[];





if(impressions>previousImpressions && ctr<previousCTR){


technicalInsights.push(

locale==="en"

?

"Website visibility increased, but click-through rate decreased. Optimize title tags and meta descriptions."

:

"Website mendapatkan peningkatan visibilitas, tetapi rasio klik menurun. Fokus optimasi title tag dan meta description."

);



actionPlan.push(

locale==="en"

?

"Optimize pages with high impressions but low CTR to gain additional traffic without creating new content."

:

"Optimalkan halaman dengan impression tinggi namun CTR rendah untuk mendapatkan tambahan trafik tanpa membuat konten baru."

);


}





if(clicksGrowth>0){


keyWins.push(

locale==="en"

?

`Organic clicks increased ${clicksGrowth.toFixed(1)}% compared to the previous period.`

:

`Organic clicks meningkat ${clicksGrowth.toFixed(1)}% dibanding periode sebelumnya.`

);


}





if(impressionGrowth>0){


keyWins.push(

locale==="en"

?

`Search visibility increased with impressions growing ${impressionGrowth.toFixed(1)}%.`

:

`Visibilitas pencarian meningkat dengan impression bertambah ${impressionGrowth.toFixed(1)}%.`

);


}




if(ctr>previousCTR){


keyWins.push(

locale==="en"

?

"CTR improved, indicating stronger search result attractiveness."

:

"CTR meningkat yang menunjukkan peningkatan daya tarik hasil pencarian."

);


}





if(clicks<previousClicks){


risks.push(

locale==="en"

?

"Organic traffic shows a declining trend."

:

"Terdapat indikasi penurunan trafik organik."

);



opportunities.push(

locale==="en"

?

"Refresh content on pages with declining performance."

:

"Lakukan content refresh pada halaman dengan performa menurun."

);


}





if(users<previousUsers){


risks.push(

locale==="en"

?

"User volume decreased compared to the previous period."

:

"Jumlah pengguna mengalami penurunan dibanding periode sebelumnya."

);



opportunities.push(

locale==="en"

?

"Evaluate landing pages and user experience."

:

"Evaluasi landing page dan pengalaman pengguna."

);


}





if(opportunities.length===0){


opportunities.push(

locale==="en"

?

"Maintain the current SEO strategy and improve conversion performance."

:

"Pertahankan strategi SEO saat ini dan fokus meningkatkan conversion."

);


}





if(actionPlan.length===0){


actionPlan.push(

locale==="en"

?

"Continue SEO monitoring and maintain optimization activities."

:

"Lanjutkan strategi SEO saat ini dan lakukan monitoring performa secara berkala."

);


}





const keywordInsights =
queries?.length

?

queries.slice(0,5)
.map(
item =>

locale==="en"

?

`${item.query ?? item.keyword} generated ${(item.clicks??0).toLocaleString("en-US")} clicks with CTR ${item.ctr??0}%.`

:

`${item.query ?? item.keyword} menghasilkan ${(item.clicks??0).toLocaleString("id-ID")} klik dengan CTR ${item.ctr??0}%.`

)

:

[

locale==="en"

?

"No keyword data available."

:

"Belum tersedia data keyword utama."

];





const contentInsights =
(landingPages ?? pages ?? [])
.slice(0,5)
.map(

item =>

locale==="en"

?

`${item.page ?? item.path ?? "Page"} contributed ${(item.clicks??item.sessions??0).toLocaleString("en-US")} visits.`

:

`${item.page ?? item.path ?? "Halaman"} memberikan kontribusi trafik terbesar dengan ${(item.clicks??item.sessions??0).toLocaleString("id-ID")} kunjungan.`

);





const trafficAnalysis =

locale==="en"

?

clicksGrowth>0

?

`Organic traffic increased ${clicksGrowth.toFixed(1)}%. Website visibility is improving.`

:

`Organic traffic decreased ${Math.abs(clicksGrowth).toFixed(1)}%. Review keywords and declining pages.`


:

clicksGrowth>0

?

`Traffic organik mengalami peningkatan ${clicksGrowth.toFixed(1)}%. Kinerja website mulai membaik.`

:

`Traffic organik mengalami penurunan ${Math.abs(clicksGrowth).toFixed(1)}%. Evaluasi keyword dan halaman yang kehilangan performa.`;

const growthOpportunities = generateGrowthOpportunity({

locale,

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

confidence:85,

trend,

keyWins,

risks,

opportunities,

nextPriority:
opportunities[0] ?? "",

keywordInsights,

contentInsights,

technicalInsights,

actionPlan,

growthOpportunities,


trafficAnalysis,


keywordAnalysis:

locale==="en"

?

"Prioritize keywords with high impressions and low CTR to increase clicks."

:

"Prioritaskan keyword dengan impression tinggi namun CTR rendah untuk meningkatkan klik.",



contentAnalysis:

locale==="en"

?

"Optimize landing pages and refresh content regularly."

:

"Lakukan optimasi landing page dan content refresh secara berkala.",



technicalAnalysis:

locale==="en"

?

deviceCategory?.length

?

"User performance comes from multiple devices. Ensure mobile experience remains optimized."

:

"No device analysis available."

:

deviceCategory?.length

?

"Performa pengguna berasal dari beberapa perangkat. Pastikan pengalaman mobile tetap optimal."

:

"Belum tersedia analisis perangkat."


};



}