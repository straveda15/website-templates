import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Superadmin",
  description: "Generate standalone client projects from templates and dashboard modules.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
