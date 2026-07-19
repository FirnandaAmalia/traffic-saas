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


const solutions = [
  {
    number: "01",
    icon: Brain,
    tag: "AI INTELLIGENCE",
    title: "AI SEO Analysis",
    description:
      "TrafficSaaS membaca data website, keyword, dan performa halaman untuk menemukan peluang SEO yang paling berdampak.",
  },
  {
    number: "02",
    icon: Lightbulb,
    tag: "SMART RECOMMENDATION",
    title: "Actionable Recommendations",
    description:
      "Dapatkan rekomendasi yang jelas mengenai halaman, keyword, dan strategi yang harus dilakukan berikutnya.",
  },
  {
    number: "03",
    icon: TrendingUp,
    tag: "GROWTH MONITORING",
    title: "Growth Tracking",
    description:
      "Pantau perubahan traffic, ranking keyword, dan peluang pertumbuhan melalui satu sistem terpadu.",
  },
  {
    number: "04",
    icon: Zap,
    tag: "AUTOMATED DECISION",
    title: "Faster Decisions",
    description:
      "Kurangi analisis manual dan ubah data kompleks menjadi keputusan SEO yang cepat dan akurat.",
  },
];


export default function Solution() {
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

              THE AI SEO SOLUTION

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

              Dari Data Mentah

              <br />

              Menjadi Strategi SEO

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
                Yang Lebih Cerdas.
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

              TrafficSaaS menggabungkan analytics,
              SEO intelligence, dan artificial intelligence
              untuk membantu Anda menemukan peluang,
              memahami masalah, dan mengambil tindakan.


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
                key={item.title}
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

                    {item.tag}

                  </p>





                  <h3
                    className="
                      mt-3

                      text-2xl

                      font-black

                      text-slate-900
                    "
                  >

                    {item.title}

                  </h3>





                  <p
                    className="
                      mt-4

                      leading-7

                      text-slate-600
                    "
                  >

                    {item.description}

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

                    Explore capability

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