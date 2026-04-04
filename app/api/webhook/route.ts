import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { sanityAdmin } from "@/lib/sanityAdmin"

// ✅ Ensure env variables exist
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY")
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET")
}

// ✅ Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(req: Request) {
  const body = await req.text()

  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 })
  }

  // ✅ FORCE string (fix TypeScript error)
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )
  } catch (err) {
    console.error("❌ Webhook signature error:", err)
    return new NextResponse("Webhook Error", { status: 400 })
  }

  // 🔥 HANDLE SUCCESSFUL PAYMENT
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    console.log("✅ Payment received:", session.id)

    // ✅ Prevent duplicate orders
    const existingOrder = await sanityAdmin.fetch(
      `*[_type == "order" && stripeId == $id][0]`,
      { id: session.id }
    )

    if (existingOrder) {
      console.log("⚠️ Order already exists:", session.id)
      return NextResponse.json({ received: true })
    }

    // ✅ Parse metadata safely
    let items: any[] = []
    try {
      items = JSON.parse(session.metadata?.items || "[]")
    } catch (err) {
      console.error("❌ Failed to parse metadata:", err)
    }

    // ✅ Save order
    try {
      await sanityAdmin.create({
        _type: "order",
        stripeId: session.id,
        customerEmail: session.customer_details?.email || "unknown",
        amount: session.amount_total
          ? session.amount_total / 100
          : 0,
        status: "paid",
        products: items.map((item: any) => ({
          _key: item.id,
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      })

      console.log("✅ Order saved:", session.id)
    } catch (error) {
      console.error("❌ Order save failed:", error)
    }

    // ✅ Update stock
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      "http://localhost:3000"

    for (const item of items) {
      try {
        await fetch(`${baseUrl}/api/update-stock`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: item.id,
            quantity: item.quantity,
          }),
        })

        console.log("✅ Stock updated:", item.id)
      } catch (err) {
        console.error("❌ Stock update failed:", item.id, err)
      }
    }
  }

  return NextResponse.json({ received: true })
}
