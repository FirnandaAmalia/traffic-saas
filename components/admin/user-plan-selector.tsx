"use client";

import { useState } from "react";

interface UserPlanSelectorProps {
  userId: string;
  currentPlan: "FREE" | "PRO";
}


export default function UserPlanSelector({
  userId,
  currentPlan,
}: UserPlanSelectorProps) {


  const [plan, setPlan] =
    useState(currentPlan);


  const [loading, setLoading] =
    useState(false);


  async function updatePlan(){

    setLoading(true);


    const response =
      await fetch(
        "/api/admin/users/update-plan",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            userId,
            plan,
          }),
        }
      );


    setLoading(false);


    if(response.ok){

      alert("Plan berhasil diperbarui");

    }else{

      alert("Gagal memperbarui plan");

    }

  }



  return (

    <div className="flex items-center gap-2">


      <select

        value={plan}

        onChange={(e)=>
          setPlan(
            e.target.value as "FREE" | "PRO"
          )
        }

        className="
          rounded-lg
          border
          border-slate-200
          px-2
          py-1
          text-xs
        "

      >

        <option value="FREE">
          FREE
        </option>


        <option value="PRO">
          PRO
        </option>


      </select>



      {
        plan !== currentPlan && (

          <button

            onClick={updatePlan}

            disabled={loading}

            className="
              rounded-lg
              bg-blue-600
              px-3
              py-1
              text-xs
              font-semibold
              text-white
              hover:bg-blue-700
              disabled:opacity-50
            "

          >

            {
              loading
              ?
              "..."
              :
              "Simpan"
            }

          </button>

        )
      }


    </div>

  );

}