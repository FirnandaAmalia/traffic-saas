import type {
AIContext
} from "./context-builder";


export function buildLocalAIResponse({

context,

question,

}:{

context:AIContext;

question:string;

}){


const opportunity =
context.growthOpportunities?.[0];



return `

## Analisis Kondisi Website


Health Score:

${context.websiteHealth.score}/100

Grade:

${context.websiteHealth.grade}



## Temuan Utama


${
opportunity
?
`
Peluang terbesar:

${opportunity.title}


Impact:

${opportunity.impact}


Estimasi:

${opportunity.estimatedImpact}


Alasan:

${opportunity.reason}


`
:
`
Belum ditemukan peluang utama.
`
}



## Rekomendasi Prioritas


${
opportunity
?
opportunity.action
:
"Lakukan monitoring SEO secara berkala."
}



## AI Confidence


${context.confidence.score}%


${context.confidence.explanation.join("\n")}



Pertanyaan:

${question}

`;

}