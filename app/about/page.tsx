import { buildMetadata } from "@/lib/seo/metadata";
import { storeConfig } from "@/data/store-config";

export const metadata = buildMetadata({
  title: "About Crownstone",
  description: "Crownstone LLC is a Lewisville, Texas-based online electronics and appliance retailer.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container-wide px-4 py-16">
      <p className="eyebrow">About</p>
      <h1 className="heading-display mt-3 max-w-3xl text-4xl md:text-6xl">{storeConfig.positioning}</h1>
      <div className="mt-10 max-w-3xl space-y-6 text-lg leading-relaxed text-[var(--text-secondary)]">
        <p>
          Crownstone LLC is a Lewisville, Texas-based online electronics and appliance retailer.
        </p>
        <p>
          The Crownstone store focuses on practical computing accessories, connectivity, power products, smart-home technology and compact household appliances.
        </p>
        <p>
          Product pages are designed to make important information such as model numbers, connections, capacities, dimensions, compatibility and package contents easy to review before checkout.
        </p>
        <p>
          Crownstone aims to make modern technology easier to understand, compare and purchase.
        </p>
        <p className="heading-editorial text-2xl text-[var(--text)]">{storeConfig.tagline}</p>
      </div>
    </div>
  );
}
