"use client";

import { useState } from "react";

import {
  ChevronDown,
  Sparkles,
} from "lucide-react";

import { useTranslations } from "next-intl";

import FadeUp from "@/components/motion/fade-up";



const faqKeys = [
  "free",
  "difference",
  "data",
  "multiple",
  "security",
  "upgrade",
];



export default function FAQ() {


  const t = useTranslations("faq");

  const [openIndex,setOpenIndex] =
    useState<number | null>(0);



  return (

    <section
      id="faq"
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
          left-1/2
          top-20
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
          max-w-4xl
          px-6
        "
      >



        {/* HEADER */}

        <FadeUp>

          <div
            className="
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

              <Sparkles
                className="
                  h-4
                  w-4
                "
              />

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







        {/* FAQ LIST */}


        <div
          className="
            mt-16
            space-y-5
          "
        >



          {
            faqKeys.map((key,index)=>{


              const open =
                openIndex === index;



              return (


                <FadeUp
                  key={key}
                  delay={index * 0.05}
                >


                  <div
                    className={`
                      overflow-hidden
                      rounded-3xl
                      border
                      bg-white
                      transition-all
                      duration-500

                      ${
                        open
                        ? "border-violet-200 shadow-xl"
                        : "border-slate-200 shadow-sm"
                      }
                    `}
                  >




                    <button
                      onClick={() =>
                        setOpenIndex(
                          open
                          ? null
                          : index
                        )
                      }

                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-6
                        px-8
                        py-7
                        text-left
                      "
                    >


                      <span
                        className="
                          text-lg
                          font-bold
                          text-slate-900
                        "
                      >

                        {t(`items.${key}.question`)}

                      </span>




                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          transition-all

                          ${
                            open
                            ? "bg-violet-100"
                            : "bg-slate-100"
                          }
                        `}
                      >

                        <ChevronDown
                          className={`
                            h-5
                            w-5
                            text-slate-600
                            transition-transform

                            ${
                              open
                              ? "rotate-180 text-violet-600"
                              : ""
                            }
                          `}
                        />

                      </div>



                    </button>





                    <div
                      className={`
                        grid
                        transition-all
                        duration-500

                        ${
                          open
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                        }
                      `}
                    >

                      <div
                        className="
                          overflow-hidden
                        "
                      >

                        <p
                          className="
                            px-8
                            pb-7
                            leading-8
                            text-slate-600
                          "
                        >

                          {t(`items.${key}.answer`)}

                        </p>


                      </div>


                    </div>




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