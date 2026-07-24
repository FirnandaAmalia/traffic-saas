"use client";

import DashboardTour from "@/components/onboarding/dashboard-tour";
import { useEffect, useState } from "react";
import AutoTour from "@/components/onboarding/auto-tour";


export default function DashboardLayout({
children,
}:{
children:React.ReactNode;
}){


return (

<>

<AutoTour />

{children}

</>

);

}