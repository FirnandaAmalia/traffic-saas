"use client";

import Link from "next/link";

import { Sparkles } from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const product = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "AI Insights",
    href: "#ai",
  },
  {
    label: "Dashboard",
    href: "/dashboard",
  },
];

const resources = [
  {
    label: "Documentation",
    href: "#",
  },
  {
    label: "API",
    href: "#",
  },
  {
    label: "Blog",
    href: "#",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

const company = [
  {
    label: "About",
    href: "#",
  },
  {
    label: "Contact",
    href: "#",
  },
  {
    label: "Privacy",
    href: "#",
  },
  {
    label: "Terms",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-slate-800 bg-slate-950 text-white">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-5">

          {/* Brand */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-violet-600
                  to-sky-500
                  shadow-lg
                "
              >
                <Sparkles className="h-6 w-6 text-white" />
              </div>

              <div>

                <h2 className="text-2xl font-black">
                  TrafficSaaS
                </h2>

                <p className="text-sm text-slate-400">
                  AI SEO Intelligence Platform
                </p>

              </div>

            </div>

            <p className="mt-6 max-w-md leading-7 text-slate-400">

              Monitor Google Search Console and Google Analytics 4
              in one beautiful dashboard with AI-powered insights,
              executive reports, and actionable recommendations.

            </p>

            {/* Social */}

            <div className="mt-8 flex items-center gap-3">

              <Link
                href="#"
                className="
                  rounded-xl
                  border
                  border-slate-800
                  p-3
                  text-slate-400
                  transition
                  hover:border-violet-500
                  hover:bg-violet-500/10
                  hover:text-white
                "
              >
                <FaGithub className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="
                  rounded-xl
                  border
                  border-slate-800
                  p-3
                  text-slate-400
                  transition
                  hover:border-sky-500
                  hover:bg-sky-500/10
                  hover:text-white
                "
              >
                <FaXTwitter className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="
                  rounded-xl
                  border
                  border-slate-800
                  p-3
                  text-slate-400
                  transition
                  hover:border-blue-500
                  hover:bg-blue-500/10
                  hover:text-white
                "
              >
                <FaLinkedin className="h-5 w-5" />
              </Link>

            </div>

          </div>

          {/* Product */}

          <div>

            <h3 className="font-bold text-white">
              Product
            </h3>

            <div className="mt-5 flex flex-col gap-4">

              {product.map((item) => (

                <Link
                  key={item.label}
                  href={item.href}
                  className="text-slate-400 transition hover:text-violet-400"
                >
                  {item.label}
                </Link>

              ))}

            </div>

          </div>

          {/* Resources */}

          <div>

            <h3 className="font-bold text-white">
              Resources
            </h3>

            <div className="mt-5 flex flex-col gap-4">

              {resources.map((item) => (

                <Link
                  key={item.label}
                  href={item.href}
                  className="text-slate-400 transition hover:text-violet-400"
                >
                  {item.label}
                </Link>

              ))}

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="font-bold text-white">
              Company
            </h3>

            <div className="mt-5 flex flex-col gap-4">

              {company.map((item) => (

                <Link
                  key={item.label}
                  href={item.href}
                  className="text-slate-400 transition hover:text-violet-400"
                >
                  {item.label}
                </Link>

              ))}

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 lg:flex-row">

          <p>
            © {new Date().getFullYear()} TrafficSaaS. All rights reserved.
          </p>

          <div className="flex items-center gap-2">

            <span>
              Built with
            </span>

            <span className="text-red-500">
              ❤
            </span>

            <span>
              using Next.js & Tailwind CSS
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}