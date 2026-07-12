"use client";

import {
  Brain,
  FolderOpen,
  FileText,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "AI Dashboard",
    description:
      "Executive summaries, AI insights, recommendations, and business impact generated automatically from your SEO & GA4 data.",
    gradient:
      "from-violet-500 via-fuchsia-500 to-pink-500",
  },
  {
    icon: FolderOpen,
    title: "Unlimited Projects",
    description:
      "Manage unlimited websites and workspaces from one account. Built for agencies and growing businesses.",
    gradient:
      "from-sky-500 via-cyan-500 to-blue-500",
  },
  {
    icon: FileText,
    title: "Professional Reports",
    description:
      "Generate beautiful PDF and Excel reports ready to send to clients or stakeholders in one click.",
    gradient:
      "from-emerald-500 via-teal-500 to-green-500",
  },
  {
    icon: ShieldCheck,
    title: "Priority Support",
    description:
      "Receive faster responses, priority bug fixes, and early access to every premium feature.",
    gradient:
      "from-amber-500 via-orange-500 to-red-500",
  },
];

export default function WhyUpgrade() {
  return (
    <section className="mt-28">

      <div className="mx-auto max-w-3xl text-center">

        <span
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-violet-200
            bg-violet-50
            px-5
            py-2
            text-sm
            font-semibold
            text-violet-700
          "
        >
          Why Upgrade?
        </span>

        <h2
          className="
            mt-6
            text-5xl
            font-black
            tracking-tight
            text-slate-900
          "
        >
          Everything You Need
          <br />
          to Scale SEO Faster
        </h2>

        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-lg
            leading-8
            text-slate-500
          "
        >
          Unlock premium analytics, AI insights,
          unlimited projects, executive reports,
          and collaboration features built for
          professionals.
        </p>

      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-4">

        {benefits.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                group
                relative
                flex
                h-full
                flex-col
                overflow-hidden

                rounded-3xl

                border
                border-white/70

                bg-white/70

                p-7

                shadow-lg
                backdrop-blur-xl

                transition-all
                duration-500

                hover:-translate-y-2
                hover:shadow-2xl
                hover:shadow-violet-200/40
              "
            >

              {/* Glow */}

              <div
                className={`
                  absolute
                  -right-10
                  -top-10
                  h-40
                  w-40
                  rounded-full
                  bg-gradient-to-br
                  ${item.gradient}
                  opacity-10
                  blur-[80px]
                  transition-all
                  duration-500
                  group-hover:opacity-30
                `}
              />

              {/* Badge */}

              <span
                className="
                  mb-6
                  inline-flex
                  w-fit
                  rounded-full
                  bg-slate-100
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-slate-500
                "
              >
                Pro Feature
              </span>

              {/* Icon */}

              <div
                className={`
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center

                  rounded-2xl

                  bg-gradient-to-br
                  ${item.gradient}

                  shadow-lg
                `}
              >
                <Icon className="h-8 w-8 text-white" />
              </div>

              {/* Title */}

              <h3 className="mt-6 text-xl font-bold text-slate-900">

                {item.title}

              </h3>

              {/* Description */}

              <p
                className="
                  mt-4
                  flex-1
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                {item.description}
              </p>

              {/* Footer */}

              <div
                className="
                  mt-6
                  flex
                  items-center
                  justify-between
                  border-t
                  pt-5
                "
              >

                <span
                  className="
                    text-sm
                    font-semibold
                    text-violet-600
                  "
                >
                  Included in Pro
                </span>

                <ArrowUpRight
                  className="
                    h-5
                    w-5

                    text-violet-600

                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}