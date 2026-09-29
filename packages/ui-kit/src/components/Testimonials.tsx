"use client";

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

export interface TestimonialsProps {
  items: Testimonial[];
  eyebrow?: string;
  heading?: string;
}

export default function Testimonials({ items, eyebrow, heading }: TestimonialsProps) {
  return (
    <section className="border-y border-[#2B211B]/10 bg-[#FBF7F0] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        {(eyebrow || heading) && (
          <div className="mb-12 text-center">
            {eyebrow && (
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-[#C96A32]" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7565]">{eyebrow}</span>
                <span className="h-px w-10 bg-[#C96A32]" />
              </div>
            )}
            {heading && (
              <h2 className="font-serif text-[40px] leading-none tracking-[-0.04em] sm:text-[52px]">
                {heading}
              </h2>
            )}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <blockquote
              key={item.author}
              className="border border-[#2B211B]/10 bg-white p-7 text-left"
            >
              <p className="font-serif text-[18px] leading-7 italic text-[#2B211B]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-5 text-[12px] uppercase tracking-[0.15em] text-[#8B7565]">
                {item.author}
                {item.role && <span className="text-[#2B211B]/40"> — {item.role}</span>}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
