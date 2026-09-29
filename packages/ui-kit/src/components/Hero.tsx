"use client";

import { useEffect, useState } from "react";

export interface HeroSlide {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  image: string;
}

export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroProps {
  slides: HeroSlide[];
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  collectionLabel?: string;
  autoRotateMs?: number;
}

export default function Hero({
  slides,
  primaryCta,
  secondaryCta,
  collectionLabel,
  autoRotateMs = 3000,
}: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, autoRotateMs);

    return () => clearInterval(interval);
  }, [slides.length, autoRotateMs]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const previousSlide = () =>
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative min-h-[610px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          key={slide.image}
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-white/5" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[610px] max-w-[1440px] items-center">
        <div className="w-full px-6 py-16 sm:px-10 lg:px-14 xl:px-20">
          <div className="max-w-[540px]">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C96A32]" />
              <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#6F5140] sm:text-[10px]">
                {slide.eyebrow}
              </p>
            </div>

            <h1 className="font-serif text-[40px] leading-[1.02] tracking-[-0.04em] text-[#2B211B] sm:text-[48px] lg:text-[56px] xl:text-[62px]">
              {slide.title}
              <br />
              <span className="italic text-[#C96A32]">{slide.titleAccent}</span>
            </h1>

            <p className="mt-5 max-w-[440px] text-[13px] leading-6 text-[#2B211B]/75 sm:text-[14px]">
              {slide.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <a
                href={primaryCta.href}
                className="group inline-flex items-center gap-3 bg-[#C96A32] px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white shadow-sm transition-all duration-300 hover:bg-[#B55A28]"
              >
                {primaryCta.label}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>

              <a
                href={secondaryCta.href}
                className="inline-flex items-center gap-3 border-b border-[#2B211B]/40 pb-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#2B211B] transition-all duration-300 hover:border-[#C96A32] hover:text-[#C96A32]"
              >
                {secondaryCta.label}
              </a>
            </div>

            <div className="mt-10 flex items-center gap-5">
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2B211B]/25 bg-white/30 text-[14px] text-[#2B211B] backdrop-blur-sm transition-all duration-300 hover:border-[#C96A32] hover:bg-[#C96A32] hover:text-white"
              >
                ←
              </button>

              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-[2px] transition-all duration-500 ${
                      index === activeSlide ? "w-9 bg-[#C96A32]" : "w-5 bg-[#2B211B]/30"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2B211B]/25 bg-white/30 text-[14px] text-[#2B211B] backdrop-blur-sm transition-all duration-300 hover:border-[#C96A32] hover:bg-[#C96A32] hover:text-white"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-7 top-7 z-20 flex items-center gap-3 text-white">
        <span className="text-[11px] font-medium tracking-[0.15em]">0{activeSlide + 1}</span>
        <span className="h-px w-8 bg-white/70" />
        <span className="text-[11px] tracking-[0.15em] text-white/70">0{slides.length}</span>
      </div>

      {collectionLabel && (
        <div className="absolute bottom-6 right-7 z-20 hidden border border-white/30 bg-[#2B211B]/20 px-5 py-3 backdrop-blur-sm sm:block">
          <p className="text-[9px] uppercase tracking-[0.25em] text-white">{collectionLabel}</p>
        </div>
      )}
    </section>
  );
}
