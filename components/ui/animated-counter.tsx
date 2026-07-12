"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1200,
  decimals = 0,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;

    started.current = true;

    let start = 0;
    let frame = 0;

    const totalFrames = Math.round(duration / 16);

    const animate = () => {
      frame++;

      const progress = frame / totalFrames;

      const ease =
        1 - Math.pow(1 - progress, 3);

      const current =
        start + (value - start) * ease;

      setCount(current);

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [duration, value]);

  return (
    <>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </>
  );
}