"use client";

import {
  Sparkles,
  Brain,
  TrendingUp,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";


const features = [
  "summary",
  "recommendation",
  "impact",
  "priority",
];


export default function AIPreview() {


  const t = useTranslations("aiPreview");


  return (

    <section
      id="ai"
      className="
        relative
        overflow-hidden
        py-32
      "
    >


      {/* BACKGROUND */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
      >

        <div
          className="
            absolute
            left-0
            top-0

            h-[500px]
            w-[500px]

            rounded-full

            bg-violet-500/15

            blur-[150px]
          "
        />


        <div
          className="
            absolute
            right-0
            bottom-0

            h-[500px]
            w-[500px]

            rounded-full

            bg-cyan-500/15

            blur-[150px]
          "
        />


      </div>





      <div
        className="
          relative
          mx-auto

          grid

          max-w-7xl

          items-center

          gap-20

          px-6

          lg:grid-cols-2
        "
      >



        {/* LEFT */}


        <div>


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
              mt-6

              text-5xl

              font-black

              leading-tight

              tracking-tight

              text-slate-900
            "
          >

            {t("title.line1")}

            <br />

            {t("title.line2")}


          </h2>





          <p
            className="
              mt-8

              max-w-xl

              text-lg

              leading-8

              text-slate-500
            "
          >

            {t("description")}


          </p>






          <div
            className="
              mt-10

              space-y-6
            "
          >

            {
              features.map((item)=>(


                <div
                  key={item}

                  className="
                    flex

                    items-center

                    gap-4
                  "
                >


                  <div
                    className="
                      flex

                      h-10

                      w-10

                      items-center

                      justify-center

                      rounded-xl

                      bg-violet-100
                    "
                  >

                    <Sparkles
                      className="
                        h-5

                        w-5

                        text-violet-600
                      "
                    />

                  </div>


                  <span
                    className="
                      font-medium

                      text-slate-700
                    "
                  >

                    {t(`features.${item}`)}

                  </span>


                </div>


              ))
            }


          </div>






          <Button
            asChild
            size="lg"

            className="
              mt-10

              rounded-full

              bg-gradient-to-r

              from-violet-600

              to-sky-500

              px-8
            "
          >

            <Link href="/billing">

              {t("cta")}

              <ArrowRight
                className="
                  ml-2

                  h-4

                  w-4
                "
              />

            </Link>


          </Button>



        </div>







        {/* RIGHT */}


        <div
          className="
            relative
          "
        >


          <div
            className="
              absolute

              inset-0

              rounded-[40px]

              bg-gradient-to-r

              from-violet-500/20

              to-sky-500/20

              blur-[120px]
            "
          />





          <div
            className="
              relative

              rounded-[36px]

              border

              border-slate-200

              bg-white

              p-8

              shadow-[0_60px_160px_rgba(15,23,42,.18)]
            "
          >



            <div
              className="
                flex

                items-center

                gap-3
              "
            >


              <div
                className="
                  rounded-2xl

                  bg-violet-100

                  p-3
                "
              >

                <Brain
                  className="
                    h-6

                    w-6

                    text-violet-600
                  "
                />

              </div>




              <div>

                <p
                  className="
                    text-sm

                    text-slate-500
                  "
                >

                  {t("card.label")}

                </p>


                <h3
                  className="
                    text-xl

                    font-bold

                    text-slate-900
                  "
                >

                  {t("card.title")}

                </h3>


              </div>


            </div>







            <div
              className="
                mt-8

                rounded-2xl

                bg-slate-50

                p-6
              "
            >

              <p
                className="
                  leading-8

                  text-slate-700
                "
              >

                {t.rich(
                  "card.summary",
                  {
                    growth:(chunks)=>
                    <span className="font-bold text-emerald-600">
                      {chunks}
                    </span>,

                    clicks:(chunks)=>
                    <span className="font-bold text-violet-600">
                      {chunks}
                    </span>
                  }
                )}

              </p>


            </div>







            <div
              className="
                mt-8

                space-y-5
              "
            >


              <div
                className="
                  flex

                  items-start

                  gap-4

                  rounded-2xl

                  border

                  p-5
                "
              >

                <TrendingUp
                  className="
                    mt-1

                    h-6

                    w-6

                    text-emerald-600
                  "
                />


                <div>

                  <h4 className="font-bold">

                    {t("card.impact.title")}

                  </h4>


                  <p
                    className="
                      mt-2

                      text-sm

                      text-slate-500
                    "
                  >

                    {t("card.impact.description")}

                  </p>


                </div>


              </div>






              <div
                className="
                  flex

                  items-start

                  gap-4

                  rounded-2xl

                  border

                  p-5
                "
              >

                <Lightbulb
                  className="
                    mt-1

                    h-6

                    w-6

                    text-amber-500
                  "
                />


                <div>


                  <h4 className="font-bold">

                    {t("card.recommendation.title")}

                  </h4>


                  <p
                    className="
                      mt-2

                      text-sm

                      text-slate-500
                    "
                  >

                    {t("card.recommendation.description")}

                  </p>


                </div>


              </div>



            </div>


          </div>


        </div>


      </div>


    </section>

  );

}