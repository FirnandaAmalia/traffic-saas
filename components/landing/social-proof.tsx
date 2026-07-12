"use client";

import {
  Sparkles,
  ShieldCheck,
  Database,
  Brain,
} from "lucide-react";

const companies = [
  {
    name: "Google Analytics 4",
    icon: Database,
  },
  {
    name: "Google Search Console",
    icon: ShieldCheck,
  },
  {
    name: "OpenAI",
    icon: Brain,
  },
  {
    name: "Next.js",
    icon: Sparkles,
  },
];

export default function SocialProof() {
  return (
    <section className="relative py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-slate-200
              bg-white

              px-4
              py-2

              text-sm
              font-semibold
              text-slate-600

              shadow-sm
            "
          >
            Built with trusted technologies
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-black
              tracking-tight
              text-slate-900
            "
          >
            Powered by Industry Leaders
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl

              text-lg
              leading-8
              text-slate-500
            "
          >
            TrafficSaaS integrates directly with
            Google products and leverages modern AI
            to deliver reliable SEO intelligence.
          </p>

        </div>

        <div
          className="
            mt-14

            grid
            gap-6

            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {companies.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.name}
                className="
                  group

                  rounded-3xl

                  border
                  border-white/60

                  bg-white/70

                  p-8

                  text-center

                  shadow-lg

                  backdrop-blur-xl

                  transition-all
                  duration-500

                  hover:-translate-y-2
                  hover:shadow-2xl
                "
              >

                <div
                  className="
                    mx-auto

                    flex
                    h-16
                    w-16

                    items-center
                    justify-center

                    rounded-2xl

                    bg-gradient-to-br

                    from-violet-600
                    to-sky-500

                    shadow-lg
                  "
                >

                  <Icon className="h-8 w-8 text-white" />

                </div>

                <h3
                  className="
                    mt-5
                    text-lg
                    font-bold
                    text-slate-900
                  "
                >
                  {item.name}
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500
                  "
                >
                  Fully integrated
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}