"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ArrowRight,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const links = [
  {
    label: "Fitur",
    href:"#features",
  },
  {
    label:"AI",
    href:"#ai",
  },
  {
    label:"Alur Kerja",
    href:"#workflow",
  },
  {
    label:"Harga",
    href:"#pricing",
  },
  {
    label:"FAQ",
    href:"#faq",
  },
];
export default function Navbar(){


  const [scrolled,setScrolled] =
    useState(false);


  const [open,setOpen] =
    useState(false);



  useEffect(()=>{


    const handleScroll=()=>{

      setScrolled(
        window.scrollY > 20
      );

    };


    window.addEventListener(
      "scroll",
      handleScroll
    );


    return()=>{

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };


  },[]);




  return (

    <header
      className={`
        fixed

        inset-x-0

        top-0

        z-50

        transition-all

        duration-500


        ${
          scrolled
          ?
          `
          border-b
          border-slate-200/70

          bg-white/75

          shadow-lg

          backdrop-blur-2xl
          `
          :
          `
          bg-transparent
          `
        }

      `}
    >


      <div
        className="
          mx-auto

          flex

          h-20

          max-w-7xl

          items-center

          justify-between

          px-6
        "
      >





        {/* LOGO */}


        <Link
          href="/"
          className="
            flex

            items-center

            gap-3
          "
        >


          <div
            className="
              flex

              h-11

              w-11

              items-center

              justify-center

              rounded-2xl

              bg-gradient-to-br

              from-violet-600

              to-sky-500

              shadow-lg

              shadow-violet-500/30

              transition

              hover:scale-110
            "
          >

            <Sparkles
              className="
                h-6

                w-6

                text-white
              "
            />

          </div>



          <div>

            <h1
              className="
                text-xl

                font-black

                tracking-tight

                text-slate-900
              "
            >

              TrafficSaaS


            </h1>


            <p
              className="
                hidden

                text-[11px]

                font-medium

                text-slate-500

                sm:block
              "
            >

              AI SEO Intelligence


            </p>


          </div>



        </Link>







        {/* DESKTOP MENU */}



        <nav
          className="
            hidden

            items-center

            gap-9

            lg:flex
          "
        >


          {
            links.map((item)=>(


              <Link

                key={item.href}

                href={item.href}

                className="
                  relative

                  text-sm

                  font-semibold

                  text-slate-600

                  transition

                  hover:text-violet-600


                  after:absolute

                  after:-bottom-2

                  after:left-0

                  after:h-[2px]

                  after:w-0

                  after:bg-gradient-to-r

                  after:from-violet-600

                  after:to-sky-500

                  after:transition-all

                  hover:after:w-full
                "

              >

                {item.label}


              </Link>


            ))
          }


        </nav>


{/* DESKTOP ACTION */}

<div
  className="
    hidden
    items-center
    gap-3
    lg:flex
  "
>


  <Button
    asChild
    className="
      rounded-full

      bg-gradient-to-r

      from-violet-600

      to-sky-500

      px-7

      shadow-lg

      shadow-violet-500/30

      transition

      hover:scale-105
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


</div>

        {/* MOBILE BUTTON */}



        <button
          onClick={()=>setOpen(!open)}
          className="
            rounded-xl

            border

            border-slate-200

            p-2

            lg:hidden
          "
        >

          {
            open
            ?
            <X className="h-6 w-6"/>
            :
            <Menu className="h-6 w-6"/>
          }


        </button>




      </div>









      {/* MOBILE MENU */}



      {
        open && (

          <div
            className="
              mx-4

              rounded-3xl

              border

              border-slate-200

              bg-white/90

              p-6

              shadow-xl

              backdrop-blur-xl

              lg:hidden
            "
          >


            <div
              className="
                flex

                flex-col

                gap-5
              "
            >


              {
                links.map((item)=>(

                  <Link

                    key={item.href}

                    href={item.href}

                    onClick={()=>setOpen(false)}

                    className="
                      font-semibold

                      text-slate-700

                      hover:text-violet-600
                    "

                  >

                    {item.label}


                  </Link>


                ))
              }



              <Button
                asChild
                className="
                  mt-3

                  rounded-full

                  bg-gradient-to-r

                  from-violet-600

                  to-sky-500
                "
              >

                <Link href="/api/auth/signin">

                  Mulai Gratis

                  <ArrowRight className="ml-2 h-4 w-4"/>

                </Link>


              </Button>


            </div>


          </div>


        )
      }



    </header>

  );

}