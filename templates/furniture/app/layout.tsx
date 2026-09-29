import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@platform/ui-kit";
import { siteConfig } from "./site.config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Navbar brandName={siteConfig.brandName} navItems={siteConfig.navItems} />
        {children}
        <Footer
          brandName={siteConfig.brandName}
          description={siteConfig.description}
          quickLinks={siteConfig.footer.quickLinks}
          secondaryLinks={siteConfig.footer.customerCareLinks}
          socialLinks={siteConfig.footer.socialLinks}
          copyrightText={siteConfig.footer.copyrightText}
        />
      </body>
    </html>
  );
}
