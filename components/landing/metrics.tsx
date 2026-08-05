"use client";

import {
  ArrowUpRight,
  Activity,
  MousePointerClick,
  Users,
  Globe,
  Sparkles,
} from "lucide-react";

import FadeUp from "@/components/motion/fade-up";
import { useTranslations } from "next-intl";


const metrics = [
  {
    icon: MousePointerClick,
    key: "clicks",
    value: "+42%",
    gradient:
      "from-violet-600 to-fuchsia-500",
  },

  {
    icon: Users,
    key: "traffic",
    value: "2.4M",
    gradient:
      "from-sky-500 to-cyan-500",
  },

  {
    icon: Globe,
    key: "region",
    value: "180+",
    gradient:
      "from-emerald-500 to-teal-500",
  },

  {
    icon: Activity,
    key: "sync",
    value: "99.9%",
    gradient:
      "from-orange-500 to-amber-500",
  },
];


export default function Metrics() {

  const t = useTranslations("metrics");


  return (

    <section
      className="
        relative
        overflow-hidden
        py-32
      "
    >


      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-20
          h-[500px]
          w-[900px]
          -translate-x-1/2
          rounded-full
          bg-sky-400/10
          blur-[160px]
        "
      />




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
                border-sky-200
                bg-sky-50
                px-4
                py-2
                text-sm
                font-bold
                text-sky-700
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








        {/* CARDS */}


        <div
          className="
            mt-20
            grid
            items-stretch
            gap-8
            md:grid-cols-2
            xl:grid-cols-4
          "
        >


          {
            metrics.map((metric,index)=>{


              const Icon = metric.icon;


              return (

                <FadeUp
                  key={metric.key}
                  delay={index * 0.1}
                >


                  <div
                    className="
                      group
                      relative
                      flex
                      h-full
                      min-h-[350px]
                      flex-col
                      overflow-hidden
                      rounded-[32px]
                      border
                      border-slate-200
                      bg-white
                      p-8
                      shadow-sm
                      transition-all
                      duration-500
                      hover:-translate-y-3
                      hover:border-violet-200
                      hover:shadow-2xl
                    "
                  >




                    {/* Glow */}


                    <div
                      className={`
                        absolute
                        -right-14
                        -top-14
                        h-44
                        w-44
                        rounded-full
                        bg-gradient-to-br
                        ${metric.gradient}
                        opacity-10
                        blur-3xl
                        transition
                        duration-500
                        group-hover:opacity-30
                      `}
                    />





                    {/* ICON */}


                    <div
                      className={`
                        relative
                        flex
                        h-16
                        w-16
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        ${metric.gradient}
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







                    {/* VALUE */}


                    <div
                      className="
                        mt-8
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <h3
                        className="
                          text-5xl
                          font-black
                          tracking-tight
                          text-slate-900
                        "
                      >

                        {metric.value}

                      </h3>


                      <ArrowUpRight
                        className="
                          h-6
                          w-6
                          text-emerald-500
                        "
                      />


                    </div>







                    {/* TITLE */}


                    <h4
                      className="
                        mt-4
                        text-xl
                        font-black
                        text-slate-900
                      "
                    >

                      {t(`cards.${metric.key}.title`)}

                    </h4>








                    {/* DESCRIPTION */}


                    <p
                      className="
                        mt-auto
                        pt-5
                        text-sm
                        leading-7
                        text-slate-600
                      "
                    >

                      {t(`cards.${metric.key}.description`)}

                    </p>



                  </div>


                </FadeUp>

              );


            })
          }


        </div>


      </div>


    </section>

  );

}