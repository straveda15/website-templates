"use client";

import Link from "next/link";

import {
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2B211B] text-[#F5EDE2]">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:gap-10">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block text-[30px] font-serif tracking-[-0.04em]"
            >
              Maison<span className="text-[#C96A32]">.</span>
            </Link>

            <p className="mt-5 max-w-[300px] text-[13px] leading-6 text-[#F5EDE2]/65">
              Premium furniture for modern homes.
              <br />
              Designed for comfort, crafted for life.
            </p>

            {/* Social Icons */}
            {/* Social Icons */}
<div className="mt-7 flex items-center gap-3">

  {/* Instagram */}
  <a
    href="#"
    aria-label="Instagram"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-[#C96A32] hover:bg-[#C96A32] hover:text-white"
  >
    <svg
      viewBox="0 0 24 24"
      className="h-[19px] w-[19px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  </a>

  {/* WhatsApp */}
  <a
    href="#"
    aria-label="WhatsApp"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-[#C96A32] hover:bg-[#C96A32] hover:text-white"
  >
    <svg
      viewBox="0 0 24 24"
      className="h-[20px] w-[20px]"
      fill="currentColor"
    >
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.55 0 .23 5.3.23 11.82c0 2.08.55 4.1 1.6 5.9L.13 24l6.43-1.68a11.8 11.8 0 0 0 5.52 1.37h.01c6.52 0 11.84-5.31 11.84-11.83 0-3.17-1.23-6.14-3.43-8.36ZM12.09 21.7h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.82 1 1.02-3.72-.23-.38a9.82 9.82 0 1 1 8.41 4.68Zm5.39-7.36c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.28.3-1.05 1.03-1.05 2.52s1.08 2.92 1.23 3.12c.15.2 2.12 3.23 5.14 4.53.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.78-.73 2.03-1.44.25-.71.25-1.32.17-1.44-.08-.12-.28-.2-.58-.35Z" />
    </svg>
  </a>

  {/* Facebook */}
  <a
    href="#"
    aria-label="Facebook"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-[#C96A32] hover:bg-[#C96A32] hover:text-white"
  >
    <svg
      viewBox="0 0 24 24"
      className="h-[19px] w-[19px]"
      fill="currentColor"
    >
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.08c0-.87.24-1.46 1.5-1.46h1.7V3.94c-.3-.04-1.32-.13-2.51-.13-2.49 0-4.2 1.52-4.2 4.31V10H7.2v3h2.79v8h3.51Z" />
    </svg>
  </a>

  {/* Email */}
  <a
    href="mailto:hello@maison.com"
    aria-label="Email"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-[#C96A32] hover:bg-[#C96A32] hover:text-white"
  >
    <svg
      viewBox="0 0 24 24"
      className="h-[19px] w-[19px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  </a>

</div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#C96A32]">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-[13px] text-[#F5EDE2]/70 transition-colors hover:text-[#C96A32]"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/shop"
                  className="text-[13px] text-[#F5EDE2]/70 transition-colors hover:text-[#C96A32]"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  href="/collections"
                  className="text-[13px] text-[#F5EDE2]/70 transition-colors hover:text-[#C96A32]"
                >
                  Collections
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-[13px] text-[#F5EDE2]/70 transition-colors hover:text-[#C96A32]"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-[13px] text-[#F5EDE2]/70 transition-colors hover:text-[#C96A32]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#C96A32]">
              Customer Care
            </h3>

            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#F5EDE2]/70 transition-colors hover:text-[#C96A32]"
                >
                  Track Order
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#F5EDE2]/70 transition-colors hover:text-[#C96A32]"
                >
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#F5EDE2]/70 transition-colors hover:text-[#C96A32]"
                >
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#F5EDE2]/70 transition-colors hover:text-[#C96A32]"
                >
                  FAQs
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-[13px] text-[#F5EDE2]/70 transition-colors hover:text-[#C96A32]"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#C96A32]">
              Newsletter
            </h3>

            <p className="mt-6 max-w-[320px] text-[13px] leading-6 text-[#F5EDE2]/65">
              Subscribe to get updates on new arrivals, offers
              and interior inspiration.
            </p>

            <form className="mt-6 flex max-w-[360px] border border-[#F5EDE2]/25">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[12px] text-[#F5EDE2] outline-none placeholder:text-[#F5EDE2]/40"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="flex w-12 shrink-0 items-center justify-center bg-[#C96A32] text-white transition-colors duration-300 hover:bg-[#A95123]"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-14 border-t border-[#F5EDE2]/15 pt-6">
          <div className="flex flex-col gap-4 text-[11px] text-[#F5EDE2]/50 sm:flex-row sm:items-center sm:justify-between">
            
            <p>
              © 2026 Maison. All Rights Reserved.
            </p>

            <div className="flex items-center gap-5">
              <Link
                href="#"
                className="transition-colors hover:text-[#C96A32]"
              >
                Privacy Policy
              </Link>

              <span className="h-3 w-px bg-[#F5EDE2]/20" />

              <Link
                href="#"
                className="transition-colors hover:text-[#C96A32]"
              >
                Terms & Conditions
              </Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}