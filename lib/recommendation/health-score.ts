import type {
  Recommendation,
} from "./recommendation-engine";



export interface HealthScore {


  score:number;


  grade:string;


  summary:string;


  status:
    | "Excellent"
    | "Good"
    | "Needs Improvement"
    | "Critical";



  breakdown:{


    seo:number;

    content:number;

    ux:number;

    performance:number;

    analytics:number;

    marketing:number;


  };


}





export function calculateHealthScore(

recommendations:Recommendation[]

):HealthScore {



const breakdown = {


seo:100,

content:100,

ux:100,

performance:100,

analytics:100,

marketing:100,


};





for(
const item of recommendations
){



let penalty = 0;




switch(item.priority){


case "critical":

penalty = 25;

break;



case "high":

penalty = 15;

break;



case "medium":

penalty = 8;

break;



case "low":

penalty = 4;

break;


}






/*
AI confidence adjustment

Recommendation score tinggi
lebih berdampak
*/


if(item.score >=90){

penalty += 5;

}

else if(item.score >=80){

penalty += 2;

}







switch(item.category){



case "SEO":

breakdown.seo -= penalty;

break;



case "Content":

breakdown.content -= penalty;

break;



case "UX":

breakdown.ux -= penalty;

break;



case "Performance":

breakdown.performance -= penalty;

break;



case "Analytics":

breakdown.analytics -= penalty;

break;



case "Marketing":

breakdown.marketing -= penalty;

break;



case "Conversion":


breakdown.marketing -=
Math.ceil(
penalty/2
);


breakdown.ux -=
Math.ceil(
penalty/2
);


break;



}



}





/*
Clamp score
*/


Object.keys(
breakdown
)
.forEach((key)=>{


const k =
key as keyof typeof breakdown;


breakdown[k] =
Math.max(
0,
Math.min(
100,
breakdown[k]
)
);


});








const values =
Object.values(
breakdown
);




let score =
Math.round(

values.reduce(
(a,b)=>a+b,
0
)

/

values.length

);







/*
Bonus penalty berdasarkan jumlah issue
*/


if(
recommendations.length >=8
){

score -=10;

}

else if(
recommendations.length >=5
){

score -=5;

}





score =
Math.max(
0,
Math.min(
100,
score
)
);










let grade="F";

let status:
HealthScore["status"];




if(score>=95){

grade="A+";

status="Excellent";

}

else if(score>=90){

grade="A";

status="Excellent";

}

else if(score>=85){

grade="A-";

status="Good";

}

else if(score>=80){

grade="B+";

status="Good";

}

else if(score>=70){

grade="B";

status="Needs Improvement";

}

else if(score>=60){

grade="C";

status="Needs Improvement";

}

else if(score>=50){

grade="D";

status="Critical";

}

else{

grade="F";

status="Critical";

}









let summary="";





if(score>=90){


summary =
"Website memiliki kesehatan digital yang sangat baik. Fokus utama adalah mempertahankan performa dan melakukan optimasi lanjutan untuk meningkatkan pertumbuhan.";


}

else if(score>=80){


summary =
"Website berada dalam kondisi baik, namun terdapat beberapa peluang optimasi yang dapat meningkatkan trafik, engagement, dan konversi.";


}

else if(score>=70){


summary =
"Website memiliki fondasi yang cukup baik tetapi membutuhkan perbaikan pada beberapa area penting agar pertumbuhan SEO lebih maksimal.";


}

else if(score>=60){


summary =
"Website membutuhkan perhatian pada beberapa faktor utama seperti SEO, pengalaman pengguna, dan strategi konten.";


}

else{


summary =
"Website memerlukan optimasi menyeluruh karena terdapat banyak faktor yang berpotensi menghambat performa organik dan bisnis.";


}








return {


score,


grade,


status,


summary,


breakdown,


};


}