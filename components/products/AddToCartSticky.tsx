"use client"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"

export default function AddToCartSticky({ product }: any) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <div className="sticky bottom-6">
      <Button
        className="w-full text-lg py-6"
        onClick={() =>
          addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images?.[0],
            quantity: 1,

            // -------------------------
            // NEW (Retail OS fields)
            // -------------------------
            sku: product.sku || "",
            category: product.category || "general",
          })
        }
      >
        Add to Cart
      </Button>
    </div>
  )
}
