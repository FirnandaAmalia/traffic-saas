"use client";

import {
  Sparkles,
  TrendingUp,
  Search,
  Brain,
  BarChart3,
  Globe,
} from "lucide-react";

import { useTranslations } from "next-intl";


export default function HeroDashboard() {

  const t = useTranslations("heroDashboard");


  const metrics = [
    {
      label: t("metrics.traffic"),
      value: "+42%",
    },
    {
      label: t("metrics.clicks"),
      value: "18.4K",
    },
    {
      label: t("metrics.keywords"),
      value: "12.4K",
    },
  ];


  const sidebarIcons = [
    BarChart3,
    Search,
    Globe,
    Brain,
  ];


  const chartData = [
    30,
    50,
    40,
    80,
    65,
    95,
    110,
  ];


  return (

    <div className="relative h-[520px] w-full">


      {/* Glow */}

      <div
        className="
          absolute
          left-1/2
          top-1/2

          h-96
          w-96

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-violet-500/20

          blur-[120px]
        "
      />




      {/* Browser */}

      <div
        className="
          absolute
          inset-x-4
          top-10

          overflow-hidden

          rounded-[32px]

          border
          border-white/70

          bg-white/80

          shadow-[0_40px_100px_rgba(15,23,42,.15)]

          backdrop-blur-xl
        "
      >


        {/* Browser Header */}

        <div
          className="
            flex
            h-12

            items-center

            gap-2

            border-b

            bg-slate-50/80

            px-5
          "
        >

          <span className="h-3 w-3 rounded-full bg-red-400"/>
          <span className="h-3 w-3 rounded-full bg-yellow-400"/>
          <span className="h-3 w-3 rounded-full bg-green-400"/>


          <div
            className="
              ml-6

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






        <div className="flex h-[390px]">


          {/* Sidebar */}

          <div
            className="
              hidden

              w-20

              border-r

              bg-slate-50

              p-4

              md:block
            "
          >

            {
              sidebarIcons.map((Icon,index)=>(

                <div
                  key={index}
                  className="
                    mb-5

                    flex

                    h-10
                    w-10

                    items-center
                    justify-center

                    rounded-xl

                    bg-white

                    shadow-sm
                  "
                >

                  <Icon
                    className="
                      h-5
                      w-5
                      text-violet-600
                    "
                  />

                </div>

              ))
            }


          </div>







          {/* Content */}


          <div
            className="
              flex-1

              p-6
            "
          >


            <div
              className="
                flex
                justify-between
              "
            >


              <div>

                <p
                  className="
                    text-sm
                    text-slate-500
                  "
                >

                  {t("overview")}

                </p>


                <h3
                  className="
                    mt-1

                    text-2xl

                    font-black

                    text-slate-900
                  "
                >

                  {t("title")}

                </h3>


              </div>



              <div
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

                {t("active")}

              </div>


            </div>






            {/* Metrics */}

            <div
              className="
                mt-6

                grid

                grid-cols-3

                gap-4
              "
            >

              {
                metrics.map((item)=>(

                  <div
                    key={item.label}

                    className="
                      rounded-2xl

                      bg-slate-50

                      p-4
                    "
                  >

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >

                      {item.label}

                    </p>


                    <p
                      className="
                        mt-2

                        text-xl

                        font-black
                      "
                    >

                      {item.value}

                    </p>


                  </div>

                ))
              }


            </div>







            {/* Chart */}


            <div
              className="
                mt-6

                rounded-3xl

                bg-slate-950

                p-5
              "
            >


              <div
                className="
                  flex

                  justify-between
                "
              >

                <p className="text-sm text-white">

                  {t("chart.title")}

                </p>


                <TrendingUp
                  className="
                    text-emerald-400
                  "
                />

              </div>



              <div
                className="
                  mt-6

                  flex

                  h-24

                  items-end

                  gap-3
                "
              >

                {
                  chartData.map((height,index)=>(

                    <div
                      key={index}

                      className="
                        flex-1

                        rounded-t-lg

                        bg-gradient-to-t

                        from-violet-500

                        to-sky-400
                      "

                      style={{
                        height:`${height}px`
                      }}
                    />

                  ))
                }


              </div>


            </div>



          </div>


        </div>


      </div>






      {/* AI Floating */}


      <div
        className="
          absolute

          -left-2

          top-32

          animate-float

          rounded-2xl

          border

          bg-white

          p-4

          shadow-xl
        "
      >

        <div className="flex items-center gap-3">


          <Sparkles
            className="
              text-violet-600
            "
          />


          <div>

            <p
              className="
                text-xs
                text-slate-500
              "
            >

              {t("ai.label")}

            </p>


            <p className="font-bold">

              {t("ai.value")}

            </p>


          </div>


        </div>


      </div>








      {/* Growth Floating */}


      <div
        className="
          absolute

          -right-2

          bottom-24

          animate-float-delay

          rounded-2xl

          border

          bg-white

          px-5

          py-4

          shadow-xl
        "
      >


        <p
          className="
            text-xs
            text-slate-500
          "
        >

          {t("growth.label")}

        </p>



        <p
          className="
            text-xl

            font-black

            text-emerald-600
          "
        >

          +42% {t("growth.value")}

        </p>



      </div>



    </div>

  );
}