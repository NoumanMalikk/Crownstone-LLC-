"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  quickViewProductId: string | null;
  mobileNavOpen: boolean;
  filterDrawerOpen: boolean;
  announcementIndex: number;
  recentlyViewed: string[];
  openQuickView: (productId: string) => void;
  closeQuickView: () => void;
  setMobileNavOpen: (open: boolean) => void;
  setFilterDrawerOpen: (open: boolean) => void;
  addRecentlyViewed: (productId: string) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      quickViewProductId: null,
      mobileNavOpen: false,
      filterDrawerOpen: false,
      announcementIndex: 0,
      recentlyViewed: [],
      openQuickView: (productId) => set({ quickViewProductId: productId }),
      closeQuickView: () => set({ quickViewProductId: null }),
      setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
      setFilterDrawerOpen: (open) => set({ filterDrawerOpen: open }),
      addRecentlyViewed: (productId) => {
        const next = [
          productId,
          ...get().recentlyViewed.filter((id) => id !== productId),
        ].slice(0, 8);
        set({ recentlyViewed: next });
      },
    }),
    {
      name: "crownstone-ui",
      partialize: (state) => ({ recentlyViewed: state.recentlyViewed }),
    }
  )
);
