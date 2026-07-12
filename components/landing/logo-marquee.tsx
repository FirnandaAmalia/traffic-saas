"use client";

import Image from "next/image";

const logos = [
  {
    name: "Google Analytics",
    src: "/logos/ga4.svg",
  },
  {
    name: "Search Console",
    src: "/logos/gsc.svg",
  },
  {
    name: "OpenAI",
    src: "/logos/openai.svg",
  },
  {
    name: "Next.js",
    src: "/logos/nextjs.svg",
  },
  {
    name: "Vercel",
    src: "/logos/vercel.svg",
  },
  {
    name: "PostgreSQL",
    src: "/logos/postgres.svg",
  },
  {
    name: "Redis",
    src: "/logos/redis.svg",
  },
  {
    name: "Stripe",
    src: "/logos/stripe.svg",
  },
];

const items = [...logos, ...logos];

export default function LogoMarquee() {
  return (
    <section className="relative overflow-hidden py-16">

      {/* Fade */}

      <div className="absolute inset-y-0 left-0 z-10 w-48 bg-gradient-to-r from-white via-white to-transparent" />

      <div className="absolute inset-y-0 right-0 z-10 w-48 bg-gradient-to-l from-white via-white to-transparent" />

      <div className="flex w-max animate-marquee gap-8">

        {items.map((logo, index) => (

          <div
            key={`${logo.name}-${index}`}
            className="
              flex
              h-20
              w-64
              shrink-0
              items-center
              justify-center
              gap-4

              rounded-3xl

              border
              border-slate-200

              bg-white/80

              backdrop-blur-xl

              shadow-sm

              transition-all
              duration-300

              hover:-translate-y-1
              hover:shadow-xl
            "
          >

            <Image
              src={logo.src}
              alt={logo.name}
              width={34}
              height={34}
            />

            <span className="font-semibold text-slate-700">

              {logo.name}

            </span>

          </div>

        ))}

      </div>

    </section>
  );
}