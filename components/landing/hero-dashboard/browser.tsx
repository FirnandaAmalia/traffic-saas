"use client";

import type { ReactNode } from "react";

interface BrowserProps {
  children: ReactNode;
}

export default function Browser({
  children,
}: BrowserProps) {
  return (
    <div
      className="
        relative

        flex

        h-[520px]
        w-full

        overflow-hidden

        rounded-[34px]

        border
        border-white/70

        bg-white/75

        shadow-[0_40px_120px_rgba(15,23,42,.18)]

        backdrop-blur-2xl

        transition-all
        duration-500

        hover:shadow-[0_40px_140px_rgba(124,58,237,.18)]
      "
    >


      {/* Background Grid */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)]

          bg-[size:40px_40px]

          opacity-40
        "
      />


      {/* Noise */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          opacity-[0.035]

          [background-image:radial-gradient(#000_1px,transparent_1px)]

          [background-size:18px_18px]
        "
      />


      {/* Moving Shine */}

      <div
        className="
          pointer-events-none

          absolute

          -left-1/3

          top-0

          h-full

          w-40

          -skew-x-12

          bg-gradient-to-r

          from-transparent

          via-white/35

          to-transparent

          animate-shimmer
        "
      />


      <div
        className="
          relative
          z-10
          flex
          h-full
          w-full
          overflow-hidden
        "
      >

        {children}

      </div>


    </div>
  );
}