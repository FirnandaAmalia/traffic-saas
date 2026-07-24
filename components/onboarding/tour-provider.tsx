"use client";


import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";


import DashboardTour from "./dashboard-tour";
import WelcomeTour from "./welcome-tour";
import WorkspaceReady from "./workspace-ready";





type TourContextType = {

  startDashboardTour:()=>void;

  startWelcomeTour:()=>void;

};





const TourContext =
createContext<TourContextType | null>(null);







export function TourProvider({

children,

}:{

children:React.ReactNode;

}){





const [
welcomeRun,
setWelcomeRun
]=useState(false);



const [
dashboardRun,
setDashboardRun
]=useState(false);



const [
ready,
setReady
]=useState(false);








/*
AUTO START UNTUK USER BARU

Flow:

Login
 ↓
Welcome Tour
 ↓
Dashboard Tour
 ↓
Workspace Ready

*/

useEffect(()=>{


const welcomeCompleted =
localStorage.getItem(
"traffic-saas-welcome-completed"
);



const tourCompleted =
localStorage.getItem(
"traffic-saas-tour-completed"
);





if(
!welcomeCompleted &&
!tourCompleted
){


const timer =
setTimeout(()=>{


setWelcomeRun(true);


},800);



return ()=>clearTimeout(timer);


}



},[]);








return (



<TourContext.Provider


value={{




startDashboardTour(){


setDashboardRun(true);


},





startWelcomeTour(){


setWelcomeRun(true);


},





}}



>



{children}








<WelcomeTour



run={welcomeRun}



onFinish={()=>{


setWelcomeRun(false);



setDashboardRun(true);



}}


/>









<DashboardTour



run={dashboardRun}



onFinish={()=>{


setDashboardRun(false);



localStorage.setItem(

"traffic-saas-tour-completed",

"true"

);



setTimeout(()=>{


setReady(true);



},500);



}}


/>









<WorkspaceReady



open={ready}



onClose={()=>{


setReady(false);



}}


/>







</TourContext.Provider>




);


}









export function useTour(){


const context =
useContext(TourContext);





if(!context){


throw new Error(

"useTour must be used inside TourProvider"

);


}





return context;


}