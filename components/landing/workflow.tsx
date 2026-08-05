"use client";

import {
  Link2,
  DatabaseZap,
  BrainCircuit,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import FadeUp from "@/components/motion/fade-up";
import { useTranslations } from "next-intl";


const steps = [
  {
    icon: Link2,
    key: "connect",
    color: "from-violet-600 to-fuchsia-500",
  },
  {
    icon: DatabaseZap,
    key: "sync",
    color: "from-sky-500 to-cyan-500",
  },
  {
    icon: BrainCircuit,
    key: "ai",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: TrendingUp,
    key: "growth",
    color: "from-orange-500 to-amber-500",
  },
];


export default function Workflow() {

  const t = useTranslations("workflow");
  

  return (
    <section
      id="workflow"
      className="
        relative
        overflow-hidden
        py-32
      "
    >


      {/* Background */}

      <div className="pointer-events-none absolute inset-0">


        <div
          className="
            absolute
            left-0
            top-20
            h-[450px]
            w-[450px]
            rounded-full
            bg-violet-500/10
            blur-[140px]
          "
        />


        <div
          className="
            absolute
            right-0
            bottom-0
            h-[450px]
            w-[450px]
            rounded-full
            bg-sky-500/10
            blur-[140px]
          "
        />


      </div>





      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
        "
      >




        {/* HEADER */}


        <FadeUp>

          <div
            className="
              mx-auto
              max-w-3xl
              text-center
            "
          >


            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-violet-200
                bg-violet-50
                px-4
                py-2
                text-sm
                font-bold
                text-violet-700
              "
            >

              <Sparkles className="h-4 w-4"/>

              {t("badge")}

            </div>





            <h2
              className="
                mt-7
                text-4xl
                font-black
                tracking-tight
                text-slate-900
                lg:text-6xl
              "
            >

              {t("title.line1")}

              <br />

              {t("title.line2")}

              <br />


              <span
                className="
                  bg-gradient-to-r
                  from-violet-600
                  to-sky-500
                  bg-clip-text
                  text-transparent
                "
              >

                {t("title.highlight")}

              </span>


            </h2>





            <p
              className="
                mt-6
                text-lg
                leading-8
                text-slate-600
              "
            >

              {t("description")}

            </p>



          </div>


        </FadeUp>







        {/* STEPS */}


        <div
          className="
            relative
            mt-20
          "
        >



          {/* LINE */}

          <div
            className="
              absolute
              left-[12%]
              right-[12%]
              top-12
              hidden
              h-[3px]
              bg-gradient-to-r
              from-violet-400
              via-sky-400
              to-emerald-400
              lg:block
            "
          />





          <div
            className="
              grid
              gap-8
              lg:grid-cols-4
            "
          >


            {steps.map((step,index)=>{


              const Icon = step.icon;


              return (

                <FadeUp
                  key={step.key}
                  delay={index * 0.12}
                >


                  <div
                    className="
                      group
                      relative
                      h-[340px]
                    "
                  >


                    <div
                      className="
                        relative
                        flex
                        h-full
                        flex-col
                        rounded-[32px]
                        border
                        border-slate-200
                        bg-white/90
                        p-8
                        shadow-sm
                        backdrop-blur-xl
                        transition-all
                        duration-500
                        hover:-translate-y-3
                        hover:border-violet-200
                        hover:shadow-2xl
                      "
                    >




                      <div
                        className="
                          absolute
                          right-5
                          top-5
                          text-5xl
                          font-black
                          text-slate-100
                        "
                      >

                        0{index + 1}

                      </div>






                      <div
                        className={`
                          flex
                          h-16
                          w-16
                          items-center
                          justify-center
                          rounded-2xl
                          bg-gradient-to-br
                          ${step.color}
                          shadow-lg
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        `}
                      >

                        <Icon
                          className="
                            h-8
                            w-8
                            text-white
                          "
                        />

                      </div>







                      <h3
                        className="
                          mt-8
                          text-xl
                          font-black
                          text-slate-900
                        "
                      >

                        {t(`steps.${step.key}.title`)}

                      </h3>







                      <p
                        className="
                          mt-4
                          flex-1
                          text-sm
                          leading-7
                          text-slate-600
                        "
                      >

                        {t(`steps.${step.key}.description`)}

                      </p>






                      <div
                        className="
                          mt-auto
                          flex
                          items-center
                          gap-2
                          pt-5
                          text-sm
                          font-semibold
                          text-violet-600
                        "
                      >

                        {t("step")} {index + 1}

                        <ArrowRight className="h-4 w-4"/>

                      </div>




                    </div>


                  </div>


                </FadeUp>


              );


            })}



          </div>


        </div>



      </div>



    </section>
  );
}