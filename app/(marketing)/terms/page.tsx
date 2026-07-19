"use client";

import Link from "next/link";

import {
  ArrowLeft,
  FileText,
  UserCheck,
  CreditCard,
  Ban,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";


export default function TermsPage() {
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

            <FileText className="h-4 w-4"/>

            Terms of Service

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

            Syarat & Ketentuan

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

            Dengan menggunakan TrafficSaaS,
            Anda menyetujui syarat dan ketentuan
            penggunaan layanan kami.

          </p>


        </div>


      </section>





      {/* Content */}


      <section className="pb-32">


        <div
          className="
            mx-auto
            max-w-4xl
            space-y-8
            px-6
          "
        >


          <TermsCard
            icon={UserCheck}
            title="1. Penggunaan Layanan"
          >

            TrafficSaaS menyediakan platform analisis SEO
            berbasis AI untuk membantu pengguna memahami
            performa website, menemukan peluang optimasi,
            dan membuat keputusan berdasarkan data.

            Pengguna wajib menggunakan layanan sesuai
            hukum yang berlaku dan tidak melakukan aktivitas
            yang dapat mengganggu sistem.

          </TermsCard>




          <TermsCard
            icon={CreditCard}
            title="2. Paket dan Pembayaran"
          >

            TrafficSaaS menyediakan paket gratis dan paket
            berlangganan. Fitur tertentu seperti AI Insight,
            export laporan, dan unlimited workspace hanya
            tersedia pada paket tertentu.

            Harga dan fitur dapat berubah sesuai perkembangan
            layanan.

          </TermsCard>




          <TermsCard
            icon={Sparkles}
            title="3. Penggunaan Data"
          >

            Pengguna memberikan izin kepada TrafficSaaS untuk
            mengakses data Google yang diperlukan melalui
            integrasi resmi seperti Google OAuth.

            Data tersebut digunakan hanya untuk memberikan
            fitur analisis, dashboard, dan rekomendasi SEO.

          </TermsCard>




          <TermsCard
            icon={Ban}
            title="4. Pembatasan Penggunaan"
          >

            Pengguna tidak diperbolehkan menggunakan layanan
            untuk aktivitas ilegal, mencoba merusak sistem,
            mengakses data pengguna lain, atau melakukan
            penyalahgunaan terhadap platform.

          </TermsCard>




          <div
            className="
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

              Perubahan Ketentuan

            </h2>


            <p
              className="
                mt-3
                leading-7
                text-slate-600
              "
            >

              TrafficSaaS dapat memperbarui syarat dan
              ketentuan sewaktu-waktu untuk meningkatkan
              kualitas layanan dan keamanan pengguna.

            </p>


          </div>




          <div className="pt-4 text-center">


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





function TermsCard({
  icon: Icon,
  title,
  children,
}:{
  icon:any;
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

      <div
        className="
          flex
          gap-5
        "
      >

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