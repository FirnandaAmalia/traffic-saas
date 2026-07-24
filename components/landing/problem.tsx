"use client";

import {
  AlertTriangle,
  Search,
  BarChart3,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import FadeUp from "@/components/motion/fade-up";


const problems = [
  {
    icon: Search,
    number: "01",
    tag: "DATA TERLALU BANYAK",
    title: "Data SEO Terlalu Banyak",
    description:
      "Google Search Console dan Analytics menghasilkan ribuan data setiap hari, tetapi sulit mengetahui mana yang benar-benar memiliki dampak.",
  },

  {
    icon: BarChart3,
    number: "02",
    tag: "PELUANG TERSEMBUNYI",
    title: "Peluang Pertumbuhan Tersembunyi",
    description:
      "Keyword potensial, halaman lemah, dan peluang traffic sering terlewat karena analisis masih dilakukan secara manual.",
  },

  {
    icon: AlertTriangle,
    number: "03",
    tag: "PROSES MANUAL",
    title: "Keputusan Masih Berdasarkan Tebakan",
    description:
      "Tim SEO menghabiskan waktu membaca laporan daripada mengambil keputusan strategis yang menghasilkan pertumbuhan.",
  },
];


export default function Problem() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-slate-50/50
        py-32
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
          w-[800px]
          -translate-x-1/2
          rounded-full
          bg-violet-500/10
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
                border-violet-200

                bg-white

                px-4
                py-2

                text-xs
                font-bold

                tracking-wide

                text-violet-700

                shadow-sm
              "
            >

              <Sparkles className="h-4 w-4"/>

              TANTANGAN SEO

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

              SEO Tidak Kekurangan Data.

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
                SEO Membutuhkan Arah yang Tepat.
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

              Setiap website menghasilkan ribuan data setiap hari.
              Namun tanpa analisis yang tepat, peluang terbesar tetap
              tersembunyi di balik angka.

            </p>


          </div>

        </FadeUp>




        {/* Cards */}

        <div
          className="
            mt-20

            grid

            gap-8

            md:grid-cols-3
          "
        >


          {problems.map((item,index)=>{

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


                    hover:shadow-[0_25px_60px_rgba(124,58,237,.12)]
                  "
                >



                  {/* Number */}

                  <div
                    className="
                      absolute

                      right-6

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




                  {/* Title */}

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




                  {/* Description */}

                  <p
                    className="
                      mt-4

                      leading-7

                      text-slate-600
                    "
                  >

                    {item.description}

                  </p>



                  {/* Bottom */}

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

                      transition

                      duration-300

                      group-hover:opacity-100
                    "
                  >

                    Pelajari lebih lanjut

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