"use client";

import { useRouter, useSearchParams } from "next/navigation";

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "alpha", label: "Alphabetical" },
];

export function ShopToolbar({ initialCount }: { initialCount: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const sort = params.get("sort") ?? "featured";

  return (
    <div className="mt-8 flex flex-col gap-3 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-[var(--text-secondary)]">{initialCount} products</p>
      <label className="flex items-center gap-2 text-sm">
        <span className="font-semibold">Sort</span>
        <select
          className="rounded-full border border-border bg-white px-3 py-2"
          value={sort}
          onChange={(e) => {
            const next = new URLSearchParams(params.toString());
            next.set("sort", e.target.value);
            router.push(`?${next.toString()}`);
          }}
        >
          {sorts.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
