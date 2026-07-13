import { Suspense } from "react";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/types";
import { ShopToolbar } from "@/components/commerce/shop-toolbar";

export function CatalogPage({
  title,
  description,
  products,
  eyebrow = "Shop",
}: {
  title: string;
  description: string;
  products: Product[];
  eyebrow?: string;
}) {
  return (
    <div className="pb-20 pt-10">
      <div className="container-wide px-4">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="heading-display mt-3 text-4xl md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">{description}</p>
        <Suspense fallback={<div className="mt-8 h-14 border-y border-border" />}>
          <ShopToolbar initialCount={products.length} />
        </Suspense>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {products.length === 0 ? (
          <p className="mt-10 text-[var(--text-secondary)]">No products match this view yet.</p>
        ) : null}
      </div>
    </div>
  );
}
