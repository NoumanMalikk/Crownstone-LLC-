import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/data/products";

const cards = [
  {
    slug: "usb-c-dual-display-docking-station",
    feature: "Expand displays and peripherals",
    className: "md:col-span-2 md:row-span-2 min-h-[420px]",
  },
  {
    slug: "portable-solid-state-drive-1tb-black",
    feature: "1 TB portable storage",
    className: "min-h-[240px]",
  },
  {
    slug: "three-port-gan-charger-65w",
    feature: "65W multi-port GaN charging",
    className: "min-h-[240px]",
  },
  {
    slug: "4k-usb-webcam-privacy-cover",
    feature: "USB video with privacy cover",
    className: "min-h-[220px]",
  },
  {
    slug: "mini-matter-smart-wifi-plug-white",
    feature: "Matter-ready smart control",
    className: "min-h-[220px]",
  },
];

export function SignatureBento() {
  return (
    <section className="section-shell py-20">
      <div className="container-wide relative px-4">
        <div className="max-w-3xl">
          <p className="eyebrow">Signature selection</p>
          <h2 className="heading-display mt-3 text-3xl md:text-5xl">
            Technology, presented with purpose
          </h2>
          <p className="mt-4 text-[var(--text-secondary)]">
            A focused edit of connectivity, storage, power and smart-home essentials — photographed for clarity.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((card) => {
            const product = getProductBySlug(card.slug);
            if (!product) return null;
            return (
              <Link
                key={card.slug}
                href={`/product/${product.slug}`}
                className={`group relative overflow-hidden rounded-[1.75rem] border border-border bg-gradient-to-br from-graphite via-deep-slate to-carbon text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] ${card.className}`}
              >
                <div className="grid-fade absolute inset-0 opacity-30 transition duration-700 group-hover:opacity-55" />
                <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-electric/25 blur-3xl" />
                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  <div className="relative mx-auto aspect-square w-[62%] max-w-[280px] overflow-hidden rounded-[1.25rem] bg-white shadow-2xl">
                    <Image
                      src={product.images[0].src}
                      alt={product.imageAltText}
                      fill
                      className="object-contain p-5 transition duration-700 group-hover:scale-105"
                      sizes="280px"
                    />
                  </div>
                  <div className="mt-6">
                    <p className="heading-editorial text-xl md:text-2xl">{product.title}</p>
                    <p className="mt-2 text-sm text-silver">{card.feature}</p>
                    <span className="mt-4 inline-flex text-sm font-semibold text-cyan">
                      View product →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
