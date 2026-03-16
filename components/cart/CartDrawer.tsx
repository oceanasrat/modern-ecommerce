"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"

export default function CartDrawer({ open, setOpen }: any) {

  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>

      <SheetContent className="w-[400px]">

        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">

          {items.length === 0 && (
            <p className="text-muted-foreground">
              Your cart is empty
            </p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">
                  {item.name}
                </p>

                <p className="text-sm text-muted-foreground">
                  ${item.price}
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}

        </div>

        <div className="mt-10 border-t pt-4">

          <p className="font-semibold">
            Total: ${total}
          </p>

          <Button className="w-full mt-4">
            Checkout
          </Button>

        </div>

      </SheetContent>

    </Sheet>
  )
}