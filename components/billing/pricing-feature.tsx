import {
  Check,
  Lock,
} from "lucide-react";

interface Props {
  children: React.ReactNode;
  available: boolean;
}

export default function PricingFeature({
  children,
  available,
}: Props) {
  return (
    <div className="flex items-center gap-3">

      {available ? (
        <Check className="h-5 w-5 text-emerald-600" />
      ) : (
        <Lock className="h-4 w-4 text-slate-400" />
      )}

      <span
        className={
          available
            ? ""
            : "text-slate-400"
        }
      >
        {children}
      </span>

    </div>
  );
}