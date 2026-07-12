"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import type { ReactNode } from "react";

interface TiltProps {
  children: ReactNode;
  className?: string;
}

export default function Tilt({
  children,
  className,
}: TiltProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-150, 150], [8, -8]),
    {
      stiffness: 140,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(x, [-150, 150], [-8, 8]),
    {
      stiffness: 140,
      damping: 20,
    }
  );

  function handleMove(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect =
      e.currentTarget.getBoundingClientRect();

    x.set(
      e.clientX - rect.left - rect.width / 2
    );

    y.set(
      e.clientY - rect.top - rect.height / 2
    );
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}