"use client";

import {
  Brain,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

import FadeUp from "@/components/motion/fade-up";

const insights = [
  {
    icon: TrendingUp,
    title: "Pertumbuhan Organic Traffic",
    value: "+42%",
    description:
      "Traffic organik meningkat dibanding periode sebelumnya.",
  },
  {
    icon: AlertTriangle,
    title: "Peluang CTR",
    value: "12 Pages",
    description:
      "Halaman dengan impression tinggi tetapi clicks masih rendah.",
  },
  {
    icon: Lightbulb,
    title: "Rekomendasi AI",
    value: "+18%",
    description:
      "Estimasi peningkatan traffic setelah optimasi.",
  },
];

const features = [
  "Ringkasan SEO Eksekutif",
  "Deteksi Peluang CTR",
  "Analisis Penurunan Konten",
  "Prediksi Dampak Bisnis",
  "Rekomendasi Prioritas",
];


export default function AIShowcase() {
  return (
    <section
      id="ai"
      className="
        relative
        overflow-hidden
        bg-slate-50/60
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

          h-[600px]
          w-[800px]

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


        <div
          className="
            grid
            gap-20
            lg:grid-cols-2
            lg:items-center
          "
        >


          {/* LEFT */}

          <FadeUp>

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

                  text-xs

                  font-bold

                  tracking-wide

                  text-violet-700
                "
              >

                <Sparkles className="h-4 w-4"/>

                AI SEO INTELLIGENCE ENGINE

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

                Bukan Sekadar

                <br />

                Dashboard Analytics.

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
                  AI SEO Consultant.
                </span>


              </h2>




              <p
                className="
                  mt-6

                  max-w-xl

                  text-lg

                  leading-8

                  text-slate-600
                "
              >

                TrafficSaaS memahami data Google Search Console
dan Google Analytics 4 untuk menemukan masalah,
peluang, dan strategi SEO secara otomatis.


              </p>





              {/* Feature List */}

              <div
                className="
                  mt-10

                  space-y-5
                "
              >

                {features.map((item)=>(
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
                        h-8
                        w-8
                        items-center
                        justify-center

                        rounded-full

                        bg-emerald-100
                      "
                    >

                      <CheckCircle2
                        className="
                          h-5
                          w-5
                          text-emerald-600
                        "
                      />

                    </div>


                    <span
                      className="
                        font-medium
                        text-slate-700
                      "
                    >

                      {item}

                    </span>


                  </div>
                ))}


              </div>




            </div>


          </FadeUp>






          {/* RIGHT AI PANEL */}


          <FadeUp delay={0.2}>


            <div
              className="
                relative

                rounded-[36px]

                border

                border-white/70

                bg-white/80

                p-8

                shadow-[0_40px_120px_rgba(15,23,42,.15)]

                backdrop-blur-xl
              "
            >



              {/* Header */}


              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <div
                  className="
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

                      shadow-lg
                    "
                  >

                    <Brain
                      className="
                        h-7
                        w-7
                        text-white
                      "
                    />

                  </div>


                  <div>

                    <p
                      className="
                        text-xs
                        font-bold
                        tracking-widest
                        text-violet-600
                      "
                    >

                      AI ENGINE

                    </p>


                    <h3
                      className="
                        text-xl
                        font-black
                        text-slate-900
                      "
                    >

                      SEO Intelligence

                    </h3>


                  </div>


                </div>



                <span
                  className="
                    rounded-full

                    bg-emerald-100

                    px-4
                    py-2

                    text-xs

                    font-bold

                    text-emerald-700
                  "
                >

                  LIVE

                </span>


              </div>







              {/* Score */}


              <div
                className="
                  mt-8

                  rounded-3xl

                  bg-gradient-to-br

                  from-violet-600

                  to-sky-500

                  p-6

                  text-white
                "
              >

                <p
                  className="
                    text-sm
                    text-violet-100
                  "
                >

                  Skor Performa SEO

                </p>


                <div
                  className="
                    mt-2

                    flex

                    items-end

                    justify-between
                  "
                >

                  <h2
                    className="
                      text-6xl
                      font-black
                    "
                  >

                    92

                  </h2>


                  <div
                    className="
                      rounded-full

                      bg-white/20

                      px-4
                      py-2

                      text-sm

                      font-bold
                    "
                  >

                    +18%

                  </div>


                </div>


              </div>







              {/* Insight Cards */}


              <div
                className="
                  mt-6

                  space-y-4
                "
              >

                {insights.map((item)=>{

                  const Icon=item.icon;


                  return (

                    <div
                      key={item.title}
                      className="
                        flex
                        items-center
                        gap-4

                        rounded-2xl

                        border

                        bg-white

                        p-4

                        transition

                        hover:shadow-lg
                      "
                    >

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center

                          rounded-xl

                          bg-violet-100
                        "
                      >

                        <Icon
                          className="
                            h-5
                            w-5
                            text-violet-700
                          "
                        />

                      </div>


                      <div
                        className="
                          flex-1
                        "
                      >

                        <p
                          className="
                            text-sm
                            font-bold
                            text-slate-900
                          "
                        >

                          {item.title}

                        </p>


                        <p
                          className="
                            text-xs
                            text-slate-500
                          "
                        >

                          {item.description}

                        </p>


                      </div>


                      <span
                        className="
                          font-black
                          text-violet-600
                        "
                      >

                        {item.value}

                      </span>


                    </div>

                  )

                })}


              </div>






              {/* Footer */}

              <div
                className="
                  mt-8

                  flex
                  items-center
                  justify-between

                  rounded-2xl

                  bg-slate-900

                  p-5

                  text-white
                "
              >

                <div>

                  <p
                    className="
                      text-xs
                      text-slate-400
                    "
                  >

                    Rekomendasi AI

                  </p>


                  <p
                    className="
                      mt-1
                      font-semibold
                    "
                  >

                    Optimalkan 12 meta titles

                  </p>

                </div>



                <ArrowRight
                  className="
                    h-5
                    w-5
                  "
                />


              </div>




            </div>


          </FadeUp>


        </div>


      </div>


    </section>
  );
}