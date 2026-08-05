"use client";

import {
  Sparkles,
  Brain,
  TrendingUp,
  FileSearch,
  Lightbulb,
  Target,
  ShieldCheck,
} from "lucide-react";

import {
  useTranslations,
} from "next-intl";

import type {
  AIContext,
} from "@/lib/ai/context-builder";

interface Props {
  context: AIContext;
}

export default function AIConsultant({
  context,
}:Props){


const t =
useTranslations("aiConsultant");


type PriorityItem = {
  title:string;
  titleKey?:string;
  priority:string;
  recommendation:string;
  impact?:string;
  reason?:string;
};



const priorities:PriorityItem[] =

context.recommendations.length > 0

?

context.recommendations
.slice(0,3)
.map((item)=>({

title:
item.titleKey
?
t(`recommendations.titles.${item.titleKey}`)
:
item.title ?? "-",


titleKey:
item.titleKey,


priority:
item.priority,


recommendation:
item.recommendation,


impact:
item.impact,


reason:
item.reason,


}))


:

context.growthOpportunities
.slice(0,3)
.map((item)=>({

title:
t(
`opportunity.titles.${item.titleKey}`
),


titleKey:
item.titleKey,


priority:
item.priority,


recommendation:
item.action,


impact:
item.impact,


reason:
item.reason,


}));



const topOpportunity =
context.growthOpportunities?.[0];



return (

<section
className="
rounded-3xl
border
border-blue-200
bg-gradient-to-br
from-blue-50
via-white
to-indigo-50
p-6
shadow-sm
space-y-6
"
>

{/* LANJUTKAN JSX LAMA DI SINI */}

</section>

);

}