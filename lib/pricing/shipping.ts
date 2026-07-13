import { storeConfig } from "@/data/store-config";
import { roundMoney } from "@/lib/utilities/format";
import type { ShippingMethod } from "@/lib/types";

export function getShippingMethods(weightPounds: number): ShippingMethod[] {
  return storeConfig.shipping.methods.map((method) => ({
    id: method.id,
    name: method.name,
    description: method.description,
    estimatedDays: method.estimatedDays,
    price: roundMoney(method.baseRate + method.perPound * Math.max(weightPounds, 0.5)),
  }));
}

export function getShippingMethod(id: string, weightPounds: number) {
  return getShippingMethods(weightPounds).find((m) => m.id === id);
}
