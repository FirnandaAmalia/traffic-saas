"use client";

import { useEffect, useState } from "react";

import {
  Joyride,
} from "react-joyride";

import type {
  Step,
} from "react-joyride";


const TOUR_KEY = "traffic-saas-dashboard-tour-completed";


const steps: Step[] = [

  {
    target: ".dashboard-workspace",
    content: (
      <div>
        <h3 className="font-bold text-slate-900">
          Selamat datang di TrafficSaaS 👋
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Dashboard ini membantu memahami performa SEO,
          traffic website, dan rekomendasi AI.
        </p>
      </div>
    ),
  },


  {
    target: ".dashboard-kpi",
    content: (
      <div>
        <h3 className="font-bold text-slate-900">
          Performance Overview
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Pantau metrik utama website Anda.
        </p>
      </div>
    ),
  },


  {
    target: ".traffic-chart",
    content: (
      <div>
        <h3 className="font-bold text-slate-900">
          Traffic Analytics
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Analisis perkembangan traffic organik.
        </p>
      </div>
    ),
  },


  {
    target: ".ai-card",
    content: (
      <div>
        <h3 className="font-bold text-slate-900">
          AI SEO Consultant ✨
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          AI memberikan rekomendasi SEO otomatis.
        </p>
      </div>
    ),
  },


];


export default function DashboardTour(){

  const [run,setRun] = useState(false);


  useEffect(()=>{

    const completed =
      localStorage.getItem(TOUR_KEY);


    if(!completed){

      setRun(true);

      localStorage.setItem(
        TOUR_KEY,
        "true"
      );

    }


  },[]);



  if(!run){
    return null;
  }



  return (

    <Joyride

      steps={steps}

      run={run}

      continuous

    />

  );

}