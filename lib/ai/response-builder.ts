import type { AIContext } from "./context-builder";
import type { AIIntent } from "./intent-detector";


export function buildAIResponse({

context,

intent,

}:{

context:AIContext;

intent:AIIntent;

}){


const opportunities =
context.growthOpportunities.slice(0,3);



return `

## TrafficSaaS AI Consultant


### Executive Summary

Website memiliki SEO Health Score **${context.websiteHealth.score}/100** dengan grade **${context.websiteHealth.grade}**.

AI menemukan bahwa fokus utama saat ini berada pada optimasi **${intent}**, peningkatan visibilitas organik, dan peluang pertumbuhan traffic.


### Growth Opportunity


${

opportunities.length

?

opportunities.map(

(item,index)=>`

#### ${index+1}. ${item.title}


**Impact**
${item.impact}


**Kenapa ini penting**
${item.reason}


**Action Plan**
${item.action}


**Expected Result**
${item.estimatedImpact}

`

).join("\n")


:

"Tidak ditemukan peluang optimasi."

}



### Business Impact Forecast


Potential Additional Clicks:

**+${context.business.clicks}**


Potential User Growth:

**+${context.business.users}**


Estimated Conversion Opportunity:

**${context.business.conversion}%**



### AI Confidence


Score:

**${context.confidence.score}%**


Level:

${context.confidence.level}



${context.confidence.explanation
.slice(0,3)
.map(
(x)=>"- "+x
)
.join("\n")
}



### Consultant Recommendation


Berdasarkan data Google Search Console dan Google Analytics 4, prioritas berikutnya adalah meningkatkan keyword opportunity, CTR, dan halaman yang memiliki potensi ranking.


`;

}