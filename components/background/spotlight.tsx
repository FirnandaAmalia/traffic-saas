"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  useEffect,
} from "react";

export default function Spotlight() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="
        pointer-events-none

        fixed
        inset-0

        z-0
      "
      style={{
        background: useMotionTemplate`
          radial-gradient(
            650px circle at ${mouseX}px ${mouseY}px,
            rgba(124,58,237,.14),
            rgba(56,189,248,.08),
            transparent 70%
          )
        `,
      }}
    />
  );
}