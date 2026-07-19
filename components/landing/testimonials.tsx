"use client";

import {
  Quote,
  Star,
  Sparkles,
} from "lucide-react";

import FadeUp from "@/components/motion/fade-up";


const testimonials = [
  {
    name: "Daniel Kim",
    role: "SEO Specialist",
    company: "Digital Agency",
    initials: "DK",
    quote:
      "TrafficSaaS membantu kami memahami data Search Console dan Analytics tanpa harus membuat laporan manual setiap minggu. Insight AI membuat proses analisis jauh lebih cepat.",
  },

  {
    name: "Sarah Johnson",
    role: "Marketing Consultant",
    company: "Growth Studio",
    initials: "SJ",
    quote:
      "Biasanya kami harus membuka banyak tools untuk melihat performa website. TrafficSaaS membuat semua data lebih mudah dipahami dalam satu dashboard.",
  },

  {
    name: "Michael Chen",
    role: "SEO Consultant",
    company: "Independent Consultant",
    initials: "MC",
    quote:
      "Fitur AI recommendation membantu menemukan peluang SEO yang sebelumnya terlewat. Laporan menjadi lebih mudah dipresentasikan kepada klien.",
  },
];



export default function Testimonials() {

  return (

    <section
      id="testimonials"
      className="
        relative
        overflow-hidden
        py-32
      "
    >


      {/* Background Glow */}

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

              <Sparkles
                className="
                  h-4
                  w-4
                "
              />

              USER EXPERIENCE


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

              Dibangun untuk tim

              <br />

              yang ingin tumbuh lebih cepat


            </h2>




            <p
              className="
                mt-6

                text-lg

                leading-8

                text-slate-600
              "
            >

              Dari SEO specialist hingga digital agency,
              TrafficSaaS membantu memahami data,
              menemukan peluang, dan mengambil keputusan
              berdasarkan insight.


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



          {testimonials.map((item,index)=>(


            <FadeUp
              key={item.name}
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






                {/* Quote Icon */}

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

                  {Array.from({
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


                  ))}


                </div>







                {/* Text */}

                <p
                  className="
                    mt-6

                    leading-8

                    text-slate-600
                  "
                >

                  "{item.quote}"


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

                      {item.name}

                    </h4>



                    <p
                      className="
                        text-sm

                        text-slate-500
                      "
                    >

                      {item.role}

                    </p>


                    <p
                      className="
                        text-xs

                        text-slate-400
                      "
                    >

                      {item.company}

                    </p>


                  </div>



                </div>




              </div>



            </FadeUp>


          ))}


        </div>




      </div>



    </section>

  );
}