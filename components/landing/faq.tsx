"use client";

import { useState } from "react";
import {
  ChevronDown,
  Sparkles,
} from "lucide-react";

const faqs = [
  {
    question: "Is TrafficSaaS free to use?",
    answer:
      "Yes. You can start with the Free plan which includes one project, Google Search Console integration, Google Analytics 4 integration, and the essential SEO dashboard.",
  },
  {
    question: "What do I get with the Pro plan?",
    answer:
      "The Pro plan unlocks unlimited projects, AI executive summaries, AI recommendations, compare date ranges, PDF & Excel exports, and priority support.",
  },
  {
    question: "Does TrafficSaaS connect directly to Google?",
    answer:
      "Yes. TrafficSaaS securely connects to Google Search Console and Google Analytics 4 using Google's official OAuth authentication.",
  },
  {
    question: "Can I manage multiple websites?",
    answer:
      "Absolutely. The Pro plan allows unlimited projects and workspaces, making it ideal for agencies, consultants, and growing businesses.",
  },
  {
    question: "Is my Google data secure?",
    answer:
      "Yes. Your data is accessed securely through Google's APIs. We never ask for your Google password and only request the permissions needed to display your analytics.",
  },
  {
    question: "Can I upgrade later?",
    answer:
      "Yes. You can start for free and upgrade to Pro at any time without losing your existing projects or historical data.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden py-32"
    >
      {/* Glow */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[150px]" />

      </div>

      <div className="relative mx-auto max-w-4xl px-6">

        <div className="text-center">

          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">

            <Sparkles className="h-4 w-4" />

            FAQ

          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900">

            Frequently Asked Questions

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">

            Everything you need to know before
            connecting your Google Search Console
            and Google Analytics 4.

          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => {

            const open = openIndex === index;

            return (

              <div
                key={faq.question}
                className="
                  overflow-hidden

                  rounded-3xl

                  border
                  border-white/60

                  bg-white/70

                  shadow-lg

                  backdrop-blur-xl
                "
              >

                <button
                  onClick={() =>
                    setOpenIndex(
                      open ? null : index
                    )
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between

                    px-8
                    py-6

                    text-left
                  "
                >

                  <span className="text-lg font-semibold text-slate-900">

                    {faq.question}

                  </span>

                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${
                      open
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                <div
                  className={`
                    grid
                    transition-all
                    duration-300

                    ${
                      open
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >

                  <div className="overflow-hidden">

                    <p className="px-8 pb-6 leading-8 text-slate-600">

                      {faq.answer}

                    </p>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}