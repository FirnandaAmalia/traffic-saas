"use client";

import { motion } from "framer-motion";

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}

export default function Stagger({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.1,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},

        show: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Child wrapper.
 *
 * Digunakan bersama <Stagger>.
 */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
          scale: 0.98,
        },

        show: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}