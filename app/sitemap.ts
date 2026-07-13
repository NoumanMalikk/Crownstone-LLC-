import type { MetadataRoute } from "next";
import { getActiveProducts } from "@/data/products";
import { journalArticles } from "@/data/journal";
import { storeConfig } from "@/data/store-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = storeConfig.siteUrl;
  const staticRoutes = [
    "",
    "/shop",
    "/new-arrivals",
    "/computing",
    "/connectivity",
    "/storage",
    "/power",
    "/smart-home",
    "/audio-entertainment",
    "/appliances",
    "/about",
    "/journal",
    "/contact",
    "/faq",
    "/shipping",
    "/returns",
    "/warranty",
    "/privacy",
    "/terms",
    "/accessibility",
    "/business",
    "/business/quote",
    "/compare",
    "/search",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...getActiveProducts().map((product) => ({
      url: `${base}/product/${product.slug}`,
      lastModified: new Date(),
    })),
    ...journalArticles.map((article) => ({
      url: `${base}/journal/${article.slug}`,
      lastModified: new Date(article.publishedAt),
    })),
  ];
}
