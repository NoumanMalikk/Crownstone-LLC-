import type { Product } from "@/lib/types";

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "alpha";

export interface ProductFilters {
  category?: string;
  brand?: string;
  color?: string;
  connection?: string;
  usbC?: boolean;
  wireless?: boolean;
  capacity?: string;
  power?: string;
  availability?: string;
  underFifty?: boolean;
  businessEligible?: boolean;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}

export function filterProducts(products: Product[], filters: ProductFilters) {
  return products.filter((product) => {
    if (!product.active) return false;
    if (filters.category) {
      const match =
        product.category === filters.category ||
        product.secondaryCategories.includes(filters.category);
      if (!match) return false;
    }
    if (filters.collection && !product.collections.includes(filters.collection)) {
      return false;
    }
    if (filters.brand && product.brand.toLowerCase() !== filters.brand.toLowerCase()) {
      return false;
    }
    if (
      filters.color &&
      !product.availableColors.some((c) => c.name.toLowerCase() === filters.color!.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.connection &&
      !(product.connectionTypes ?? []).some(
        (c) => c.toLowerCase() === filters.connection!.toLowerCase()
      )
    ) {
      return false;
    }
    if (filters.usbC && !(product.connectionTypes ?? []).some((c) => /usb-c/i.test(c))) {
      return false;
    }
    if (
      filters.wireless &&
      !(product.connectionTypes ?? []).some((c) => /wireless|bluetooth|wi-?fi/i.test(c))
    ) {
      return false;
    }
    if (filters.capacity && product.capacity !== filters.capacity) return false;
    if (filters.power && product.powerRating !== filters.power) return false;
    if (filters.availability && product.stockStatus !== filters.availability) return false;
    if (filters.underFifty && !(product.underFifty || product.price < 50)) return false;
    if (filters.businessEligible && !product.businessEligible) return false;
    if (filters.minPrice != null && product.price < filters.minPrice) return false;
    if (filters.maxPrice != null && product.price > filters.maxPrice) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const blob = `${product.title} ${product.brand} ${product.exactModel} ${product.keySpecification}`.toLowerCase();
      if (!blob.includes(q)) return false;
    }
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortOption = "featured") {
  const list = [...products];
  switch (sort) {
    case "newest":
      return list.sort((a, b) => Number(b.newArrival) - Number(a.newArrival) || a.title.localeCompare(b.title));
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "alpha":
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case "featured":
    default:
      return list.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured) ||
          Number(b.newArrival) - Number(a.newArrival) ||
          a.title.localeCompare(b.title)
      );
  }
}
