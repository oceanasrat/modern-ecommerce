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
  const updateQuantity = useCartStore((state) => state.updateQuantity)

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

        {/* HEADER */}
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="text-xl font-semibold tracking-tight">
            Your Cart
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            Review your items before checkout
          </p>
        </SheetHeader>

        {/* ITEMS */}
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
                  className="flex gap-4 rounded-2xl border bg-background p-4 shadow-sm hover:shadow-md transition"
                >
                  {/* IMAGE */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 space-y-3">

                    <div className="flex items-start justify-between">
                      <p className="font-medium leading-6 line-clamp-2">
                        {item.name}
                      </p>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-red-500 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-7 w-7 rounded-full border text-sm hover:bg-muted"
                      >
                        -
                      </button>

                      <span className="text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-7 w-7 rounded-full border text-sm hover:bg-muted"
                      >
                        +
                      </button>

                    </div>

                    {/* PRICE */}
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        ${Number(item.price).toFixed(2)} each
                      </p>

                      <p className="font-semibold">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t bg-background px-6 py-5">

          <div className="mb-4 space-y-2 rounded-2xl bg-muted/40 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="flex justify-between border-t pt-3 text-base font-semibold">
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

          {/* TRUST */}
          <p className="mt-3 text-center text-xs text-muted-foreground">
            🔒 Secure checkout • 30-day guarantee • Fast delivery
          </p>

        </div>

      </SheetContent>
    </Sheet>
  )
}
