"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";


const articles = [
  {
    title: "Cara Meningkatkan Traffic Website dengan SEO",
    description:
      "Pelajari strategi SEO modern untuk meningkatkan visibilitas website dan mendapatkan lebih banyak pengunjung organik.",
    category: "SEO Strategy",
    date: "12 July 2026",
    read:
      "5 min read",
  },
  {
    title: "Google Search Console: Panduan Lengkap untuk Pemula",
    description:
      "Memahami bagaimana Google Search Console membantu menemukan keyword, error website, dan peluang pertumbuhan.",
    category: "Analytics",
    date: "08 July 2026",
    read:
      "7 min read",
  },
  {
    title: "Bagaimana AI Mengubah Dunia SEO",
    description:
      "AI membantu tim marketing menemukan insight lebih cepat dan membuat keputusan berbasis data.",
    category: "Artificial Intelligence",
    date: "01 July 2026",
    read:
      "6 min read",
  },
  {
    title: "GA4 vs Analytics Lama: Apa Perbedaannya?",
    description:
      "Memahami perubahan Google Analytics 4 dan bagaimana memanfaatkannya untuk bisnis.",
    category: "Google Analytics",
    date: "25 June 2026",
    read:
      "4 min read",
  },
  {
    title: "SEO Reporting untuk Agency Modern",
    description:
      "Cara membuat laporan SEO profesional yang mudah dipahami oleh klien.",
    category: "Business",
    date: "18 June 2026",
    read:
      "8 min read",
  },
  {
    title: "Mengubah Data Menjadi Keputusan Bisnis",
    description:
      "Kenapa data saja tidak cukup tanpa insight yang bisa langsung diterapkan.",
    category: "Growth",
    date: "10 June 2026",
    read:
      "5 min read",
  },
];


export default function BlogPage() {
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

            <Sparkles className="h-4 w-4"/>

            TrafficSaaS Blog

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

            SEO Insights &

            <br />

            Growth Strategy

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

            Temukan artikel mengenai SEO,
            analytics, AI, dan strategi digital
            untuk membantu website berkembang.

          </p>


        </div>


      </section>





      {/* Articles */}


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


            {articles.map((article)=>(

              <article
                key={article.title}
                className="
                  group
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-7
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                "
              >


                <span
                  className="
                    rounded-full
                    bg-violet-100
                    px-3
                    py-1
                    text-xs
                    font-bold
                    text-violet-700
                  "
                >

                  {article.category}

                </span>



                <h2
                  className="
                    mt-6
                    text-xl
                    font-black
                    leading-tight
                    text-slate-900
                  "
                >

                  {article.title}

                </h2>



                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-slate-600
                  "
                >

                  {article.description}

                </p>



                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-4
                    text-xs
                    text-slate-500
                  "
                >

                  <span
                    className="
                      flex
                      items-center
                      gap-1
                    "
                  >

                    <Calendar className="h-3.5 w-3.5"/>

                    {article.date}

                  </span>



                  <span
                    className="
                      flex
                      items-center
                      gap-1
                    "
                  >

                    <Clock className="h-3.5 w-3.5"/>

                    {article.read}

                  </span>


                </div>



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

                  Read article →

                </button>



              </article>

            ))}


          </div>





          <div
            className="
              mt-12
              text-center
            "
          >

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