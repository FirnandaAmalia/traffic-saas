import KeywordTable from "@/components/keywords/keyword-table";


export default function KeywordPage(){

return (

<div className="space-y-6">



{/* HEADER */}

<div>

<h1
className="
text-3xl
font-bold
"
>
Keyword Intelligence
</h1>


<p
className="
mt-2
text-slate-500
"
>
Discover search opportunities and keyword performance.
</p>


</div>





{/* SUMMARY */}

<div
className="
grid
gap-5
lg:grid-cols-4
"
>


<Card

icon="search"

title="Total Keywords"

value="2,431"

/>



<Card

icon="trending"

title="Top 10 Keywords"

value="186"

/>



<Card

icon="target"

title="Average Position"

value="7.4"

/>



<Card

icon="click"

title="Average CTR"

value="4.8%"

/>



</div>





{/* KEYWORD TABLE */}

<KeywordTable />



</div>

);

}







function Card({

icon,

title,

value,

}:{

icon:string;

title:string;

value:string;

}){


const icons = {

search:"⌕",

trending:"↗",

target:"◎",

click:"◉",

};




return (

<div

className="
rounded-2xl
border
bg-white
p-5
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
rounded-xl
bg-blue-50
p-3
text-blue-600
"

>

<span className="text-xl">

{
icons[
icon as keyof typeof icons
]
}

</span>


</div>




<div>

<p

className="
text-sm
text-slate-500
"

>

{title}

</p>



<p

className="
text-3xl
font-black
"

>

{value}

</p>


</div>


</div>


</div>


)

}