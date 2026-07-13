# Product editing

Products live in `data/products.ts`.

## Add a product

1. Add a complete `Product` object with unique `id`, `sku`, `slug`.
2. Add authorized images to `public/products/[slug]/`.
3. Add an `image-credits.ts` record.
4. Wire related product IDs and collections.
5. Confirm price is at least $5.

## Remove a product

Set `active: false` or remove the object and clean related IDs.

## Change prices / models / specs

Edit the fields directly in `data/products.ts`. Do not invent certifications, speeds, warranties or accessories.

## Variants / compatibility / warranty / related products

Use `availableVariants`, `compatibility`, `warrantyInformation` and `relatedProductIds`.

## Activate for production purchase

Set:

- `incomplete: false`
- `imageReplacementRequired: false`
- verified manufacturer, model, supplier SKU
- authorized imagery
- `NEXT_PUBLIC_STORE_MODE=production`
