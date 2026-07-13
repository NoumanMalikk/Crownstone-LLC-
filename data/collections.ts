import type { Collection } from "@/lib/types";

export const collections: Collection[] = [
  {
    id: "workspace-essentials",
    slug: "workspace-essentials",
    name: "Workspace Essentials",
    description: "Keyboards, mice, stands, hubs and storage for a refined desk.",
    href: "/collections/workspace-essentials",
    filter: { collection: "workspace-essentials" },
  },
  {
    id: "connected-home",
    slug: "connected-home",
    name: "Connected Home",
    description: "Networking, smart control, streaming and Bluetooth audio.",
    href: "/collections/connected-home",
    filter: { collection: "connected-home" },
  },
  {
    id: "under-50",
    slug: "under-50",
    name: "Products Under $50",
    description: "Practical upgrades priced under fifty dollars.",
    href: "/collections/under-50",
    filter: { underFifty: true },
  },
  {
    id: "business-technology",
    slug: "business-technology",
    name: "Business Technology",
    description: "Quantity-ready computing, connectivity and workplace tools.",
    href: "/collections/business-technology",
    filter: { businessEligible: true },
  },
  {
    id: "power-charging",
    slug: "power-charging",
    name: "Power & Charging",
    description: "GaN chargers, power banks and surge protection.",
    href: "/collections/power-charging",
    filter: { collection: "power-charging" },
  },
  {
    id: "new-arrivals",
    slug: "new-arrivals",
    name: "New Arrivals",
    description: "Recently added computing, power and home-technology products.",
    href: "/new-arrivals",
    filter: { newArrival: true },
  },
];

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}
