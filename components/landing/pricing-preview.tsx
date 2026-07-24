"use client";

import Link from "next/link";

import { ArrowRight, Check, Sparkles } from "lucide-react";

import FadeUp from "@/components/motion/fade-up";

import { Button } from "@/components/ui/button";

const freeFeatures = [
  "1 Project Website",
  "Integrasi Google Search Console",
  "Integrasi Google Analytics 4",
  "Dashboard SEO Dasar",
  "Ringkasan Traffic",
  "Monitoring Keyword Dasar",
  "Overview Performa Traffic",
  "Export CSV",
  "Ringkasan SEO Mingguan",
];

const proFeatures = [
  "Workspace Tanpa Batas",
  "Project Tanpa Batas",
  "Dashboard Eksekutif Berbasis AI",
  "Insight SEO AI",
  "Rekomendasi AI",
  "Analisis Keyword & Halaman",
  "Export Laporan PDF",
  "Export Excel",
  "Dukungan Prioritas",
];
export default function PricingPreview() {
  return (
    <section
      id="pricing"
      className="
        relative
        overflow-hidden
        py-32
      "
    >
      {/* Background */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
      >
        <div
          className="
            absolute
            left-0
            top-0

            h-[450px]
            w-[450px]

            rounded-full

            bg-violet-500/10

            blur-[140px]
          "
        />

        <div
          className="
            absolute
            right-0
            bottom-0

            h-[450px]
            w-[450px]

            rounded-full

            bg-sky-500/10

            blur-[140px]
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-6
        "
      >
        {/* HEADER */}

        <FadeUp>
          <div
            className="
              mx-auto
              max-w-3xl
              text-center
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-violet-200

                bg-violet-50

                px-4
                py-2

                text-sm
                font-bold

                text-violet-700
              "
            >
              <Sparkles
                className="
                  h-4
                  w-4
                "
              />
              PILIHAN PAKET
            </div>

            <h2
              className="
                mt-7

                text-4xl

                font-black

                tracking-tight

                text-slate-900

                lg:text-6xl
              "
            >
              Mulai gratis.
              <br />
              Tingkatkan Saat Bisnis Berkembang.
            </h2>

            <p
              className="
                mt-6

                text-lg

                leading-8

                text-slate-600
              "
            >
              Gunakan fitur dasar untuk memahami performa website. Tingkatkan ke
              versi Pro untuk mendapatkan AI insight dan analisis SEO yang lebih
              mendalam.
            </p>
          </div>
        </FadeUp>

        {/* PRICING */}

        <div
          className="
            mt-20

            grid

            gap-8

            lg:grid-cols-2
          "
        >
          {/* FREE */}

          <FadeUp>
            <div
              className="
    flex
    min-h-[720px]
    flex-col

    rounded-[36px]

    border
    border-slate-200

    bg-white

    p-10

    shadow-sm

    transition-all
    duration-500

    hover:-translate-y-2
    hover:shadow-xl
  "
            >
              <span
                className="
                  rounded-full

                  bg-slate-100

                  px-4

                  py-2

                  text-sm

                  font-bold

                  text-slate-700
                "
              >
                PAKET GRATIS
              </span>

              <div
                className="
                  mt-8
                  flex
                  items-end
                  gap-2
                "
              >
                <h3
                  className="
    text-6xl
    font-black
    text-slate-900
  "
                >
                  Rp0
                </h3>

                <span
                  className="
                    mb-3

                    text-slate-500
                  "
                >
                  selamanya
                </span>
              </div>

              <p
                className="
                  mt-4

                  text-slate-600
                "
              >
                Cocok untuk memulai analisis SEO dan memahami performa website
                Anda.
              </p>

              <div
                className="
my-8
h-px
bg-slate-200
"
              />

              <div
                className="
    flex-1
    space-y-5
  "
              >
                {freeFeatures.map((item) => (
                  <Feature key={item} text={item} />
                ))}
              </div>

              <div
                className="
mt-auto
pt-10
"
              >
                <Button
                  asChild
                  variant="outline"
                  className="
      h-14
      w-full
      rounded-2xl
      font-semibold
    "
                >
                  <Link href="/api/auth/signin">Mulai Gratis</Link>
                </Button>
              </div>
            </div>
          </FadeUp>

          {/* PRO */}

          <FadeUp delay={0.15}>
            <div
              className="
    relative
    flex
    min-h-[720px]
    flex-col

    rounded-[36px]

    bg-gradient-to-br

                from-violet-600

                via-indigo-600

                to-sky-500

                p-[1px]

                shadow-[0_40px_120px_rgba(124,58,237,.35)]
              "
            >
              <div
                className="
   relative
   flex
   flex-1
   flex-col

   rounded-[35px]

   bg-slate-950

   p-10

   text-white
 "
              >
                <div
                  className="
                    absolute

                    right-8

                    top-8

                    rounded-full

                    bg-white/10

                    px-4

                    py-2

                    text-xs

                    font-bold

                    backdrop-blur
                  "
                >
                  ⭐ TERPOPULER
                </div>

                <span
                  className="
                    text-sm

                    font-bold

                    tracking-widest

                    text-violet-300
                  "
                >
                  PAKET PRO
                </span>

                <div
                  className="
                    mt-6

                    flex

                    items-end

                    gap-2
                  "
                >
                  <h3
                    className="
    text-6xl
    font-black
  "
                  >
                    Rp299.000
                  </h3>

                  <span
                    className="
    mb-4
    text-slate-400
  "
                  >
                    /bulan
                  </span>
                </div>
                <h3
                  className="
    text-6xl
    font-black
  "
                >
                  Rp299.000
                </h3>

                <span
                  className="
    mb-4
    text-slate-400
  "
                >
                  /bulan
                </span>

                <p
                  className="
    mt-4
    text-slate-300
  "
                >
                  Untuk freelancer SEO, agency, dan bisnis yang membutuhkan
                  insight berbasis data untuk berkembang lebih cepat.
                </p>

                <div
                  className="
                    my-8

                    h-px

                    bg-white/10
                  "
                />

                <div
                  className="
                    space-y-5
                  "
                >
                  {proFeatures.map((item) => (
                    <Feature key={item} text={item} dark />
                  ))}
                </div>

                <div className="mt-auto pt-10">
                  <Button
                    asChild
                    className="

                    h-14

                    w-full

                    rounded-2xl

                    bg-white

                    font-bold

                    text-violet-700

                    hover:bg-slate-100
                  "
                  >
                    <Link href="/billing">
                      Upgrade ke Pro
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
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Feature({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
      "
    >
      <div
        className={`
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full

          ${dark ? "bg-white/10" : "bg-emerald-100"}
        `}
      >
        <Check
          className={`
            h-4
            w-4

            ${dark ? "text-emerald-400" : "text-emerald-600"}
          `}
        />
      </div>

      <span
        className={`
          font-medium

          ${dark ? "text-slate-200" : "text-slate-700"}
        `}
      >
        {text}
      </span>
    </div>
  );
}
