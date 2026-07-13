"use client";

import Link from "next/link";
import Image from "next/image";
import { useCompareStore } from "@/lib/cart/compare-store";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utilities/format";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";

export default function ComparePage() {
  const ids = useCompareStore((s) => s.ids);
  const remove = useCompareStore((s) => s.remove);
  const clear = useCompareStore((s) => s.clear);
  const products = ids
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p));

  const rows: [string, (p: Product) => string][] = [
    ["Brand", (p) => p.brand],
    ["Model", (p) => p.exactModel],
    ["Price", (p) => formatPrice(p.price)],
    ["Dimensions", (p) => p.dimensions.display],
    ["Weight", (p) => p.weight.display],
    ["Warranty", (p) => p.warrantyInformation],
    ["Color", (p) => p.availableColors.map((c) => c.name).join(", ") || "-"],
    ["Connection", (p) => (p.connectionTypes ?? []).join(", ") || "-"],
    ["Compatibility", (p) => p.compatibility.join("; ") || "-"],
    ["Power", (p) => p.powerRating ?? "-"],
    ["Ports", (p) => p.portConfiguration.join(", ") || "-"],
    ["Capacity", (p) => p.capacity ?? "-"],
    ["Package contents", (p) => p.packageContents.join("; ")],
  ];

  return (
    <div className="container-wide px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="heading-display text-4xl">Compare products</h1>
          <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
            Compare up to four related products across specifications that are published for each listing.
          </p>
        </div>
        {products.length ? (
          <Button type="button" variant="outline" onClick={clear}>
            Clear all
          </Button>
        ) : null}
      </div>
      {!products.length ? (
        <div className="mt-10 rounded-2xl border border-border bg-white p-10 text-center">
          <p className="heading-editorial text-2xl">No products selected</p>
          <Button asChild className="mt-6">
            <Link href="/shop">Browse catalogue</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4">Specification</th>
                {products.map((p) => (
                  <th key={p.id} className="p-4 align-top">
                    <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-xl bg-soft-white">
                      <Image src={p.images[0].src} alt="" fill className="object-contain p-2" />
                    </div>
                    <Link href={`/product/${p.slug}`} className="font-semibold hover:text-electric">
                      {p.title}
                    </Link>
                    <button
                      type="button"
                      className="mt-2 block text-xs underline"
                      onClick={() => remove(p.id)}
                    >
                      Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, getter]) => (
                <tr key={label} className="border-b border-border/70">
                  <td className="p-4 font-semibold">{label}</td>
                  {products.map((p) => (
                    <td key={p.id + label} className="p-4 text-[var(--text-secondary)]">
                      {getter(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
