"use client";

import { useState } from "react";
import { products } from "./data/products";

const categories = [
  {
    name: "Sofas",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Dining Tables",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Beds",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Chairs",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Storage",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Outdoor",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Decor",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=85",
  },
];

const tabs = ["All", "Sofas", "Beds", "Dining", "Chairs"];

function ArrowRight() {
  return <span className="text-[17px]">→</span>;
}

function CartIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M20.8 8.6c0 5.5-8.8 10.4-8.8 10.4S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z" />
    </svg>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((product) => {
          if (activeTab === "Sofas")
            return product.name.toLowerCase().includes("sofa");

          if (activeTab === "Beds")
            return product.name.toLowerCase().includes("bed");

          if (activeTab === "Dining")
            return product.name.toLowerCase().includes("dining");

          if (activeTab === "Chairs")
            return product.name.toLowerCase().includes("chair");

          return true;
        });

  return (
    <main className="bg-[#F8F1E8] text-[#2B211B]">

      {/* =========================================================
          BENEFITS STRIP
      ========================================================= */}

      <section className="border-y border-[#2B211B]/10 bg-[#F5EBDD]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">

          {/* Free Delivery */}
          <div className="flex items-center justify-center gap-4 border-b border-[#2B211B]/10 px-4 py-5 lg:border-b-0 lg:border-r">
            <div className="text-[#A95D2C]">
              <svg
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <path d="M3 6h11v11H3z" />
                <path d="M14 10h4l3 3v4h-7z" />
                <circle cx="7" cy="19" r="2" />
                <circle cx="18" cy="19" r="2" />
              </svg>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold">
                Free Delivery
              </h4>
              <p className="mt-0.5 text-[9px] text-[#2B211B]/55">
                On Orders Above ₹10,000
              </p>
            </div>
          </div>

          {/* Premium Quality */}
          <div className="flex items-center justify-center gap-4 border-b border-[#2B211B]/10 px-4 py-5 lg:border-b-0 lg:border-r">
            <div className="text-[#A95D2C]">
              <svg
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
                <path d="m8.5 12 2.2 2.2 4.8-5" />
              </svg>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold">
                Premium Quality
              </h4>
              <p className="mt-0.5 text-[9px] text-[#2B211B]/55">
                Crafted To Last
              </p>
            </div>
          </div>

          {/* Easy Returns */}
          <div className="flex items-center justify-center gap-4 border-b border-[#2B211B]/10 px-4 py-5 lg:border-b-0 lg:border-r">
            <div className="text-[#A95D2C]">
              <svg
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <circle cx="12" cy="12" r="8" />
                <path d="M9 12h6M12 9v6" />
              </svg>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold">
                Easy Returns
              </h4>
              <p className="mt-0.5 text-[9px] text-[#2B211B]/55">
                Hassle Free
              </p>
            </div>
          </div>

          {/* Support */}
          <div className="flex items-center justify-center gap-4 px-4 py-5">
            <div className="text-[#A95D2C]">
              <svg
                width="27"
                height="27"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <path d="M4 13a8 8 0 0 1 16 0" />
                <path d="M4 13v4a2 2 0 0 0 2 2h2v-6H4ZM20 13v4a2 2 0 0 1-2 2h-2v-6h4Z" />
                <path d="M16 19c0 1.2-1.8 2-4 2" />
              </svg>
            </div>

            <div>
              <h4 className="text-[12px] font-semibold">
                24/7 Support
              </h4>
              <p className="mt-0.5 text-[9px] text-[#2B211B]/55">
                We're Always Here
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SHOP BY CATEGORY
      ========================================================= */}

      <section
        id="categories"
        className="px-6 py-12 sm:px-8 lg:px-14"
      >
        <div className="mx-auto max-w-[1320px]">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-[27px] tracking-[-0.03em] sm:text-[31px]">
              Shop by Category
            </h2>

            <a
              href="#products"
              className="hidden items-center gap-2 text-[11px] font-medium sm:flex"
            >
              View All Categories
              <ArrowRight />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-7">
  {categories.map((category, index) => (
    <div
      key={category.name}
      className="group flex flex-col items-center text-center"
    >
      {/* Circle */}
      <div className="relative h-[125px] w-[125px] overflow-hidden rounded-full bg-[#E8DED0] sm:h-[135px] sm:w-[135px] lg:h-[145px] lg:w-[145px]">
        <img
          src={category.image}
          alt={category.name}
          className={`absolute inset-0 h-full w-full scale-[1.02] object-cover transition-transform duration-500 group-hover:scale-[1.06] ${
            index === 0
              ? "object-center"
              : index === 1
              ? "object-[center_55%]"
              : index === 2
              ? "object-[center_45%]"
              : index === 3
              ? "object-[center_60%]"
              : index === 4
              ? "object-[center_50%]"
              : index === 5
              ? "object-[center_48%]"
              : "object-center"
          }`}
        />
      </div>

      {/* Category Name */}
      <p className="mt-4 text-[13px] font-medium text-[#2B211B] sm:text-[14px]">
        {category.name}
      </p>
    </div>
  ))}
</div>
        </div>
      </section>


      {/* =========================================================
    FEATURED COLLECTION
========================================================= */}

<section className="bg-[#F8F1E7] px-6 py-14 sm:px-8 lg:px-14 xl:px-16">
  <div className="mx-auto max-w-[1400px]">

    {/* ================= HEADER ================= */}
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

      {/* Heading */}
      <div>
        <h2 className="font-serif text-[32px] leading-tight tracking-[-0.03em] text-[#2B211B] sm:text-[38px]">
          Featured Collection
        </h2>

        <p className="mt-2 text-[13px] text-[#6F6258] sm:text-[14px]">
          Handpicked designs for every corner of your home.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap pb-1">
        <button
          type="button"
          className="relative pb-2 text-[12px] font-medium text-[#2B211B]"
        >
          All
          <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[#C96A32]" />
        </button>

        <button
          type="button"
          className="pb-2 text-[12px] text-[#6F6258] transition-colors hover:text-[#C96A32]"
        >
          Sofas
        </button>

        <button
          type="button"
          className="pb-2 text-[12px] text-[#6F6258] transition-colors hover:text-[#C96A32]"
        >
          Beds
        </button>

        <button
          type="button"
          className="pb-2 text-[12px] text-[#6F6258] transition-colors hover:text-[#C96A32]"
        >
          Dining
        </button>

        <button
          type="button"
          className="pb-2 text-[12px] text-[#6F6258] transition-colors hover:text-[#C96A32]"
        >
          Chairs
        </button>

        <a
          href="#collections"
          className="ml-3 hidden text-[12px] font-medium text-[#2B211B] transition-colors hover:text-[#C96A32] sm:block"
        >
          View All →
        </a>
      </div>
    </div>

    {/* ================= PRODUCTS GRID ================= */}
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">

      {/* ================= PRODUCT 1 ================= */}
      <div className="group">

        <div className="relative aspect-[1.15/1] overflow-hidden rounded-[7px] bg-[#E9DED0]">

          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85"
            alt="Luxe Modern Sofa"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Heart */}
          <button
            type="button"
            aria-label="Add Luxe Modern Sofa to wishlist"
            className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#F8F1E7]/95 text-[#C96A32] shadow-sm transition-transform duration-300 hover:scale-110"
          >
            ♡
          </button>
        </div>

        <div className="pt-3">
          <h3 className="text-[12px] font-medium text-[#2B211B] sm:text-[13px]">
            Luxe Modern Sofa
          </h3>

          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="text-[13px] font-medium text-[#2B211B]">
              ₹ 46,999
            </p>

            <button
              type="button"
              aria-label="Add Luxe Modern Sofa to cart"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[#B95F29] text-white transition-colors duration-300 hover:bg-[#2B211B]"
            >
              🛍
            </button>
          </div>

          <div className="mt-1 flex items-center gap-1">
            <span className="text-[11px] tracking-[-1px] text-[#B95F29]">
              ★★★★★
            </span>
            <span className="text-[10px] text-[#8A7A6C]">
              (24)
            </span>
          </div>
        </div>
      </div>

      {/* ================= PRODUCT 2 ================= */}
      <div className="group">

        <div className="relative aspect-[1.15/1] overflow-hidden rounded-[7px] bg-[#E9DED0]">

          <img
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85"
            alt="Solid Wood Dining Set"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <button
            type="button"
            aria-label="Add Solid Wood Dining Set to wishlist"
            className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#F8F1E7]/95 text-[#C96A32] shadow-sm transition-transform duration-300 hover:scale-110"
          >
            ♡
          </button>
        </div>

        <div className="pt-3">
          <h3 className="text-[12px] font-medium text-[#2B211B] sm:text-[13px]">
            Solid Wood Dining Set
          </h3>

          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="text-[13px] font-medium text-[#2B211B]">
              ₹ 32,999
            </p>

            <button
              type="button"
              aria-label="Add Solid Wood Dining Set to cart"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[#B95F29] text-white transition-colors duration-300 hover:bg-[#2B211B]"
            >
              🛍
            </button>
          </div>

          <div className="mt-1 flex items-center gap-1">
            <span className="text-[11px] tracking-[-1px] text-[#B95F29]">
              ★★★★★
            </span>
            <span className="text-[10px] text-[#8A7A6C]">
              (18)
            </span>
          </div>
        </div>
      </div>

      {/* ================= PRODUCT 3 ================= */}
      <div className="group">

        <div className="relative aspect-[1.15/1] overflow-hidden rounded-[7px] bg-[#E9DED0]">

          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85"
            alt="Minimal Wooden Bed"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <button
            type="button"
            aria-label="Add Minimal Wooden Bed to wishlist"
            className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#F8F1E7]/95 text-[#C96A32] shadow-sm transition-transform duration-300 hover:scale-110"
          >
            ♡
          </button>
        </div>

        <div className="pt-3">
          <h3 className="text-[12px] font-medium text-[#2B211B] sm:text-[13px]">
            Minimal Wooden Bed
          </h3>

          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="text-[13px] font-medium text-[#2B211B]">
              ₹ 41,999
            </p>

            <button
              type="button"
              aria-label="Add Minimal Wooden Bed to cart"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[#B95F29] text-white transition-colors duration-300 hover:bg-[#2B211B]"
            >
              🛍
            </button>
          </div>

          <div className="mt-1 flex items-center gap-1">
            <span className="text-[11px] tracking-[-1px] text-[#B95F29]">
              ★★★★★
            </span>
            <span className="text-[10px] text-[#8A7A6C]">
              (31)
            </span>
          </div>
        </div>
      </div>

      {/* ================= PRODUCT 4 ================= */}
      <div className="group">

        <div className="relative aspect-[1.15/1] overflow-hidden rounded-[7px] bg-[#E9DED0]">

          <img
            src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=85"
            alt="Comfort Lounge Chair"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <button
            type="button"
            aria-label="Add Comfort Lounge Chair to wishlist"
            className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#F8F1E7]/95 text-[#C96A32] shadow-sm transition-transform duration-300 hover:scale-110"
          >
            ♡
          </button>
        </div>

        <div className="pt-3">
          <h3 className="text-[12px] font-medium text-[#2B211B] sm:text-[13px]">
            Comfort Lounge Chair
          </h3>

          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="text-[13px] font-medium text-[#2B211B]">
              ₹ 18,999
            </p>

            <button
              type="button"
              aria-label="Add Comfort Lounge Chair to cart"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[#B95F29] text-white transition-colors duration-300 hover:bg-[#2B211B]"
            >
              🛍
            </button>
          </div>

          <div className="mt-1 flex items-center gap-1">
            <span className="text-[11px] tracking-[-1px] text-[#B95F29]">
              ★★★★★
            </span>
            <span className="text-[10px] text-[#8A7A6C]">
              (27)
            </span>
          </div>
        </div>
      </div>

      {/* ================= PRODUCT 5 ================= */}
      <div className="group">

        <div className="relative aspect-[1.15/1] overflow-hidden rounded-[7px] bg-[#E9DED0]">

          <img
            src="https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=900&q=85"
            alt="Walnut Sideboard"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <button
            type="button"
            aria-label="Add Walnut Sideboard to wishlist"
            className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#F8F1E7]/95 text-[#C96A32] shadow-sm transition-transform duration-300 hover:scale-110"
          >
            ♡
          </button>
        </div>

        <div className="pt-3">
          <h3 className="text-[12px] font-medium text-[#2B211B] sm:text-[13px]">
            Walnut Sideboard
          </h3>

          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="text-[13px] font-medium text-[#2B211B]">
              ₹ 28,999
            </p>

            <button
              type="button"
              aria-label="Add Walnut Sideboard to cart"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[#B95F29] text-white transition-colors duration-300 hover:bg-[#2B211B]"
            >
              🛍
            </button>
          </div>

          <div className="mt-1 flex items-center gap-1">
            <span className="text-[11px] tracking-[-1px] text-[#B95F29]">
              ★★★★★
            </span>
            <span className="text-[10px] text-[#8A7A6C]">
              (12)
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* =========================================================
    COLLECTION SHOWCASE
========================================================= */}

<section className="bg-[#F7F1E8] px-5 py-10 sm:px-8 lg:px-12 xl:px-16">
  <div className="mx-auto max-w-[1440px]">

    {/* ================= MODERN LIVING BANNER ================= */}

    <div className="group relative min-h-[360px] overflow-hidden rounded-[10px] sm:min-h-[390px] lg:min-h-[420px]">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=85"
        alt="Modern living collection"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2B211B]/75 via-[#2B211B]/35 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[360px] items-center px-7 py-12 sm:px-10 lg:min-h-[420px] lg:px-14">

        <div className="max-w-[430px]">

          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-[#E8B083]">
            New Collection
          </p>

          <h2 className="font-serif text-[38px] leading-[1.02] tracking-[-0.035em] text-white sm:text-[46px] lg:text-[52px]">
            Modern Living
            <br />
            <span className="italic text-[#E8B083]">
              Made Beautiful
            </span>
          </h2>

          <p className="mt-5 max-w-[340px] text-[13px] leading-6 text-white/80">
            Thoughtfully designed furniture that brings warmth,
            comfort and timeless character to your home.
          </p>

          <a
            href="#products"
            className="mt-7 inline-flex items-center gap-4 bg-[#C96A32] px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#A95123]"
          >
            Explore Collection
            <span className="text-[16px]">→</span>
          </a>

        </div>
      </div>

      {/* Right Features */}
      <div className="absolute bottom-7 right-7 z-10 hidden flex-col gap-5 sm:flex lg:right-10 lg:bottom-10">

        <div className="flex items-center gap-4 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-[13px]">
            ✧
          </span>

          <div>
            <p className="text-[12px] font-medium">
              Premium Materials
            </p>
            <p className="mt-0.5 text-[10px] text-white/65">
              Selected with care
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-[13px]">
            ◇
          </span>

          <div>
            <p className="text-[12px] font-medium">
              Thoughtful Design
            </p>
            <p className="mt-0.5 text-[10px] text-white/65">
              Made for modern homes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-[13px]">
            ✓
          </span>

          <div>
            <p className="text-[12px] font-medium">
              Built To Last
            </p>
            <p className="mt-0.5 text-[10px] text-white/65">
              Crafted for generations
            </p>
          </div>
        </div>

      </div>
    </div>


    {/* ================= TWO COLLECTION CARDS ================= */}

    <div className="mt-4 grid gap-4 md:grid-cols-2">

      {/* Dining */}

      <div className="group relative min-h-[250px] overflow-hidden rounded-[10px]">

        <img
          src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85"
          alt="Dining collection"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B211B]/70 via-[#2B211B]/30 to-transparent" />

        <div className="relative z-10 flex min-h-[250px] items-center px-7 py-8 sm:px-9">

          <div>

            <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.25em] text-white/70">
              Dining
            </p>

            <h3 className="font-serif text-[30px] leading-tight text-white sm:text-[34px]">
              Dining Collection
            </h3>

            <p className="mt-2 max-w-[250px] text-[12px] leading-5 text-white/75">
              Gather. Share. Create memories.
            </p>

            <a
              href="#products"
              className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:text-[#E8B083]"
            >
              Shop Dining
              <span>→</span>
            </a>

          </div>

        </div>
      </div>


      {/* Bedroom */}

      <div className="group relative min-h-[250px] overflow-hidden rounded-[10px]">

        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85"
          alt="Bedroom collection"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B211B]/70 via-[#2B211B]/25 to-transparent" />

        <div className="relative z-10 flex min-h-[250px] items-center px-7 py-8 sm:px-9">

          <div>

            <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.25em] text-white/70">
              Bedroom
            </p>

            <h3 className="font-serif text-[30px] leading-tight text-white sm:text-[34px]">
              Bedroom Collection
            </h3>

            <p className="mt-2 max-w-[250px] text-[12px] leading-5 text-white/75">
              Comfort redefined for everyday living.
            </p>

            <a
              href="#products"
              className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:text-[#E8B083]"
            >
              Shop Beds
              <span>→</span>
            </a>

          </div>

        </div>
      </div>

    </div>

  </div>
</section>

{/* =========================================================
    EXPLORE MODULAR THEMES
========================================================= */}

<section className="bg-[#F8F1E8] px-6 py-16 sm:px-8 lg:px-14 xl:px-16">
  <div className="mx-auto max-w-[1320px]">

    {/* ================= HEADER ================= */}
    <div className="mb-8 flex items-center justify-between">
      <h2 className="font-serif text-[32px] leading-tight tracking-[-0.03em] text-[#2B211B] sm:text-[38px]">
        Explore Modular Themes
      </h2>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous themes"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2B211B]/20 text-[20px] text-[#2B211B] transition-all duration-300 hover:border-[#C96A32] hover:bg-[#C96A32] hover:text-white"
        >
          ←
        </button>

        <button
          type="button"
          aria-label="Next themes"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2B211B]/10 text-[20px] text-[#2B211B]/40 transition-all duration-300 hover:border-[#C96A32] hover:bg-[#C96A32] hover:text-white"
        >
          →
        </button>
      </div>
    </div>

    {/* ================= THEME CARDS ================= */}
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">

      {/* PURE */}
      <div className="group relative h-[300px] overflow-hidden rounded-[18px] border border-[#2B211B]/10">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=85"
          alt="Pure"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
          <p className="font-serif text-[18px] text-white">
            Pure
          </p>
        </div>
      </div>

      {/* VIVID */}
      <div className="group relative h-[300px] overflow-hidden rounded-[18px] border border-[#2B211B]/10">
        <img
          src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=85"
          alt="Vivid"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
          <p className="font-serif text-[18px] text-white">
            Vivid
          </p>
        </div>
      </div>

      {/* FORMA */}
      <div className="group relative h-[300px] overflow-hidden rounded-[18px] border border-[#2B211B]/10">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85"
          alt="Forma"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
          <p className="font-serif text-[18px] text-white">
            Forma
          </p>
        </div>
      </div>

      {/* HERITAGE */}
      <div className="group relative h-[300px] overflow-hidden rounded-[18px] border border-[#2B211B]/10">
        <img
          src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=700&q=85"
          alt="Heritage"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
          <p className="font-serif text-[18px] text-white">
            Heritage
          </p>
        </div>
      </div>

      {/* TERRA */}
      <div className="group relative h-[300px] overflow-hidden rounded-[18px] border border-[#2B211B]/10">
        <img
          src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=700&q=85"
          alt="Terra"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
          <p className="font-serif text-[18px] text-white">
            Terra
          </p>
        </div>
      </div>

      {/* TEXTURA */}
      <div className="group relative h-[300px] overflow-hidden rounded-[18px] border border-[#2B211B]/10">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=85"
          alt="Textura"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
          <p className="font-serif text-[18px] text-white">
            Textura
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

    </main>
  );
}