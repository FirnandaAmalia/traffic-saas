"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import {
  Languages
} from "lucide-react";


export default function LanguageSwitcher() {


  const locale = useLocale();

  const router = useRouter();


  function changeLanguage(value:string){

    router.push(`/${value}`);

  }



  return (

    <div
      className="
        flex
        items-center
        gap-1
        rounded-full
        border
        border-slate-200
        bg-white
        p-1
        shadow-sm
      "
    >


      <Languages
        className="
          ml-2
          h-4
          w-4
          text-slate-500
        "
      />


      <button
        onClick={()=>changeLanguage("id")}
        className={`
          h-9
rounded-full
px-3
          text-xs
          font-bold
          transition

          ${
            locale==="id"
            ?
            "bg-violet-600 text-white"
            :
            "text-slate-600 hover:bg-slate-100"
          }
        `}
      >

        ID

      </button>



      <button
        onClick={()=>changeLanguage("en")}
        className={`
          rounded-full
          px-3
          py-1.5
          text-sm
          font-bold
          transition

          ${
            locale==="en"
            ?
            "bg-violet-600 text-white"
            :
            "text-slate-600 hover:bg-slate-100"
          }
        `}
      >

        EN

      </button>


    </div>

  );

}