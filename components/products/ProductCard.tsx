"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store"

type Product = {
  id: string | number
  name: string
  price: string | number
  image: string
  category?: string
  description?: string
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
          className="block overflow-hidden"
          aria-label={`View ${product.name}`}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {product.category && (
              <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
                {product.category}
              </div>
            )}
          </div>
        </Link>

        <CardContent className="flex flex-1 flex-col p-5">
          <div className="space-y-2">
            <Link href={`/products/${product.id}`}>
              <h3 className="line-clamp-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                {product.name}
              </h3>
            </Link>

            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description || "Premium product"}
            </p>
          </div>

          <div className="mt-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Price
              </p>
              <p className="text-2xl font-bold">${displayPrice}</p>
            </div>

            <Button
              className="rounded-full px-5 shadow-sm transition-transform hover:scale-[1.02]"
              onClick={() =>
                addItem({
                  id: String(product.id),
                  name: product.name,
                  price: numericPrice,
                  image: product.image,
                  quantity: 1,
                })
              }
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}