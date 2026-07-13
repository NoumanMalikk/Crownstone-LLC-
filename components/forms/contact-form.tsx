"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validation/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { storeConfig } from "@/data/store-config";
import { useState } from "react";

const topics = [
  "Product question",
  "Compatibility",
  "Existing order",
  "Business pricing",
  "Shipping",
  "Return",
  "Warranty",
  "Damaged product",
  "Website issue",
  "Other",
] as const;

export function ContactForm() {
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      topic: "Product question",
      orderReference: "",
      message: "",
      marketingConsent: false,
      website: "",
    },
  });

  async function onSubmit(values: ContactInput) {
    setMessage(null);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    setMessage(data.message || data.error || "Submitted");
    if (res.ok) form.reset();
  }

  return (
    <div className="container-wide grid gap-10 px-4 py-12 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <h1 className="heading-display text-4xl">Contact</h1>
        <div className="mt-6 space-y-2 text-[var(--text-secondary)]">
          <p className="font-semibold text-[var(--text)]">{storeConfig.legalName}</p>
          {storeConfig.showFullAddress ? (
            <p>
              {storeConfig.address.line1}
              <br />
              {storeConfig.address.displayShort}
            </p>
          ) : (
            <p>{storeConfig.address.displayShort}</p>
          )}
          <p>
            Phone:{" "}
            <a href={storeConfig.phoneHref} className="text-electric">
              {storeConfig.phone}
            </a>
          </p>
          <p>Email: {storeConfig.email}</p>
          <p className="pt-4 text-sm">
            {storeConfig.address.locationDescriptor}. The registered address is for business
            correspondence and is not a public showroom or pickup location.
          </p>
        </div>
      </div>
      <form className="space-y-4 rounded-[1.5rem] border border-border bg-white p-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...form.register("name")} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register("email")} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...form.register("phone")} />
        </div>
        <div>
          <Label htmlFor="topic">Topic</Label>
          <select id="topic" className="w-full rounded-2xl border border-border px-4 py-3" {...form.register("topic")}>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="orderReference">Order reference (optional)</Label>
          <Input id="orderReference" {...form.register("orderReference")} />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" {...form.register("message")} />
        </div>
        <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...form.register("website")} />
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" className="mt-1" {...form.register("marketingConsent")} />
          <span>Optional marketing emails from Crownstone LLC.</span>
        </label>
        <Button type="submit">Send message</Button>
        {message ? <p className="text-sm text-[var(--text-secondary)]">{message}</p> : null}
      </form>
    </div>
  );
}
