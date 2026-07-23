const keywords = [
  {
    query:"seo tools",
    clicks:520,
    impressions:"12,000",
    ctr:"4.3%",
    position:"8.2"
  },
  {
    query:"google analytics",
    clicks:310,
    impressions:"8,000",
    ctr:"3.8%",
    position:"11.4"
  },
  {
    query:"traffic dashboard",
    clicks:180,
    impressions:"6,000",
    ctr:"3.0%",
    position:"14.1"
  }
];


export default function KeywordTable(){

return (

<div
className="
rounded-2xl
border
bg-white
overflow-hidden
"
>


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
Keyword Opportunities
</h2>


<p
className="
mt-1
text-sm
text-slate-500
"
>
Keywords with growth potential based on search performance.
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

<th className="px-6 py-4 text-left">
Keyword
</th>

<th className="px-6 py-4">
Clicks
</th>

<th className="px-6 py-4">
Impressions
</th>

<th className="px-6 py-4">
CTR
</th>

<th className="px-6 py-4">
Position
</th>


</tr>

</thead>



<tbody>


{
keywords.map((item)=>(
<tr
key={item.query}
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
{item.query}
</td>


<td className="text-center">
{item.clicks}
</td>


<td className="text-center">
{item.impressions}
</td>


<td className="text-center">
{item.ctr}
</td>


<td className="text-center">
{item.position}
</td>


</tr>
))
}


</tbody>



</table>



</div>


)

}