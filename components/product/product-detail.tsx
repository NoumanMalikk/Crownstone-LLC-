"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utilities/format";
import { useCartStore } from "@/lib/cart/store";
import { useWishlistStore } from "@/lib/cart/wishlist-store";
import { useCompareStore } from "@/lib/cart/compare-store";
import { useUiStore } from "@/lib/cart/ui-store";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { getProductById } from "@/data/products";
import { isDemoMode } from "@/data/store-config";

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const wished = useWishlistStore((s) => s.has(product.id));
  const compareToggle = useCompareStore((s) => s.toggle);
  const addRecentlyViewed = useUiStore((s) => s.addRecentlyViewed);
  const recentlyViewed = useUiStore((s) => s.recentlyViewed);
  const demo = isDemoMode();

  useEffect(() => {
    addRecentlyViewed(product.id);
  }, [product.id, addRecentlyViewed]);

  const recent = recentlyViewed
    .filter((id) => id !== product.id)
    .map((id) => getProductById(id))
    .filter(Boolean) as Product[];

  const purchaseBlocked = !demo && (product.incomplete || product.imageReplacementRequired);

  return (
    <div className="pb-24 pt-8">
      <div className="container-wide px-4">
        <nav className="text-sm text-[var(--text-secondary)]" aria-label="Breadcrumb">
          <Link href="/shop" className="hover:text-electric">Shop</Link>
          <span className="mx-2">/</span>
          <Link href={`/${product.category}`} className="hover:text-electric capitalize">
            {product.category.replace("-", " ")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--text)]">{product.title}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-border bg-white">
              <Image
                src={product.images[activeImage]?.src ?? product.images[0].src}
                alt={product.imageAltText}
                fill
                className="object-contain p-8 transition duration-500"
                priority
                sizes="(max-width:1024px) 100vw, 55vw"
              />
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={image.src + index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border ${
                    activeImage === index ? "border-electric" : "border-border"
                  }`}
                  aria-label={`Show image ${index + 1}`}
                >
                  <Image src={image.src} alt="" fill className="object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
              {product.brand}
            </p>
            <h1 className="heading-display mt-2 text-3xl md:text-4xl">{product.title}</h1>
            <p className="spec-mono mt-3 text-[var(--text-secondary)]">
              Model: {product.exactModel} · SKU {product.sku}
            </p>
            <p className="mt-4 heading-display text-3xl">{formatPrice(product.price)}</p>
            <p className="mt-2 text-sm capitalize text-[var(--text-secondary)]">
              Availability: {product.stockStatus.replace("_", " ")}
            </p>
            {product.availableColors.length ? (
              <div className="mt-6">
                <p className="text-sm font-semibold">Color</p>
                <div className="mt-2 flex gap-2">
                  {product.availableColors.map((color) => (
                    <span
                      key={color.name}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm"
                    >
                      <span className="h-3 w-3 rounded-full" style={{ background: color.hex }} />
                      {color.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="mt-6 flex items-center gap-3">
              <label htmlFor="qty" className="text-sm font-semibold">Quantity</label>
              <input
                id="qty"
                type="number"
                min={1}
                max={product.maximumOrderQuantity}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-24 rounded-xl border border-border px-3 py-2"
              />
            </div>
            {purchaseBlocked ? (
              <p className="mt-4 rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-warning">
                Production purchase is blocked until exact model mapping and authorized imagery are complete.
              </p>
            ) : null}
            {demo && product.imageReplacementRequired ? (
              <p className="mt-4 rounded-2xl border border-border bg-cool-gray p-4 text-sm text-[var(--text-secondary)]">
                Demonstration mode: placeholder imagery is shown. Replace with authorized product photography before launch.
              </p>
            ) : null}
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <Button
                type="button"
                disabled={purchaseBlocked || product.stockStatus === "out_of_stock"}
                onClick={() => addItem(product.id, qty)}
              >
                Add to cart
              </Button>
              <Button type="button" variant="outline" onClick={() => toggleWish(product.id)}>
                {wished ? "Wishlisted" : "Add to wishlist"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => compareToggle(product.id)}>
                Compare
              </Button>
              <Button asChild variant="secondary">
                <Link href="/business/quote">Business quote</Link>
              </Button>
            </div>
            <ul className="mt-8 space-y-2 text-sm text-[var(--text-secondary)]">
              {product.keyFeatures.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <SpecBlock title="Specifications" rows={Object.entries(product.specifications)} />
          <SpecBlock title="Compatibility" rows={product.compatibility.map((c) => ["Item", c])} />
          <SpecBlock title="System requirements" rows={product.systemRequirements.map((c) => ["Requirement", c])} />
          <SpecBlock title="Port configuration" rows={product.portConfiguration.map((c) => ["Port", c])} />
          <SpecBlock
            title="Dimensions & weight"
            rows={[
              ["Dimensions", product.dimensions.display],
              ["Weight", product.weight.display],
              ["Power rating", product.powerRating ?? "Not published until verified"],
              ["Voltage", product.voltage ?? "Not published until verified"],
            ]}
          />
          <SpecBlock title="Package contents" rows={product.packageContents.map((c) => ["Included", c])} />
          <SpecBlock title="Warranty" rows={[["Policy", product.warrantyInformation]]} />
          <SpecBlock
            title="Certifications & safety"
            rows={[
              ...product.certificationInformation.map((c) => ["Certification", c]),
              ...product.safetyInformation.map((c) => ["Safety", c]),
              ["Shipping", "Methods and costs are calculated at checkout."],
              ["Returns", "See the Returns page for the current policy template."],
            ]}
          />
        </div>

        <section className="mt-16">
          <h2 className="heading-display text-2xl">Related products</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>

        {recent.length ? (
          <section className="mt-16">
            <h2 className="heading-display text-2xl">Recently viewed</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recent.slice(0, 4).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-10 rounded-2xl border border-border bg-cool-gray/50 p-6">
          <p className="heading-editorial text-xl">Compare specifications before you decide</p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/compare">Open comparison</Link>
          </Button>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold">{formatPrice(product.price)}</p>
          <Button
            type="button"
            disabled={purchaseBlocked}
            onClick={() => addItem(product.id, qty)}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

function SpecBlock({ title, rows }: { title: string; rows: [string, string][] | string[][] }) {
  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-border bg-white p-6">
        <h2 className="heading-editorial text-xl">{title}</h2>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          No verified details published yet.
        </p>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <h2 className="heading-editorial text-xl">{title}</h2>
      <dl className="mt-4 space-y-3">
        {rows.map(([label, value], index) => (
          <div key={`${label}-${index}`} className="flex justify-between gap-4 border-b border-border/70 pb-2 text-sm">
            <dt className="font-semibold">{label}</dt>
            <dd className="text-right text-[var(--text-secondary)]">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
