"use client";

import { motion } from "framer-motion";

const particles = Array.from(
  { length: 22 },
  (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 6,
    duration: 8 + Math.random() * 8,
  })
);

export default function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {particles.map((particle) => (

        <motion.span
          key={particle.id}
          className="
            absolute

            rounded-full

            bg-gradient-to-br

            from-violet-400/40
            to-sky-400/40

            blur-[1px]
          "
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            bottom: "-20px",
          }}
          animate={{
            y: [-20, -900],
            x: [0, 40, -30, 0],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
            duration: particle.duration,
          }}
        />

      ))}

    </div>
  );
}