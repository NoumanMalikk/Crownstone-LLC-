"use client";

import Link from "next/link";
import Image from "next/image";
import { getProductById } from "@/data/products";
import { useCompareStore } from "@/lib/cart/compare-store";
import { Button } from "@/components/ui/button";

export function CompareTray() {
  const ids = useCompareStore((s) => s.ids);
  const trayOpen = useCompareStore((s) => s.trayOpen);
  const setTrayOpen = useCompareStore((s) => s.setTrayOpen);
  const remove = useCompareStore((s) => s.remove);
  const clear = useCompareStore((s) => s.clear);

  if (!ids.length || !trayOpen) return null;

  const products = ids.map((id) => getProductById(id)).filter(Boolean);

  return (
    <div className="fixed bottom-4 left-1/2 z-[75] w-[min(100%-1.5rem,920px)] -translate-x-1/2 rounded-2xl border border-border bg-white/95 p-4 shadow-2xl backdrop-blur animate-fade-up">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">Comparing {products.length} of 4</p>
        <div className="flex gap-2">
          <button type="button" className="text-xs underline" onClick={() => setTrayOpen(false)}>
            Hide
          </button>
          <button type="button" className="text-xs underline" onClick={clear}>
            Clear
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {products.map((product) =>
          product ? (
            <div key={product.id} className="flex items-center gap-2 rounded-xl border border-border px-2 py-1.5">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-soft-white">
                <Image src={product.images[0].src} alt="" fill className="object-contain p-1" />
              </div>
              <span className="max-w-[140px] truncate text-xs font-medium">{product.title}</span>
              <button type="button" className="text-xs text-[var(--text-secondary)]" onClick={() => remove(product.id)}>
                ×
              </button>
            </div>
          ) : null
        )}
        <Button asChild className="ml-auto">
          <Link href="/compare">Open comparison</Link>
        </Button>
      </div>
    </div>
  );
}
