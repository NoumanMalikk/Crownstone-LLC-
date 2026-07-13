"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, type QuoteInput } from "@/lib/validation/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function QuoteForm() {
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      workEmail: "",
      phone: "",
      company: "",
      website: "",
      productOrCategory: "",
      modelPreference: "",
      quantity: 10,
      requiredDate: "",
      shippingZip: "",
      taxExempt: false,
      additionalRequirements: "",
      consent: false as unknown as true,
      honeypot: "",
    },
  });

  async function onSubmit(values: QuoteInput) {
    setMessage(null);
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    setMessage(data.message || data.error || "Submitted");
    if (res.ok) form.reset();
  }

  return (
    <form className="mx-auto max-w-2xl space-y-4 rounded-[1.5rem] border border-border bg-white p-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Name</Label><Input {...form.register("name")} /></div>
        <div><Label>Work email</Label><Input type="email" {...form.register("workEmail")} /></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><Label>Phone</Label><Input {...form.register("phone")} /></div>
        <div><Label>Company</Label><Input {...form.register("company")} /></div>
      </div>
      <div><Label>Website (optional)</Label><Input {...form.register("website")} /></div>
      <div><Label>Product or category</Label><Input {...form.register("productOrCategory")} /></div>
      <div><Label>Model preference</Label><Input {...form.register("modelPreference")} /></div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div><Label>Quantity</Label><Input type="number" {...form.register("quantity", { valueAsNumber: true })} /></div>
        <div><Label>Required date</Label><Input type="date" {...form.register("requiredDate")} /></div>
        <div><Label>Shipping ZIP</Label><Input {...form.register("shippingZip")} /></div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...form.register("taxExempt")} />
        Tax-exempt status (documentation may be requested)
      </label>
      <div><Label>Additional requirements</Label><Textarea {...form.register("additionalRequirements")} /></div>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" className="mt-1" {...form.register("consent")} />
        <span>I consent to Crownstone LLC contacting me about this business quantity request. Submitting a request does not guarantee wholesale pricing.</span>
      </label>
      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...form.register("honeypot")} />
      <Button type="submit">Submit business request</Button>
      {message ? <p className="text-sm text-[var(--text-secondary)]">{message}</p> : null}
    </form>
  );
}
