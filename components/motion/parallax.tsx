"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useRef,
  type ReactNode,
} from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
}

export default function Parallax({
  children,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);

  const springRotateX = useSpring(rotateX, {
    stiffness: 140,
    damping: 20,
  });

  const springRotateY = useSpring(rotateY, {
    stiffness: 140,
    damping: 20,
  });

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return;

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}