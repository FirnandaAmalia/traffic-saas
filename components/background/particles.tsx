"use client";

import { motion } from "framer-motion";

interface Particle {
  id: number;
  size: number;
  left: string;
  delay: number;
  duration: number;
}

/*
|--------------------------------------------------------------------------
| Deterministic Random
|--------------------------------------------------------------------------
|
| Menghasilkan nilai yang terlihat acak tetapi selalu sama untuk seed
| yang sama. Dengan begitu SSR dan browser menghasilkan style identik.
|
*/

function seededRandom(
  seed: number
): number {
  const value =
    Math.sin(seed * 12.9898) *
    43758.5453;

  return (
    value -
    Math.floor(value)
  );
}

function createParticle(
  index: number
): Particle {
  return {
    id: index,

    size:
      seededRandom(
        index * 4 + 1
      ) *
        6 +
      2,

    left: `${
      seededRandom(
        index * 4 + 2
      ) * 100
    }%`,

    delay:
      seededRandom(
        index * 4 + 3
      ) * 6,

    duration:
      8 +
      seededRandom(
        index * 4 + 4
      ) *
        8,
  };
}

const particles: Particle[] =
  Array.from(
    {
      length: 22,
    },
    (_, index) =>
      createParticle(index)
  );

export default function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map(
        (particle) => (
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
              width:
                particle.size,

              height:
                particle.size,

              left:
                particle.left,

              bottom:
                "-20px",
            }}
            animate={{
              y: [
                -20,
                -900,
              ],

              x: [
                0,
                40,
                -30,
                0,
              ],

              opacity: [
                0,
                1,
                1,
                0,
              ],

              scale: [
                0.5,
                1,
                1,
                0.5,
              ],
            }}
            transition={{
              repeat:
                Infinity,

              ease:
                "linear",

              delay:
                particle.delay,

              duration:
                particle.duration,
            }}
          />
        )
      )}
    </div>
  );
}