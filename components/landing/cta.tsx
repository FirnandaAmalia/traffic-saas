"use client";

import Link from "next/link";

import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";


import { Button } from "@/components/ui/button";

import FadeUp from "@/components/motion/fade-up";

import type React from "react";

export default function CTA() {


  return (

    <section
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
          inset-0
        "
      >

        <div
          className="
            absolute
            left-1/2
            top-0

            h-[700px]
            w-[700px]

            -translate-x-1/2

            rounded-full

            bg-violet-500/20

            blur-[180px]

            animate-pulse
          "
        />


        <div
          className="
            absolute
            bottom-0
            left-0

            h-[400px]
            w-[400px]

            rounded-full

            bg-sky-500/20

            blur-[150px]
          "
        />


      </div>







      <div
        className="
          relative

          mx-auto

          max-w-6xl

          px-6
        "
      >



        <FadeUp>



          <div
            className="
              relative
              overflow-hidden

              rounded-[42px]

              border

              border-white/10

              bg-gradient-to-br

              from-slate-950

              via-violet-950

              to-slate-900

              px-8

              py-20

              text-center

              shadow-[0_40px_120px_rgba(15,23,42,.35)]

              lg:px-20
            "
          >




            {/* Inner Glow */}


            <div
              className="
                pointer-events-none

                absolute

                right-0
                top-0

                h-72
                w-72

                rounded-full

                bg-violet-500/20

                blur-[100px]
              "
            />



            <div
              className="
                pointer-events-none

                absolute

                bottom-0

                left-0

                h-72

                w-72

                rounded-full

                bg-sky-500/20

                blur-[100px]
              "
            />








            {/* Badge */}


            <div
              className="
                relative

                inline-flex

                items-center

                gap-2

                rounded-full

                border

                border-white/20

                bg-white/10

                px-5

                py-2

                text-sm

                font-semibold

                text-white

                backdrop-blur-xl
              "
            >

              <Sparkles
                className="
                  h-4
                  w-4

                  text-yellow-300
                "
              />


              Mulai optimasi SEO dengan AI


            </div>








            {/* Heading */}


            <h2
              className="
                relative

                mx-auto

                mt-8

                max-w-4xl

                text-4xl

                font-black

                leading-tight

                tracking-tight

                text-white

                lg:text-6xl
              "
            >

              Jangan hanya melihat data.

              <br />


              Ubah menjadi strategi pertumbuhan.


            </h2>








            {/* Description */}


            <p
              className="
                relative

                mx-auto

                mt-7

                max-w-2xl

                text-lg

                leading-8

                text-slate-300
              "
            >

              Hubungkan Google Search Console dan Google Analytics 4,
              biarkan TrafficSaaS membantu menemukan peluang SEO,
              memberikan rekomendasi, dan membuat keputusan lebih cepat.


            </p>








            {/* CTA BUTTON */}


            <div
              className="
                relative

                mt-10

                flex

                flex-wrap

                justify-center

                gap-4
              "
            >



              <Button
                asChild
                size="lg"
                className="
                  h-14

                  rounded-full

                  bg-white

                  px-10

                  font-bold

                  text-violet-700

                  shadow-xl

                  transition-all

                  hover:scale-105

                  hover:bg-slate-100
                "
              >

                <Link href="/api/auth/signin">


                  Coba Gratis Sekarang


                  <ArrowRight
                    className="
                      ml-2

                      h-4

                      w-4
                    "
                  />


                </Link>


              </Button>






              <Button
                asChild
                variant="outline"
                size="lg"
                className="
                  h-14

                  rounded-full

                  border-white/20

                  bg-white/10

                  px-10

                  text-white

                  backdrop-blur-xl

                  transition-all

                  hover:bg-white/20
                "
              >


                <Link href="#workflow">


                  <Zap
                    className="
                      mr-2

                      h-4

                      w-4
                    "
                  />


                  Lihat Cara Kerja


                </Link>


              </Button>




            </div>









            {/* Trust Items */}



            <div
              className="
                relative

                mt-14

                grid

                gap-6

                border-t

                border-white/10

                pt-10

                sm:grid-cols-3
              "
            >




              <TrustItem
                icon={ShieldCheck}
                title="Data Aman"
                text="Google OAuth Security"
              />



              <TrustItem
                icon={Sparkles}
                title="AI Powered"
                text="Insight Otomatis"
              />



              <TrustItem
                icon={Zap}
                title="Lebih Cepat"
                text="Kurangi Analisis Manual"
              />




            </div>





          </div>




        </FadeUp>




      </div>





    </section>


  );

}





function TrustItem({
  icon:Icon,
  title,
  text,
}:{
  icon: React.ElementType;
  title:string;
  text:string;
}) {


  return (

    <div
      className="
        flex

        flex-col

        items-center

        gap-2

        text-center
      "
    >

      <Icon
        className="
          h-6
          w-6

          text-violet-300
        "
      />


      <h3
        className="
          font-bold

          text-white
        "
      >

        {title}

      </h3>


      <p
        className="
          text-sm

          text-slate-400
        "
      >

        {text}

      </p>


    </div>

  );

}