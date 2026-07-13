"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storeConfig } from "@/data/store-config";

interface CompareState {
  ids: string[];
  add: (productId: string) => { ok: boolean; message?: string };
  remove: (productId: string) => void;
  toggle: (productId: string) => { ok: boolean; message?: string };
  clear: () => void;
  has: (productId: string) => boolean;
  trayOpen: boolean;
  setTrayOpen: (open: boolean) => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      ids: [],
      trayOpen: false,
      setTrayOpen: (open) => set({ trayOpen: open }),
      has: (productId) => get().ids.includes(productId),
      add: (productId) => {
        const ids = get().ids;
        if (ids.includes(productId)) return { ok: true };
        if (ids.length >= storeConfig.comparison.maxProducts) {
          return {
            ok: false,
            message: `Compare up to ${storeConfig.comparison.maxProducts} products.`,
          };
        }
        set({ ids: [...ids, productId], trayOpen: true });
        return { ok: true };
      },
      remove: (productId) =>
        set({ ids: get().ids.filter((id) => id !== productId) }),
      toggle: (productId) => {
        if (get().has(productId)) {
          get().remove(productId);
          return { ok: true };
        }
        return get().add(productId);
      },
      clear: () => set({ ids: [] }),
    }),
    { name: "crownstone-compare" }
  )
);
