"use client";

import { useState } from "react";

import {
  ChevronDown,
  Sparkles,
} from "lucide-react";

import FadeUp from "@/components/motion/fade-up";


const faqs = [

  {
    question:
      "Apakah TrafficSaaS bisa digunakan secara gratis?",
    answer:
      "Ya. TrafficSaaS menyediakan paket Free yang dapat digunakan untuk mencoba dashboard SEO, menghubungkan Google Search Console dan Google Analytics 4, serta melihat insight dasar website.",
  },


  {
    question:
      "Apa perbedaan paket Free dan Pro?",
    answer:
      "Paket Pro menyediakan fitur tambahan seperti AI Executive Summary, rekomendasi SEO otomatis, analisis lebih mendalam, export laporan PDF dan Excel, serta dukungan untuk banyak project.",
  },


  {
    question:
      "Bagaimana TrafficSaaS mengambil data website?",
    answer:
      "TrafficSaaS menggunakan koneksi resmi Google API melalui autentikasi OAuth sehingga pengguna dapat menghubungkan Google Search Console dan Google Analytics 4 dengan aman.",
  },


  {
    question:
      "Apakah saya bisa mengelola banyak website?",
    answer:
      "Bisa. Paket Pro dirancang untuk freelancer, agency, dan bisnis yang memiliki beberapa website atau project SEO dalam satu akun.",
  },


  {
    question:
      "Apakah data Google saya aman?",
    answer:
      "Aman. TrafficSaaS tidak menyimpan password Google pengguna. Akses hanya menggunakan izin yang diperlukan untuk membaca data analytics dan SEO.",
  },


  {
    question:
      "Apakah bisa upgrade setelah menggunakan Free?",
    answer:
      "Bisa. Anda dapat mulai dari paket Free terlebih dahulu dan melakukan upgrade kapan saja ketika membutuhkan fitur AI dan analisis lanjutan.",
  },

];





export default function FAQ() {


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

              FAQ


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

              Pertanyaan yang sering

              <br />

              ditanyakan


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

              Semua informasi yang perlu diketahui
              sebelum menghubungkan website Anda
              dengan TrafficSaaS.


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



          {faqs.map((faq,index)=>{


            const open =
              openIndex === index;



            return (

              <FadeUp
                key={faq.question}
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





                  {/* QUESTION */}

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

                      {faq.question}


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

                        duration-300

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

                          duration-300

                          ${
                            open
                            ? "rotate-180 text-violet-600"
                            : ""
                          }
                        `}
                      />


                    </div>




                  </button>









                  {/* ANSWER */}

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

                        {faq.answer}


                      </p>


                    </div>


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