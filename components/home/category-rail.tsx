import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { floatingCategoryRail } from "@/data/categories";
import { getProductBySlug } from "@/data/products";

export function CategoryRail() {
  return (
    <section className="relative z-10 -mt-16 pb-8 md:-mt-20">
      <div className="container-wide px-4">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-cyan">Shop by category</p>
            <h2 className="heading-display mt-2 text-2xl text-white md:text-3xl">
              Start with what you need
            </h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {floatingCategoryRail.map((category) => {
            const product = getProductBySlug(category.productSlug);
            return (
              <Link
                key={category.slug}
                href={category.href}
                className="group flex h-full min-h-[270px] flex-col overflow-hidden rounded-[1.5rem] border border-white/70 bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.16)] transition duration-400 hover:-translate-y-1.5 hover:border-electric/40 hover:shadow-[0_28px_70px_rgba(36,107,253,0.16)]"
              >
                <div className="relative mb-4 aspect-square overflow-hidden rounded-[1.1rem] bg-white">
                  {product ? (
                    <Image
                      src={product.images[0].src}
                      alt={product.imageAltText}
                      fill
                      className="object-contain p-5 transition duration-500 group-hover:scale-[1.06]"
                      sizes="200px"
                    />
                  ) : null}
                </div>
                <div className="mt-auto flex items-end justify-between gap-2">
                  <div>
                    <p className="heading-editorial text-[1.12rem] text-[var(--text)]">{category.label}</p>
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
