"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FloatingProps {
  children: ReactNode;
  className?: string;

  /**
   * Jarak naik turun (px)
   */
  y?: number;

  /**
   * Lama animasi (detik)
   */
  duration?: number;

  /**
   * Delay awal
   */
  delay?: number;

  /**
   * Rotasi kecil
   */
  rotate?: number;
}

export default function Floating({
  children,
  className,

  y = 12,
  duration = 5,
  delay = 0,
  rotate = 0,
}: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -y, 0],
        rotate: [0, rotate, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}