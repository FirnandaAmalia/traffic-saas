export interface GrowthOpportunity {

titleKey:
| "ctrOpportunity"
| "quickWin"
| "contentGrowth"
| "recovery"
| "maintain";

type:
| "Quick Win"
| "CTR Opportunity"
| "Content Growth"
| "Recovery";

impact:
| "High"
| "Medium"
| "Low";


estimatedImpact:string;

reason:string;

action:string;

metric:string;


source:
"GSC"
| "GA4"
| "Combined";


priority:
| "High"
| "Medium"
| "Low";

confidence:number;

score:number;

}



interface QueryData {

query?:string;

clicks?:number;

impressions?:number;

ctr?:number;

position?:number;

}



interface LandingPageData {

page?:string;

path?:string;

users?:number;

sessions?:number;

}





interface Input {


locale:
"id"
|
"en";


clicks:number;

previousClicks:number;

impressions:number;

previousImpressions:number;

ctr:number;

previousCTR:number;

users?:number;

previousUsers?:number;

queries?:QueryData[];

landingPages?:LandingPageData[];

}





function translate(
locale:"id"|"en",
id:string,
en:string
){

return locale==="en"
?
en
:
id;

}






function growth(
current:number,
previous:number
){

if(previous<=0)

return 0;


return (

((current-previous)/previous)

*

100

);

}







function confidence(
signal:number,
quality:number
){

return Math.min(

98,

Math.max(

60,

Math.round(

(signal*0.6)+(quality*0.4)

)

)

);

}






function number(
locale:"id"|"en",
value:number
){

return new Intl.NumberFormat(

locale==="en"

?

"en-US"

:

"id-ID"

).format(

Math.round(value)

);

}








export function generateGrowthOpportunity({

locale,

clicks,

previousClicks,

impressions,

previousImpressions,

ctr,

previousCTR,

users=0,

previousUsers=0,

queries=[],

landingPages=[],

}:Input):GrowthOpportunity[]{





const result:GrowthOpportunity[]=[];





const clickGrowth =
growth(
clicks,
previousClicks
);






/*
 CTR OPPORTUNITY
*/


const ctrKeywords =
queries.filter(q=>{


const position =
q.position ?? 999;


const impression =
q.impressions ?? 0;


const keywordCTR =
q.ctr ?? 0;



return (

position>=3 &&

position<=15 &&

impression>=100 &&

keywordCTR<0.05

);


});





if(ctrKeywords.length){



const potentialClicks =
ctrKeywords.reduce(

(total,item)=>{


const impression =
item.impressions ?? 0;


const currentCTR =
item.ctr ?? 0;



const targetCTR =

(item.position ?? 20)<=10

?

0.08

:

0.05;



return total +

(

impression *

Math.max(
0,
targetCTR-currentCTR
)

);


},

0

);






const keyword =
ctrKeywords.sort(

(a,b)=>

(b.impressions??0)

-

(a.impressions??0)

)[0];






result.push({



titleKey:"ctrOpportunity",

type:

"CTR Opportunity",



impact:

"High",



estimatedImpact:

translate(

locale,

`Potensi tambahan ${number(locale,potentialClicks)} klik organik`,

`Potential additional ${number(locale,potentialClicks)} organic clicks`

),




reason:

translate(

locale,

`${ctrKeywords.length} keyword memiliki impression tinggi tetapi CTR belum maksimal dibanding peluang ranking.`,

`${ctrKeywords.length} keywords have high impressions but CTR is still below their ranking potential.`

),




action:

translate(

locale,

"Tingkatkan CTR melalui optimasi title, meta description, schema markup, dan rich result.",

"Improve CTR through title optimization, meta description, schema markup, and rich results."

),




metric:

`${keyword.query ?? "keyword"} | Position ${keyword.position ?? "-"}`,



source:

"GSC",



priority:

"High",



confidence:

confidence(
ctrKeywords.length*10,
95
),



score:

95



});


}









/*
 QUICK WIN
*/



const quickKeywords =
queries.filter(q=>{


const pos =
q.position ?? 999;



return (

pos>=4 &&

pos<=10 &&

(q.impressions??0)>50

);


});





if(quickKeywords.length){



result.push({



titleKey:"quickWin",





type:

"Quick Win",



impact:

"High",



estimatedImpact:

translate(

locale,

`${quickKeywords.length} keyword memiliki potensi masuk halaman pertama`,

`${quickKeywords.length} keywords have page-one potential`

),




reason:

translate(

locale,

"Keyword sudah memiliki validasi ranking Google sehingga membutuhkan optimasi lanjutan.",

"Keywords already have Google ranking validation and need further optimization."

),




action:

translate(

locale,

"Update konten, tambah semantic keyword, optimasi heading, dan internal linking.",

"Update content, add semantic keywords, optimize headings, and improve internal linking."

),




metric:

translate(

locale,

`${quickKeywords.length} keyword posisi 4-10`,

`${quickKeywords.length} keywords position 4-10`

),



source:

"GSC",



priority:

"High",



confidence:

confidence(

quickKeywords.length*12,

90

),



score:

90



});


}









/*
 CONTENT GROWTH
*/



if(landingPages.length){



result.push({

titleKey:"contentGrowth",





type:

"Content Growth",



impact:

"Medium",



estimatedImpact:

translate(

locale,

"Meningkatkan authority dan trafik jangka panjang",

"Increase authority and long-term organic traffic"

),



reason:

translate(

locale,

`${landingPages.length} landing page aktif memiliki peluang dikembangkan menjadi content cluster.`,

`${landingPages.length} active landing pages have opportunities to be expanded into content clusters.`

),



action:

translate(

locale,

"Tambahkan konten pendukung, FAQ, internal linking, dan update informasi.",

"Add supporting content, FAQs, internal linking, and refresh information."

),



metric:

landingPages[0].page ??

landingPages[0].path ??

"Landing Page",



source:

"Combined",



priority:

"Medium",



confidence:

confidence(

landingPages.length*10,

85

),



score:

75



});


}









/*
 RECOVERY
*/



if(clickGrowth < -15){



result.push({

titleKey:"recovery",



type:

"Recovery",



impact:

"High",



estimatedImpact:

translate(

locale,

`Traffic turun ${Math.abs(clickGrowth).toFixed(1)}%`,

`Traffic decreased ${Math.abs(clickGrowth).toFixed(1)}%`

),



reason:

translate(

locale,

"Terjadi penurunan organic click dibanding periode sebelumnya.",

"Organic clicks decreased compared to the previous period."

),



action:

translate(

locale,

"Audit keyword turun, update konten lama, dan evaluasi perubahan ranking.",

"Audit declining keywords, refresh old content, and evaluate ranking changes."

),



metric:

translate(

locale,

`Klik ${clickGrowth.toFixed(1)}%`,

`Clicks ${clickGrowth.toFixed(1)}%`

),



source:

"GSC",



priority:

"High",



confidence:

90,



score:

92



});


}









/*
 DEFAULT
*/



if(!result.length){



result.push({

titleKey:"maintain",





type:

"Quick Win",



impact:

"Low",



estimatedImpact:

translate(

locale,

"Website tidak menunjukkan masalah kritis",

"Website shows no critical issues"

),



reason:

translate(

locale,

"Belum ditemukan sinyal negatif berdasarkan data yang tersedia.",

"No negative signals were found based on available data."

),



action:

translate(

locale,

"Lanjutkan monitoring keyword, konten, dan traffic.",

"Continue monitoring keywords, content, and traffic."

),



metric:

`CTR ${(ctr*100).toFixed(2)}%`,



source:

"Combined",



priority:

"Low",



confidence:

65,



score:

50



});


}





return result

.sort(

(a,b)=>

b.score-a.score

)

.slice(0,5);



}