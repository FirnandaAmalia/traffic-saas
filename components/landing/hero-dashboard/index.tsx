"use client";

import {
  Sparkles,
  TrendingUp,
  Search,
  Brain,
  BarChart3,
  Globe,
} from "lucide-react";


export default function HeroDashboard() {
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
              [
                BarChart3,
                Search,
                Globe,
                Brain,
              ].map((Icon,index)=>(

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

                  <Icon className="h-5 w-5 text-violet-600"/>

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


            <div className="flex justify-between">


              <div>

                <p className="text-sm text-slate-500">
                  Website Overview
                </p>


                <h3 className="mt-1 text-2xl font-black text-slate-900">
                  SEO Performance
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

                Live

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
                [
                  ["Traffic","+42%"],
                  ["Clicks","18.4K"],
                  ["Keywords","12.4K"],
                ].map(item=>(

                  <div
                    key={item[0]}
                    className="
                      rounded-2xl
                      bg-slate-50
                      p-4
                    "
                  >

                    <p className="text-xs text-slate-500">
                      {item[0]}
                    </p>

                    <p className="mt-2 text-xl font-black">
                      {item[1]}
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

              <div className="flex justify-between">

                <p className="text-sm text-white">
                  Organic Growth
                </p>

                <TrendingUp className="text-emerald-400"/>

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
                  [30,50,40,80,65,95,110].map((h,i)=>(

                    <div
                      key={i}
                      className="
                        flex-1
                        rounded-t-lg
                        bg-gradient-to-t
                        from-violet-500
                        to-sky-400
                      "
                      style={{
                        height:`${h}px`
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

          <Sparkles className="text-violet-600"/>

          <div>

            <p className="text-xs text-slate-500">
              AI Insight
            </p>

            <p className="font-bold">
              12 Opportunities
            </p>

          </div>

        </div>


      </div>





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

        <p className="text-xs text-slate-500">
          Organic Growth
        </p>

        <p className="text-xl font-black text-emerald-600">
          +42% Traffic
        </p>


      </div>


    </div>
  );
}