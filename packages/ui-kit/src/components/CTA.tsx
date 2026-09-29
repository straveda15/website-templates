"use client";

export interface CTAProps {
  eyebrow?: string;
  heading: string;
  headingItalic?: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
}

export default function CTA({
  eyebrow,
  heading,
  headingItalic,
  description,
  ctaLabel,
  ctaHref,
}: CTAProps) {
  return (
    <section className="border-t border-[#2B211B]/10 px-6 py-20 text-center sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[760px]">
        {eyebrow && (
          <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-[#C96A32]">{eyebrow}</p>
        )}

        <h2 className="font-serif text-[46px] leading-[1] tracking-[-0.04em] sm:text-[64px]">
          {heading}
          {headingItalic && (
            <>
              <br />
              <span className="italic">{headingItalic}</span>
            </>
          )}
        </h2>

        {description && (
          <p className="mx-auto mt-6 max-w-[520px] text-[14px] leading-6 text-[#2B211B]/65">
            {description}
          </p>
        )}

        <a
          href={ctaHref}
          className="mt-9 inline-flex items-center gap-5 border border-[#2B211B] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#2B211B] hover:text-white"
        >
          {ctaLabel}
          <span className="text-[15px]">→</span>
        </a>
      </div>
    </section>
  );
}
