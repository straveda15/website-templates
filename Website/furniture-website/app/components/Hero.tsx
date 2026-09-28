"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "MODERN · TIMELESS · SUSTAINABLE",
    title: "Furniture",
    titleAccent: "That Feels Like Home",
    description:
      "Beautifully crafted furniture for modern living spaces. Design, comfort and quality — all in one place.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1800&q=90",
  },
  {
    eyebrow: "MODERN · TIMELESS · SUSTAINABLE",
    title: "Designed For",
    titleAccent: "Beautiful Living",
    description:
      "Discover refined furniture that blends contemporary design with lasting comfort and craftsmanship.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90",
  },
  {
    eyebrow: "CRAFTED WITH CARE",
    title: "Made To Last",
    titleAccent: "For Generations",
    description:
      "Premium materials, thoughtful details, and enduring designs made for the spaces you call home.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=90",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slide = slides[activeSlide];

  /* ================= AUTO SLIDER ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* ================= CONTROLS ================= */

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <section className="relative min-h-[610px] overflow-hidden">

      {/* =====================================================
          FULL HERO BACKGROUND IMAGE
      ====================================================== */}

      <div className="absolute inset-0 z-0">

        <img
          key={slide.image}
          src={slide.image}
          alt="Premium furniture interior"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
            transition-opacity
            duration-1000
          "
        />

        {/* Very light overlay - image remains clearly visible */}
        <div className="absolute inset-0 bg-white/5" />

      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[610px] max-w-[1440px] items-center">

        <div className="w-full px-6 py-16 sm:px-10 lg:px-14 xl:px-20">

          <div className="max-w-[540px]">

            {/* =================================================
                EYEBROW
            ================================================= */}

            <div className="mb-6 flex items-center gap-3">

              <span className="h-px w-10 bg-[#C96A32]" />

              <p
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.28em]
                  text-[#6F5140]
                  sm:text-[10px]
                "
              >
                {slide.eyebrow}
              </p>

            </div>

            {/* =================================================
                HEADING
            ================================================= */}

            <h1
              className="
                font-serif
                text-[40px]
                leading-[1.02]
                tracking-[-0.04em]
                text-[#2B211B]
                sm:text-[48px]
                lg:text-[56px]
                xl:text-[62px]
              "
            >
              {slide.title}

              <br />

              <span className="italic text-[#C96A32]">
                {slide.titleAccent}
              </span>
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-5
                max-w-[440px]
                text-[13px]
                leading-6
                text-[#2B211B]/75
                sm:text-[14px]
              "
            >
              {slide.description}
            </p>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="mt-7 flex flex-wrap items-center gap-5">

              {/* SHOP NOW */}

              <a
                href="#products"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  bg-[#C96A32]
                  px-6
                  py-3.5
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:bg-[#B55A28]
                "
              >
                Shop Now

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              {/* EXPLORE COLLECTION */}

              <a
                href="#collections"
                className="
                  inline-flex
                  items-center
                  gap-3
                  border-b
                  border-[#2B211B]/40
                  pb-1
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-[#2B211B]
                  transition-all
                  duration-300
                  hover:border-[#C96A32]
                  hover:text-[#C96A32]
                "
              >
                Explore Collection
              </a>

            </div>

            {/* =================================================
                SLIDER CONTROLS
            ================================================= */}

            <div className="mt-10 flex items-center gap-5">

              {/* PREVIOUS */}

              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous slide"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#2B211B]/25
                  bg-white/30
                  text-[14px]
                  text-[#2B211B]
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-[#C96A32]
                  hover:bg-[#C96A32]
                  hover:text-white
                "
              >
                ←
              </button>

              {/* SLIDE INDICATORS */}

              <div className="flex items-center gap-2">

                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`
                      h-[2px]
                      transition-all
                      duration-500
                      ${
                        index === activeSlide
                          ? "w-9 bg-[#C96A32]"
                          : "w-5 bg-[#2B211B]/30"
                      }
                    `}
                  />
                ))}

              </div>

              {/* NEXT */}

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#2B211B]/25
                  bg-white/30
                  text-[14px]
                  text-[#2B211B]
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-[#C96A32]
                  hover:bg-[#C96A32]
                  hover:text-white
                "
              >
                →
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          SLIDE NUMBER
      ====================================================== */}

      <div
        className="
          absolute
          right-7
          top-7
          z-20
          flex
          items-center
          gap-3
          text-white
        "
      >
        <span className="text-[11px] font-medium tracking-[0.15em]">
          0{activeSlide + 1}
        </span>

        <span className="h-px w-8 bg-white/70" />

        <span className="text-[11px] tracking-[0.15em] text-white/70">
          0{slides.length}
        </span>
      </div>

      {/* =====================================================
          COLLECTION LABEL
      ====================================================== */}

      <div
        className="
          absolute
          bottom-6
          right-7
          z-20
          hidden
          border
          border-white/30
          bg-[#2B211B]/20
          px-5
          py-3
          backdrop-blur-sm
          sm:block
        "
      >
        <p className="text-[9px] uppercase tracking-[0.25em] text-white">
          Maison Collection
        </p>
      </div>

    </section>
  );
}