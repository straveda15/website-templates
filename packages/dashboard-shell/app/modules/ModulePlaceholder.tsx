"use client";

import type { LucideIcon } from "lucide-react";

export default function ModulePlaceholder({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
  return (
    <section className="flex min-h-[65vh] items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-[#eaded3] bg-[#fffaf5] p-10 text-center shadow-[0_8px_30px_rgba(74,49,30,.04)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0e1d4] text-[#9b5e2f]">
          <Icon size={25} />
        </div>

        <p className="mt-5 text-[9px] font-semibold uppercase tracking-[.2em] text-[#a8754e]">Coming Soon</p>

        <h1 className="mt-2 font-serif text-[30px] font-semibold">{title}</h1>

        <p className="mt-2 text-[11px] leading-6 text-[#877568]">
          This module isn&apos;t built yet. It&apos;s excluded from generated projects until it is.
        </p>
      </div>
    </section>
  );
}
