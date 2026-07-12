"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const links = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", onScroll);

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-50

        transition-all
        duration-500

        ${
          scrolled
            ? `
              border-b
              border-white/50
              bg-white/70
              shadow-lg
              backdrop-blur-2xl
            `
            : `
              bg-transparent
            `
        }
      `}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div
            className="
              flex
              h-10
              w-10

              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-br

              from-violet-600
              to-sky-500

              text-lg
              font-black
              text-white

              shadow-lg

              transition-transform
              duration-300

              hover:rotate-6
              hover:scale-110
            "
          >
            T
          </div>

          <span className="text-xl font-black tracking-tight">

            TrafficSaaS

          </span>

        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-10 lg:flex">

          {links.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              className="
                relative

                text-sm
                font-medium

                text-slate-600

                transition-colors

                hover:text-violet-600

                after:absolute
                after:-bottom-2
                after:left-0

                after:h-[2px]
                after:w-0

                after:bg-violet-600

                after:transition-all
                after:duration-300

                hover:after:w-full
              "
            >
              {item.label}
            </Link>

          ))}

        </nav>

        {/* Right */}

        <div className="flex items-center gap-3">

          <Button
            variant="ghost"
            asChild
          >

            <Link href="/api/auth/signin">

              Sign In

            </Link>

          </Button>

          <Button
            asChild
            className="
              relative
              overflow-hidden

              rounded-full

              bg-gradient-to-r

              from-violet-600
              to-sky-500

              px-6

              shadow-[0_15px_40px_rgba(124,58,237,.35)]

              transition-all

              hover:scale-[1.03]

              before:absolute
              before:inset-0

              before:-translate-x-[120%]

              before:bg-gradient-to-r
              before:from-transparent
              before:via-white/30
              before:to-transparent

              before:transition-transform
              before:duration-700

              hover:before:translate-x-[120%]
            "
          >

            <Link
              href="/api/auth/signin"
              className="relative z-10 flex items-center"
            >

              Get Started

              <ArrowRight className="ml-2 h-4 w-4" />

            </Link>

          </Button>

        </div>

      </div>
    </header>
  );
}