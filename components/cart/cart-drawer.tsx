"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useCartStore } from "@/lib/cart/store";
import { resolveCartLines, computeSubtotal } from "@/lib/pricing/cart-totals";
import { formatPrice } from "@/lib/utilities/format";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const open = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const lines = resolveCartLines(items);
  const subtotal = computeSubtotal(lines);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        className="absolute inset-0 bg-carbon/45 backdrop-blur-sm"
        aria-label="Close cart"
        onClick={close}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-soft-white shadow-2xl animate-fade-up">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="heading-editorial text-xl">Cart</h2>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-border"
            aria-label="Close cart"
            onClick={close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="py-16 text-center">
              <p className="heading-editorial text-xl">Your cart is empty</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Browse computing, connectivity and home technology.
              </p>
              <Button asChild className="mt-6" onClick={close}>
                <Link href="/shop">Continue shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={`${line.productId}-${line.variantId ?? "default"}`} className="flex gap-3">
                  <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-border bg-white">
                    <Image src={line.imageSrc} alt="" fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/product/${line.slug}`} className="font-semibold hover:text-electric" onClick={close}>
                      {line.title}
                    </Link>
                    <p className="spec-mono text-xs text-[var(--text-secondary)]">{line.model}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="h-8 w-8 rounded-full border border-border"
                        onClick={() => setQuantity(line.productId, line.quantity - 1, line.variantId)}
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        className="h-8 w-8 rounded-full border border-border"
                        onClick={() => setQuantity(line.productId, line.quantity + 1, line.variantId)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-auto text-xs text-[var(--text-secondary)] underline"
                        onClick={() => removeItem(line.productId, line.variantId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">{formatPrice(line.lineTotal)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        {lines.length > 0 ? (
          <div className="border-t border-border p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-[var(--text-secondary)]">Subtotal</span>
              <span className="heading-editorial text-xl">{formatPrice(subtotal)}</span>
            </div>
            <p className="mb-4 text-xs text-[var(--text-secondary)]">
              Shipping and tax are calculated at checkout.
            </p>
            <div className="grid gap-2">
              <Button asChild onClick={close}>
                <Link href="/checkout">Checkout</Link>
              </Button>
              <Button asChild variant="outline" onClick={close}>
                <Link href="/cart">View cart</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
