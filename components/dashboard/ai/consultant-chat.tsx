"use client";

import {
  useState,
} from "react";

import {
  Send,
  Sparkles,
  User,
} from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type {
  AIContext,
} from "@/lib/ai/context-builder";

import {
  useTranslations,
} from "next-intl";

interface Props {
  context: AIContext;
}



export default function ConsultantChat({
  context,
}: Props) {

const t =
useTranslations("consultantChat");

const [question,setQuestion] =
useState("");


const [messages,setMessages] =
useState<
{
role:"user"|"assistant";
content:string;
}[]
>([]);


const [loading,setLoading] =
useState(false);



async function askAI(){


if(!question.trim() || loading)
return;


const q =
question.trim();


setQuestion("");


setMessages(prev=>[
...prev,
{
role:"user",
content:q
}
]);


setLoading(true);


try{


const res =
await fetch(
"/api/ai/chat",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
question:q
})

}

);


const data =
await res.json();


setMessages(prev=>[
...prev,
{
role:"assistant",
content:
data.answer ??
t("defaultAnswer")
}
]);


}catch{


setMessages(prev=>[
...prev,
{
role:"assistant",
content:
t("error")
}
]);


}finally{

setLoading(false);

}


}





return (

<section
className="
rounded-3xl
border
bg-white
shadow-lg
overflow-hidden
"
>


{/* HEADER */}

<div
className="
bg-gradient-to-r
from-blue-600
via-indigo-600
to-purple-600
p-6
text-white
"
>


<div
className="
flex
items-center
gap-3
"
>

<div
className="
rounded-2xl
bg-white/20
p-3
"
>

<Sparkles/>

</div>


<div>

<h2
className="
text-xl
font-bold
"
>
{t("title")}
</h2>


<p
className="
text-sm
text-blue-100
"
>
{t("subtitle")}
</p>


</div>


</div>


</div>





{/* CHAT AREA */}

<div
className="
h-[460px]
overflow-y-auto
space-y-5
bg-slate-50
p-6
"
>


{
messages.length===0 &&

<div
className="
rounded-2xl
border
bg-white
p-6
shadow-sm
"
>


<div
className="
flex
items-center
gap-2
font-bold
"
>

<Sparkles
size={18}
/>

{t("assistantTitle")}

</div>


<p
className="
mt-3
text-sm
leading-6
text-slate-500
"
>

{t("description")}

</p>


<div
className="
mt-4
grid
gap-2
md:grid-cols-2
"
>

{

[
t("suggestions.trafficDrop"),
t("suggestions.keywordRanking"),
t("suggestions.seoPriority"),
t("suggestions.conversion")
].map((item)=>(

<div
key={item}
className="
rounded-xl
border
bg-slate-50
p-3
text-xs
text-slate-600
"
>

{item}

</div>

))

}

</div>


</div>

}





{
messages.map((msg,index)=>(


<div
key={index}
className={
msg.role==="user"
?
"flex justify-end"
:
"flex justify-start"
}
>


<div
className={

msg.role==="user"

?

`
max-w-[80%]
rounded-2xl
bg-blue-600
p-4
text-sm
text-white
shadow
`

:

`
max-w-[90%]
rounded-2xl
border
bg-white
p-6
shadow-sm
`

}
>


<div
className="
mb-4
flex
items-center
gap-2
text-xs
font-bold
"
>


{

msg.role==="user"

?

<User size={15}/>

:

<Sparkles size={15}/>

}


{

msg.role==="user"
?
t("user")
:
t("assistant")

}


</div>





<ReactMarkdown

remarkPlugins={[
remarkGfm
]}


components={{


h1:
({children})=>(

<h1
className="
mb-5
text-2xl
font-bold
text-slate-900
"
>

{children}

</h1>

),



h2:
({children})=>(

<div
className="
mt-6
mb-3
border-b
pb-2
"
>

<h2
className="
text-lg
font-bold
text-blue-700
"
>

{children}

</h2>

</div>

),



h3:
({children})=>(

<h3
className="
mt-5
mb-2
text-base
font-bold
text-slate-800
"
>

{children}

</h3>

),



p:
({children})=>(

<p
className="
mb-4
leading-7
text-slate-700
"
>

{children}

</p>

),



strong:
({children})=>(

<strong
className="
font-bold
text-slate-900
"
>

{children}

</strong>

),



ul:
({children})=>(

<ul
className="
mb-4
list-disc
space-y-2
pl-6
text-slate-700
"
>

{children}

</ul>

),



ol:
({children})=>(

<ol
className="
mb-4
list-decimal
space-y-2
pl-6
text-slate-700
"
>

{children}

</ol>

),



li:
({children})=>(

<li
className="
leading-7
"
>

{children}

</li>

),



blockquote:
({children})=>(

<div
className="
my-4
rounded-xl
border-l-4
border-blue-500
bg-blue-50
p-4
text-sm
text-slate-700
"
>

{children}

</div>

),



table:
({children})=>(

<table
className="
w-full
border-collapse
text-sm
"
>

{children}

</table>

),



th:
({children})=>(

<th
className="
border
bg-slate-100
p-3
text-left
font-bold
"
>

{children}

</th>

),



td:
({children})=>(

<td
className="
border
p-3
"
>

{children}

</td>

)


}}

>

{msg.content}

</ReactMarkdown>



</div>


</div>


))

}





{
loading &&

<div
className="
rounded-xl
border
bg-white
p-4
text-sm
text-slate-500
"
>

{t("loading")}

</div>

}


</div>





{/* INPUT */}

<div
className="
flex
gap-3
border-t
bg-white
p-4
"
>

<input

className="
flex-1
rounded-xl
border
px-4
py-3
outline-none
focus:border-blue-500
"

placeholder={t("placeholder")}

value={question}

onChange={(e)=>setQuestion(e.target.value)}

onKeyDown={(e)=>{

if(e.key==="Enter"){
  askAI();
}

}}

/>

<button

onClick={askAI}

disabled={loading}

className="
rounded-xl
bg-blue-600
px-5
text-white
hover:bg-blue-700
disabled:opacity-50
"
>

<Send
size={18}
/>

</button>


</div>


</section>

);

}