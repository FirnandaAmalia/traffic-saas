import {
  ShieldCheck,
  Cloud,
  Lock,
  Database,
  FileCheck,
  UserCheck,
  Scale,
  Server,
  Eye,
  KeyRound,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { useTranslations } from "next-intl";


export default function PrivacyPage(){

const t = useTranslations("privacy");

return (

<main
className="
relative
overflow-hidden
bg-slate-50
"
>


{/* BACKGROUND */}

<div
className="
absolute
inset-0
-z-10
"
>

<div
className="
absolute
left-1/2
top-0
h-[650px]
w-[650px]
-translate-x-1/2
rounded-full
bg-violet-500/10
blur-[160px]
"
/>

</div>





{/* HERO */}

<section
className="
mx-auto
max-w-6xl
px-6
pt-28
pb-10
"
>


<div className="text-center">


<div
className="
inline-flex
items-center
gap-2
rounded-full
border
border-violet-200
bg-white
px-5
py-2
text-xs
font-bold
text-violet-700
shadow-sm
"
>

<ShieldCheck className="h-4 w-4"/>

{t("hero.badge")}

</div>




<h1
className="
mt-7
text-5xl
font-black
tracking-tight
text-slate-900
"
>

{t("hero.title")}
<br/>

<span
className="
bg-gradient-to-r
from-violet-600
to-sky-500
bg-clip-text
text-transparent
"
>
{t("hero.highlight")}
</span>


</h1>



<p
className="
mx-auto
mt-5
max-w-2xl
leading-7
text-slate-600
"
>

{t("hero.description")}
</p>



<div
className="
mt-7
flex
justify-center
gap-3
flex-wrap
"
>

<TrustBadge
 icon={<Lock/>}
 text={t("trust.badges.encrypted")}
/>


<TrustBadge
icon={<Eye/>}
text={t("trust.badges.privacy")}
/>


<TrustBadge
icon={<UserCheck/>}
text={t("trust.badges.controlled")}
/>


</div>


</div>



</section>








{/* SECURITY STATUS */}

<section
className="
mx-auto
max-w-6xl
px-6
"
>


<div
className="
rounded-[36px]
border
border-slate-200
bg-white
p-8
shadow-xl
"
>


<div
className="
flex
items-center
justify-between
"
>


<div>

<p className="
text-sm
text-slate-500
">

{t("trust.framework")}

</p>


<h2
className="
text-3xl
font-black
text-slate-900
"
>

{t("trust.title")}

</h2>


</div>



<div
className="
flex
items-center
gap-2
rounded-full
bg-emerald-100
px-5
py-2
text-sm
font-bold
text-emerald-700
"
>

<CheckCircle2 className="h-4 w-4"/>

{t("trust.status")}

</div>


</div>




<div
className="
mt-8
grid
gap-4
md:grid-cols-4
"
>


<SecurityBox
icon={<Cloud/>}
title={t("trust.cloud.title")}
desc={t("trust.cloud.desc")}
/>


<SecurityBox
icon={<Lock/>}
title={t("trust.encryption.title")}
desc={t("trust.encryption.desc")}
/>


<SecurityBox
icon={<KeyRound/>}
title={t("trust.authentication.title")}
desc={t("trust.authentication.desc")}
/>


<SecurityBox
icon={<Scale/>}
title={t("trust.compliance.title")}
desc={t("trust.compliance.desc")}
/>


</div>


</div>


</section>








{/* DATA FLOW */}

<section
className="
mx-auto
max-w-6xl
px-6
py-10
"
>


<div
className="
rounded-[32px]
border
bg-white
p-8
"
>


<h2
className="
text-xl
font-black
text-slate-900
"
>

{t("dataFlow.title")}

</h2>



<div
className="
mt-6
grid
gap-4
md:grid-cols-4
"
>

<DataStep
number="01"
title={t("dataFlow.permission.title")}
desc={t("dataFlow.permission.desc")}
/>


<DataStep
number="02"
title={t("dataFlow.transfer.title")}
desc={t("dataFlow.transfer.desc")}
/>


<DataStep
number="03"
title={t("dataFlow.analysis.title")}
desc={t("dataFlow.analysis.desc")}
/>


<DataStep
number="04"
title={t("dataFlow.control.title")}
desc={t("dataFlow.control.desc")}
/>


</div>


</div>


</section>








{/* CARDS */}

<section
className="
mx-auto
grid
max-w-6xl
gap-6
px-6
pb-16
md:grid-cols-2
"
>

<PrivacyCard
icon={<Database/>}
title={t("sections.data.title")}
>

{t("sections.data.content")}
</PrivacyCard>

<PrivacyCard
icon={<Server/>}
title={t("sections.cloud.title")}
>

{t.rich("sections.cloud.content", {
  br: () => <br />,
  strong: (chunks) => <strong>{chunks}</strong>
})}

</PrivacyCard>

<PrivacyCard
icon={<ShieldCheck/>}
title={t("sections.pdp.title")}
>

{t.rich("sections.pdp.content", {
 br:()=> <br/>
})}

</PrivacyCard>

<PrivacyCard
icon={<Lock/>}
title={t("privacy.sections.security.title")}
>

{(t.raw("sections.security.items") as string[]).map(
(item)=>(
<p key={item}>
✓ {item}
</p>
)
)}

</PrivacyCard>

<PrivacyCard
icon={<UserCheck/>}
title={t("privacy.sections.rights.title")}
>

{(t.raw("sections.rights.items") as string[]).map(
(item)=>(
<p key={item}>
✓ {item}
</p>
)
)}

</PrivacyCard>

<PrivacyCard
icon={<FileCheck/>}
title={t("privacy.sections.regulation.title")}
>

{(t.raw("sections.regulation.items") as string[]).map(
(item)=>(
<p key={item}>
• {item}
</p>
)
)}

</PrivacyCard>

</section>








{/* FINAL CTA */}

<section
className="
mx-auto
max-w-6xl
px-6
pb-20
"
>


<div
className="
rounded-[32px]
bg-gradient-to-br
from-slate-950
via-violet-950
to-slate-900
p-8
text-white
"
>


<h2
className="
text-3xl
font-black
"
>

{t("footer.title")}

</h2>



<p
className="
mt-3
max-w-xl
text-slate-300
"
>

{t("footer.description")}

</p>



<div
className="
mt-5
flex
items-center
gap-2
font-bold
"
>

support@trafficsaas.com

<ArrowRight className="h-4 w-4"/>

</div>


</div>


</section>


</main>

)

}








function TrustBadge({
icon,
text,
}:{
icon:React.ReactNode;
text:string;
}){

return (

<div
className="
flex
items-center
gap-2
rounded-full
border
bg-white
px-4
py-2
text-xs
font-semibold
text-slate-700
shadow-sm
"
>

{icon}

{text}

</div>

)

}







function SecurityBox({
icon,
title,
desc,
}:{
icon:React.ReactNode;
title:string;
desc:string;
}){


return (

<div
className="
rounded-2xl
bg-slate-50
p-5
"
>


<div
className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-violet-100
text-violet-600
"
>

{icon}

</div>


<h3
className="
mt-4
font-black
text-slate-900
"
>

{title}

</h3>


<p
className="
text-xs
text-slate-500
"
>

{desc}

</p>


</div>

)

}







function DataStep({
number,
title,
desc,
}:{
number:string;
title:string;
desc:string;
}){


return (

<div
className="
rounded-2xl
bg-slate-50
p-5
"
>


<p
className="
text-xs
font-bold
text-violet-600
"
>
{number}
</p>


<h3
className="
mt-2
font-black
"
>
{title}
</h3>


<p
className="
mt-2
text-sm
text-slate-500
"
>
{desc}
</p>


</div>

)

}







function PrivacyCard({
icon,
title,
children,
}:{
icon:React.ReactNode;
title:string;
children:React.ReactNode;
}){


return (

<div
className="
rounded-[30px]
border
border-slate-200
bg-white
p-7
shadow-sm
transition
hover:-translate-y-1
hover:shadow-xl
"
>


<div
className="
flex
items-center
gap-4
"
>


<div
className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-violet-100
text-violet-600
"
>

{icon}

</div>


<h3
className="
font-black
text-slate-900
"
>

{title}

</h3>


</div>



<div
className="
mt-5
text-sm
leading-7
text-slate-600
"
>

{children}

</div>


</div>

)

}