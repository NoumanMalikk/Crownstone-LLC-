"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, GitCompareArrows, Eye } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utilities/format";
import { cn } from "@/lib/utilities/cn";
import { useWishlistStore } from "@/lib/cart/wishlist-store";
import { useCompareStore } from "@/lib/cart/compare-store";
import { useUiStore } from "@/lib/cart/ui-store";
import { useCartStore } from "@/lib/cart/store";
import { Button } from "@/components/ui/button";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const toggleWish = useWishlistStore((s) => s.toggle);
  const wished = useWishlistStore((s) => s.has(product.id));
  const compareToggle = useCompareStore((s) => s.toggle);
  const compared = useCompareStore((s) => s.has(product.id));
  const openQuickView = useUiStore((s) => s.openQuickView);
  const addItem = useCartStore((s) => s.addItem);
  const secondary = product.images[1]?.src;

  return (
    <article className={cn("product-card group h-full", className)}>
      <div className="product-card-image">
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
          {product.newArrival ? (
            <span className="rounded-full bg-carbon/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur">
              New
            </span>
          ) : null}
          {product.featured && !product.newArrival ? (
            <span className="rounded-full bg-electric/90 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur">
              Featured
            </span>
          ) : null}
        </div>
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-100 transition duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
          <IconBtn
            label={wished ? "Remove from wishlist" : "Add to wishlist"}
            active={wished}
            onClick={() => toggleWish(product.id)}
          >
            <Heart className={cn("h-4 w-4", wished && "fill-current")} />
          </IconBtn>
          <IconBtn
            label={compared ? "Remove from compare" : "Add to compare"}
            active={compared}
            onClick={() => compareToggle(product.id)}
          >
            <GitCompareArrows className="h-4 w-4" />
          </IconBtn>
          <IconBtn label={`Quick view ${product.title}`} onClick={() => openQuickView(product.id)}>
            <Eye className="h-4 w-4" />
          </IconBtn>
        </div>
        <Link
          href={`/product/${product.slug}`}
          className="relative block h-full w-full"
          aria-label={product.title}
        >
          <Image
            src={product.images[0]?.src ?? "/brand/mark.svg"}
            alt={product.imageAltText}
            fill
            sizes="(max-width:768px) 85vw, (max-width:1200px) 33vw, 280px"
            className={cn(
              "object-contain p-6 transition duration-500 ease-out group-hover:scale-[1.03]",
              secondary && "group-hover:opacity-0"
            )}
          />
          {secondary ? (
            <Image
              src={secondary}
              alt=""
              fill
              sizes="(max-width:768px) 85vw, (max-width:1200px) 33vw, 280px"
              className="object-contain p-6 opacity-0 transition duration-500 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
              aria-hidden
            />
          ) : null}
          <span className="pointer-events-none absolute inset-x-8 bottom-4 h-8 rounded-[100%] bg-carbon/5 blur-md transition group-hover:bg-electric/10" />
        </Link>
      </div>

      <div className="flex min-h-[236px] flex-1 flex-col gap-2.5 p-4 pt-3">
        <p className="min-h-[1rem] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
          {product.category.replace(/-/g, " ")}
        </p>
        <h3 className="min-h-[3.25rem]">
          <Link
            href={`/product/${product.slug}`}
            className="heading-editorial line-clamp-2 text-[1.05rem] leading-snug text-[var(--text)] transition hover:text-electric"
            title={product.title}
          >
            {product.title}
          </Link>
        </h3>
        <p className="spec-mono min-h-[1.15rem] line-clamp-1 text-[var(--text-secondary)]">
          {product.keySpecification}
        </p>
        <div className="mt-auto flex min-h-[2rem] items-end justify-between gap-3 pt-1">
          <p className="heading-display text-[1.2rem] tracking-tight">
            {formatPrice(product.price)}
          </p>
          <div className="flex items-center gap-1.5" aria-label="Available colors">
            {product.availableColors.slice(0, 3).map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="h-3.5 w-3.5 rounded-full border border-border shadow-sm"
                style={{ background: color.hex }}
              />
            ))}
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="mt-1 h-11 w-full rounded-full border-border/80 text-sm transition hover:border-electric hover:bg-electric hover:text-white"
          onClick={() => addItem(product.id)}
        >
          Add to cart
        </Button>
      </div>
    </article>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border border-border/80 bg-white/95 shadow-sm backdrop-blur transition hover:border-electric hover:text-electric",
        active && "border-electric text-electric"
      )}
    >
      {children}
    </button>
  );
}
