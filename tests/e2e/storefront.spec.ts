import { test, expect } from "@playwright/test";

test("homepage opens with hero controls", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /workspace that works beautifully/i })).toBeVisible();
  await page.getByRole("button", { name: /pause slideshow/i }).click();
  await page.getByRole("button", { name: /next slide/i }).click();
  await expect(page.getByRole("heading", { name: /smarter technology/i })).toBeVisible();
});

test("browse shop and open product", async ({ page }) => {
  await page.goto("/shop");
  await expect(page.getByRole("heading", { name: /shop technology/i })).toBeVisible();
  await page.locator("article.product-card a").first().click();
  await expect(page.getByRole("button", { name: /add to cart/i }).first()).toBeVisible();
});

test("search finds wifi products", async ({ page }) => {
  await page.goto("/search?q=Wi-Fi%206");
  await expect(page.getByText(/AX3000|Wi-Fi 6|adapter/i).first()).toBeVisible();
});

test("cart and checkout validation path", async ({ page }) => {
  await page.goto("/product/graphite-full-size-wireless-keyboard");
  await page.getByRole("button", { name: /^add to cart$/i }).first().click();
  await page.goto("/checkout");
  await expect(page.getByRole("heading", { name: /checkout/i })).toBeVisible();
  await expect(page.getByText(/demonstration mode/i)).toBeVisible();
});

test("no admin route", async ({ page }) => {
  const response = await page.goto("/admin");
  expect(response?.status()).toBe(404);
});

test("exactly 26 products listed in shop", async ({ page }) => {
  await page.goto("/shop");
  await expect(page.getByText("26 products")).toBeVisible();
});

test("product images load", async ({ page }) => {
  await page.goto("/product/usb-c-dual-display-docking-station");
  const img = page.locator("main img").first();
  await expect(img).toBeVisible();
  const src = await img.getAttribute("src");
  expect(src).toBeTruthy();
});

test("mobile navigation opens", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: /open menu/i }).click();
  await expect(page.getByRole("button", { name: /close menu/i })).toBeVisible();
});

test("business quote page renders", async ({ page }) => {
  await page.goto("/business/quote");
  await expect(page.getByRole("heading", { name: /business quantity request/i })).toBeVisible();
});

test("contact page renders", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { name: /contact/i })).toBeVisible();
});
