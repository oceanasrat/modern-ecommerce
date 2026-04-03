"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react"

type CartDrawerProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function CartDrawer({ open, setOpen }: CartDrawerProps) {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  )

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Checkout error:", error)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full max-w-md flex-col border-l bg-background p-0">

        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="text-xl font-semibold tracking-tight">
            Your Cart
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            Review your items before checkout
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">Your cart is empty</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Add a few products to continue to checkout.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border bg-background p-4 shadow-sm"
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium leading-6">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-base font-semibold">
                        ${Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t bg-background px-6 py-5">
          <div className="mb-4 space-y-2 rounded-2xl bg-muted/40 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>

            <div className="flex items-center justify-between border-t pt-3 text-base font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            className="h-12 w-full rounded-full text-base font-medium"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Checkout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Secure checkout powered by Stripe
          </p>
        </div>

      </SheetContent>
    </Sheet>
  )
}