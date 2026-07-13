import type { Metadata } from "next";
import { storeConfig } from "@/data/store-config";

export function buildMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  image,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  image?: string;
}): Metadata {
  const url = `${storeConfig.siteUrl}${path}`;
  const ogImage = image ?? storeConfig.social.ogImage;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: storeConfig.publicName,
      images: [{ url: ogImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
