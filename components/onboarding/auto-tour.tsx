"use client";


import {
  useEffect,
} from "react";


import {
  useTour,
} from "./tour-provider";





export default function AutoTour(){



const {
  startWelcomeTour,
}=useTour();







useEffect(()=>{



const welcomeDone =
localStorage.getItem(
"traffic-saas-welcome-completed"
);



const tourDone =
localStorage.getItem(
"traffic-saas-tour-completed"
);







/*
USER BARU

Flow:

Welcome
 ↓
Dashboard Tour
 ↓
Workspace Ready

*/


if(
!welcomeDone &&
!tourDone
){



const timer =
setTimeout(()=>{


startWelcomeTour();



},800);





return ()=>clearTimeout(timer);



}





},[
startWelcomeTour
]);





return null;


}