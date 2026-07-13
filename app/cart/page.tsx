"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart/store";
import { resolveCartLines, computeSubtotal } from "@/lib/pricing/cart-totals";
import { formatPrice } from "@/lib/utilities/format";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { getProductById } from "@/data/products";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const saveForLater = useCartStore((s) => s.saveForLater);
  const saved = useCartStore((s) => s.saved);
  const moveSavedToCart = useCartStore((s) => s.moveSavedToCart);
  const lines = resolveCartLines(items);
  const subtotal = computeSubtotal(lines);
  const related = lines
    .flatMap((line) => getProductById(line.productId)?.relatedProductIds ?? [])
    .map((id) => getProductById(id))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="container-wide px-4 py-12">
      <h1 className="heading-display text-4xl">Cart</h1>
      {!lines.length ? (
        <div className="mt-10 rounded-2xl border border-border bg-white p-10 text-center">
          <p className="heading-editorial text-2xl">Your cart is empty</p>
          <Button asChild className="mt-6"><Link href="/shop">Continue shopping</Link></Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <ul className="space-y-4">
            {lines.map((line) => (
              <li key={line.productId + (line.variantId ?? "")} className="flex gap-4 rounded-2xl border border-border bg-white p-4">
                <div className="relative h-28 w-28 overflow-hidden rounded-xl bg-soft-white">
                  <Image src={line.imageSrc} alt="" fill className="object-contain p-2" />
                </div>
                <div className="flex-1">
                  <Link href={`/product/${line.slug}`} className="font-semibold hover:text-electric">{line.title}</Link>
                  <p className="spec-mono text-xs text-[var(--text-secondary)]">{line.brand} · {line.model}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button type="button" className="h-8 w-8 rounded-full border" onClick={() => setQuantity(line.productId, line.quantity - 1, line.variantId)}>−</button>
                    <span>{line.quantity}</span>
                    <button type="button" className="h-8 w-8 rounded-full border" onClick={() => setQuantity(line.productId, line.quantity + 1, line.variantId)}>+</button>
                    <button type="button" className="text-xs underline" onClick={() => saveForLater(line.productId, line.variantId)}>Save for later</button>
                    <button type="button" className="text-xs underline" onClick={() => removeItem(line.productId, line.variantId)}>Remove</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(line.lineTotal)}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{formatPrice(line.unitPrice)} each</p>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-2xl border border-border bg-white p-6">
            <p className="text-sm text-[var(--text-secondary)]">Subtotal</p>
            <p className="heading-display text-3xl">{formatPrice(subtotal)}</p>
            <p className="mt-3 text-xs text-[var(--text-secondary)]">Shipping and tax are calculated at checkout.</p>
            <Button asChild className="mt-6 w-full"><Link href="/checkout">Checkout</Link></Button>
            <Button asChild variant="outline" className="mt-2 w-full"><Link href="/shop">Continue shopping</Link></Button>
          </aside>
        </div>
      )}
      {saved.length ? (
        <section className="mt-12">
          <h2 className="heading-editorial text-2xl">Saved for later</h2>
          <ul className="mt-4 space-y-2">
            {saved.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <li key={item.productId} className="flex items-center justify-between rounded-xl border border-border bg-white p-3">
                  <span>{product.title}</span>
                  <Button type="button" variant="outline" onClick={() => moveSavedToCart(item.productId, item.variantId)}>Move to cart</Button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
      {related.length ? (
        <section className="mt-12">
          <h2 className="heading-editorial text-2xl">You may also like</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((product) => product ? <ProductCard key={product.id} product={product} /> : null)}
          </div>
        </section>
      ) : null}
    </div>
  );
}
