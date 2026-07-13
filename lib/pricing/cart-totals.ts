import { getProductById } from "@/data/products";
import type { CartItem } from "@/lib/types";
import { roundMoney } from "@/lib/utilities/format";

export interface ResolvedCartLine {
  productId: string;
  variantId?: string;
  quantity: number;
  title: string;
  brand: string;
  model: string;
  sku: string;
  supplierSku: string;
  slug: string;
  imageSrc: string;
  unitPrice: number;
  lineTotal: number;
  shippingWeight: number;
  incomplete: boolean;
  variantLabel?: string;
  maxQuantity: number;
  stockStatus: string;
}

type CartLineInput = Pick<CartItem, "productId" | "quantity"> & {
  variantId?: string;
  addedAt?: number;
};

export function resolveCartLines(items: CartLineInput[]): ResolvedCartLine[] {
  const lines: ResolvedCartLine[] = [];

  for (const item of items) {
    const product = getProductById(item.productId);
    if (!product || !product.active) continue;

    const variant = product.availableVariants.find((v) => v.id === item.variantId);
    const unitPrice = roundMoney(product.price + (variant?.priceAdjustment ?? 0));
    const quantity = Math.min(Math.max(1, item.quantity), product.maximumOrderQuantity);

    lines.push({
      productId: product.id,
      variantId: item.variantId,
      quantity,
      title: product.title,
      brand: product.brand,
      model: product.exactModel,
      sku: product.sku,
      supplierSku: product.supplierSku,
      slug: product.slug,
      imageSrc: product.images[0]?.src ?? "/brand/mark.svg",
      unitPrice,
      lineTotal: roundMoney(unitPrice * quantity),
      shippingWeight: product.shippingWeight * quantity,
      incomplete: product.incomplete || product.imageReplacementRequired,
      variantLabel: variant?.label,
      maxQuantity: product.maximumOrderQuantity,
      stockStatus: product.stockStatus,
    });
  }

  return lines;
}

export function computeSubtotal(lines: ResolvedCartLine[]) {
  return roundMoney(lines.reduce((sum, line) => sum + line.lineTotal, 0));
}

export function computeCartWeight(lines: ResolvedCartLine[]) {
  return roundMoney(lines.reduce((sum, line) => sum + line.shippingWeight, 0));
}
