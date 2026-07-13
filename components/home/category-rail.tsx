import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { floatingCategoryRail } from "@/data/categories";
import { getProductBySlug } from "@/data/products";

export function CategoryRail() {
  return (
    <section className="relative z-20 bg-soft-white pb-16 pt-10 md:pb-20 md:pt-14">
      <div className="container-wide px-4">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow text-electric">Shop by category</p>
          <h2 className="heading-display mt-2 text-3xl text-[var(--text)] md:text-4xl">
            Start with what you need
          </h2>
          <p className="mt-3 text-base text-[var(--text-secondary)]">
            Browse computing, connectivity, power, smart home, audio and appliances.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {floatingCategoryRail.map((category) => {
            const product = getProductBySlug(category.productSlug);
            return (
              <Link
                key={category.slug}
                href={category.href}
                className="group flex h-full min-h-[280px] flex-col overflow-hidden rounded-[1.35rem] border border-border bg-white p-4 shadow-[0_12px_36px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-[0_20px_48px_rgba(36,107,253,0.12)]"
              >
                <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-white">
                  {product ? (
                    <Image
                      src={product.images[0].src}
                      alt={product.imageAltText}
                      fill
                      className="object-contain p-4 transition duration-500 group-hover:scale-[1.04]"
                      sizes="200px"
                    />
                  ) : null}
                </div>
                <div className="mt-auto flex items-end justify-between gap-2">
                  <div>
                    <p className="heading-editorial text-[1.1rem] text-[var(--text)]">
                      {category.label}
                    </p>
                    <p className="mt-1 text-sm leading-snug text-[var(--text-secondary)]">
                      {category.description}
                    </p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cool-gray text-[var(--text)] transition group-hover:bg-electric group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
