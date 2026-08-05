"use client";

import {
  Quote,
  Star,
  Sparkles,
} from "lucide-react";

import FadeUp from "@/components/motion/fade-up";
import { useTranslations } from "next-intl";


const testimonials = [
  {
    key: "daniel",
    initials: "DK",
  },
  {
    key: "sarah",
    initials: "SJ",
  },
  {
    key: "michael",
    initials: "MC",
  },
];


export default function Testimonials() {

  const t = useTranslations("testimonials");


  return (

    <section
      id="testimonials"
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







        {/* CARDS */}


        <div
          className="
            mt-20

            grid

            gap-8

            lg:grid-cols-3
          "
        >


          {
            testimonials.map((item,index)=>(


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
                    className="
                      absolute

                      -right-16

                      -top-16

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





                  {/* Quote */}

                  <div
                    className="
                      flex

                      h-12

                      w-12

                      items-center

                      justify-center

                      rounded-2xl

                      bg-violet-100
                    "
                  >

                    <Quote
                      className="
                        h-6
                        w-6
                        text-violet-600
                      "
                    />

                  </div>






                  {/* Stars */}

                  <div
                    className="
                      mt-6
                      flex
                      gap-1
                    "
                  >

                    {
                      Array.from({
                        length:5
                      }).map((_,i)=>(

                        <Star
                          key={i}
                          className="
                            h-4
                            w-4
                            fill-yellow-400
                            text-yellow-400
                          "
                        />

                      ))
                    }

                  </div>






                  {/* Quote Text */}

                  <p
                    className="
                      mt-6

                      leading-8

                      text-slate-600
                    "
                  >

                    “{t(`cards.${item.key}.quote`)}”

                  </p>







                  {/* User */}


                  <div
                    className="
                      mt-8

                      flex

                      items-center

                      gap-4
                    "
                  >


                    <div
                      className="
                        flex

                        h-14

                        w-14

                        items-center

                        justify-center

                        rounded-2xl

                        bg-gradient-to-br

                        from-violet-600

                        to-sky-500

                        text-lg

                        font-black

                        text-white

                        shadow-lg
                      "
                    >

                      {item.initials}

                    </div>





                    <div>

                      <h4
                        className="
                          font-bold
                          text-slate-900
                        "
                      >

                        {t(`cards.${item.key}.name`)}

                      </h4>



                      <p
                        className="
                          text-sm
                          text-slate-500
                        "
                      >

                        {t(`cards.${item.key}.role`)}

                      </p>



                      <p
                        className="
                          text-xs
                          text-slate-400
                        "
                      >

                        {t(`cards.${item.key}.company`)}

                      </p>


                    </div>


                  </div>



                </div>



              </FadeUp>


            ))
          }



        </div>




      </div>



    </section>

  );
}