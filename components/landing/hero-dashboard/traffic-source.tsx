"use client";

import {
  Globe,
  MousePointerClick,
  Search,
} from "lucide-react";

import { useTranslations } from "next-intl";


const sources = [
  {
    key: "google",
    icon: Search,
    value: 48,
    color: "bg-violet-500",
  },
  {
    key: "direct",
    icon: MousePointerClick,
    value: 27,
    color: "bg-sky-500",
  },
  {
    key: "referral",
    icon: Globe,
    value: 25,
    color: "bg-emerald-500",
  },
];



export default function TrafficSource() {


  const t = useTranslations("trafficSource");



  return (

    <div
      className="
        rounded-3xl

        border

        border-slate-200

        bg-white/90

        p-6

        shadow-sm
      "
    >



      {/* HEADER */}


      <div
        className="
          mb-6

          flex

          items-center

          justify-between
        "
      >

        <div>

          <h3
            className="
              text-lg

              font-bold

              text-slate-900
            "
          >

            {t("title")}

          </h3>


          <p
            className="
              text-sm

              text-slate-500
            "
          >

            {t("description")}

          </p>


        </div>


      </div>







      {/* SOURCES */}


      <div
        className="
          space-y-5
        "
      >


        {
          sources.map((item)=>(


            <div
              key={item.key}
            >


              <div
                className="
                  mb-2

                  flex

                  items-center

                  justify-between
                "
              >



                <div
                  className="
                    flex

                    items-center

                    gap-3
                  "
                >


                  <div
                    className="
                      rounded-xl

                      bg-slate-100

                      p-2
                    "
                  >

                    <item.icon
                      className="
                        h-4

                        w-4

                        text-slate-600
                      "
                    />

                  </div>




                  <span
                    className="
                      font-medium

                      text-slate-700
                    "
                  >

                    {t(`sources.${item.key}`)}

                  </span>


                </div>




                <span
                  className="
                    font-bold

                    text-slate-900
                  "
                >

                  {item.value}%

                </span>



              </div>





              <div
                className="
                  h-2

                  overflow-hidden

                  rounded-full

                  bg-slate-100
                "
              >


                <div
                  className={`
                    ${item.color}

                    h-full

                    rounded-full

                    transition-all

                    duration-700
                  `}
                  style={{
                    width:`${item.value}%`,
                  }}
                />


              </div>



            </div>


          ))
        }


      </div>


    </div>

  );

}