"use client";

import Link from "next/link";

export interface CardGridItem {
  number?: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface CardGridProps {
  items: CardGridItem[];
  variant?: "spacious" | "compact";
  exploreLabel?: string;
}

// "spacious": large image + numbered badge + footer link (category-style listing).
// "compact": smaller image + inline circle arrow (collection-style listing).
export default function CardGrid({
  items,
  variant = "spacious",
  exploreLabel = "Explore",
}: CardGridProps) {
  if (variant === "compact") {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.title} href={item.href} className="group">
            <article className="overflow-hidden rounded-[8px] border border-[#2B211B]/10 bg-[#FBF7F1] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(43,33,27,0.08)]">
              <div className="relative h-[205px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
              </div>

              <div className="min-h-[132px] px-4 py-4">
                <div className="flex h-full items-end justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-[26px] leading-none tracking-[-0.025em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[235px] text-[11px] leading-[1.5] text-[#716860]">
                      {item.description}
                    </p>
                    <div className="mt-3 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#C96A32]">
                      {exploreLabel}
                      <span className="ml-1">→</span>
                    </div>
                  </div>

                  <span className="mb-[1px] flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-[#C96A32]/50 text-[14px] text-[#4B4038] transition-all duration-300 group-hover:bg-[#C96A32] group-hover:text-white">
                    →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1440px] gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link key={item.title} href={item.href} className="group block">
          <article className="overflow-hidden border border-[#2B211B]/10 bg-[#FBF7F0] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(43,33,27,0.10)]">
            <div className="relative h-[310px] overflow-hidden sm:h-[340px]">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />

              {item.number && (
                <div className="absolute left-5 top-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/10 text-[9px] tracking-[0.15em] text-white backdrop-blur-sm">
                    {item.number}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="font-serif text-[30px] leading-none tracking-[-0.02em] sm:text-[34px]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[290px] text-[12px] leading-5 text-[#2B211B]/60">
                    {item.description}
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C96A32]/40 text-[#2B211B] transition-all duration-300 group-hover:border-[#C96A32] group-hover:bg-[#C96A32] group-hover:text-white">
                  <span className="text-[17px] transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>

              <div className="mt-7 border-t border-[#2B211B]/10 pt-4">
                <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#C96A32]">
                  {exploreLabel} →
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
