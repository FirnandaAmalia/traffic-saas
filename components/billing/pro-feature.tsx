"use client";

import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";

interface ProFeatureProps {
  locked: boolean;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function ProFeature({
  locked,
  title = "Pro Feature",
  description = "Upgrade to Pro to unlock this feature.",
  children,
}: ProFeatureProps) {
  if (!locked) {
    return <>{children}</>;
  }

  return (
    <div className="relative">

      {/* Content */}

      <div className="pointer-events-none select-none blur-[4px] opacity-40">

        {children}

      </div>

      {/* Overlay */}

      <div className="absolute inset-0 flex items-center justify-center rounded-2xl">

        <div className="w-[330px] rounded-2xl border border-slate-200 bg-white/95 p-6 text-center shadow-xl backdrop-blur-xl">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">

            <Lock className="h-7 w-7 text-blue-600" />

          </div>

          <h3 className="text-lg font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {description}
          </p>

          <Link
            href="/billing"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Sparkles className="h-4 w-4" />
            Upgrade to Pro
          </Link>

        </div>

      </div>

    </div>
  );
}