"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { useCallback } from "react";

export function ProductSlider({
  products,
  label,
}: {
  products: Product[];
  label: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          aria-label={`Previous ${label}`}
          onClick={scrollPrev}
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label={`Next ${label}`}
          onClick={scrollNext}
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-0 shrink-0 grow-0 basis-[83%] sm:basis-[46%] lg:basis-[24%] [&>article]:h-full"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
