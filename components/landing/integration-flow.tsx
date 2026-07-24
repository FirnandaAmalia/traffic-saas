"use client";

import {
  Brain,
  CheckCircle2,
  Search,
  Sparkles,
} from "lucide-react";

import FadeUp from "@/components/motion/fade-up";

const steps = [
  {
    icon: Search,
    title: "Hubungkan Data",
    description:
      "Hubungkan Google Search Console dan Google Analytics 4 untuk mengambil data performa website.",
  },
  {
    icon: Brain,
    title: "Analisis AI",
    description:
      "TrafficSaaS menganalisis traffic, keyword, dan halaman untuk menemukan peluang pertumbuhan.",
  },
  {
    icon: Sparkles,
    title: "Rekomendasi Cerdas",
    description:
      "Dapatkan insight SEO yang mudah dipahami dan rekomendasi yang langsung dapat diterapkan.",
  },
  {
    icon: CheckCircle2,
    title: "Tingkatkan Traffic",
    description:
      "Ambil keputusan berdasarkan data dan tingkatkan performa website secara konsisten.",
  },
];

export default function IntegrationFlow() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-white
        py-28
      "
    >

      {/* Glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[400px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-violet-500/10
          blur-3xl
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

          <div className="mx-auto max-w-3xl text-center">


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
                font-semibold
                text-violet-700
              "
            >

              <Sparkles className="h-4 w-4"/>

              Cara Kerja TrafficSaaS

            </div>



            <h2
              className="
                mt-6
                text-4xl
                font-black
                tracking-tight
                text-slate-900
                lg:text-5xl
              "
            >

              Dari data mentah menjadi

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
                strategi SEO yang jelas
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

              TrafficSaaS menghubungkan seluruh data penting website
              dan mengubahnya menjadi insight serta tindakan nyata.

            </p>


          </div>

        </FadeUp>




        {/* Steps */}

        <div
          className="
            relative
            mt-16
            grid
            gap-8
            md:grid-cols-4
          "
        >


          {/* Connector */}

          <div
            className="
              pointer-events-none
              absolute
              left-[12%]
              right-[12%]
              top-16
              hidden
              h-px
              bg-gradient-to-r
              from-violet-300
              via-sky-300
              to-violet-300
              md:block
            "
          />



          {steps.map((step,index)=>{

            const Icon = step.icon;


            return (

              <FadeUp
                key={step.title}
                delay={index * 0.1}
              >

                <div
                  className="
                    group
                    relative
                  "
                >


                  <div
                    className="
                      relative
                      rounded-3xl
                      border
                      border-slate-200
                      bg-white
                      p-7
                      shadow-sm

                      transition-all
                      duration-500

                      hover:-translate-y-2
                      hover:border-violet-200
                      hover:shadow-xl
                    "
                  >


                    {/* Number */}

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



                    {/* Icon */}

                    <div
                      className="
                        relative

                        flex
                        h-14
                        w-14
                        items-center
                        justify-center

                        rounded-2xl

                        bg-gradient-to-br
                        from-violet-600
                        to-sky-500

                        shadow-lg
                        shadow-violet-500/30
                      "
                    >

                      <Icon
                        className="
                          h-7
                          w-7
                          text-white
                        "
                      />

                    </div>



                    <h3
                      className="
                        mt-6
                        text-lg
                        font-black
                        text-slate-900
                      "
                    >

                      {step.title}

                    </h3>



                    <p
                      className="
                        mt-3
                        text-sm
                        leading-7
                        text-slate-600
                      "
                    >

                      {step.description}

                    </p>


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