"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutInput } from "@/lib/validation/checkout";
import { useCartStore } from "@/lib/cart/store";
import { resolveCartLines, computeSubtotal, computeCartWeight } from "@/lib/pricing/cart-totals";
import { getShippingMethods } from "@/lib/pricing/shipping";
import { formatPrice } from "@/lib/utilities/format";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { storeConfig } from "@/data/store-config";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = [
  "Customer",
  "Shipping",
  "Method",
  "Billing",
  "Payment",
  "Review",
] as const;

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const lines = useMemo(() => resolveCartLines(items), [items]);
  const subtotal = computeSubtotal(lines);
  const weight = computeCartWeight(lines);
  const methods = getShippingMethods(weight);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customer: { email: "", firstName: "", lastName: "", phone: "" },
      shippingAddress: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "United States",
      },
      billingSameAsShipping: true,
      shippingMethodId: methods[0]?.id ?? "standard",
      acceptTerms: false as unknown as true,
      marketingConsent: false,
      items: items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    },
  });

  if (!lines.length) {
    return (
      <div className="container-wide px-4 py-20 text-center">
        <h1 className="heading-display text-3xl">Your cart is empty</h1>
        <Button asChild className="mt-6">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  const shippingMethodId = form.watch("shippingMethodId");
  const shipping = methods.find((m) => m.id === shippingMethodId)?.price ?? 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  async function onSubmit(values: CheckoutInput) {
    setLoading(true);
    setStatus(null);
    try {
      const payload = {
        ...values,
        items: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      };
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");

      if (data.mode === "stripe" && data.url) {
        window.location.href = data.url;
        return;
      }

      if (data.mode === "demo") {
        setStatus(data.message);
        // Demo mode never shows production success or paid status.
        return;
      }

      clear();
      router.push(`/checkout/success?reference=${encodeURIComponent(data.reference)}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-wide grid gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h1 className="heading-display text-4xl">Checkout</h1>
        <p className="mt-3 rounded-2xl border border-border bg-cool-gray/70 p-4 text-sm text-[var(--text-secondary)]">
          {storeConfig.demo.notice}
        </p>
        <ol className="mt-6 flex flex-wrap gap-2">
          {steps.map((label, index) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => setStep(index)}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  step === index ? "bg-electric text-white" : "bg-white border border-border"
                }`}
              >
                {index + 1}. {label}
              </button>
            </li>
          ))}
        </ol>

        <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {step === 0 ? (
            <section className="space-y-4 rounded-2xl border border-border bg-white p-6">
              <h2 className="heading-editorial text-xl">Customer information</h2>
              <Field label="Email" error={form.formState.errors.customer?.email?.message}>
                <Input type="email" {...form.register("customer.email")} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" error={form.formState.errors.customer?.firstName?.message}>
                  <Input {...form.register("customer.firstName")} />
                </Field>
                <Field label="Last name" error={form.formState.errors.customer?.lastName?.message}>
                  <Input {...form.register("customer.lastName")} />
                </Field>
              </div>
              <Field label="Phone" error={form.formState.errors.customer?.phone?.message}>
                <Input {...form.register("customer.phone")} />
              </Field>
            </section>
          ) : null}

          {step === 1 ? (
            <section className="space-y-4 rounded-2xl border border-border bg-white p-6">
              <h2 className="heading-editorial text-xl">Shipping address</h2>
              <Field label="Address line 1"><Input {...form.register("shippingAddress.line1")} /></Field>
              <Field label="Address line 2"><Input {...form.register("shippingAddress.line2")} /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="City"><Input {...form.register("shippingAddress.city")} /></Field>
                <Field label="State"><Input {...form.register("shippingAddress.state")} /></Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="ZIP code"><Input {...form.register("shippingAddress.postalCode")} /></Field>
                <Field label="Country"><Input {...form.register("shippingAddress.country")} /></Field>
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="space-y-4 rounded-2xl border border-border bg-white p-6">
              <h2 className="heading-editorial text-xl">Shipping method</h2>
              <p className="text-sm text-[var(--text-secondary)]">{storeConfig.shipping.message}</p>
              {methods.map((method) => (
                <label key={method.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4">
                  <input type="radio" value={method.id} {...form.register("shippingMethodId")} className="mt-1" />
                  <span>
                    <span className="block font-semibold">{method.name} · {formatPrice(method.price)}</span>
                    <span className="text-sm text-[var(--text-secondary)]">{method.description} · {method.estimatedDays}</span>
                  </span>
                </label>
              ))}
            </section>
          ) : null}

          {step === 3 ? (
            <section className="space-y-4 rounded-2xl border border-border bg-white p-6">
              <h2 className="heading-editorial text-xl">Billing address</h2>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...form.register("billingSameAsShipping")} />
                Same as shipping address
              </label>
              {!form.watch("billingSameAsShipping") ? (
                <>
                  <Field label="Address line 1"><Input {...form.register("billingAddress.line1")} /></Field>
                  <Field label="Address line 2"><Input {...form.register("billingAddress.line2")} /></Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="City"><Input {...form.register("billingAddress.city")} /></Field>
                    <Field label="State"><Input {...form.register("billingAddress.state")} /></Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="ZIP code"><Input {...form.register("billingAddress.postalCode")} /></Field>
                    <Field label="Country"><Input {...form.register("billingAddress.country")} /></Field>
                  </div>
                </>
              ) : null}
            </section>
          ) : null}

          {step === 4 ? (
            <section className="space-y-4 rounded-2xl border border-border bg-white p-6">
              <h2 className="heading-editorial text-xl">Payment</h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Card details are never collected through ordinary form fields. When Stripe is connected, payment is handled by Stripe Checkout or Payment Element. In demonstration mode, no real card data is collected and orders are not marked paid.
              </p>
              <div className="rounded-xl border border-dashed border-border bg-cool-gray/50 p-4 text-sm">
                Stripe status: {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? "Publishable key present" : "Not configured (demo mode)"}
              </div>
            </section>
          ) : null}

          {step === 5 ? (
            <section className="space-y-4 rounded-2xl border border-border bg-white p-6">
              <h2 className="heading-editorial text-xl">Review & terms</h2>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1" {...form.register("acceptTerms")} />
                <span>
                  I accept the <Link href="/terms" className="underline">Terms</Link> and acknowledge the{" "}
                  <Link href="/privacy" className="underline">Privacy Policy</Link> of {storeConfig.legalName}.
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1" {...form.register("marketingConsent")} />
                <span>Optional marketing emails from Crownstone LLC.</span>
              </label>
              {form.formState.errors.acceptTerms ? (
                <p className="text-sm text-error">{form.formState.errors.acceptTerms.message}</p>
              ) : null}
            </section>
          ) : null}

          <div className="flex flex-wrap gap-3">
            {step > 0 ? (
              <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            ) : null}
            {step < steps.length - 1 ? (
              <Button type="button" onClick={() => setStep((s) => s + 1)}>
                Continue
              </Button>
            ) : (
              <Button type="submit" disabled={loading}>
                {loading ? "Processing…" : "Place order request"}
              </Button>
            )}
          </div>
          {status ? <p className="rounded-xl border border-border bg-cool-gray p-4 text-sm">{status}</p> : null}
        </form>
      </div>

      <aside className="h-fit rounded-[1.5rem] border border-border bg-white p-6 lg:sticky lg:top-28">
        <h2 className="heading-editorial text-xl">Order summary</h2>
        <ul className="mt-4 space-y-4">
          {lines.map((line) => (
            <li key={`${line.productId}-${line.variantId}`} className="flex gap-3">
              <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-soft-white">
                <Image src={line.imageSrc} alt="" fill className="object-contain p-1" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{line.title}</p>
                <p className="text-xs text-[var(--text-secondary)]">Qty {line.quantity}</p>
              </div>
              <p className="text-sm font-semibold">{formatPrice(line.lineTotal)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Shipping</dt><dd>{formatPrice(shipping)}</dd></div>
          <div className="flex justify-between"><dt>Tax</dt><dd>{formatPrice(tax)}</dd></div>
          <div className="flex justify-between text-base font-semibold"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
        </dl>
      </aside>
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {error ? <p className="mt-1 text-sm text-error">{error}</p> : null}
    </div>
  );
}
