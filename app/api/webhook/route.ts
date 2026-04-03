import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { sanityAdmin } from "@/lib/sanityAdmin"

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

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("❌ Webhook signature error:", err)
    return new NextResponse("Webhook Error", { status: 400 })
  }

  // ✅ HANDLE SUCCESSFUL PAYMENT
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    console.log("✅ Payment successful:", session.id)

    // 🔥 Get items from metadata
    const items = JSON.parse(session.metadata?.items || "[]")

    try {
      // ✅ 1. Save order to Sanity
      await sanityAdmin.create({
        _type: "order",
        stripeId: session.id,
        customerEmail: session.customer_details?.email || "unknown",
        amount: session.amount_total ? session.amount_total / 100 : 0,
        status: "paid",

        // Save purchased items
        products: items.map((item: any) => ({
          _key: item.id,
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      })

      console.log("✅ Order saved to Sanity:", session.id)

      // ✅ 2. Update stock for each item
      for (const item of items) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/update-stock`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: item.id,
              quantity: item.quantity,
            }),
          })

          console.log(`✅ Stock updated for product: ${item.id}`)
        } catch (err) {
          console.error("❌ Stock update failed:", item.id, err)
        }
      }

    } catch (error) {
      console.error("❌ Order processing failed:", error)
    }
  }

  return NextResponse.json({ received: true })
}