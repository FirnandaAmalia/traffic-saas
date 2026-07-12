"use client";

export default function Shimmer() {
  return (
    <div
      className="
        pointer-events-none

        absolute
        inset-0

        overflow-hidden

        rounded-[inherit]
      "
    >
      <div
        className="
          absolute

          -left-1/2
          top-0

          h-full
          w-1/3

          -skew-x-12

          bg-gradient-to-r

          from-transparent
          via-white/25
          to-transparent

          animate-shimmer
        "
      />
    </div>
  );
}