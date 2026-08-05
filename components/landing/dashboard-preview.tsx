"use client";

import {
  ArrowRight,
  BarChart3,
  Brain,
  Globe,
  Sparkles,
} from "lucide-react";

import Link from "next/link";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import DashboardMockup from "./dashboard-mockup";
import { useLocale } from "next-intl";

export default function DashboardPreview() {

const locale = useLocale();
  const t = useTranslations("dashboardShowcase");


  return (

    <section
      id="dashboard"
      className="
        relative
        overflow-hidden
        py-32
      "
    >



      {/* Background */}

      <div
        className="
          absolute
          inset-0
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            left-[-180px]
            top-20
            h-[520px]
            w-[520px]
            rounded-full
            bg-violet-500/20
            blur-[140px]
          "
        />


        <div
          className="
            absolute
            right-[-180px]
            bottom-0
            h-[520px]
            w-[520px]
            rounded-full
            bg-sky-500/20
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
              bg-violet-100
              px-4
              py-2
              text-sm
              font-semibold
              text-violet-700
            "
          >

            <Sparkles className="h-4 w-4"/>

            {t("badge")}

          </span>





          <h2
            className="
              mt-6
              text-5xl
              font-black
              tracking-tight
              text-slate-900
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
              text-slate-500
            "
          >

            {t("description")}

          </p>



        </div>







        {/* MOCKUP */}


        <div
          className="
            relative
            mt-24
          "
        >


          <DashboardMockup />






          {/* TRAFFIC CARD */}


          <div
            className="
              absolute
              -left-8
              top-12
              hidden
              rounded-3xl
              border
              bg-white/90
              p-5
              shadow-2xl
              backdrop-blur-xl
              lg:block
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <BarChart3
                className="
                  h-11
                  w-11
                  rounded-2xl
                  bg-violet-100
                  p-3
                  text-violet-700
                "
              />


              <div>

                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >

                  {t("growthCard.label")}

                </p>


                <h3
                  className="
                    text-3xl
                    font-black
                    text-emerald-600
                  "
                >

                  {t("growthCard.value")}

                </h3>


              </div>


            </div>


          </div>







          {/* AI CARD */}


          <div
            className="
              absolute
              -right-8
              top-40
              hidden
              rounded-3xl
              border
              bg-white/90
              p-5
              shadow-2xl
              backdrop-blur-xl
              lg:block
            "
          >

            <div
              className="
                flex
                items-start
                gap-3
              "
            >

              <Brain
                className="
                  mt-1
                  h-11
                  w-11
                  rounded-2xl
                  bg-sky-100
                  p-3
                  text-sky-700
                "
              />


              <div>


                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >

                  {t("aiCard.label")}

                </p>



                <h3
                  className="
                    mt-1
                    font-bold
                  "
                >

                  {t("aiCard.value")}

                </h3>


              </div>


            </div>


          </div>







          {/* COUNTRY CARD */}


          <div
            className="
              absolute
              bottom-10
              left-24
              hidden
              rounded-3xl
              border
              bg-white/90
              p-5
              shadow-2xl
              backdrop-blur-xl
              lg:block
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >


              <Globe
                className="
                  h-11
                  w-11
                  rounded-2xl
                  bg-emerald-100
                  p-3
                  text-emerald-700
                "
              />


              <div>

                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >

                  {t("countryCard.label")}

                </p>


                <h3
                  className="
                    font-bold
                  "
                >

                  {t("countryCard.value")}

                </h3>


              </div>


            </div>


          </div>



        </div>






        {/* CTA */}


        <div
          className="
            mt-20
            flex
            justify-center
          "
        >


          <Button
            asChild
            size="lg"
            className="
              rounded-full
              bg-gradient-to-r
              from-violet-600
              to-sky-500
              px-8
            "
          >

            <Link href={`/${locale}/dashboard`}>

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



      </div>


    </section>

  );

}