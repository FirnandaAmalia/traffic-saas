"use client";


import {
  CircleHelp,
} from "lucide-react";


import {
  useTour,
} from "./tour-provider";





export default function TourFeatureButton(){



const {
  startDashboardTour,
}=useTour();







function handleTour(){


/*
Manual tour dari sidebar

Tidak memunculkan Welcome Tour.
Langsung masuk ke fitur utama.
*/


startDashboardTour();



}







return (



<button


type="button"



onClick={handleTour}



className="
flex
w-full
items-center
gap-3
rounded-xl
px-3
py-2.5
text-sm
font-medium
text-slate-600
transition
duration-200
hover:bg-blue-50
hover:text-blue-700
"



>



<CircleHelp

className="
h-4
w-4
"

/>





<span>

Tour Fitur

</span>





</button>



);


}