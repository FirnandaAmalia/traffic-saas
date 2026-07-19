"use client";

import {
  Brain,
  CheckCircle2,
  FileText,
  Sparkles,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

export default function AiCard() {
  return (
    <div
      className="
        relative
        overflow-hidden

        rounded-3xl

        border
        border-violet-200

        bg-gradient-to-br

        from-violet-600
        via-fuchsia-600
        to-sky-500

        p-7

        text-white

        shadow-[0_20px_60px_rgba(124,58,237,.35)]
      "
    >

      {/* AI SCAN EFFECT */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          h-32

          bg-gradient-to-b
          from-white/30
          via-white/10
          to-transparent

          animate-[aiScan_3s_ease-in-out_infinite]
        "
      />


      {/* Moving Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20

          h-56
          w-56

          rounded-full

          bg-white/10

          blur-3xl

          animate-pulse
        "
      />


      {/* Header */}

      <div className="relative z-10 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
              relative

              flex
              h-14
              w-14

              items-center
              justify-center

              rounded-2xl

              bg-white/15

              backdrop-blur

              shadow-lg

              animate-pulse
            "
          >

            <Brain className="h-7 w-7" />

            <span
              className="
                absolute
                -right-1
                -top-1

                h-3
                w-3

                rounded-full

                bg-emerald-300

                shadow-[0_0_15px_rgba(110,231,183,1)]
              "
            />

          </div>


          <div>

            <p className="text-sm text-violet-100">

              AI Copilot

            </p>

            <h3 className="text-2xl font-black">

              Executive Summary

            </h3>

          </div>

        </div>



        <div
          className="
            rounded-full

            bg-emerald-400/20

            px-4
            py-2

            text-sm
            font-bold

            text-emerald-100

            animate-pulse
          "
        >

          98% Confidence

        </div>


      </div>



      {/* Score */}

      <div className="relative z-10 mt-8 flex items-end gap-4">

        <div>

          <p className="text-sm text-violet-100">

            SEO Score

          </p>


          <h2
            className="
              text-6xl
              font-black

              drop-shadow-lg
            "
          >

            92

          </h2>


        </div>


        <div className="pb-2">

          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              bg-emerald-400/20

              px-4
              py-2

              text-sm
              font-bold
            "
          >

            <TrendingUp className="h-4 w-4" />

            +18%

          </div>


        </div>


      </div>



      <div className="relative z-10 my-7 h-px bg-white/15" />



      {/* Insights */}

      <div className="relative z-10 space-y-4">


        <Insight
          icon={<CheckCircle2 />}
          title="CTR increased by 18%"
          desc="Meta title improvements are performing well."
        />


        <Insight
          icon={<Sparkles />}
          title="12 keywords entered Top 10"
          desc="Strong growth for informational pages."
        />


        <Insight
          icon={<TriangleAlert />}
          title="3 landing pages lost clicks"
          desc="Refresh outdated content to recover rankings."
        />


      </div>



      {/* Footer */}

      <div className="relative z-10 mt-8 flex items-center justify-between">

        <div className="text-sm text-violet-100">

          Generated just now

        </div>


        <button
          className="
            flex
            items-center
            gap-2

            rounded-2xl

            bg-white

            px-5
            py-3

            font-semibold

            text-violet-700

            transition-all

            hover:scale-105
          "
        >

          <FileText className="h-4 w-4" />

          Generate Report

        </button>


      </div>


    </div>
  );
}



function Insight({
  icon,
  title,
  desc,
}:{
  icon:React.ReactNode;
  title:string;
  desc:string;
}){

  return (

    <div className="flex items-start gap-3">

      <div
        className="
          mt-0.5
          text-emerald-300
        "
      >

        {icon}

      </div>


      <div>

        <p className="font-semibold">

          {title}

        </p>


        <p className="text-sm text-violet-100">

          {desc}

        </p>


      </div>


    </div>

  );

}