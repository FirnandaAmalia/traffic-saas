"use client";


import {
Joyride,
STATUS
} from "react-joyride";


import type {
Step,
EventHandler
} from "react-joyride";



interface Props {

run:boolean;

onFinish:()=>void;

}



const steps:Step[]=[


{

target:"body",

placement:"center",

content:(

<div>

<h3 className="font-bold">
Welcome to Workspace 👋
</h3>


<p className="text-sm mt-2">
Tempat mengelola semua project SEO website Anda.
</p>


</div>

)

},



{

target:".create-project-button",

content:(

<div>

<h3 className="font-bold">
Create Project
</h3>


<p className="text-sm mt-2">
Tambahkan website untuk mulai analisis SEO.
</p>


</div>

)

},



{

target:".project-grid",

content:(

<div>

<h3 className="font-bold">
Project Workspace
</h3>


<p className="text-sm mt-2">
Semua project yang sudah dibuat tampil di sini.
</p>


</div>

)

}


];




export default function ProjectTour({

run,

onFinish

}:Props){



const handleEvent:EventHandler =
(event)=>{


if(

event.status === STATUS.FINISHED ||

event.status === STATUS.SKIPPED

){


onFinish();


}


};

return (

<Joyride

steps={steps}

run={run}

continuous

options={{

primaryColor:"#2563eb",

zIndex:9999,

}}

/>

);

}