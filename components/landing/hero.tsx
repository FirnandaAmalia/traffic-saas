"use client";

import Link from "next/link";

import {
  ArrowRight,
  Play,
  Sparkles,
} from "lucide-react";

import Aurora from "@/components/background/aurora";
import Particles from "@/components/background/particles";
import Spotlight from "@/components/background/spotlight";

import FadeUp from "@/components/motion/fade-up";
import Tilt from "@/components/motion/tilt";

import HeroDashboard from "./hero-dashboard";

import AnimatedCounter from "@/components/ui/animated-counter";
import { Button } from "@/components/ui/button";


export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-white
        via-slate-50/40
        to-white
      "
    >

      {/* Background */}

      <Aurora />

      <Particles />

      <Spotlight />


      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(124,58,237,.10),transparent_55%)]
          opacity-80
        "
      />


      {/* Hero */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[620px]
          max-w-[1400px]
          items-center
          px-8
          pt-24
          pb-16
        "
      >

        <div
          className="
            grid
            w-full
            items-center
            gap-12
            lg:grid-cols-[0.95fr_1.05fr]
          "
        >


          {/* LEFT */}

          <FadeUp>

            <div>


              {/* Badge */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-violet-200
                  bg-violet-50/90
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-violet-700
                  backdrop-blur
                "
              >

                <Sparkles className="h-4 w-4" />

                AI SEO Intelligence Platform

              </div>



              {/* Heading */}

              <h1
                className="
                  mt-7
                  text-5xl
                  font-black
                  leading-[1.05]
                  tracking-tight
                  text-slate-900
                  lg:text-[60px]
                "
              >

                Ubah Data Website

                <br />

                Menjadi

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

                  Pertumbuhan SEO

                </span>

              </h1>



              {/* Description */}

              <p
                className="
                  mt-7
                  max-w-xl
                  text-lg
                  leading-8
                  text-slate-600
                "
              >

                Hubungkan Google Analytics 4 dan Google Search Console,
lalu biarkan AI menemukan peluang SEO terbesar Anda.

                TrafficSaaS mengubah data website yang kompleks
menjadi insight, rekomendasi, dan tindakan yang jelas
untuk membantu pertumbuhan lebih cepat.

              </p>



              {/* CTA */}

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-4
                "
              >

                <Button
                  asChild
                  size="lg"
                  className="
                    rounded-full
                    bg-gradient-to-r
                    from-violet-600
                    to-sky-500
                    px-8
                    shadow-xl
                    transition
                    hover:scale-[1.03]
                  "
                >

                  <Link href="/api/auth/signin">

                    Mulai Gratis

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
                    rounded-full
                    border-white/70
                    bg-white/70
                    px-8
                    backdrop-blur-xl
                    transition
                    hover:bg-white
                    hover:shadow-lg
                  "
                >

                  <Link href="#workflow">

                    <Play
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



              {/* Integrations */}

              <div
                className="
                  mt-7
                  flex
                  flex-wrap
                  gap-3
                  text-sm
                  text-slate-500
                "
              >

                <Badge text="Google Analytics 4" />

                <Badge text="Search Console" />

                <Badge text="Rekomendasi AI" />

              </div>



              {/* Stats */}

              <div
                className="
                  mt-10
                  grid
                  grid-cols-3
                  gap-8
                "
              >

                <Stat
                  value={100}
                  suffix="+"
                  label="Website Terhubung"
                />


                <Stat
                  value={24}
                  suffix="/7"
                  label="Monitoring AI"
                />


                <Stat
                  value={99}
                  suffix="%"
                  label="Laporan Lebih Cepat"
                />

              </div>


            </div>


          </FadeUp>



          {/* RIGHT */}

          <FadeUp delay={0.2}>

            <div
              style={{
                perspective:"1800px"
              }}
            >

              <Tilt>

                <div
                  className="
                    animate-[float_6s_ease-in-out_infinite]
                    rounded-[32px]
                    border
                    border-white/40
                    bg-white/40
                    p-3
                    shadow-2xl
                    backdrop-blur-xl
                    scale-[0.88]
                    lg:scale-[0.82]
                  "
                >

                  <HeroDashboard />

                </div>


              </Tilt>


            </div>


          </FadeUp>


        </div>


      </div>



      {/* Bottom Fade */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-24
          bg-gradient-to-b
          from-transparent
          to-white
        "
      />


    </section>
  );
}





function Badge({
  text
}:{
  text:string
}){

  return (

    <span
      className="
        rounded-full
        border
        bg-white
        px-4
        py-2
      "
    >

      ✓ {text}

    </span>

  );

}





function Stat({
  value,
  suffix,
  label,
}:{
  value:number;
  suffix:string;
  label:string;
}){

  return (

    <div>

      <h3
        className="
          bg-gradient-to-r
          from-violet-600
          to-sky-500
          bg-clip-text
          text-4xl
          font-black
          text-transparent
        "
      >

        <AnimatedCounter
          value={value}
          suffix={suffix}
        />

      </h3>


      <p
        className="
          mt-2
          text-sm
          text-slate-500
        "
      >

        {label}

      </p>


    </div>

  );

}