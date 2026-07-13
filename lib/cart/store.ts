"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (productId: string, quantity?: number, variantId?: string) => void;
  removeItem: (productId: string, variantId?: string) => void;
  setQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clear: () => void;
  saveForLater: (productId: string, variantId?: string) => void;
  saved: CartItem[];
  moveSavedToCart: (productId: string, variantId?: string) => void;
}

function sameLine(a: CartItem, productId: string, variantId?: string) {
  return a.productId === productId && a.variantId === variantId;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      saved: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
      addItem: (productId, quantity = 1, variantId) => {
        const items = [...get().items];
        const index = items.findIndex((item) => sameLine(item, productId, variantId));
        if (index >= 0) {
          items[index] = {
            ...items[index],
            quantity: Math.min(20, items[index].quantity + quantity),
          };
        } else {
          items.push({
            productId,
            variantId,
            quantity: Math.min(20, quantity),
            addedAt: Date.now(),
          });
        }
        set({ items, isOpen: true });
      },
      removeItem: (productId, variantId) =>
        set({
          items: get().items.filter((item) => !sameLine(item, productId, variantId)),
        }),
      setQuantity: (productId, quantity, variantId) => {
        if (quantity < 1) {
          get().removeItem(productId, variantId);
          return;
        }
        set({
          items: get().items.map((item) =>
            sameLine(item, productId, variantId)
              ? { ...item, quantity: Math.min(20, quantity) }
              : item
          ),
        });
      },
      clear: () => set({ items: [] }),
      saveForLater: (productId, variantId) => {
        const item = get().items.find((i) => sameLine(i, productId, variantId));
        if (!item) return;
        set({
          items: get().items.filter((i) => !sameLine(i, productId, variantId)),
          saved: [...get().saved.filter((i) => !sameLine(i, productId, variantId)), item],
        });
      },
      moveSavedToCart: (productId, variantId) => {
        const item = get().saved.find((i) => sameLine(i, productId, variantId));
        if (!item) return;
        set({
          saved: get().saved.filter((i) => !sameLine(i, productId, variantId)),
        });
        get().addItem(productId, item.quantity, variantId);
      },
    }),
    { name: "crownstone-cart" }
  )
);
