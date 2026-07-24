"use client";

import {
  Sparkles,
  Brain,
  TrendingUp,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AIPreview() {
  return (
    <section id="ai" className="relative overflow-hidden py-32">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-[150px]" />

        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[150px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">
        {/* LEFT */}

        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            <Sparkles className="h-4 w-4" />
            AI Powered
          </div>

          <h2 className="mt-6 text-5xl font-black leading-tight tracking-tight">
            Your SEO Consultant
            <br />
            Available 24/7
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-500">
            TrafficSaaS tidak hanya menampilkan data website. AI menganalisis
            tren, menemukan peluang, menentukan prioritas, dan menjelaskan
            langkah yang perlu dilakukan.
          </p>

          <div className="mt-10 space-y-6">
  {[
    "Ringkasan eksekutif dibuat otomatis",
    "Rekomendasi AI berdasarkan data website",
    "Estimasi dampak bisnis",
    "Skor prioritas untuk setiap masalah",
  ].map((item) => (
    <div
      key={item}
      className="flex items-center gap-4"
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-violet-100
        "
      >
        <Sparkles className="h-5 w-5 text-violet-600" />
      </div>

      <span className="font-medium">
        {item}
      </span>
    </div>
  ))}
</div>

          <Button
            asChild
            size="lg"
            className="mt-10 rounded-full bg-gradient-to-r from-violet-600 to-sky-500 px-8"
          >
            <Link href="/billing">
              Aktifkan AI
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* RIGHT */}

        <div className="relative">
          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-violet-500/20 to-sky-500/20 blur-[120px]" />

          <div className="relative rounded-[36px] border border-white/60 bg-white p-8 shadow-[0_60px_160px_rgba(15,23,42,.18)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-violet-100 p-3">
                <Brain className="h-6 w-6 text-violet-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">AI Executive Summary</p>

                <h3 className="text-xl font-bold">Weekly SEO Report</h3>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-6">
              <p className="leading-8 text-slate-700">
                Traffic organik meningkat
                <span className="font-bold text-emerald-600"> 18%</span> bulan
                ini. Namun CTR menurun pada halaman dengan lebih dari 10.000
                impression. Optimasi judul halaman dapat menghasilkan sekitar
                <span className="font-bold text-violet-600">
                  {" "}
                  9.400 klik tambahan.
                </span>
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4 rounded-2xl border p-5">
                <TrendingUp className="mt-1 h-6 w-6 text-emerald-600" />

                <div>
                  <h4 className="font-bold">Dampak Bisnis</h4>

                  <p className="mt-2 text-sm text-slate-500">
                    Estimasi peningkatan traffic: +18%
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border p-5">
                <Lightbulb className="mt-1 h-6 w-6 text-amber-500" />

                <div>
                  <h4 className="font-bold">Rekomendasi</h4>

                  <p className="mt-2 text-sm text-slate-500">
                    Perbarui meta title pada halaman dengan impression tertinggi
                    sebelum membuat konten baru.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
