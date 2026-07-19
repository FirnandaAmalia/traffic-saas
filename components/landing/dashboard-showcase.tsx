"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Brain,
  Sparkles,
  TrendingUp,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import FadeUp from "@/components/motion/fade-up";

import HeroDashboard from "@/components/landing/hero-dashboard";

const features = [
  "Google Analytics 4 Integration",
  "Search Console Intelligence",
  "AI SEO Recommendations",
  "Automated Performance Reports",
];



export default function DashboardShowcase() {
  return (
    <section
      id="dashboard"
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
          top-0

          h-[600px]
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

                  text-sm

                  font-bold

                  text-violet-700
                "
              >

                <Sparkles className="h-4 w-4"/>

                PRODUCT DASHBOARD

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

                Semua data SEO.

                <br />

                Satu workspace.

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
                  Lebih pintar dengan AI.
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

                TrafficSaaS menyatukan Google Analytics 4,
                Google Search Console, dan AI intelligence
                menjadi satu platform untuk memahami performa
                website dan menemukan peluang pertumbuhan.


              </p>




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




              <Button
                asChild
                size="lg"
                className="
                  mt-10

                  rounded-full

                  bg-gradient-to-r

                  from-violet-600

                  to-sky-500

                  px-8

                  shadow-lg
                "
              >

                <Link href="/api/auth/signin">

                  Coba TrafficSaaS

                  <ArrowRight className="ml-2 h-4 w-4"/>

                </Link>


              </Button>


            </div>


          </FadeUp>






          {/* RIGHT */}

          <FadeUp delay={0.2}>


            <div
              className="
                relative
              "
            >



              {/* Dashboard */}

              <div
                className="
                  relative

                  rounded-[36px]

                  border

                  border-white/70

                  bg-white/80

                  p-3

                  shadow-[0_40px_120px_rgba(15,23,42,.18)]

                  backdrop-blur-xl
                "
              >



                {/* Browser */}

                <div
                  className="
                    flex
                    h-12
                    items-center
                    gap-2

                    rounded-t-3xl

                    border-b

                    bg-slate-50

                    px-5
                  "
                >

                  <span className="h-3 w-3 rounded-full bg-red-400"/>
                  <span className="h-3 w-3 rounded-full bg-yellow-400"/>
                  <span className="h-3 w-3 rounded-full bg-green-400"/>


                  <div
                    className="
                      ml-5
                      rounded-full
                      bg-white
                      px-5
                      py-1
                      text-xs
                      text-slate-400
                    "
                  >

                    app.trafficsaas.com/dashboard

                  </div>


                </div>





                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-b-3xl
                  "
                >


                  <HeroDashboard />



                  {/* AI Scanner */}

                  <div
                    className="
                      absolute
                      inset-x-0
                      top-0

                      h-1

                      bg-gradient-to-r

                      from-transparent

                      via-violet-500

                      to-transparent

                      animate-scan
                    "
                  />


                  <div
                    className="
                      absolute
                      inset-0

                      bg-gradient-to-t

                      from-violet-500/10

                      to-transparent
                    "
                  />


                </div>



              </div>






              {/* AI Card */}

              <div
                className="
                  absolute

                  -left-10

                  top-20

                  hidden

                  rounded-3xl

                  border

                  bg-white/90

                  p-5

                  shadow-2xl

                  backdrop-blur-xl

                  lg:block

                  animate-float
                "
              >

                <div className="flex gap-3">


                  <Brain
                    className="
                      h-12
                      w-12

                      rounded-2xl

                      bg-violet-100

                      p-3

                      text-violet-700
                    "
                  />


                  <div>

                    <p className="text-xs text-slate-500">
                      AI Analysis
                    </p>


                    <p className="font-black">
                      12 Opportunities
                    </p>


                  </div>


                </div>

              </div>







              {/* Growth Card */}

              <div
                className="
                  absolute

                  -right-8

                  bottom-16

                  hidden

                  rounded-3xl

                  border

                  bg-white/90

                  p-5

                  shadow-2xl

                  backdrop-blur-xl

                  lg:block

                  animate-float
                "
              >


                <div className="flex gap-3">


                  <TrendingUp
                    className="
                      h-12
                      w-12

                      rounded-2xl

                      bg-emerald-100

                      p-3

                      text-emerald-700
                    "
                  />



                  <div>

                    <p className="text-xs text-slate-500">
                      Organic Growth
                    </p>


                    <p className="font-black">
                      +42% Traffic
                    </p>


                  </div>


                </div>


              </div>







            </div>


          </FadeUp>




        </div>


      </div>


    </section>
  );
}