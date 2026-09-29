"use client";

export interface ProductGridItem {
  name: string;
  price: string;
  image: string;
  href?: string;
  reviews?: string;
}

export interface ProductGridProps {
  items: ProductGridItem[];
  eyebrow?: string;
  heading?: string;
}

export default function ProductGrid({ items, eyebrow, heading }: ProductGridProps) {
  return (
    <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        {(eyebrow || heading) && (
          <div className="mb-10">
            {eyebrow && (
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C96A32]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7565]">{eyebrow}</span>
              </div>
            )}
            {heading && (
              <h2 className="font-serif text-[40px] leading-none tracking-[-0.04em] sm:text-[52px]">
                {heading}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <a key={item.name} href={item.href || "#"} className="group block">
              <div className="relative aspect-square overflow-hidden bg-[#EFE6D8]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>

              <div className="mt-4">
                <h3 className="text-[14px] font-medium text-[#2B211B]">{item.name}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[13px] text-[#C96A32]">{item.price}</span>
                  {item.reviews && (
                    <span className="text-[11px] text-[#2B211B]/50">{item.reviews} reviews</span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
