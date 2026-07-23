import {
  ChevronRight,
} from "lucide-react";


import type {
  GSCRow,
} from "@/lib/types/gsc";



interface DataTableProps {

  title:string;

  rows:GSCRow[];

  renderLabel:
  (
    row:GSCRow
  ) => React.ReactNode;

}







export default function DataTable({

title,

rows,

renderLabel,

}:DataTableProps){



const isKeywordTable =

[
"keyword",
"kata",
"query",
"queries"
]

.some(

word =>

title
.toLowerCase()
.includes(word)

);



const columnLabel =

isKeywordTable

?

"Kata Kunci"

:

"Halaman Teratas";





return (

<section

className="
flex
h-full
min-h-0
flex-col
overflow-hidden
rounded-3xl
border
border-slate-200
bg-white
shadow-sm
"

>




{/* HEADER */}


<div

className="
flex
items-center
justify-between
border-b
border-slate-100
px-5
py-4
"

>


<h2

className="
text-base
font-semibold
text-slate-900
"

>

{title}

</h2>





<button

type="button"

className="
flex
items-center
gap-1
text-xs
font-semibold
text-blue-600
transition
hover:text-blue-700
"

>


Lihat Semua


<ChevronRight

className="
h-4
w-4
"

/>


</button>



</div>









{

rows.length === 0

?

(


<div

className="
flex
flex-1
items-center
justify-center
p-8
text-sm
text-slate-500
"

>


Data belum tersedia


</div>


)



:



(



<div

className="
min-h-0
flex-1
overflow-y-auto
"

>


<table

className="
w-full
"

>


<thead

className="
sticky
top-0
z-10
bg-white
"

>


<tr

className="
border-b
border-slate-100
text-xs
uppercase
tracking-wide
text-slate-500
"

>


<th

className="
w-10
py-3
pl-4
text-left
"

>

#

</th>





<th

className="
py-3
text-left
"

>

{columnLabel}

</th>





<th

className="
w-28
py-3
text-right
"

>

Klik Organik

</th>





<th

className="
w-24
py-3
pr-5
text-right
"

>

CTR

</th>





</tr>


</thead>








<tbody>


{


rows

.slice(0,10)

.map(

(row,index)=>(



<tr


key={
row.keys?.[0]
??
index
}


className="
border-b
border-slate-100
transition
hover:bg-slate-50
"

>




<td

className="
py-3
pl-4
"

>


<div

className={`

flex
h-6
w-6
items-center
justify-center
rounded-full
text-[11px]
font-semibold


${
index===0

?

"bg-yellow-100 text-yellow-700"

:

index===1

?

"bg-slate-200 text-slate-700"

:

index===2

?

"bg-orange-100 text-orange-700"

:

"bg-slate-100 text-slate-500"

}

`}

>


{index+1}


</div>


</td>









<td

className="
max-w-0
py-3
"

>


<div

className="
truncate
pr-3
text-sm
font-medium
text-slate-900
"

title={

String(
row.keys?.[0] ?? ""
)

}

>


{renderLabel(row)}


</div>



</td>









<td

className="
py-3
text-right
text-sm
font-semibold
text-slate-900
"

>


{

Number(
row.clicks ?? 0
)

.toLocaleString(
"id-ID"
)

}


</td>









<td

className="
py-3
pr-5
text-right
text-sm
font-medium
text-emerald-600
"

>


{

(
Number(
row.ctr ?? 0
)
*
100

)

.toFixed(1)

}

%


</td>







</tr>



)


)


}



</tbody>



</table>



</div>



)


}



</section>


);

}