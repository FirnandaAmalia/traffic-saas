"use client";

import {
  Brain,
  BarChart3,
  Globe,
  FileSpreadsheet,
  FolderOpen,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import FadeUp from "@/components/motion/fade-up";
import { useTranslations } from "next-intl";


const features = [
  {
    icon: BarChart3,
    key: "dashboard",
    gradient: "from-violet-600 to-fuchsia-500",
  },

  {
    icon: Brain,
    key: "ai",
    gradient: "from-sky-500 to-cyan-500",
    pro: true,
  },

  {
    icon: Globe,
    key: "traffic",
    gradient: "from-emerald-500 to-teal-500",
  },

  {
    icon: FolderOpen,
    key: "workspace",
    gradient: "from-orange-500 to-amber-500",
    pro: true,
  },

  {
    icon: FileSpreadsheet,
    key: "reports",
    gradient: "from-pink-500 to-rose-500",
    pro: true,
  },

  {
    icon: Sparkles,
    key: "recommendation",
    gradient: "from-indigo-500 to-violet-500",
    pro: true,
  },
];


export default function FeatureGrid() {

  const t = useTranslations("featureGrid");


  return (
    <section
      id="features"
      className="
        relative
        overflow-hidden
        py-32
      "
    >


      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[900px]
          -translate-x-1/2
          rounded-full
          bg-violet-500/10
          blur-[150px]
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

              <span
                className="
                  bg-gradient-to-r
                  from-violet-600
                  to-sky-500
                  bg-clip-text
                  text-transparent
                "
              >

                {t("title.line2")}

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





        <div
          className="
            mt-20
            grid
            gap-8
            md:grid-cols-2
            xl:grid-cols-3
          "
        >


          {features.map((feature,index)=>{

            const Icon = feature.icon;


            return (

              <FadeUp
                key={feature.key}
                delay={index * 0.08}
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
                    shadow-sm
                    transition-all
                    duration-500
                    hover:-translate-y-3
                    hover:border-violet-200
                    hover:shadow-2xl
                  "
                >


                  <div
                    className={`
                      absolute
                      -right-16
                      -top-16
                      h-48
                      w-48
                      rounded-full
                      bg-gradient-to-br
                      ${feature.gradient}
                      opacity-10
                      blur-3xl
                      transition
                      duration-500
                      group-hover:opacity-30
                    `}
                  />



                  {feature.pro && (

                    <div
                      className="
                        absolute
                        right-6
                        top-6
                        rounded-full
                        bg-violet-100
                        px-3
                        py-1
                        text-xs
                        font-black
                        text-violet-700
                      "
                    >

                      {t("pro")}

                    </div>

                  )}





                  <div
                    className={`
                      relative
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      ${feature.gradient}
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

                    {t(`cards.${feature.key}.title`)}

                  </h3>





                  <p
                    className="
                      mt-4
                      text-sm
                      leading-7
                      text-slate-600
                    "
                  >

                    {t(`cards.${feature.key}.description`)}

                  </p>





                  <div
                    className="
                      mt-6
                      space-y-3
                    "
                  >

                    {["benefit1","benefit2"].map((item)=>(

                      <div
                        key={item}
                        className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          text-slate-600
                        "
                      >

                        <CheckCircle2
                          className="
                            h-4
                            w-4
                            text-emerald-500
                          "
                        />


                        {t(
                          `cards.${feature.key}.${item}`
                        )}


                      </div>


                    ))}


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