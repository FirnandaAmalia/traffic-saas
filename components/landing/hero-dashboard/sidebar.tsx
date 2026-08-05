"use client";

import {
  BarChart3,
  Brain,
  ChevronDown,
  FileSpreadsheet,
  LayoutDashboard,
  Check,
} from "lucide-react";

import { useTranslations } from "next-intl";


const menus = [
  {
    icon: LayoutDashboard,
    key: "dashboard",
    active: true,
  },
  {
    icon: BarChart3,
    key: "traffic",
  },
  {
    icon: Brain,
    key: "ai",
    badge: "PRO",
  },
  {
    icon: FileSpreadsheet,
    key: "reports",
  },
];


export default function Sidebar() {

  const t = useTranslations("sidebar");


  return (

    <aside
      className="
        flex

        h-full

        w-64

        flex-col

        border-r

        border-slate-200

        bg-white/75

        backdrop-blur-xl
      "
    >


      {/* WORKSPACE */}

      <div
        className="
          border-b

          border-slate-200

          p-5
        "
      >

        <button
          className="
            flex

            w-full

            items-center

            justify-between

            rounded-2xl

            bg-slate-50

            p-3

            transition

            hover:bg-slate-100
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
                flex

                h-10

                w-10

                items-center

                justify-center

                rounded-2xl

                bg-gradient-to-br

                from-violet-600

                to-sky-500

                font-black

                text-white
              "
            >
              T
            </div>


            <div className="text-left">

              <p
                className="
                  font-bold

                  text-slate-900
                "
              >

                TrafficSaaS

              </p>


              <p
                className="
                  text-xs

                  text-slate-500
                "
              >

                {t("workspace")}

              </p>


            </div>


          </div>


          <ChevronDown
            className="
              h-4

              w-4

              text-slate-500
            "
          />


        </button>


      </div>






      {/* MENU */}

      <nav
        className="
          flex-1

          space-y-2

          p-4
        "
      >

        {
          menus.map((item)=>{

            const Icon = item.icon;


            return (

              <button
                key={item.key}

                className={`
                  group

                  flex

                  w-full

                  items-center

                  justify-between

                  rounded-2xl

                  px-4

                  py-3

                  transition-all


                  ${
                    item.active

                    ?

                    `
                    bg-gradient-to-r
                    from-violet-600
                    to-sky-500
                    text-white
                    shadow-lg
                    `

                    :

                    `
                    text-slate-600
                    hover:bg-slate-100
                    `
                  }

                `}
              >


                <div
                  className="
                    flex

                    items-center

                    gap-3
                  "
                >

                  <Icon
                    className="
                      h-5

                      w-5
                    "
                  />


                  <span
                    className="
                      font-medium
                    "
                  >

                    {t(`menus.${item.key}`)}

                  </span>


                </div>



                {
                  item.badge &&

                  <span
                    className="
                      rounded-full

                      bg-white/20

                      px-2

                      py-1

                      text-[10px]

                      font-bold
                    "
                  >

                    {item.badge}

                  </span>

                }


              </button>

            );

          })
        }


      </nav>






      {/* HEALTH CARD */}


      <div
        className="
          border-t

          border-slate-200

          p-4
        "
      >

        <div
          className="
            rounded-3xl

            bg-gradient-to-br

            from-violet-600

            to-sky-500

            p-5

            text-white
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
                flex

                h-10

                w-10

                items-center

                justify-center

                rounded-2xl

                bg-white/20
              "
            >

              <Check
                className="
                  h-5

                  w-5
                "
              />

            </div>


            <div>

              <p
                className="
                  text-xs

                  opacity-80
                "
              >

                {t("health.title")}

              </p>


              <h3
                className="
                  text-3xl

                  font-black
                "
              >

                92%

              </h3>


            </div>


          </div>





          <div
            className="
              mt-5

              h-2

              rounded-full

              bg-white/20
            "
          >

            <div
              className="
                h-full

                rounded-full

                bg-white
              "
              style={{
                width:"92%"
              }}
            />

          </div>





          <p
            className="
              mt-4

              text-xs

              leading-5

              text-violet-100
            "
          >

            {t("health.description")}

          </p>



        </div>


      </div>


    </aside>

  );
}