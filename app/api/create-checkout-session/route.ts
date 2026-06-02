import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PEARUP_FEE = 0.10;

function parseAmountCents(budget: string | null): number {
  if (!budget) return 0;
  const match = budget.replace(/,/g, "").match(/[\d.]+/);
  if (!match) return 0;
  return Math.round(parseFloat(match[0]) * 100);
}

export async function POST(req: NextRequest) {
  try {
    const { dealId, amount, creatorName, dealDescription } = await req.json();

    const totalCents = parseAmountCents(amount);
    if (totalCents === 0) {
      return NextResponse.json({ error: "Invalid amount: " + amount }, { status: 400 });
    }

    const pearupFeeCents = Math.round(totalCents * PEARUP_FEE);
    const creatorAmountCents = totalCents - pearupFeeCents;

    const origin = req.nextUrl.origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Deal with ${creatorName} via Pearup`,
              description: dealDescription || "Brand deal arranged through Pearup",
            },
            unit_amount: totalCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/payment-success?deal_id=${dealId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard`,
      metadata: {
        deal_id: dealId,
        creator_name: creatorName,
        pearup_fee_cents: String(pearupFeeCents),
        creator_amount_cents: String(creatorAmountCents),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message || "Payment failed" }, { status: 500 });
  }
}
