"use client";

import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

import {
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";


export default function LoginPage(){

  const t = useTranslations("login");
  const locale = useLocale();


  return (

    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-br
        from-slate-50
        via-white
        to-violet-50
        px-6
      "
    >


      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-200px]
          h-[700px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-violet-500/20
          blur-[180px]
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          bottom-[-200px]
          right-[-100px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-sky-400/20
          blur-[160px]
        "
      />



      {/* Login Card */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-[40px]
          border
          border-white/70
          bg-white/70
          p-10
          shadow-[0_40px_120px_rgba(15,23,42,.15)]
          backdrop-blur-2xl
        "
      >



        {/* Logo */}

        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-3xl
            bg-gradient-to-br
            from-violet-600
            to-sky-500
            shadow-xl
          "
        >

          <Sparkles
            className="
              h-8
              w-8
              text-white
            "
          />

        </div>




        {/* Title */}

        <h1
          className="
            mt-8
            text-center
            text-3xl
            font-black
            tracking-tight
            text-slate-900
          "
        >

          TrafficSaaS

        </h1>


        <p
          className="
            mt-3
            text-center
            text-sm
            leading-6
            text-slate-500
          "
        >

          {t("subtitle")}

        </p>





        {/* Google Button */}

        <button

          onClick={()=>signIn(
            "google",
            {
              callbackUrl:`/${locale}/dashboard`
            }
          )}

          className="
            group
            mt-8
            flex
            h-14
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-slate-200
            bg-white
            font-semibold
            text-slate-700
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-violet-200
            hover:shadow-xl
          "

        >


          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-slate-50
            "
          >

            <span
              className="
                text-lg
                font-bold
                text-blue-600
              "
            >
              G
            </span>

          </div>



          {t("button")}


        </button>





        {/* Trust */}

        <div
          className="
            mt-8
            grid
            grid-cols-3
            gap-3
          "
        >


          <Feature
            icon={<ShieldCheck/>}
            text="Secure"
          />


          <Feature
            icon={<Sparkles/>}
            text="AI Powered"
          />


          <Feature
            icon={<Zap/>}
            text="Fast"
          />


        </div>




        {/* Agreement */}

        <p
          className="
            mt-8
            text-center
            text-[11px]
            leading-5
            text-slate-400
          "
        >

          {t("agreement")}

        </p>



      </div>



    </main>

  );
}




function Feature({
  icon,
  text,
}:{
  icon:React.ReactNode;
  text:string;
}){

return (

<div
className="
flex
flex-col
items-center
gap-2
rounded-2xl
bg-white/60
p-3
text-center
"
>

<div
className="
h-5
w-5
text-violet-600
"
>

{icon}

</div>


<span
className="
text-[11px]
font-semibold
text-slate-500
"
>

{text}

</span>


</div>

)

}