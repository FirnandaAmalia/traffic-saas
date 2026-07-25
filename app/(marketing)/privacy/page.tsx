"use client";

import Link from "next/link";

import {
  ArrowLeft,
  ShieldCheck,
  Database,
  Lock,
  Sparkles,
} from "lucide-react";

import type React from "react";

import { Button } from "@/components/ui/button";


export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">


      {/* Header */}

      <section
        className="
          relative
          overflow-hidden
          py-28
        "
      >

        <div
          className="
            absolute
            left-1/2
            top-10
            h-[450px]
            w-[450px]
            -translate-x-1/2
            rounded-full
            bg-violet-500/10
            blur-[150px]
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

            <ShieldCheck className="h-4 w-4"/>

            Privacy Policy

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

            Kebijakan Privasi

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

            Kami menghargai privasi pengguna.
            Halaman ini menjelaskan bagaimana TrafficSaaS
            mengumpulkan, menggunakan, dan melindungi data Anda.

          </p>


        </div>


      </section>




      {/* Content */}


      <section className="pb-32">

        <div
          className="
            mx-auto
            max-w-4xl
            px-6
          "
        >


          <div className="space-y-8">


            <PrivacyCard
              icon={Database}
              title="Informasi Yang Kami Kumpulkan"
            >

              TrafficSaaS dapat mengumpulkan informasi akun,
              data website, serta data performa dari layanan
              Google yang Anda hubungkan seperti Google Search
              Console dan Google Analytics 4.

            </PrivacyCard>



            <PrivacyCard
              icon={Lock}
              title="Keamanan Data"
            >

              Kami menggunakan metode autentikasi resmi Google OAuth
              dan hanya meminta akses yang diperlukan.
              TrafficSaaS tidak menyimpan password Google Anda.

            </PrivacyCard>



            <PrivacyCard
              icon={ShieldCheck}
              title="Penggunaan Data"
            >

              Data digunakan untuk memberikan analisis SEO,
              menghasilkan insight AI, membuat laporan performa,
              dan membantu pengguna mengambil keputusan bisnis
              berbasis data.

            </PrivacyCard>



            <PrivacyCard
              icon={Sparkles}
              title="Integrasi AI"
            >

              Fitur AI digunakan untuk membantu menganalisis data,
              menemukan peluang SEO, dan memberikan rekomendasi.
              Data tidak digunakan untuk tujuan di luar layanan
              TrafficSaaS.

            </PrivacyCard>



          </div>



          <div
            className="
              mt-12
              rounded-3xl
              border
              border-slate-200
              bg-slate-50
              p-8
            "
          >

            <h2
              className="
                text-xl
                font-black
                text-slate-900
              "
            >

              Perubahan Kebijakan

            </h2>


            <p
              className="
                mt-3
                leading-7
                text-slate-600
              "
            >

              TrafficSaaS dapat memperbarui kebijakan privasi
              dari waktu ke waktu untuk meningkatkan keamanan
              dan menyesuaikan dengan perkembangan layanan.

            </p>


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




function PrivacyCard({
  icon: Icon,
  title,
  children,
}:{
  icon: React.ElementType;
  title:string;
  children:React.ReactNode;
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
      "
    >

      <div className="flex items-start gap-5">


        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-violet-600
            to-sky-500
          "
        >

          <Icon className="h-5 w-5 text-white"/>

        </div>



        <div>

          <h2
            className="
              text-xl
              font-black
              text-slate-900
            "
          >

            {title}

          </h2>


          <p
            className="
              mt-3
              leading-7
              text-slate-600
            "
          >

            {children}

          </p>


        </div>


      </div>


    </div>

  );
}