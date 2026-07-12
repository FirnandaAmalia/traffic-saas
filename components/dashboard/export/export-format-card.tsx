"use client";

import type { ReactNode } from "react";

import {
  Check,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface ExportFormatCardProps {
  title: string;

  description: string;

  icon: ReactNode;

  selected: boolean;

  recommended?: boolean;

  onClick: () => void;
}

export default function ExportFormatCard({
  title,
  description,
  icon,
  selected,
  recommended = false,
  onClick,
}: ExportFormatCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full cursor-pointer overflow-hidden rounded-2xl border p-5 text-left transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        selected
          ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
          : "border-slate-200 bg-white"
      )}
    >
      {recommended && (
        <div className="absolute right-4 top-4 inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          Recommended
        </div>
      )}

      <div className="flex items-start gap-4">
        <div
          className={cn(
            "rounded-xl p-3 transition-colors",
            selected
              ? "bg-blue-100"
              : "bg-slate-100 group-hover:bg-slate-200"
          )}
        >
          {icon}
        </div>

        <div className="flex-1 pr-24">
          <h3 className="text-base font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>

        {selected && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
            <Check className="h-4 w-4" />
          </div>
        )}
      </div>
    </button>
  );
}