"use client";

import Link from "next/link";
import { CardGrid } from "@platform/ui-kit";
import { categories } from "../data/categories";

export default function Categories() {
  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#2B211B]">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="px-6 pb-16 pt-4 sm:px-10 lg:px-16 lg:pb-20 lg:pt-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* LEFT */}
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-12 bg-[#C96A32]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#8B7565]">
                  The Maison Edit
                </span>
              </div>

              <h1 className="font-serif text-[58px] leading-[0.9] tracking-[-0.05em] sm:text-[78px] lg:text-[105px]">
                Everything
                <br />
                <span className="italic text-[#C96A32]">has its place.</span>
              </h1>

              <p className="mt-8 max-w-[600px] text-[14px] leading-7 text-[#2B211B]/65 sm:text-[15px]">
                Discover furniture and objects curated by purpose, material
                and character. Find the pieces that give every room its own
                identity.
              </p>

              <div className="mt-9 flex items-center gap-7">
                <Link
                  href="#categories"
                  className="inline-flex items-center gap-5 bg-[#C96A32] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#2B211B]"
                >
                  Explore Categories
                  <span className="text-[16px]">→</span>
                </Link>

                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7565]">
                  {String(categories.length).padStart(2, "0")} Categories
                </span>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="relative h-[350px] overflow-hidden sm:h-[450px] lg:h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1400&q=90"
                alt="Maison furniture interior"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8">
                <p className="mb-3 text-[9px] uppercase tracking-[0.3em] text-white/60">
                  Curated Living
                </p>

                <h2 className="font-serif text-[32px] italic text-white sm:text-[40px]">
                  Objects with purpose.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORY INTRO
      ===================================================== */}
      <section
        id="categories"
        className="border-y border-[#2B211B]/10 px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-[#C96A32]" />

              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B7565]">
                Shop by Category
              </span>
            </div>

            <h2 className="font-serif text-[44px] leading-none tracking-[-0.04em] sm:text-[60px]">
              Find your
              <span className="italic text-[#C96A32]"> piece.</span>
            </h2>
          </div>

          <p className="max-w-[430px] text-[13px] leading-6 text-[#2B211B]/60">
            From statement furniture to the smallest finishing details,
            explore everything designed to make your home feel like yours.
          </p>
        </div>
      </section>

      {/* =====================================================
          CATEGORY GRID
      ===================================================== */}
      <section className="px-6 py-12 sm:px-10 lg:px-16 lg:py-20">
        <CardGrid items={categories} variant="spacious" exploreLabel="Explore Category" />
      </section>

      {/* =====================================================
          FEATURED STATEMENT
      ===================================================== */}
      <section className="px-6 pb-20 sm:px-10 lg:px-16 lg:pb-28">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[18px] bg-[#E8D9C7] lg:grid-cols-2">
          {/* IMAGE */}
          <div className="relative h-[400px] lg:h-[520px]">
            <img
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=90"
              alt="Timeless furniture"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          </div>

          {/* TEXT */}
          <div className="flex items-center px-8 py-14 sm:px-12 lg:px-16">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-10 bg-[#C96A32]" />

                <span className="text-[9px] uppercase tracking-[0.3em] text-[#8B7565]">
                  Timeless Spaces
                </span>
              </div>

              <h2 className="font-serif text-[46px] leading-[0.95] tracking-[-0.04em] sm:text-[60px]">
                Made to last.
                <br />
                <span className="italic text-[#C96A32]">Designed to belong.</span>
              </h2>

              <p className="mt-7 max-w-[440px] text-[13px] leading-6 text-[#2B211B]/65">
                Premium furniture for modern homes, crafted with care and
                designed to become part of your story for years to come.
              </p>

              <Link
                href="/collections"
                className="mt-8 inline-flex items-center gap-5 bg-[#C96A32] px-7 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#2B211B]"
              >
                Explore Collections
                <span className="text-[15px]">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <section className="border-t border-[#2B211B]/10 px-6 py-20 text-center sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[760px]">
          <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-[#C96A32]">
            The Maison Collection
          </p>

          <h2 className="font-serif text-[46px] leading-[1] tracking-[-0.04em] sm:text-[64px]">
            Pieces that make
            <br />
            <span className="italic">a space feel yours.</span>
          </h2>

          <Link
            href="/collections"
            className="mt-9 inline-flex items-center gap-5 border border-[#2B211B] px-8 py-4 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#2B211B] hover:text-white"
          >
            View All Collections
            <span className="text-[15px]">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
