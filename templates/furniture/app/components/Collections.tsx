"use client";

import Link from "next/link";
import { CardGrid, type CardGridItem } from "@platform/ui-kit";
import { collections } from "../data/collections";

const collectionCards: CardGridItem[] = collections.map((collection) => ({
  title: collection.title,
  description: collection.description,
  image: collection.image,
  href: `/collections/${collection.slug}`,
}));

export default function Collections() {
  return (
    <main className="min-h-screen bg-[#F8F2E9] text-[#2B211B]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative h-[340px] overflow-hidden sm:h-[380px] lg:h-[340px]">
        <div className="absolute right-0 top-0 h-full w-full lg:w-[62%]">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90"
            alt="Luxury living room"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F2E9] via-[#F8F2E9]/95 via-[42%] to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-6 sm:px-10 lg:px-[52px]">
          <div className="w-full max-w-[560px]">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-[34px] bg-[#C96A32]" />
              <span className="text-[8px] font-medium uppercase tracking-[0.28em] text-[#806F63]">
                Our Collections
              </span>
            </div>

            <h1 className="font-serif text-[45px] leading-[0.92] tracking-[-0.045em] sm:text-[55px] lg:text-[57px]">
              Furniture made
              <br />
              <span className="italic text-[#C96A32]">for living beautifully.</span>
            </h1>

            <p className="mt-5 max-w-[420px] text-[12px] leading-[1.65] text-[#645A52] sm:text-[13px]">
              Explore our thoughtfully curated collections, designed to bring
              warmth, comfort and timeless style to your home.
            </p>

            <Link
              href="#featured-collections"
              className="mt-6 inline-flex h-[40px] items-center gap-3 bg-[#C96A32] px-5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#2B211B]"
            >
              Explore Collections
              <span className="text-[14px]">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED COLLECTIONS
      ========================================================= */}
      <section id="featured-collections" className="px-6 py-7 sm:px-8 lg:px-[40px] lg:py-7">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-[34px] bg-[#C96A32]" />
                <span className="text-[8px] font-medium uppercase tracking-[0.28em] text-[#806F63]">
                  Featured Collections
                </span>
              </div>

              <h2 className="font-serif text-[37px] leading-none tracking-[-0.045em] sm:text-[42px] lg:text-[43px]">
                Discover Our Collections
              </h2>
            </div>

            <p className="hidden max-w-[280px] pb-1 text-[11px] leading-[1.55] text-[#71665D] lg:block">
              From modern minimalism to timeless classics,
              <br />
              find the perfect pieces for every space in your home.
            </p>
          </div>

          <CardGrid items={collectionCards} variant="compact" exploreLabel="Explore Collection" />
        </div>
      </section>

      {/* =========================================================
          BOTTOM FEATURE
      ========================================================= */}
      <section className="px-6 pb-8 pt-2 sm:px-8 lg:px-[24px] lg:pb-9">
        <div className="mx-auto flex max-w-[1440px] overflow-hidden rounded-[14px] bg-[#E8DCCB] lg:h-[280px]">
          <div className="relative h-[270px] w-full lg:h-full lg:w-[66%]">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=90"
              alt="Beautiful timeless furniture"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex w-full items-center px-7 py-8 sm:px-10 lg:w-[34%] lg:px-10">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-[30px] bg-[#C96A32]" />
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#807166]">
                  Timeless Spaces
                </span>
              </div>

              <h2 className="font-serif text-[36px] leading-[0.94] tracking-[-0.04em]">
                Made to last.
                <br />
                <span className="italic text-[#C96A32]">Designed to belong.</span>
              </h2>

              <p className="mt-4 max-w-[300px] text-[11px] leading-[1.55] text-[#6E6259]">
                Premium furniture for modern homes, crafted with care and
                built for generations.
              </p>

              <Link
                href="/shop"
                className="mt-5 inline-flex h-[38px] items-center gap-3 bg-[#C96A32] px-5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#2B211B]"
              >
                Shop All Furniture
                <span className="text-[13px]">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
