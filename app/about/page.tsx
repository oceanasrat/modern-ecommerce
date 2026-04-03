import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const highlights = [
    {
      title: "Premium Quality",
      description: "Carefully selected products with a focus on consistency and value.",
    },
    {
      title: "Fast Shipping",
      description: "Delivered within 3–7 business days depending on location and item.",
    },
    {
      title: "Secure Checkout",
      description: "Safe and reliable payments powered by trusted payment processing.",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 space-y-24">

      {/* HERO */}
      <section className="text-center space-y-6">
        <span className="inline-flex items-center rounded-full border px-4 py-1 text-sm text-muted-foreground">
          Premium E-Commerce Brand
        </span>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Ocean Global Ventures
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Premium products sourced globally. Built for quality, speed, and trust.
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <Link href="/#products">
            <Button size="lg" className="rounded-full px-8">
              Shop Now
            </Button>
          </Link>

          <Link href="/about">
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground pt-4">
          <span className="rounded-full bg-muted px-4 py-2">🚚 Fast Shipping</span>
          <span className="rounded-full bg-muted px-4 py-2">🔒 Secure Payments</span>
          <span className="rounded-full bg-muted px-4 py-2">⭐ Trusted Products</span>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="grid gap-6 text-center md:grid-cols-3">
        <div className="rounded-2xl border p-6 shadow-sm">
          <h3 className="font-semibold text-lg">🚚 Fast Shipping</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Delivered within 3–7 business days
          </p>
        </div>

        <div className="rounded-2xl border p-6 shadow-sm">
          <h3 className="font-semibold text-lg">🔒 Secure Payments</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Powered by Stripe with full protection
          </p>
        </div>

        <div className="rounded-2xl border p-6 shadow-sm">
          <h3 className="font-semibold text-lg">💯 Quality Guarantee</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            30-day return policy on all products
          </p>
        </div>
      </section>

      {/* PRODUCTS SECTION ANCHOR */}
      <section id="products" className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <p className="text-sm text-muted-foreground">
            Explore our latest and most popular items
          </p>
        </div>

        {/* Your existing product grid will plug here automatically */}
      </section>

      {/* BRAND VALUES */}
      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-2xl border bg-muted/30 p-6 text-center">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section className="text-center rounded-2xl bg-muted/40 p-10 space-y-4">
        <h2 className="text-2xl font-semibold">
          Ready to shop premium products?
        </h2>

        <p className="text-sm text-muted-foreground">
          Discover quality items with fast delivery and secure checkout.
        </p>

        <Link href="/#products">
          <Button size="lg" className="rounded-full px-8">
            Start Shopping
          </Button>
        </Link>
      </section>

    </div>
  )
}