"use client";

import {
  BarChart3,
  Brain,
  Database,
  Globe,
  Sparkles,
} from "lucide-react";

const logos = [
  {
    name: "Google Analytics 4",
    icon: BarChart3,
    gradient:
      "from-orange-400 to-yellow-400",
  },
  {
    name: "Google Search Console",
    icon: Globe,
    gradient:
      "from-blue-500 to-cyan-400",
  },
  {
    name: "AI Intelligence",
    icon: Brain,
    gradient:
      "from-violet-600 to-fuchsia-500",
  },
  {
    name: "PostgreSQL",
    icon: Database,
    gradient:
      "from-sky-500 to-indigo-500",
  },
  {
    name: "OpenAI",
    icon: Sparkles,
    gradient:
      "from-emerald-500 to-teal-400",
  },
];
const items = [
  ...logos,
  ...logos,
  ...logos,
];



export default function LogoMarquee() {


  return (

    <section
      className="
        relative
        overflow-hidden

        border-y
        border-slate-100

        bg-white

        py-14
      "
    >



      {/* Header */}


      <div
        className="
          mx-auto

          mb-8

          flex

          items-center

          justify-center

          gap-2

          text-sm

          font-semibold

          text-slate-500
        "
      >

        <Sparkles
          className="
            h-4
            w-4
            text-violet-500
          "
        />

        Trusted Technologies & Integrations


      </div>





      {/* Fade edges */}



      <div
        className="
          pointer-events-none

          absolute

          inset-y-0

          left-0

          z-10

          w-32

          bg-gradient-to-r

          from-white

          to-transparent
        "
      />



      <div
        className="
          pointer-events-none

          absolute

          inset-y-0

          right-0

          z-10

          w-32

          bg-gradient-to-l

          from-white

          to-transparent
        "
      />





      {/* Marquee */}



      <div
        className="
          flex

          w-max

          animate-marquee

          gap-6

        "
      >


        {items.map((item,index)=>{


          const Icon = item.icon;


          return (

            <div
              key={`${item.name}-${index}`}
              className="
                group

                flex

                h-[74px]

                w-[260px]

                shrink-0

                items-center

                gap-4

                rounded-3xl

                border

                border-slate-200

                bg-white

                px-6

                shadow-sm

                transition-all

                duration-500

                hover:-translate-y-1

                hover:border-violet-200

                hover:shadow-xl
              "
            >





              <div
                className={`
                  flex

                  h-12

                  w-12

                  items-center

                  justify-center

                  rounded-2xl

                  bg-gradient-to-br

                  ${item.gradient}

                  shadow-lg

                  transition-transform

                  duration-300

                  group-hover:scale-110
                `}
              >


                <Icon
                  className="
                    h-6

                    w-6

                    text-white
                  "
                />


              </div>






              <div>

                <p
                  className="
                    text-sm

                    font-bold

                    text-slate-800
                  "
                >

                  {item.name}


                </p>


                <p
                  className="
                    mt-1

                    text-xs

                    text-slate-400
                  "
                >

                  Connected Platform


                </p>


              </div>



            </div>


          );


        })}



      </div>



    </section>


  );

}