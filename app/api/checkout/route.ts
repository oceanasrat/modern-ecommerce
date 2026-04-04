import Stripe from "stripe"
import { NextResponse } from "next/server"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
})

export async function POST(req: Request) {
  try {
    const { items, deliveryTime } = await req.json()

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      "http://localhost:3000"

    // -------------------------
    // DETECT ALCOHOL IN CART
    // -------------------------
    const containsAlcohol = items.some(
      (item: any) => item.category === "alcohol"
    )

    // -------------------------
    // CREATE STRIPE SESSION
    // -------------------------
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity,
      })),

      // -------------------------
      // METADATA (IMPORTANT)
      // -------------------------
      metadata: {
        delivery_time: deliveryTime || "not_selected",
        contains_alcohol: containsAlcohol ? "true" : "false",
      },

      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
    })

    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error("❌ Stripe Checkout Error:", error)

    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    )
  }
}
