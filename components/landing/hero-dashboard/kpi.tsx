"use client";

import {
  MousePointerClick,
  TrendingUp,
  Users,
} from "lucide-react";

import { useTranslations } from "next-intl";

import AnimatedCounter from "@/components/ui/animated-counter";


const cards = [
  {
    key: "users",
    value: 18.3,
    suffix: "K",
    growth: "+18%",
    icon: Users,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    key: "clicks",
    value: 42.1,
    suffix: "K",
    growth: "+27%",
    icon: MousePointerClick,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    key: "ctr",
    value: 6.18,
    suffix: "%",
    growth: "+0.9%",
    icon: TrendingUp,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];


export default function HeroKPI() {

  const t = useTranslations("heroKpi");


  return (

    <div
      className="
        grid

        grid-cols-3

        gap-3
      "
    >


      {
        cards.map((card)=>{

          const Icon = card.icon;


          return (

            <div
              key={card.key}
              className="
                rounded-2xl

                border

                border-slate-200

                bg-white/90

                p-3

                shadow-sm
              "
            >



              {/* TOP */}


              <div
                className="
                  flex

                  items-center

                  justify-between
                "
              >


                <div
                  className={`
                    flex

                    h-8

                    w-8

                    items-center

                    justify-center

                    rounded-xl

                    ${card.iconBg}
                  `}
                >

                  <Icon
                    className={`
                      h-4

                      w-4

                      ${card.iconColor}
                    `}
                  />

                </div>




                <span
                  className="
                    rounded-full

                    bg-emerald-100

                    px-2

                    py-0.5

                    text-[10px]

                    font-bold

                    text-emerald-700
                  "
                >

                  {card.growth}

                </span>


              </div>





              {/* VALUE */}


              <div
                className="
                  mt-3
                "
              >

                <h3
                  className="
                    text-xl

                    font-black

                    leading-none

                    text-slate-900
                  "
                >

                  <AnimatedCounter
                    value={card.value}
                    suffix={card.suffix}
                    decimals={
                      card.suffix === "%"
                      ? 2
                      : 1
                    }
                  />

                </h3>



                <p
                  className="
                    mt-1

                    text-xs

                    text-slate-500
                  "
                >

                  {t(`cards.${card.key}`)}

                </p>


              </div>



            </div>

          );

        })
      }


    </div>

  );

}