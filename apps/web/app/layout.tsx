import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"]
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wellness-commerce.local"),
  title: "Wellness Commerce",
  description:
    "Website ban hang SEO-first cho wellness brand, tich hop content commerce, membership va AI advisor."
};

export default function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${fraunces.variable} ${manrope.variable}`}>
        <div className="page-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
