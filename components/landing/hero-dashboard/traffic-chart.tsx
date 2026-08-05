"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { useTranslations } from "next-intl";


const data = [
  { day: "1", users: 1240 },
  { day: "4", users: 1680 },
  { day: "7", users: 1510 },
  { day: "10", users: 2360 },
  { day: "13", users: 2140 },
  { day: "16", users: 2820 },
  { day: "19", users: 3010 },
  { day: "22", users: 3520 },
  { day: "25", users: 3370 },
  { day: "28", users: 4010 },
];


const stats = [
  {
    key: "users",
    value: "18.3K",
  },
  {
    key: "clicks",
    value: "42.1K",
  },
  {
    key: "ctr",
    value: "6.18%",
  },
];


export default function TrafficChart() {


  const t = useTranslations("trafficChart");



  return (

    <div
      className="
        rounded-3xl

        border

        border-slate-200

        bg-white/90

        p-4

        shadow-sm
      "
    >



      {/* HEADER */}


      <div
        className="
          flex

          items-center

          justify-between
        "
      >

        <div>

          <h3
            className="
              text-sm

              font-bold

              text-slate-900
            "
          >

            {t("title")}

          </h3>


          <p
            className="
              text-xs

              text-slate-500
            "
          >

            {t("period")}

          </p>


        </div>



        <span
          className="
            rounded-full

            bg-emerald-100

            px-3

            py-1

            text-xs

            font-bold

            text-emerald-700
          "
        >

          +18.4%

        </span>


      </div>







      {/* MINI STATS */}


      <div
        className="
          mt-4

          grid

          grid-cols-3

          gap-3
        "
      >


        {
          stats.map((item)=>(

            <div
              key={item.key}
              className="
                rounded-xl

                bg-slate-50

                p-3
              "
            >

              <p
                className="
                  text-[10px]

                  text-slate-500
                "
              >

                {t(`stats.${item.key}`)}

              </p>


              <p
                className="
                  text-sm

                  font-black

                  text-slate-900
                "
              >

                {item.value}

              </p>


            </div>

          ))
        }


      </div>








      {/* CHART */}


      <div
        className="
          mt-4

          h-36
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={data}
          >


            <defs>

              <linearGradient
                id="trafficGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#7C3AED"
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor="#7C3AED"
                  stopOpacity={0}
                />

              </linearGradient>


            </defs>



            <XAxis
              dataKey="day"
              hide
            />



            <Tooltip
              contentStyle={{
                borderRadius:12,
                border:"1px solid #ddd",
              }}
            />



            <Area
              type="monotone"
              dataKey="users"
              stroke="#7C3AED"
              strokeWidth={3}
              fill="url(#trafficGradient)"
            />


          </AreaChart>


        </ResponsiveContainer>


      </div>



    </div>

  );

}