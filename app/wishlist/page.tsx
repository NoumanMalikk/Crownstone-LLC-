"use client";
import Link from "next/link";
import { useWishlistStore } from "@/lib/cart/wishlist-store";
import { useCartStore } from "@/lib/cart/store";
import { getProductById } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const ids = useWishlistStore((s) => s.ids);
  const remove = useWishlistStore((s) => s.remove);
  const addItem = useCartStore((s) => s.addItem);
  const products = ids.map((id) => getProductById(id)).filter(Boolean);

  return (
    <div className="container-wide px-4 py-12">
      <h1 className="heading-display text-4xl">Wishlist</h1>
      {!products.length ? (
        <div className="mt-10 rounded-2xl border border-border bg-white p-10 text-center">
          <p className="heading-editorial text-2xl">No saved products yet</p>
          <Button asChild className="mt-6"><Link href="/shop">Browse products</Link></Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => product ? (
            <div key={product.id} className="space-y-2">
              <ProductCard product={product} />
              <div className="grid grid-cols-2 gap-2">
                <Button type="button" variant="outline" onClick={() => addItem(product.id)}>Move to cart</Button>
                <Button type="button" variant="ghost" onClick={() => remove(product.id)}>Remove</Button>
              </div>
            </div>
          ) : null)}
        </div>
      )}
    </div>
  );
}
