"use client";

import {
  Link2,
  DatabaseZap,
  BrainCircuit,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import FadeUp from "@/components/motion/fade-up";


const steps = [
  {
    icon: Link2,
    title: "Hubungkan Data",
    description:
      "Hubungkan Google Search Console dan Google Analytics 4 secara aman untuk mengambil data performa website.",
    color:
      "from-violet-600 to-fuchsia-500",
  },
  {
    icon: DatabaseZap,
    title: "Sinkronisasi Otomatis",
    description:
      "TrafficSaaS menggabungkan data SEO dan analytics menjadi satu workspace yang mudah dipahami.",
    color:
      "from-sky-500 to-cyan-500",
  },
  {
    icon: BrainCircuit,
    title: "AI Insight",
    description:
      "AI membaca data traffic, keyword, dan halaman untuk menemukan peluang SEO yang paling berdampak.",
    color:
      "from-emerald-500 to-teal-500",
  },
  {
    icon: TrendingUp,
    title: "Tingkatkan Growth",
    description:
      "Terapkan rekomendasi, pantau perubahan, dan tingkatkan traffic organik secara berkelanjutan.",
    color:
      "from-orange-500 to-amber-500",
  },
];


export default function Workflow() {

  return (

    <section
      id="workflow"
      className="
        relative
        overflow-hidden
        py-32
      "
    >

      {/* Background */}

      <div className="pointer-events-none absolute inset-0">

        <div
          className="
            absolute
            left-0
            top-20
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

              HOW IT WORKS

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

              Dari data mentah

              <br />

              menjadi strategi SEO

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
                yang lebih cerdas
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
              TrafficSaaS mengubah data website yang kompleks
              menjadi insight dan rekomendasi yang bisa langsung
              digunakan untuk meningkatkan performa SEO.
            </p>


          </div>

        </FadeUp>






        {/* STEPS */}

        <div
          className="
            relative
            mt-20
          "
        >


          {/* LINE */}

          <div
            className="
              absolute
              left-[12%]
              right-[12%]
              top-12
              hidden
              h-[3px]
              bg-gradient-to-r
              from-violet-400
              via-sky-400
              to-emerald-400
              lg:block
            "
          />




          <div
            className="
              grid
              gap-8
              lg:grid-cols-4
            "
          >


            {steps.map((step,index)=>{


              const Icon = step.icon;


              return (

                <FadeUp
                  key={step.title}
                  delay={index * 0.12}
                >

                  <div
                    className="
                      group
                      relative
                      h-[340px]
                    "
                  >


                    <div
                      className="
                        relative
                        flex
                        h-full
                        flex-col

                        rounded-[32px]

                        border
                        border-slate-200

                        bg-white/90

                        p-8

                        shadow-sm

                        backdrop-blur-xl

                        transition-all
                        duration-500

                        hover:-translate-y-3

                        hover:border-violet-200

                        hover:shadow-2xl
                      "
                    >



                      {/* NUMBER */}

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




                      {/* ICON */}

                      <div
                        className={`
                          flex
                          h-16
                          w-16
                          items-center
                          justify-center
                          rounded-2xl
                          bg-gradient-to-br
                          ${step.color}
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




                      {/* TITLE */}

                      <h3
                        className="
                          mt-8
                          text-xl
                          font-black
                          text-slate-900
                        "
                      >

                        {step.title}

                      </h3>




                      {/* DESCRIPTION */}

                      <p
                        className="
                          mt-4
                          flex-1
                          text-sm
                          leading-7
                          text-slate-600
                        "
                      >

                        {step.description}

                      </p>




                      {/* STEP */}

                      <div
                        className="
                          mt-auto
                          flex
                          items-center
                          gap-2
                          pt-5
                          text-sm
                          font-semibold
                          text-violet-600
                        "
                      >

                        Step {index + 1}

                        <ArrowRight className="h-4 w-4"/>

                      </div>


                    </div>


                  </div>


                </FadeUp>

              );

            })}


          </div>


        </div>


      </div>


    </section>

  );

}