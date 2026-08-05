"use client";

import {
  Sparkles,
  ShieldCheck,
  Database,
  Brain,
} from "lucide-react";

import { useTranslations } from "next-intl";


const companies = [
  {
    key: "ga4",
    icon: Database,
  },
  {
    key: "gsc",
    icon: ShieldCheck,
  },
  {
    key: "openai",
    icon: Brain,
  },
  {
    key: "nextjs",
    icon: Sparkles,
  },
];


export default function SocialProof() {

  const t = useTranslations("socialProof");


  return (
    <section
      className="
        relative
        overflow-hidden
        py-24
      "
    >


      {/* Background */}

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

        <div
          className="
            mx-auto
            max-w-3xl
            text-center
          "
        >


          <span
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

          </span>




          <h2
            className="
              mt-6

              text-4xl

              font-black

              tracking-tight

              text-slate-900

              lg:text-6xl
            "
          >

            {t("title")}

          </h2>




          <p
            className="
              mx-auto

              mt-5

              max-w-2xl

              text-lg

              leading-8

              text-slate-600
            "
          >

            {t("description")}

          </p>


        </div>





        {/* COMPANIES */}

        <div
          className="
            mt-14

            grid

            gap-6

            sm:grid-cols-2

            lg:grid-cols-4
          "
        >

          {
            companies.map((item)=>{

              const Icon = item.icon;


              return (

                <div
                  key={item.key}

                  className="
                    group

                    rounded-3xl

                    border

                    border-slate-200

                    bg-white

                    p-8

                    text-center

                    shadow-sm

                    transition-all

                    duration-500

                    hover:-translate-y-2

                    hover:border-violet-200

                    hover:shadow-2xl
                  "
                >


                  <div
                    className="
                      mx-auto

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



                  <h3
                    className="
                      mt-5

                      text-lg

                      font-black

                      text-slate-900
                    "
                  >

                    {t(`companies.${item.key}.name`)}

                  </h3>




                  <p
                    className="
                      mt-2

                      text-sm

                      text-slate-500
                    "
                  >

                    {t("integrated")}

                  </p>



                </div>

              );


            })
          }


        </div>


      </div>


    </section>
  );
}