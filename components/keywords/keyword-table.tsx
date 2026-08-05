import {
  getTranslations,
} from "next-intl/server";

import type {
  GSCRow,
} from "@/lib/types/gsc";



interface KeywordTableProps {

  keywords:GSCRow[];

}




export default async function KeywordTable({

keywords,

}:KeywordTableProps){


const t =
await getTranslations("keywords.table");



return (


<div

className="
rounded-2xl
border
bg-white
overflow-hidden
"

>


{/* HEADER */}

<div

className="
border-b
px-6
py-5
"

>


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
mt-1
text-sm
text-slate-500
"

>

{t("description")}

</p>



</div>









<table

className="
w-full
text-sm
"

>



<thead

className="
bg-slate-50
text-slate-500
"

>


<tr>


<th

className="
px-6
py-4
text-left
"

>

{t("columns.keyword")}

</th>



<th

className="
px-6
py-4
"

>

{t("columns.clicks")}

</th>



<th

className="
px-6
py-4
"

>

{t("columns.impressions")}

</th>



<th

className="
px-6
py-4
"

>

{t("columns.ctr")}

</th>



<th

className="
px-6
py-4
"

>

{t("columns.position")}

</th>



</tr>


</thead>








<tbody>


{


keywords.length === 0


?


<tr>

<td

colSpan={5}

className="
px-6
py-10
text-center
text-sm
text-slate-500
"

>

{t("empty")}

</td>

</tr>


:


keywords.map((item,index)=>(


<tr

key={index}

className="
border-t
hover:bg-slate-50
"

>



<td

className="
px-6
py-4
font-medium
"

>


{

item.keys?.join(", ")

??

"-"

}


</td>







<td

className="
text-center
"

>

{

(item.clicks ?? 0)
.toLocaleString("id-ID")

}

</td>







<td

className="
text-center
"

>

{

(item.impressions ?? 0)
.toLocaleString("id-ID")

}

</td>







<td

className="
text-center
"

>

{

(
(item.ctr ?? 0)
*
100
)
.toFixed(2)

}%

</td>







<td

className="
text-center
"

>

{

(item.position ?? 0)
.toFixed(1)

}

</td>







</tr>


))


}



</tbody>



</table>



</div>


);


}