"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Brain,
  Database,
  TrendingUp,
} from "lucide-react";

import type React from "react";

import { Button } from "@/components/ui/button";


export default function AboutPage() {
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

        {/* Glow */}

        <div
          className="
            absolute
            left-1/2
            top-20
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
              mx-auto
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

            <Sparkles className="h-4 w-4" />

            About TrafficSaaS

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

            Membantu bisnis memahami SEO

            <br />

            dengan kekuatan AI

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

            TrafficSaaS adalah platform AI SEO Intelligence
            yang membantu bisnis menganalisis performa website,
            menemukan peluang pertumbuhan, dan mengambil keputusan
            berdasarkan data.

          </p>


          <Button
            asChild
            variant="outline"
            className="mt-8 rounded-full"
          >

            <Link href="/">

              <ArrowLeft className="mr-2 h-4 w-4" />

              Kembali ke Home

            </Link>

          </Button>


        </div>

      </section>



      {/* Mission */}


      <section className="pb-32">

        <div
          className="
            mx-auto
            grid
            max-w-6xl
            gap-8
            px-6
            md:grid-cols-3
          "
        >

          <Card
            icon={Brain}
            title="AI Intelligence"
            text="Mengubah data SEO yang kompleks menjadi insight yang mudah dipahami."
          />


          <Card
            icon={Database}
            title="Unified Data"
            text="Menggabungkan Google Search Console dan Google Analytics dalam satu workspace."
          />


          <Card
            icon={TrendingUp}
            title="Business Growth"
            text="Membantu bisnis menemukan peluang dan meningkatkan performa digital."
          />


        </div>

      </section>


    </main>
  );
}



function Card({
  icon: Icon,
  title,
  text,
}:{
  icon: React.ElementType;
  title:string;
  text:string;
}) {

  return (

    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition
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


      <h3
        className="
          mt-6
          text-xl
          font-black
          text-slate-900
        "
      >

        {title}

      </h3>


      <p
        className="
          mt-3
          leading-7
          text-slate-600
        "
      >

        {text}

      </p>


    </div>

  );
}