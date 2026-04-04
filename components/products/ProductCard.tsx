"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"
import { ShoppingCart } from "lucide-react"

type Product = {
  id: string | number
  name: string
  price: string | number
  image: string
  category?: string
  description?: string

  // -------------------------
  // NEW (Retail OS fields)
  // -------------------------
  sku?: string
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)

  const numericPrice = Number(product.price)
  const displayPrice = Number.isFinite(numericPrice)
    ? numericPrice.toFixed(2)
    : "0.00"

  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-3xl border bg-background shadow-sm transition-all duration-300 hover:shadow-xl">

        <Link
          href={`/products/${product.id}`}
          className="block"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">

            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />

            {product.category && (
              <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow">
                {product.category}
              </div>
            )}
          </div>
        </Link>

        <CardContent className="flex flex-1 flex-col p-5">

          <h3 className="text-base font-semibold tracking-tight">
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {product.description || "Premium product"}
          </p>

          <div className="mt-5 flex items-center justify-between">

            <p className="text-lg font-semibold">
              ${displayPrice}
            </p>

            <Button
              size="sm"
              className="rounded-full px-4"
              onClick={(e) => {
                e.preventDefault()

                addItem({
                  id: String(product.id),
                  name: product.name,
                  price: numericPrice,
                  image: product.image,
                  quantity: 1,

                  // -------------------------
                  // NEW (Retail OS fields)
                  // -------------------------
                  sku: product.sku || "",
                  category: product.category || "general",
                })
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>

          </div>

        </CardContent>

      </Card>
    </motion.div>
  )
}
