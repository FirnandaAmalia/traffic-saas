import type {
  ReactNode,
} from "react";


import {
  cn,
} from "@/lib/utils";





interface CardShellProps {


  children:ReactNode;


  title?:ReactNode;


  description?:ReactNode;


  action?:ReactNode;


  footer?:ReactNode;



  className?:string;


  headerClassName?:string;


  contentClassName?:string;


  footerClassName?:string;

}









export default function CardShell({

children,

title,

description,

action,

footer,

className,

headerClassName,

contentClassName,

footerClassName,

}:CardShellProps){





return (



<section


aria-label={
typeof title === "string"
?
title
:
undefined
}


className={cn(


`
flex
h-full
flex-col

overflow-hidden

rounded-2xl

border
border-slate-200

bg-white

shadow-sm

transition-all
duration-200

hover:shadow-md

`,

className


)}


>













{

(title || action)

&&

(



<header


className={cn(

`
flex
items-start
justify-between

gap-3

border-b
border-slate-100

px-5
py-3

`,

headerClassName

)}


>









<div

className="
min-w-0
flex-1
"

>






{

title &&

(



<h3


className="
truncate
text-sm
font-semibold
text-slate-900
"

>


{title}


</h3>



)


}









{

description &&

(



<p


className="
mt-1
text-xs
leading-5
text-slate-500
"

>


{description}


</p>



)


}





</div>









{

action &&

(



<div

className="
shrink-0
"

>

{action}


</div>



)


}





</header>



)



}












<div


className={cn(

`
min-h-0
flex-1

overflow-hidden

p-5

`,

contentClassName

)}


>


{children}


</div>









{

footer &&

(



<footer


className={cn(

`
border-t
border-slate-100

px-5
py-3

`,

footerClassName

)}


>


{footer}


</footer>



)


}








</section>



);


}