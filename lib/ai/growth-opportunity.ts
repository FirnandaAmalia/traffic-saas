// lib/ai/growth-opportunity.ts


export interface GrowthOpportunity {


title:string;


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
"High"
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




function growth(
current:number,
previous:number
){

if(previous<=0)
return 0;


return (
((current-previous)/previous)
*100
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
value:number
){

return new Intl.NumberFormat(
"en-US"
).format(
Math.round(value)
);

}






export function generateGrowthOpportunity({

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



const impressionGrowth =
growth(
impressions,
previousImpressions
);



const userGrowth =
growth(
users,
previousUsers
);





/*
|--------------------------------------------------------------------------
| CTR OPPORTUNITY
|--------------------------------------------------------------------------
*/


const ctrKeywords = queries.filter(q=>{


const position=q.position ?? 999;

const impression=q.impressions ?? 0;

const keywordCTR=q.ctr ?? 0;



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


title:

"Optimasi CTR keyword dengan peluang ranking tinggi",


type:

"CTR Opportunity",


impact:

"High",


estimatedImpact:

`Potensi tambahan ${number(potentialClicks)} klik organik`,



reason:

`${ctrKeywords.length} keyword memiliki impression tinggi tetapi CTR belum maksimal dibanding peluang ranking.`,



action:

"Tingkatkan CTR melalui optimasi title, meta description, schema markup, dan rich result.",



metric:

`${keyword.query ?? "keyword"} | Posisi ${keyword.position ?? "-"}`,



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
|--------------------------------------------------------------------------
| QUICK WIN POSITION
|--------------------------------------------------------------------------
*/


const quickKeywords =
queries.filter(q=>{


const pos=q.position ?? 999;


return (

pos>=4 &&

pos<=10 &&

(q.impressions??0)>50

);


});



if(quickKeywords.length){


result.push({


title:

"Naikkan keyword existing menuju posisi teratas",



type:

"Quick Win",



impact:

"High",



estimatedImpact:

`${quickKeywords.length} keyword berada di posisi potensial page one`,



reason:

"Keyword sudah memiliki validasi ranking Google sehingga membutuhkan optimasi lanjutan.",



action:

"Update konten, tambah semantic keyword, optimasi heading, dan internal linking.",



metric:

`${quickKeywords.length} keyword posisi 4-10`,



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
|--------------------------------------------------------------------------
| CONTENT GROWTH
|--------------------------------------------------------------------------
*/


if(landingPages.length){


result.push({


title:

"Kembangkan halaman organik terbaik",


type:

"Content Growth",


impact:

"Medium",


estimatedImpact:

"Meningkatkan authority dan trafik jangka panjang",



reason:

`${landingPages.length} landing page aktif memiliki peluang dikembangkan menjadi content cluster.`,



action:

"Tambahkan konten pendukung, FAQ, internal linking, dan update informasi.",



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
|--------------------------------------------------------------------------
| RECOVERY
|--------------------------------------------------------------------------
*/


if(clickGrowth<-15){


result.push({


title:

"Recovery penurunan trafik organik",


type:

"Recovery",


impact:

"High",



estimatedImpact:

`Traffic turun ${Math.abs(clickGrowth).toFixed(1)}%`,



reason:

"Terjadi penurunan organic click dibanding periode sebelumnya.",



action:

"Audit keyword turun, update konten lama, dan evaluasi perubahan ranking.",



metric:

`Clicks ${clickGrowth.toFixed(1)}%`,



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
|--------------------------------------------------------------------------
| DEFAULT
|--------------------------------------------------------------------------
*/


if(!result.length){


result.push({


title:

"Pertahankan performa SEO",



type:

"Quick Win",



impact:

"Low",



estimatedImpact:

"Website tidak menunjukkan masalah kritis",



reason:

"Belum ditemukan sinyal negatif berdasarkan data yang tersedia.",



action:

"Lanjutkan monitoring keyword, konten, dan traffic.",



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