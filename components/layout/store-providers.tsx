"use client";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { QuickViewDrawer } from "@/components/product/quick-view-drawer";
import { CompareTray } from "@/components/comparison/compare-tray";

export function StoreProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
      <QuickViewDrawer />
      <CompareTray />
    </>
  );
}
