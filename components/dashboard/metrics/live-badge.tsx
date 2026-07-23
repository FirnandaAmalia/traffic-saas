export default function LiveBadge() {
  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        bg-emerald-50
        px-2
        py-1
        text-[10px]
        font-semibold
        uppercase
        tracking-wide
        text-emerald-700
      "
    >
      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Aktif
    </span>
  );
}