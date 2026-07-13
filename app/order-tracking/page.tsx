"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function OrderTrackingPage() {
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    const res = await fetch("/api/tracking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference, email }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Unable to find order");
      return;
    }
    setResult(data);
  }

  return (
    <div className="container-wide px-4 py-12">
      <h1 className="heading-display text-4xl">Order tracking</h1>
      <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
        Enter your order reference and email to view status. Tracking details appear after fulfillment updates are available.
      </p>
      <form onSubmit={onSubmit} className="mt-8 max-w-lg space-y-4 rounded-2xl border border-border bg-white p-6">
        <div>
          <Label htmlFor="reference">Order reference</Label>
          <Input id="reference" value={reference} onChange={(e) => setReference(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <Button type="submit">Track order</Button>
        {error ? <p className="text-sm text-error">{error}</p> : null}
        {result ? (
          <div className="rounded-xl bg-cool-gray p-4 text-sm">
            <p><strong>Reference:</strong> {String(result.reference)}</p>
            <p><strong>Status:</strong> {String(result.status)}</p>
            <p><strong>Payment:</strong> {String(result.paymentStatus)}</p>
            <p><strong>Fulfillment:</strong> {String(result.fulfillmentStatus)}</p>
          </div>
        ) : null}
      </form>
    </div>
  );
}
