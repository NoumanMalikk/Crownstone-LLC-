"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { getProductById } from "@/data/products";
import { useUiStore } from "@/lib/cart/ui-store";
import { useCartStore } from "@/lib/cart/store";
import { useWishlistStore } from "@/lib/cart/wishlist-store";
import { useCompareStore } from "@/lib/cart/compare-store";
import { formatPrice } from "@/lib/utilities/format";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function QuickViewDrawer() {
  const productId = useUiStore((s) => s.quickViewProductId);
  const close = useUiStore((s) => s.closeQuickView);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const compareToggle = useCompareStore((s) => s.toggle);
  const [qty, setQty] = useState(1);
  const product = productId ? getProductById(productId) : null;

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[85]">
      <button type="button" className="absolute inset-0 bg-carbon/45" aria-label="Close quick view" onClick={close} />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl animate-fade-up"
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view ${product.title}`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-secondary)]">
            Quick view
          </p>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border" onClick={close} aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-2xl bg-soft-white">
            <Image src={product.images[0].src} alt={product.imageAltText} fill className="object-contain p-6" />
          </div>
          <p className="mt-5 text-sm font-semibold text-[var(--text-secondary)]">{product.brand}</p>
          <h2 className="heading-editorial mt-1 text-2xl">{product.title}</h2>
          <p className="spec-mono mt-2 text-[var(--text-secondary)]">{product.exactModel}</p>
          <p className="mt-4 heading-display text-2xl">{formatPrice(product.price)}</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{product.keySpecification}</p>
          <div className="mt-6 flex items-center gap-3">
            <label className="text-sm font-semibold" htmlFor="qv-qty">Qty</label>
            <input
              id="qv-qty"
              type="number"
              min={1}
              max={product.maximumOrderQuantity}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-20 rounded-xl border border-border px-3 py-2"
            />
          </div>
          <div className="mt-6 grid gap-2">
            <Button type="button" onClick={() => { addItem(product.id, qty); close(); }}>
              Add to cart
            </Button>
            <Button type="button" variant="outline" onClick={() => toggleWish(product.id)}>
              Wishlist
            </Button>
            <Button type="button" variant="ghost" onClick={() => compareToggle(product.id)}>
              Compare
            </Button>
            <Button asChild variant="secondary" onClick={close}>
              <Link href={`/product/${product.slug}`}>View full details</Link>
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
