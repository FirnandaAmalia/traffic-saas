"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

const bars = [
  28, 36, 42, 38,
  55, 62, 70, 85,
];

export default function FloatingGrowth() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -30,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className="
        absolute
        -left-12
        bottom-16
        z-20

        hidden

        xl:block
      "
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
        className="
          w-64

          rounded-3xl

          border
          border-white/60

          bg-white/90

          p-5

          shadow-[0_30px_80px_rgba(15,23,42,.15)]

          backdrop-blur-xl
        "
      >
        {/* Glow */}

        <div
          className="
            absolute
            -right-8
            -top-8

            h-28
            w-28

            rounded-full

            bg-emerald-500/10

            blur-3xl
          "
        />

        {/* Header */}

        <div className="relative flex items-center justify-between">

          <div
            className="
              flex
              h-12
              w-12

              items-center
              justify-center

              rounded-2xl

              bg-emerald-100
            "
          >

            <TrendingUp className="h-6 w-6 text-emerald-600" />

          </div>

          <div
            className="
              flex
              items-center
              gap-1

              rounded-full

              bg-emerald-100

              px-3
              py-1

              text-xs
              font-bold

              text-emerald-700
            "
          >

            <ArrowUpRight className="h-3.5 w-3.5" />

            +42%

          </div>

        </div>

        {/* Title */}

        <div className="relative mt-5">

          <p className="text-sm text-slate-500">

            Organic Growth

          </p>

          <h3 className="mt-1 text-4xl font-black text-slate-900">

            142%

          </h3>

          <p className="mt-1 text-xs text-slate-400">

            Compared to last month

          </p>

        </div>

        {/* Mini Chart */}

        <div className="mt-6 flex h-16 items-end gap-2">

          {bars.map((bar, index) => (

            <motion.div
              key={index}
              initial={{
                height: 0,
              }}
              whileInView={{
                height: `${bar}%`,
              }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
              }}
              className="
                flex-1

                rounded-full

                bg-gradient-to-t

                from-emerald-600
                to-lime-400

                shadow-[0_0_18px_rgba(16,185,129,.25)]
              "
            />

          ))}

        </div>

        {/* Footer */}

        <div
          className="
            mt-6

            flex
            items-center
            justify-between

            rounded-2xl

            bg-slate-50

            px-4
            py-3
          "
        >

          <span className="text-sm text-slate-500">

            Goal Progress

          </span>

          <span className="font-bold text-emerald-600">

            82%

          </span>

        </div>

      </motion.div>
    </motion.div>
  );
}