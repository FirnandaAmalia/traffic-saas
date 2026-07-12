"use client";

import {
  Quote,
  Star,
} from "lucide-react";

const testimonials = [
  {
    name: "Daniel Kim",
    role: "SEO Manager",
    company: "Growth Studio",
    initials: "DK",
    quote:
      "TrafficSaaS helped us combine Google Search Console and GA4 into one beautiful dashboard. The AI recommendations immediately uncovered SEO opportunities we had been missing.",
  },
  {
    name: "Sarah Johnson",
    role: "Founder",
    company: "Bright Digital",
    initials: "SJ",
    quote:
      "Finally an analytics platform that doesn't require opening ten browser tabs. Everything is fast, organized, and the interface is incredibly polished.",
  },
  {
    name: "Michael Chen",
    role: "Digital Marketing Consultant",
    company: "MC Consulting",
    initials: "MC",
    quote:
      "Executive summaries save me hours every week. My clients love the reports, and the AI insights make every presentation much more valuable.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-32"
    >
      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-20 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-[140px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">

            Testimonials

          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">

            Loved by

            <br />

            SEO Professionals

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">

            From freelancers to agencies,
            TrafficSaaS helps teams monitor SEO,
            discover opportunities, and make better
            business decisions with AI.

          </p>

        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="
                group
                relative
                overflow-hidden

                rounded-[32px]

                border
                border-white/60

                bg-white/70

                p-8

                shadow-xl

                backdrop-blur-xl

                transition-all
                duration-500

                hover:-translate-y-3
                hover:shadow-2xl
              "
            >

              {/* Glow */}

              <div
                className="
                  absolute
                  -right-10
                  -top-10

                  h-40
                  w-40

                  rounded-full

                  bg-gradient-to-br

                  from-violet-500/20

                  to-sky-400/20

                  blur-3xl

                  transition-all

                  duration-500

                  group-hover:opacity-100
                "
              />

              {/* Quote */}

              <Quote className="h-10 w-10 text-violet-500" />

              {/* Rating */}

              <div className="mt-6 flex gap-1">

                {Array.from({ length: 5 }).map((_, index) => (

                  <Star
                    key={index}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />

                ))}

              </div>

              {/* Quote */}

              <p className="mt-6 leading-8 text-slate-600">

                "{item.quote}"

              </p>

              {/* User */}

              <div className="mt-8 flex items-center gap-4">

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

                    font-bold

                    text-white
                  "
                >

                  {item.initials}

                </div>

                <div>

                  <h4 className="font-bold text-slate-900">

                    {item.name}

                  </h4>

                  <p className="text-sm text-slate-500">

                    {item.role}

                  </p>

                  <p className="text-xs text-slate-400">

                    {item.company}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}