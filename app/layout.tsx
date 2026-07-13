import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Inter, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { StoreProviders } from "@/components/layout/store-providers";
import { storeConfig } from "@/data/store-config";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.siteUrl),
  title: {
    default: "Crownstone | Electronics, Computing and Home Appliances",
    template: "%s | Crownstone",
  },
  description:
    "Shop computing accessories, connectivity, power products, smart-home technology and compact appliances from Crownstone LLC.",
  icons: {
    icon: "/brand/favicon.svg",
    apple: "/brand/apple-touch-icon.svg",
  },
  openGraph: {
    images: ["/brand/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "OnlineStore"],
    name: storeConfig.publicName,
    legalName: storeConfig.legalName,
    description: storeConfig.brandDescriptor,
    url: storeConfig.siteUrl,
    telephone: storeConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: storeConfig.address.city,
      addressRegion: storeConfig.address.state,
      postalCode: storeConfig.address.postalCode,
      addressCountry: "US",
    },
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-soft-white text-[var(--text)]">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <StoreProviders>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </StoreProviders>
      </body>
    </html>
  );
}
