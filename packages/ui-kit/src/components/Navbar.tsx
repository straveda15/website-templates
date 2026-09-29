"use client";

import { useState } from "react";
import Link from "next/link";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  brandName: string;
  navItems: NavItem[];
  showActions?: boolean;
  cartCount?: number;
}

export default function Navbar({
  brandName,
  navItems,
  showActions = true,
  cartCount = 0,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2B211B]/10 bg-[#F7F1E8]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-[26px] font-medium tracking-[-0.04em] text-[#2B211B] sm:text-[29px]"
        >
          {brandName}
          <span className="text-[#C96A32]">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative py-2 text-[13px] font-medium text-[#2B211B] transition-colors duration-300 hover:text-[#C96A32]"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#C96A32] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        {showActions && (
          <div className="hidden items-center gap-5 lg:flex">
            <button
              type="button"
              aria-label="Search"
              className="group text-[#2B211B] transition-transform duration-300 hover:scale-110"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Wishlist"
              className="text-[#2B211B] transition-transform duration-300 hover:scale-110"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.8 8.6c0 5.5-8.8 10.4-8.8 10.4S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6.1a4.6 4.6 0 0 1 8.8 2.5Z" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Shopping cart"
              className="relative text-[#2B211B] transition-transform duration-300 hover:scale-110"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 8h12l1 12H5L6 8Z" />
                <path d="M9 8a3 3 0 0 1 6 0" />
              </svg>

              <span className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#C96A32] px-1 text-[8px] font-bold text-white">
                {cartCount}
              </span>
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2B211B]/15 text-[#2B211B] lg:hidden"
        >
          {menuOpen ? (
            <span className="text-[25px] leading-none">×</span>
          ) : (
            <div className="flex flex-col gap-[5px]">
              <span className="block h-[1px] w-5 bg-[#2B211B]" />
              <span className="block h-[1px] w-5 bg-[#2B211B]" />
            </div>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-[#2B211B]/10 bg-[#F7F1E8] transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-[1440px] flex-col px-6 py-5 sm:px-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#2B211B]/10 py-4 text-[14px] font-medium text-[#2B211B] transition-colors hover:text-[#C96A32]"
            >
              {item.label}
            </Link>
          ))}

          {showActions && (
            <div className="flex items-center gap-5 pt-5">
              <button type="button" className="text-[12px] font-medium text-[#2B211B]">
                Search
              </button>
              <button type="button" className="text-[12px] font-medium text-[#2B211B]">
                Wishlist
              </button>
              <button type="button" className="text-[12px] font-medium text-[#2B211B]">
                Cart
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
