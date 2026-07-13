"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { getActiveProducts } from "@/data/products";
import { searchProducts } from "@/lib/products/search";
import { formatPrice } from "@/lib/utilities/format";
import { cn } from "@/lib/utilities/cn";
import { useRouter } from "next/navigation";

export function PredictiveSearch({
  compact = false,
  onNavigate,
}: {
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const products = useMemo(() => getActiveProducts(), []);
  const results = useMemo(
    () => (query.trim().length >= 2 ? searchProducts(products, query, 6) : []),
    [products, query]
  );

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={rootRef} className={cn("relative", compact ? "w-56 lg:w-64" : "w-full")}>
      <label className="sr-only" htmlFor={compact ? "header-search" : "mobile-search"}>
        Search products
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
        <input
          id={compact ? "header-search" : "mobile-search"}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/search?q=${encodeURIComponent(query)}`);
              setOpen(false);
              onNavigate?.();
            }
          }}
          placeholder="Search models, ports, capacity…"
          className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-3 text-sm text-[var(--text)] outline-none focus:border-electric focus:ring-4 focus:ring-electric/15"
        />
      </div>
      {open && query.trim().length >= 2 ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
          {results.length ? (
            <ul role="listbox">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="flex items-start justify-between gap-3 px-4 py-3 hover:bg-cool-gray"
                    onClick={() => {
                      setOpen(false);
                      onNavigate?.();
                    }}
                  >
                    <span>
                      <span className="block text-sm font-semibold">{product.title}</span>
                      <span className="spec-mono text-xs text-[var(--text-secondary)]">
                        {product.keySpecification}
                      </span>
                    </span>
                    <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-[var(--text-secondary)]">No matches found.</p>
          )}
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            className="block border-t border-border px-4 py-3 text-sm font-semibold text-electric"
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
          >
            View all results
          </Link>
        </div>
      ) : null}
    </div>
  );
}
