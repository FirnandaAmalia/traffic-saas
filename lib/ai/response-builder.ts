import type { AIContext } from "./context-builder";
import type { AIIntent } from "./intent-detector";


function opportunityTitle(
  key:string,
  t:(key:string)=>string
){

switch(key){

case "quickWin":
return t("growthOpportunity.quickWin");


case "ctrOpportunity":
return t("growthOpportunity.ctrOpportunity");


case "contentGrowth":
return t("growthOpportunity.contentGrowth");


case "recovery":
return t("growthOpportunity.recovery");


case "maintain":
return t("growthOpportunity.maintain");


default:
return t("growthOpportunity.default");

}

}



export function buildAIResponse({

context,

intent,

t,

}:{

context:AIContext;

intent:AIIntent;

t:(
  key:string,
  values?:Record<string,string | number>
)=>string;

}){


const opportunities =
context.growthOpportunities.slice(0,3);



return `

## ${t("title")}


### ${t("executiveSummary")}


${t("websiteHealth", {
score: context.websiteHealth.score,
grade: context.websiteHealth.grade
})}



${t("focus", {
intent
})}



### ${t("growthOpportunity.title")}



${
opportunities.length

?

opportunities.map(

(item,index)=>`


#### ${index + 1}. ${opportunityTitle(
item.titleKey,
t
)}



**${t("impact")}**

${item.impact}



**${t("reason")}**

${item.reason}



**${t("action")}**

${item.action}



**${t("result")}**

${item.estimatedImpact}



`

).join("\n")


:

t("noOpportunity")

}




### ${t("businessImpact")}




${t("potentialClicks")}

**+${context.business.clicks}**



${t("potentialUsers")}

**+${context.business.users}**



${t("conversionOpportunity")}

**${context.business.conversion}%**





### ${t("confidence")}



${t("score")}

**${context.confidence.score}%**



${t("level")}

${context.confidence.level}



${
context.confidence.explanation
.slice(0,3)
.map(
(x)=>"- "+x
)
.join("\n")
}




### ${t("recommendation")}



${t("recommendationText")}



`;

}