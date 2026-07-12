"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface AuroraProps {
  className?: string;
}

export default function Aurora({
  className,
}: AuroraProps) {
  return (
    <div
      className={clsx(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {/* Violet */}

      <motion.div
        className="
          absolute

          -left-48
          -top-48

          h-[620px]
          w-[620px]

          rounded-full

          bg-violet-500/20

          blur-[140px]
        "
        animate={{
          x: [0, 80, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Sky */}

      <motion.div
        className="
          absolute

          right-[-220px]
          top-20

          h-[560px]
          w-[560px]

          rounded-full

          bg-sky-500/20

          blur-[140px]
        "
        animate={{
          x: [0, -70, 0],
          y: [0, 40, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan */}

      <motion.div
        className="
          absolute

          bottom-[-180px]
          left-1/2

          h-[520px]
          w-[520px]

          -translate-x-1/2

          rounded-full

          bg-cyan-400/15

          blur-[140px]
        "
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}