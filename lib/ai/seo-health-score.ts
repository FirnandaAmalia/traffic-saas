export interface SEOHealthScore {

  score:number;

  label:
  | "Sangat Baik"
  | "Baik"
  | "Perlu Perhatian";


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
/previous
)*100;

}





export function calculateSEOHealthScore({

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
((ctr-previousCTR)
/previousCTR)
*100
)
)
);



const engagementScore =
Math.max(
0,
Math.min(
100,
engagementRate*100
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


if(score >=85)

label="Sangat Baik";


else if(score >=65)

label="Baik";


else

label="Perlu Perhatian";






const strengths:string[]=[];

const issues:string[]=[];

const recommendations:string[]=[];






if(clicks>0){

strengths.push(

`Website menghasilkan ${clicks.toLocaleString(
"id-ID"
)} organic clicks.`

);

}



if(impressions>0){

strengths.push(

`Website mendapatkan ${impressions.toLocaleString(
"id-ID"
)} impression.`

);

}



if(users>0){

strengths.push(

`${users.toLocaleString(
"id-ID"
)} pengguna aktif.`

);

}






if(clicksGrowth<0){

issues.push(

"Traffic organik mengalami penurunan."

);


recommendations.push(

"Audit keyword dan halaman yang kehilangan ranking."

);

}





if(
impressions > previousImpressions
&&
ctr < previousCTR
){

issues.push(

"Impression tinggi tetapi CTR belum optimal."

);


recommendations.push(

"Optimalkan title tag, meta description, dan schema."

);

}





if(
engagementRate <0.3
){

issues.push(

"Engagement pengguna masih rendah."

);


recommendations.push(

"Perbaiki landing page dan pengalaman pengguna."

);

}





if(
usersGrowth<0
){

issues.push(

"Jumlah pengguna mengalami penurunan."

);


recommendations.push(

"Evaluasi sumber trafik utama."

);

}





if(recommendations.length===0){

recommendations.push(

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