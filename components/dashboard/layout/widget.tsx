import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WidgetProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Widget({
  title,
  subtitle,
  badge,
  children,
  className,
}: WidgetProps) {
  return (
    <section
      className={cn(
        "flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
        className
      )}
    >
      <header className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">

        <div>

          <h3 className="text-sm font-semibold text-slate-900">
            {title}
          </h3>

          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

        {badge}

      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {children}
      </div>

    </section>
  );
}