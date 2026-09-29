"use client";

import { Fragment } from "react";
import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaFacebookF, FaEnvelope } from "react-icons/fa";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  brandName: string;
  description: string;
  quickLinks: FooterLink[];
  secondaryLinks: FooterLink[];
  secondaryLinksTitle?: string;
  socialLinks?: {
    instagram?: string;
    whatsapp?: string;
    facebook?: string;
    email?: string;
  };
  newsletterText?: string;
  copyrightText: string;
  legalLinks?: FooterLink[];
}

export default function Footer({
  brandName,
  description,
  quickLinks,
  secondaryLinks,
  secondaryLinksTitle = "Customer Care",
  socialLinks,
  newsletterText = "Subscribe to get updates on new arrivals, offers and news.",
  copyrightText,
  legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
  ],
}: FooterProps) {
  return (
    <footer className="bg-[#2B211B] text-[#F5EDE2]">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block text-[30px] font-serif tracking-[-0.04em]">
              {brandName}
              <span className="text-[#C96A32]">.</span>
            </Link>

            <p className="mt-5 max-w-[300px] text-[13px] leading-6 text-[#F5EDE2]/65">
              {description}
            </p>

            {socialLinks && (
              <div className="mt-7 flex items-center gap-3">
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    aria-label="Instagram"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-[#C96A32] hover:bg-[#C96A32] hover:text-white"
                  >
                    <FaInstagram className="h-[18px] w-[18px]" />
                  </a>
                )}
                {socialLinks.whatsapp && (
                  <a
                    href={socialLinks.whatsapp}
                    aria-label="WhatsApp"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-[#C96A32] hover:bg-[#C96A32] hover:text-white"
                  >
                    <FaWhatsapp className="h-[19px] w-[19px]" />
                  </a>
                )}
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    aria-label="Facebook"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-[#C96A32] hover:bg-[#C96A32] hover:text-white"
                  >
                    <FaFacebookF className="h-[17px] w-[17px]" />
                  </a>
                )}
                {socialLinks.email && (
                  <a
                    href={`mailto:${socialLinks.email}`}
                    aria-label="Email"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-[#C96A32] hover:bg-[#C96A32] hover:text-white"
                  >
                    <FaEnvelope className="h-[17px] w-[17px]" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#C96A32]">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#F5EDE2]/70 transition-colors hover:text-[#C96A32]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary links */}
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#C96A32]">
              {secondaryLinksTitle}
            </h3>

            <ul className="mt-6 space-y-3">
              {secondaryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#F5EDE2]/70 transition-colors hover:text-[#C96A32]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#C96A32]">
              Newsletter
            </h3>

            <p className="mt-6 max-w-[320px] text-[13px] leading-6 text-[#F5EDE2]/65">
              {newsletterText}
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
            <p>{copyrightText}</p>

            <div className="flex items-center gap-5">
              {legalLinks.map((link, index) => (
                <Fragment key={link.label}>
                  {index > 0 && <span className="h-3 w-px bg-[#F5EDE2]/20" />}
                  <Link href={link.href} className="transition-colors hover:text-[#C96A32]">
                    {link.label}
                  </Link>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
