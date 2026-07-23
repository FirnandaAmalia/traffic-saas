import { openai } from "./openai-client";

import {
 buildConsultantPrompt
} from "./consultant";


import {
buildLocalAIResponse
} from "./local-ai-engine";

import type {
AIContext
} from "./context-builder";



export async function generateConsultantAnswer({

context,

question,

}:{

context:AIContext;

question:string;

}){


try{


const prompt =
buildConsultantPrompt(
context,
question
);



const response =
await openai.chat.completions.create({

model:"gpt-5-mini",

temperature:0.3,


messages:[

{
role:"system",

content:
"Anda adalah TrafficSaaS AI Consultant."
},


{
role:"user",

content:prompt

}

]

});



return {


answer:
response.choices[0]
?.message
?.content
??
"AI unavailable",


source:"OpenAI",

usage:
response.usage


};


}

catch(error:any){


console.log(
"OpenAI fallback:",
error.message
);



return {


answer:
buildLocalAIResponse({

context,

question

}),


source:"TrafficSaaS AI Engine",


usage:null


};


}


}