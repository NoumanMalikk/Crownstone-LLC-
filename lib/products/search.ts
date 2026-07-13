import type { Product } from "@/lib/types";

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9+.#\s-]/g, " ").replace(/\s+/g, " ").trim();
}

export function searchProducts(products: Product[], query: string, limit = 8) {
  const q = normalize(query);
  if (!q) return [];

  const tokens = q.split(" ").filter(Boolean);

  const scored = products
    .filter((p) => p.active)
    .map((product) => {
      const haystack = normalize(
        [
          product.title,
          product.brand,
          product.manufacturer,
          product.exactModel,
          product.category,
          product.sku,
          product.shortDescription,
          product.keySpecification,
          ...product.secondaryCategories,
          ...product.collections,
          ...Object.values(product.specifications),
          ...product.portConfiguration,
          ...(product.connectionTypes ?? []),
          product.capacity ?? "",
          product.powerRating ?? "",
        ].join(" ")
      );

      let score = 0;
      if (haystack.includes(q)) score += 20;
      for (const token of tokens) {
        if (normalize(product.title).includes(token)) score += 8;
        if (normalize(product.exactModel).includes(token)) score += 10;
        if (normalize(product.sku).includes(token)) score += 10;
        if (haystack.includes(token)) score += 3;
      }
      return { product, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.product.title.localeCompare(b.product.title));

  return scored.slice(0, limit).map((entry) => entry.product);
}
