"use client";

import {
  Brain,
  Lightbulb,
  TrendingUp,
  Zap,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import FadeUp from "@/components/motion/fade-up";
import { useTranslations } from "next-intl";

const solutions = [
  {
    number: "01",
    icon: Brain,
    key: "ai",
  },
  {
    number: "02",
    icon: Lightbulb,
    key: "recommendation",
  },
  {
    number: "03",
    icon: TrendingUp,
    key: "monitoring",
  },
  {
    number: "04",
    icon: Zap,
    key: "decision",
  },
];

export default function Solution() {

  const t = useTranslations("solution");
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-32
      "
    >

      {/* Background */}

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-20

          h-[500px]
          w-[500px]

          rounded-full

          bg-sky-500/10

          blur-[140px]
        "
      />


      <div
        className="
          relative
          mx-auto
          max-w-6xl
          px-6
        "
      >



        {/* Header */}

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

                text-xs

                font-bold

                tracking-wide

                text-sky-700
              "
            >

              <Sparkles className="h-4 w-4"/>

              {t("badge")}

            </div>




            <h2
              className="
                mt-8

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
                mx-auto

                mt-6

                max-w-2xl

                text-lg

                leading-8

                text-slate-600
              "
            >

              {t("description")}
            </p>


          </div>


        </FadeUp>





        {/* Solution Cards */}

        <div
          className="
            mt-20

            grid

            gap-8

            md:grid-cols-2
          "
        >


          {solutions.map((item,index)=>{

            const Icon = item.icon;


            return (

              <FadeUp
                key={item.key}
                delay={index * 0.12}
              >

                <div
                  className="
                    group

                    relative

                    overflow-hidden


                    rounded-[32px]


                    border

                    border-slate-200


                    bg-white


                    p-8


                    transition-all

                    duration-500


                    hover:-translate-y-3


                    hover:border-violet-300


                    hover:shadow-[0_30px_80px_rgba(124,58,237,.15)]
                  "
                >



                  {/* Number */}

                  <div
                    className="
                      absolute

                      right-8

                      top-5


                      text-6xl

                      font-black

                      text-slate-100


                      transition

                      group-hover:text-violet-100
                    "
                  >

                    {item.number}

                  </div>




                  {/* Glow */}

                  <div
                    className="
                      absolute

                      -right-20

                      -top-20

                      h-48

                      w-48

                      rounded-full

                      bg-violet-500/10

                      blur-3xl


                      opacity-0

                      transition

                      duration-500

                      group-hover:opacity-100
                    "
                  />





                  {/* Icon */}

                  <div
                    className="
                      relative

                      flex

                      h-16

                      w-16

                      items-center

                      justify-center


                      rounded-2xl


                      bg-gradient-to-br

                      from-violet-600

                      to-sky-500


                      shadow-lg

                      shadow-violet-500/30


                      transition-transform

                      duration-300

                      group-hover:scale-110
                    "
                  >

                    <Icon
                      className="
                        h-8
                        w-8
                        text-white
                      "
                    />

                  </div>





                  {/* Tag */}

                  <p
                    className="
                      mt-8

                      text-xs

                      font-bold

                      tracking-[0.18em]

                      text-violet-600
                    "
                  >

                    {t(`cards.${item.key}.tag`)}

                  </p>





                  <h3
                    className="
                      mt-3

                      text-2xl

                      font-black

                      text-slate-900
                    "
                  >

                    {t(`cards.${item.key}.title`)}

                  </h3>





                  <p
                    className="
                      mt-4

                      leading-7

                      text-slate-600
                    "
                  >

                    {t(`cards.${item.key}.description`)}

                  </p>





                  <div
                    className="
                      mt-8

                      flex

                      items-center

                      gap-2

                      text-sm

                      font-semibold

                      text-violet-600


                      opacity-0

                      transition-all

                      duration-300

                      group-hover:opacity-100
                    "
                  >

                    {t("learn")}

                    <ArrowRight
                      className="
                        h-4
                        w-4
                      "
                    />

                  </div>



                </div>


              </FadeUp>

            );

          })}


        </div>


      </div>


    </section>
  );
}