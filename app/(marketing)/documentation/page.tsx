"use client";

import Link from "next/link";

import {
  ArrowLeft,
  BookOpen,
  Database,
  KeyRound,
  BarChart3,
  Brain,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";


const docs = [
  {
    icon: KeyRound,
    title: "Getting Started",
    description:
      "Hubungkan akun Google Anda dan mulai menganalisis performa website dalam beberapa menit.",
  },
  {
    icon: Database,
    title: "Google Integration",
    description:
      "Pelajari cara menghubungkan Google Search Console dan Google Analytics 4 melalui OAuth.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Overview",
    description:
      "Memahami metrik SEO, traffic, landing page, dan performa website Anda.",
  },
  {
    icon: Brain,
    title: "AI Insights",
    description:
      "Bagaimana TrafficSaaS menggunakan AI untuk menemukan peluang SEO.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description:
      "Informasi mengenai keamanan data dan bagaimana TrafficSaaS melindungi akun Anda.",
  },
  {
    icon: Sparkles,
    title: "Best Practices",
    description:
      "Tips menggunakan insight TrafficSaaS untuk meningkatkan pertumbuhan organik.",
  },
];


export default function DocumentationPage() {
  return (
    <main className="min-h-screen bg-white">


      {/* Hero */}

      <section
        className="
          relative
          overflow-hidden
          py-32
        "
      >

        <div
          className="
            absolute
            left-1/2
            top-10
            h-[500px]
            w-[500px]
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
            max-w-4xl
            px-6
            text-center
          "
        >

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-violet-100
              px-4
              py-2
              text-sm
              font-semibold
              text-violet-700
            "
          >

            <BookOpen className="h-4 w-4"/>

            Documentation

          </div>



          <h1
            className="
              mt-8
              text-5xl
              font-black
              tracking-tight
              text-slate-900
              lg:text-6xl
            "
          >

            Learn how to use

            <br />

            TrafficSaaS

          </h1>



          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-slate-600
            "
          >

            Panduan lengkap untuk menghubungkan website,
            memahami dashboard, dan memaksimalkan
            AI SEO Intelligence TrafficSaaS.

          </p>


        </div>


      </section>




      {/* Documentation Cards */}


      <section className="pb-32">

        <div
          className="
            mx-auto
            max-w-6xl
            px-6
          "
        >

          <div
            className="
              grid
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
            "
          >

            {docs.map((item)=>{

              const Icon = item.icon;


              return (

                <div
                  key={item.title}
                  className="
                    group
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-8
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-xl
                  "
                >

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-violet-600
                      to-sky-500
                    "
                  >

                    <Icon className="h-7 w-7 text-white"/>

                  </div>


                  <h2
                    className="
                      mt-6
                      text-xl
                      font-black
                      text-slate-900
                    "
                  >

                    {item.title}

                  </h2>


                  <p
                    className="
                      mt-3
                      leading-7
                      text-slate-600
                    "
                  >

                    {item.description}

                  </p>


                  <button
                    className="
                      mt-6
                      text-sm
                      font-semibold
                      text-violet-600
                      transition
                      hover:text-violet-800
                    "
                  >

                    Learn more →

                  </button>


                </div>

              );

            })}


          </div>



          <div
            className="
              mt-12
              rounded-3xl
              border
              border-violet-200
              bg-violet-50
              p-8
              text-center
            "
          >

            <h2
              className="
                text-2xl
                font-black
                text-slate-900
              "
            >

              Need more help?

            </h2>


            <p
              className="
                mt-3
                text-slate-600
              "
            >

              Tim kami siap membantu jika Anda memiliki
              pertanyaan mengenai integrasi atau penggunaan
              TrafficSaaS.

            </p>


            <Button
              asChild
              className="
                mt-6
                rounded-full
                bg-gradient-to-r
                from-violet-600
                to-sky-500
              "
            >

              <Link href="/contact">

                Contact Support

              </Link>

            </Button>


          </div>




          <div className="mt-10 text-center">

            <Button
              asChild
              variant="outline"
              className="rounded-full"
            >

              <Link href="/">

                <ArrowLeft className="mr-2 h-4 w-4"/>

                Kembali ke Home

              </Link>

            </Button>


          </div>


        </div>


      </section>


    </main>
  );
}