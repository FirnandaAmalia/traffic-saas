"use client";

import Link from "next/link";

import {
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

import FadeUp from "@/components/motion/fade-up";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const freeFeatures = [
  "feature1",
  "feature2",
  "feature3",
  "feature4",
  "feature5",
  "feature6",
  "feature7",
  "feature8",
  "feature9",
];


const proFeatures = [
  "feature1",
  "feature2",
  "feature3",
  "feature4",
  "feature5",
  "feature6",
  "feature7",
  "feature8",
  "feature9",
];


export default function PricingPreview() {

  const t = useTranslations("pricing");
  const locale = useLocale();

  return (

    <section
      id="pricing"
      className="
        relative
        overflow-hidden
        py-32
      "
    >


      {/* Background */}

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







        {/* PRICING */}

        <div
  className="
    mt-20
    grid
    items-stretch
    gap-8
    lg:grid-cols-2
  "
>



          {/* FREE */}


          <FadeUp>


            <div
              className="
                flex
                min-h-[720px]
                flex-col

                rounded-[36px]

                border
                border-slate-200

                bg-white

                p-10

                shadow-sm

                transition-all

                duration-500

                hover:-translate-y-2

                hover:shadow-xl
              "
            >


              <span
                className="
                  rounded-full

                  bg-slate-100

                  px-4

                  py-2

                  text-sm

                  font-bold

                  text-slate-700
                "
              >

                {t("free.badge")}

              </span>




              <div
                className="
                  mt-8
                  flex
                  items-end
                  gap-2
                "
              >

                <h3
                  className="
                    text-6xl
                    font-black
                    text-slate-900
                  "
                >

                  {t("free.price")}

                </h3>


                <span
                  className="
                    mb-3
                    text-slate-500
                  "
                >

                  {t("free.period")}

                </span>


              </div>





              <p
                className="
                  mt-4
                  text-slate-600
                "
              >

                {t("free.description")}

              </p>





              <div
                className="
                  my-8
                  h-px
                  bg-slate-200
                "
              />





              <div
                className="
                  flex-1
                  space-y-5
                "
              >

                {
                  freeFeatures.map(item=>(

                    <Feature
                      key={item}
                      text={t(`free.features.${item}`)}
                    />

                  ))
                }

              </div>





              <Button
                asChild
                variant="outline"
                className="
                  mt-10
                  h-14
                  w-full
                  rounded-2xl
                  font-semibold
                "
              >

                <Link href={`/${locale}/login`}>

                  {t("free.cta")}

                </Link>

              </Button>


            </div>


          </FadeUp>








          {/* PRO */}

<FadeUp delay={0.15}>

  <div
    className="
      relative
      h-full
      rounded-[36px]

      bg-gradient-to-br
      from-violet-600
      via-indigo-600
      to-sky-500

      p-[1px]

      shadow-[0_40px_120px_rgba(124,58,237,.35)]
    "
  >

    <div
      className="
        flex
        h-full
        min-h-[720px]
        flex-col

        rounded-[35px]

        bg-slate-950

        p-10

        text-white
      "
    >

      <div
        className="
          absolute
          right-8
          top-8

          rounded-full

          bg-white/10

          px-4
          py-2

          text-xs

          font-bold
        "
      >
        {t("pro.badge")}
      </div>


      <span
        className="
          text-sm
          font-bold
          tracking-widest
          text-violet-300
        "
      >
        {t("pro.name")}
      </span>


      <div
        className="
          mt-6
          flex
          items-end
          gap-2
        "
      >

        <h3
          className="
            text-6xl
            font-black
          "
        >
          {t("pro.price")}
        </h3>


        <span
          className="
            mb-4
            text-slate-400
          "
        >
          {t("pro.period")}
        </span>

      </div>



      <p
        className="
          mt-4
          text-slate-300
        "
      >
        {t("pro.description")}
      </p>



      <div
        className="
          my-8
          h-px
          bg-white/10
        "
      />


      <div
        className="
          flex-1
          space-y-5
        "
      >

        {proFeatures.map(item => (
          <Feature
            key={item}
            text={t(`pro.features.${item}`)}
            dark
          />
        ))}

      </div>



      <Button
        asChild
        className="
          mt-auto

          h-14

          w-full

          rounded-2xl

          bg-white

          font-bold

          text-violet-700

          hover:bg-slate-100
        "
      >

        <Link href="/billing">

          {t("pro.cta")}

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


</FadeUp>
        </div>


      </div>


    </section>

  );
}





function Feature({
  text,
  dark=false,
}:{
  text:string;
  dark?:boolean;
}) {


  return (

    <div
      className="
        flex
        items-center
        gap-4
      "
    >

      <div
        className={`
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full

          ${dark
            ? "bg-white/10"
            : "bg-emerald-100"
          }
        `}
      >

        <Check
          className={`
            h-4
            w-4

            ${
              dark
              ? "text-emerald-400"
              : "text-emerald-600"
            }
          `}
        />

      </div>


      <span
        className={`
          font-medium

          ${
            dark
            ? "text-slate-200"
            : "text-slate-700"
          }
        `}
      >

        {text}

      </span>


    </div>

  );
}