import { NextRequest, NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validation/contact";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid quote request" }, { status: 400 });
  }
  if (parsed.data.honeypot) return NextResponse.json({ ok: true });

  console.info("[business-quote]", {
    company: parsed.data.company,
    email: parsed.data.workEmail,
    quantity: parsed.data.quantity,
    category: parsed.data.productOrCategory,
  });

  return NextResponse.json({
    ok: true,
    message: "Your business quantity request was received. Submitting a request does not guarantee wholesale pricing.",
  });
}
