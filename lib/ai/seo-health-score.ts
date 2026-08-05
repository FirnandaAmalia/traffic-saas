export interface SEOHealthScore {

  score:number;

  label:
  | "Sangat Baik"
  | "Baik"
  | "Perlu Perhatian"
  | "Excellent"
  | "Good"
  | "Needs Attention";


  signals:{
    traffic:number;
    visibility:number;
    engagement:number;
  };


  strengths:string[];

  issues:string[];

  recommendations:string[];

}





interface SEOHealthInput {

  locale:"id" | "en";

  clicks:number;

  impressions:number;

  users:number;

  sessions:number;

  engagementRate:number;


  previousClicks:number;

  previousImpressions:number;

  previousUsers:number;

  previousSessions:number;


  ctr:number;

  previousCTR:number;

}





function growth(
current:number,
previous:number
){

if(previous <= 0)

return 0;


return (
(current - previous)
/
previous
)
*
100;

}







export function calculateSEOHealthScore({


locale,


clicks,

impressions,

users,

sessions,

engagementRate,

previousClicks,

previousImpressions,

previousUsers,

previousSessions,

ctr,

previousCTR,


}:SEOHealthInput):SEOHealthScore {





const isEnglish =
locale === "en";






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







/*
 SCORE
*/


const trafficScore =
Math.max(
0,
Math.min(
100,
50 + clicksGrowth
)
);




const visibilityScore =
Math.max(
0,
Math.min(
100,
50 + impressionGrowth
)
);






const ctrScore =
previousCTR === 0

?

50

:

Math.max(
0,
Math.min(
100,
50 +
(
((ctr - previousCTR)
/
previousCTR)
*
100
)
)
);







const engagementScore =
Math.max(
0,
Math.min(
100,
engagementRate * 100
)
);








const score = Math.round(

trafficScore * 0.35 +

visibilityScore * 0.25 +

ctrScore * 0.20 +

engagementScore * 0.20

);









let label:
SEOHealthScore["label"];





if(score >= 85){

label =
isEnglish
?
"Excellent"
:
"Sangat Baik";

}



else if(score >=65){


label =
isEnglish
?
"Good"
:
"Baik";


}



else {


label =
isEnglish
?
"Needs Attention"
:
"Perlu Perhatian";


}









const strengths:string[]=[];

const issues:string[]=[];

const recommendations:string[]=[];









if(clicks > 0){


strengths.push(

isEnglish

?

`Website generated ${clicks.toLocaleString("en-US")} organic clicks.`

:

`Website menghasilkan ${clicks.toLocaleString("id-ID")} organic clicks.`

);


}









if(impressions > 0){


strengths.push(

isEnglish

?

`Website received ${impressions.toLocaleString("en-US")} search impressions.`

:

`Website mendapatkan ${impressions.toLocaleString("id-ID")} impression.`

);


}








if(users > 0){


strengths.push(

isEnglish

?

`${users.toLocaleString("en-US")} active users visited the website.`

:

`${users.toLocaleString("id-ID")} pengguna aktif mengunjungi website.`

);


}














if(clicksGrowth < 0){


issues.push(

isEnglish

?

"Organic traffic is showing a declining trend."

:

"Traffic organik mengalami penurunan."

);



recommendations.push(

isEnglish

?

"Audit keywords and pages that lost ranking positions."

:

"Audit keyword dan halaman yang kehilangan ranking."

);


}









if(
impressions > previousImpressions
&&
ctr < previousCTR
){


issues.push(

isEnglish

?

"High impressions but CTR performance is still low."

:

"Impression tinggi tetapi CTR belum optimal."

);



recommendations.push(

isEnglish

?

"Optimize title tags, meta descriptions, and schema markup."

:

"Optimalkan title tag, meta description, dan schema."

);


}









if(
engagementRate < 0.3
){


issues.push(

isEnglish

?

"User engagement is still low."

:

"Engagement pengguna masih rendah."

);



recommendations.push(

isEnglish

?

"Improve landing pages and user experience."

:

"Perbaiki landing page dan pengalaman pengguna."

);


}









if(usersGrowth < 0){


issues.push(

isEnglish

?

"User numbers are decreasing."

:

"Jumlah pengguna mengalami penurunan."

);



recommendations.push(

isEnglish

?

"Evaluate the main traffic sources."

:

"Evaluasi sumber trafik utama."

);


}









if(recommendations.length === 0){


recommendations.push(

isEnglish

?

"Maintain SEO strategy and continue monitoring performance."

:

"Pertahankan strategi SEO dan lakukan monitoring."

);


}









return {


score,


label,



signals:{


traffic:
Math.round(
trafficScore
),



visibility:
Math.round(
visibilityScore
),



engagement:
Math.round(
engagementScore
),


},



strengths,


issues,


recommendations,


};


}