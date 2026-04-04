"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useCartStore } from "@/lib/store"

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl rounded-3xl border bg-background p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-3xl">
          🎉
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Payment Successful
        </h1>

        <p className="mt-3 text-lg text-muted-foreground">
          Your order has been placed.
        </p>

        <div className="my-8 border-t" />

        <div className="space-y-3 text-sm leading-7 text-muted-foreground">
          <p>You will receive a confirmation email shortly.</p>
          <p>Estimated delivery: 3–7 business days.</p>
          <p>Secure payment processed via Stripe.</p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Continue Shopping
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium transition hover:bg-muted"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  )
}
